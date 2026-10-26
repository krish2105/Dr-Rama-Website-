import { useLocale, useTranslations } from "next-intl";
import { fmtTime, groupHours, type Timings } from "@/lib/openNow";

export function HoursList({ timings }: { timings: Timings }) {
  const t = useTranslations("hours");
  const locale = useLocale();
  // Parts of the day are named in English only; Hindi times already carry सुबह / दोपहर / शाम.
  const part = (from: string) => (locale === "hi" ? "" : ` (${t(from < "12:00" ? "morning" : from < "17:00" ? "afternoon" : "evening")})`);
  return (
    <dl className="space-y-3">
      {groupHours(timings).map((g) => (
        <div key={g.from + g.to}>
          <dt className="font-semibold text-ink">
            {g.from === g.to ? t(`days.${g.from}`) : `${t(`days.${g.from}`)} ${t("to")} ${t(`days.${g.to}`)}`}
          </dt>
          <dd className="text-muted">
            {g.slots.map(([a, b]) => `${fmtTime(a, locale)} ${t("to")} ${fmtTime(b, locale)}${part(a)}`).join(` ${t("and")} `)}
            {g.to === "sun" && g.slots.length === 1 && g.slots[0][1] <= "14:30" ? ` · ${t("eveningOff")}` : ""}
          </dd>
        </div>
      ))}
    </dl>
  );
}
