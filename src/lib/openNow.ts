/**
 * Open-now label. Needs real timings from the doctor (content/TODO.md).
 * Expected shape in content/site.json once supplied:
 *   "timings": { "mon": [["10:00","13:00"],["17:00","19:00"]], "tue": [...], ... }   (24h, Asia/Kolkata)
 * Days with no entry (or []) are the weekly off day.
 */
export type Timings = Partial<Record<"sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat", [string, string][]>>;

export function isOpenNow(timings: Timings | null, now = new Date()): boolean | null {
  if (!timings) return null; // unknown: show nothing
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = get("weekday").slice(0, 3).toLowerCase() as keyof Timings;
  const mins = Number(get("hour")) * 60 + Number(get("minute"));
  const toMin = (s: string) => Number(s.slice(0, 2)) * 60 + Number(s.slice(3, 5));
  return (timings[day] ?? []).some(([a, b]) => mins >= toMin(a) && mins < toMin(b));
}
