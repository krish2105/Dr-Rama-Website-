import { NextResponse } from "next/server";
import { bookingSchema, fieldErrors } from "@/lib/booking";

export const runtime = "nodejs";

// Best-effort in-memory limiter (per server instance). Pair with Vercel Firewall rate limiting in production.
const hits = new Map<string, number[]>();
function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

async function saveToSupabase(b: { name: string; phone: string; date: string; time: string; reason: string; locale: string }) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return "skipped" as const;
  const res = await fetch(`${url}/rest/v1/bookings`, {
    method: "POST",
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({
      name: b.name,
      phone: b.phone,
      preferred_date: b.date,
      preferred_time: b.time,
      reason: b.reason,
      consent_at: new Date().toISOString(),
      locale: b.locale,
    }),
  });
  if (!res.ok) throw new Error(`supabase ${res.status}`);
  return "saved" as const;
}

async function emailClinic(b: { name: string; phone: string; date: string; time: string; reason: string }) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_ALERT_TO;
  const from = process.env.BOOKING_ALERT_FROM;
  if (!key || !to || !from) return "skipped" as const;
  const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      subject: "New appointment request",
      html: `<p><b>Name:</b> ${esc(b.name)}<br><b>Phone:</b> ${esc(b.phone)}<br><b>Preferred:</b> ${esc(b.date)}, ${esc(b.time)}<br><b>Reason:</b> ${esc(b.reason)}</p>`,
    }),
  });
  if (!res.ok) throw new Error(`email ${res.status}`);
  return "sent" as const;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return NextResponse.json({ ok: false, error: "rate" }, { status: 429 });

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
  const parsed = bookingSchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ ok: false, error: "invalid", fields: fieldErrors(parsed.error) }, { status: 422 });

  const b = parsed.data;
  if (b.website) return NextResponse.json({ ok: true }); // honeypot filled: pretend success, store nothing

  const configured = Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
  if (!configured) {
    if (process.env.NODE_ENV === "production") return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
    console.log("[booking:dev] request received (not saved). Personal details not logged.");
    return NextResponse.json({ ok: true, mode: "dev" });
  }

  try {
    await saveToSupabase(b);
  } catch (e) {
    console.error("[booking] save failed", (e as Error).message);
    return NextResponse.json({ ok: false, error: "save_failed" }, { status: 502 });
  }
  try {
    await emailClinic(b);
  } catch (e) {
    // Booking is saved; a failed alert must not lose it.
    console.error("[booking] alert failed", (e as Error).message);
  }
  return NextResponse.json({ ok: true, mode: "saved" });
}
