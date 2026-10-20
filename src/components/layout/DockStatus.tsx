"use client";

import { useSyncExternalStore } from "react";
import { useLocale, useTranslations } from "next-intl";
import { fmtTime, getStatus, type Timings } from "@/lib/openNow";
import { nextSlot } from "@/lib/slots";
import { SITE } from "@/lib/site";

const subscribe = (cb: () => void) => { const id = setInterval(cb, 30_000); return () => clearInterval(id); };
const minuteNow = () => Math.floor(Date.now() / 60_000);

/** Small chip above the mobile dock: open now or when it opens, and the next request slot. */
export function DockStatus() {
  const t = useTranslations("dock");
  const h = useTranslations("hours");
  const locale = useLocale();
  const minute = useSyncExternalStore(subscribe, minuteNow, () => 0);
  if (!minute) return null;
  const now = new Date(minute * 60_000);
  const s = getStatus(SITE.timings as Timings | null, now);
  if (!s) return null;
  const slot = nextSlot(now);
  const status = s.open ? `${h("open")} · ${h("closesAt", { time: fmtTime(s.closesAt, locale) })}` : `${h("closed")} · ${s.tomorrow ? h("opensTomorrow", { time: fmtTime(s.opensAt, locale) }) : h("opensAt", { time: fmtTime(s.opensAt, locale) })}`;
  return (
    <div className="mx-auto mb-2 flex max-w-md flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-full bg-surface/95 px-4 py-1.5 text-xs shadow-[var(--shadow)] ring-1 ring-line">
      <span className="inline-flex items-center gap-1.5 font-medium text-ink">
        <span aria-hidden="true" className={`pulse-dot h-2 w-2 rounded-full ${s.open ? "bg-[#2e7d4f]" : "bg-accent"}`} />
        {status}
      </span>
      {slot ? <span className="text-muted">{t("nextSlot")}: {fmtTime(slot.time, locale)}</span> : null}
    </div>
  );
}
