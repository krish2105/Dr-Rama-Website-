import { getTranslations } from "next-intl/server";
import { Icon, IconBadge } from "@/components/ui/Icon";
import { HoursList } from "@/components/sections/HoursList";
import { SITE } from "@/lib/site";
import type { Timings } from "@/lib/openNow";

/**
 * Booking details panel: fee and payment first (price up front), then what happens after a request, then hours and languages.
 * Only confirmed facts are shown; with no confirmed fee the fee band is left out.
 */
export async function FeePanel({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "fees" });
  const showFee = Boolean(SITE.fees?.confirmed);
  const showPay = Boolean(SITE.payment?.confirmed);
  const timings = SITE.timings as Timings | null;
  const methods = (SITE.payment?.methods ?? []) as string[];
  return (
    <section aria-labelledby="book-details" className="float-card mt-8 overflow-hidden">
      <h2 id="book-details" className="sr-only">{t("panelTitle")}</h2>
      {showFee ? (
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-b border-line bg-soft px-6 py-5">
          <div className="flex items-center gap-4">
            <IconBadge name="rupee" />
            <div>
              <p className="t-eyebrow">{t("fee")}</p>
              <p className="font-display text-3xl font-semibold leading-tight text-ink">{SITE.fees.consultation.display}</p>
            </div>
          </div>
          {showPay ? (
            <div>
              <p className="t-eyebrow mb-2">{t("pay")}</p>
              <ul className="flex flex-wrap gap-2">
                {methods.includes("upi") ? <li className="chip"><Icon name="scan" className="h-4 w-4 text-primary" />{t("upi")}</li> : null}
                {methods.includes("cash") ? <li className="chip"><Icon name="cash" className="h-4 w-4 text-primary" />{t("cash")}</li> : null}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}
      <div className="grid gap-8 px-6 py-6 md:grid-cols-2">
        <div>
          <h3 className="t-eyebrow">{t("nextTitle")}</h3>
          <ol className="mt-4 space-y-4">
            {(["next1", "next2", "next3"] as const).map((k, i) => (
              <li key={k} className="flex gap-3">
                <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-semibold text-onprimary">{i + 1}</span>
                <span className="pt-0.5">{t(k)}</span>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h3 className="t-eyebrow">{t("goodTitle")}</h3>
          <ul className="mt-4 space-y-4">
            <li className="flex gap-3">
              <Icon name="calendar" className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span>{t("byAppointment")}</span>
            </li>
            <li className="flex gap-3">
              <Icon name="globe" className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span>{t("languages")}</span>
            </li>
            <li className="flex gap-3">
              <Icon name="phone" className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span>{t("online")}</span>
            </li>
            {timings ? (
              <li className="flex gap-3">
                <Icon name="clock" className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div className="min-w-0 text-sm"><HoursList timings={timings} /></div>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </section>
  );
}
