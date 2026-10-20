import { useLocale, useTranslations } from "next-intl";
import { fmtTime, groupHours, type Timings } from "@/lib/openNow";

export function HoursList({ timings }: { timings: Timings }) {
  const t = useTranslations("hours");
  const locale = useLocale();
  return (
    <dl className="space-y-3">
      {groupHours(timings).map((g) => (
        <div key={g.from + g.to}>
          <dt className="font-semibold text-ink">
            {g.from === g.to ? t(`days.${g.from}`) : `${t(`days.${g.from}`)} ${t("to")} ${t(`days.${g.to}`)}`}
          </dt>
          <dd className="text-muted">{g.slots.map(([a, b]) => `${fmtTime(a, locale)} ${t("to")} ${fmtTime(b, locale)}`).join(` ${t("and")} `)}</dd>
        </div>
      ))}
    </dl>
  );
}
