/** Builds an .ics calendar file for an appointment REQUEST (India time converted to UTC). */
export function buildIcs(opts: { date: string; time: string; minutes: number; summary: string; location: string; description: string }): string {
  const [y, m, d] = opts.date.split("-").map(Number);
  const [hh, mm] = opts.time.split(":").map(Number);
  const start = new Date(Date.UTC(y, m - 1, d, hh, mm) - (5 * 60 + 30) * 60_000);
  const end = new Date(start.getTime() + opts.minutes * 60_000);
  const f = (x: Date) => x.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const esc = (t: string) => t.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
  return [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Raajesh Homeo Home//Booking//EN", "CALSCALE:GREGORIAN", "METHOD:PUBLISH", "BEGIN:VEVENT",
    `UID:${f(start)}-${Math.random().toString(36).slice(2, 10)}@rajesh-homeo-home`, `DTSTAMP:${f(new Date())}`, `DTSTART:${f(start)}`, `DTEND:${f(end)}`,
    `SUMMARY:${esc(opts.summary)}`, `LOCATION:${esc(opts.location)}`, `DESCRIPTION:${esc(opts.description)}`, "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
}
