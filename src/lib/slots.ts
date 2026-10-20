import availability from "../../content/availability.json";
import { SITE } from "./site";
import type { Day, Slot, Timings } from "./openNow";

export type SlotDay = { date: string; label: Date; slots: string[] };

const JS_DAY: Day[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const pad = (n: number) => String(n).padStart(2, "0");
const toMin = (s: string) => Number(s.slice(0, 2)) * 60 + Number(s.slice(3, 5));
const fromMin = (m: number) => `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;

/** Current date and minutes in India time, whatever the visitor's own time zone. */
export function istNow(now = new Date()) {
  const p = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(now);
  const g = (t: string) => p.find((x) => x.type === t)?.value ?? "0";
  return { y: Number(g("year")), m: Number(g("month")), d: Number(g("day")), mins: (Number(g("hour")) % 24) * 60 + Number(g("minute")) };
}

/** Open request slots for the next days: clinic hours, minus blocked dates, minus slots too soon. Requests only; the clinic confirms. */
export function getSlotDays(now = new Date()): SlotDay[] {
  const timings = SITE.timings as Timings | null;
  if (!timings) return [];
  const a = availability;
  const t = istNow(now);
  const out: SlotDay[] = [];
  for (let i = 0; i < a.bookAheadDays; i++) {
    const dt = new Date(Date.UTC(t.y, t.m - 1, t.d + i));
    const date = `${dt.getUTCFullYear()}-${pad(dt.getUTCMonth() + 1)}-${pad(dt.getUTCDate())}`;
    if ((a.blockedDates as string[]).includes(date)) continue;
    const ranges: Slot[] = timings[JS_DAY[dt.getUTCDay()]] ?? [];
    const slots: string[] = [];
    for (const [from, to] of ranges) {
      for (let m = toMin(from); m + a.slotMinutes <= toMin(to); m += a.slotMinutes) {
        if (i === 0 && m < t.mins + a.minLeadMinutes) continue;
        slots.push(fromMin(m));
      }
    }
    if (slots.length) out.push({ date, label: dt, slots });
  }
  return out;
}

export function nextSlot(now = new Date()): { date: string; time: string; today: boolean } | null {
  const d = getSlotDays(now)[0];
  if (!d) return null;
  return { date: d.date, time: d.slots[0], today: d.date === getSlotDays(now)[0]?.date && d.label.getUTCDate() === istNow(now).d };
}

export const SLOT_MINUTES = availability.slotMinutes;
