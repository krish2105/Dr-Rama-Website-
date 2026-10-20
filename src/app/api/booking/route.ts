import { NextResponse } from "next/server";
import { bookingSchema, callbackSchema, fieldErrors } from "@/lib/booking";

export const runtime = "nodejs";

// Limited in-memory limiter (per server instance). Pair with Vercel Firewall rate limiting in production.
const hits = new Map<string, number[]>();
function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 6;
}

async function insert(table: string, row: Record<string, unknown>) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return "skipped" as const;
  const res = await fetch(`${url}/rest/v1/${table}`, {
    method: "POST",
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify(row),
  });
  if (!res.ok) throw new Error(`supabase ${res.status}`);
  return "saved" as const;
}

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

// The alert holds no health detail: who, when, type of visit, contact.
async function emailClinic(subject: string, lines: string[]) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_ALERT_TO;
  const from = process.env.BOOKING_ALERT_FROM;
  if (!key || !to || !from) return;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], subject: subject, html: `<p>${lines.map(esc).join("<br>")}</p>` }),
  });
  if (!res.ok) throw new Error(`email ${res.status}`);
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return NextResponse.json({ ok: false, error: "rate" }, { status: 429 });

  let json: Record<string, unknown>;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
  const kind = json?.kind === "callback" ? "callback" : "booking";
  const parsed = kind === "callback" ? callbackSchema.safeParse(json) : bookingSchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ ok: false, error: "invalid", fields: fieldErrors(parsed.error) }, { status: 422 });
  const b = parsed.data as Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  if (b.website) return NextResponse.json({ ok: true }); // honeypot filled: pretend success, store nothing

  const configured = Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
  if (!configured) {
    if (process.env.NODE_ENV === "production") return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
    console.log(`[${kind}:dev] request received (not saved). Personal details not logged.`);
    return NextResponse.json({ ok: true, mode: "dev" });
  }

  try {
    if (kind === "callback") {
      await insert("callbacks", { name: b.name, phone: b.phone, call_window: b.window, source: b.source ?? "direct", consent_at: new Date().toISOString(), locale: b.locale });
    } else {
      await insert("bookings", {
        status: "requested", patient_type: b.patientType, name: b.name, guardian_name: b.guardianName ?? null, phone: b.phone,
        preferred_date: b.date, preferred_time: b.time, visit_type: b.visitType, source: b.source ?? "direct", medium: b.medium ?? null,
        consent_at: new Date().toISOString(), locale: b.locale,
      });
    }
  } catch (e) {
    console.error(`[${kind}] save failed`, (e as Error).message);
    return NextResponse.json({ ok: false, error: "save_failed" }, { status: 502 });
  }
  try {
    if (kind === "callback") await emailClinic("New call-back request", [`Name: ${b.name}`, `Phone: ${b.phone}`, `Preferred time: ${b.window}`]);
    else await emailClinic("New appointment request", [`Patient: ${b.name}`, b.guardianName ? `Parent/guardian/caller: ${b.guardianName}` : "For: the caller", `Phone: ${b.phone}`, `Preferred: ${b.date} ${b.time}`, `Visit type: ${b.visitType}`, `Source: ${b.source ?? "direct"}`]);
  } catch (e) {
    console.error(`[${kind}] alert failed`, (e as Error).message); // saved; a failed alert must not lose the request
  }
  return NextResponse.json({ ok: true, mode: "saved" });
}
