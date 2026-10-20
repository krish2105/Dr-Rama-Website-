"use client";

import { useSyncExternalStore } from "react";
import { useLocale, useTranslations } from "next-intl";
import { fmtTime, getStatus, type Timings } from "@/lib/openNow";

const subscribe = (cb: () => void) => {
  const id = setInterval(cb, 30_000);
  return () => clearInterval(id);
};
const minuteNow = () => Math.floor(Date.now() / 60_000);

/** Live open/closed label. Renders nothing on the server so the static page never shows a stale state. */
export function OpenNow({ timings, className = "" }: { timings: Timings | null; className?: string }) {
  const t = useTranslations("hours");
  const locale = useLocale();
  const minute = useSyncExternalStore(subscribe, minuteNow, () => 0);
  if (!minute) return <span className={`inline-block min-h-[2.25rem] ${className}`} aria-hidden="true" />;
  const s = getStatus(timings, new Date(minute * 60_000));
  if (!s) return null;
  const detail = s.open
    ? t("closesAt", { time: fmtTime(s.closesAt, locale) })
    : s.tomorrow
      ? t("opensTomorrow", { time: fmtTime(s.opensAt, locale) })
      : t("opensAt", { time: fmtTime(s.opensAt, locale) });
  return (
    <span role="status" className={`inline-flex items-center gap-2 rounded-full bg-soft px-4 py-2 text-sm font-semibold text-ink ${className}`}>
      <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${s.open ? "bg-[#2e7d4f]" : "bg-accent"}`} />
      {s.open ? t("open") : t("closed")} · <span className="font-normal text-muted">{detail}</span>
    </span>
  );
}
