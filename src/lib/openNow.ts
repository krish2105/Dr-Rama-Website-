/**
 * Clinic hours helpers. Times are 24h "HH:MM" in Asia/Kolkata (content/site.json "timings").
 * A day with no entry (or []) is closed that day.
 */
export type Day = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
export type Slot = [string, string];
export type Timings = Partial<Record<Day, Slot[]>>;

export const DAYS: Day[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const JS_DAY: Day[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const toMin = (s: string) => Number(s.slice(0, 2)) * 60 + Number(s.slice(3, 5));

export type Status =
  | { open: true; closesAt: string }
  | { open: false; opensAt: string; tomorrow: boolean };

function istParts(now: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const idx = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"].indexOf(get("weekday").slice(0, 3).toLowerCase());
  return { dayIdx: idx, mins: (Number(get("hour")) % 24) * 60 + Number(get("minute")) };
}

export function getStatus(timings: Timings | null, now = new Date()): Status | null {
  if (!timings) return null;
  const { dayIdx, mins } = istParts(now);
  for (const [a, b] of timings[JS_DAY[dayIdx]] ?? []) if (mins >= toMin(a) && mins < toMin(b)) return { open: true, closesAt: b };
  const later = (timings[JS_DAY[dayIdx]] ?? []).find(([a]) => toMin(a) > mins);
  if (later) return { open: false, opensAt: later[0], tomorrow: false };
  for (let i = 1; i <= 7; i++) {
    const slots = timings[JS_DAY[(dayIdx + i) % 7]] ?? [];
    if (slots.length) return { open: false, opensAt: slots[0][0], tomorrow: i === 1 };
  }
  return null;
}

/** "10:30" -> "10:30 am" (en) or "सुबह 10:30" (hi). */
export function fmtTime(t: string, locale: string): string {
  const h = Number(t.slice(0, 2));
  const m = t.slice(3, 5);
  const h12 = h % 12 === 0 ? 12 : h % 12;
  if (locale === "hi") {
    const period = h < 12 ? "सुबह" : h < 16 ? "दोपहर" : h < 19 ? "शाम" : "रात";
    return `${period} ${h12}:${m} बजे`;
  }
  return `${h12}:${m} ${h < 12 ? "am" : "pm"}`;
}

/** Group consecutive days that share the same slots, e.g. Mon to Sat / Sun. */
export function groupHours(timings: Timings): { from: Day; to: Day; slots: Slot[] }[] {
  const out: { from: Day; to: Day; slots: Slot[] }[] = [];
  for (const d of DAYS) {
    const slots = timings[d] ?? [];
    const last = out[out.length - 1];
    if (last && JSON.stringify(last.slots) === JSON.stringify(slots)) last.to = d;
    else out.push({ from: d, to: d, slots });
  }
  return out.filter((g) => g.slots.length);
}
