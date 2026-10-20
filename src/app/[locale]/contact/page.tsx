import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMeta } from "@/lib/meta";
import { CaseHead } from "@/components/ui/CaseHead";
import { DevTodo } from "@/components/ui/DevTodo";
import { ExternalButton, ButtonLink } from "@/components/ui/Button";
import { SITE, telHref, waHref, mapsDirectionsHref, mapsEmbedUrl } from "@/lib/site";
import type { Timings } from "@/lib/openNow";
import { Icon, IconBadge } from "@/components/ui/Icon";
import { feeLine } from "@/components/ui/FeeNote";
import { OpenNow } from "@/components/sections/OpenNow";
import { HoursList } from "@/components/sections/HoursList";
import { PageBackdrop } from "@/components/ui/PageBackdrop";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return pageMeta(locale, "/contact", t("title"));
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });
  const c = await getTranslations({ locale, namespace: "common" });
  const h = await getTranslations({ locale, namespace: "hours" });
  const fees = await getTranslations({ locale, namespace: "fees" });
  const fee = await feeLine(locale);
  const lines = locale === "hi" ? SITE.address.linesHi : SITE.address.lines;
  const timings = SITE.timings as Timings | null;
  return (
    <PageBackdrop>
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 md:py-14">
      <CaseHead as="h1" title={t("title")} />
      <p className="mt-6 text-lg text-muted">{t("lead")}</p>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <div className="card p-6">
            <div className="flex items-center gap-3"><IconBadge name="pin" /><p className="t-eyebrow">{c("address")}</p></div>
            <address className="mt-2 text-lg not-italic">{lines.map((l) => <span key={l} className="block">{l}</span>)}</address>
            <ExternalButton href={mapsDirectionsHref()} target="_blank" rel="noopener noreferrer" variant="secondary" className="mt-4">{c("directions")}</ExternalButton>
          </div>
          <div className="card p-6">
            <div className="flex items-center gap-3"><IconBadge name="phone" /><p className="t-eyebrow">{c("phone")}</p></div>
            <p className="mt-2 text-lg">{SITE.phone.display}</p>
            <p className="mt-1 text-sm text-muted">{t("landline")}: <a className="underline" href={`tel:${SITE.landline.e164}`}>{SITE.landline.display}</a></p>
            <div className="mt-4 flex flex-wrap gap-3">
              <ExternalButton href={telHref}>{c("call")}</ExternalButton>
              <ExternalButton href={waHref(c("whatsappPrefill"))} target="_blank" rel="noopener noreferrer" variant="secondary">{c("whatsapp")}</ExternalButton>
            </div>
            <p className="t-eyebrow mt-6">{t("emailLabel")}</p>
            <a className="mt-1 inline-flex min-h-12 items-center text-lg text-primary underline" href={`mailto:${SITE.email.value}`}>{SITE.email.value}</a>
          </div>
          <div className="card p-6">
            <div className="flex items-center gap-3"><IconBadge name="clock" /><p className="t-eyebrow">{t("hours")}</p></div>
            {timings ? (
              <div className="mt-3 space-y-4">
                <OpenNow timings={timings} />
                <HoursList timings={timings} />
                <p className="text-sm text-muted">{h("byAppointment")}</p>
              </div>
            ) : <div className="mt-3"><DevTodo>{t("hoursTodo")}</DevTodo></div>}
          </div>
          {fee ? (
            <div className="card p-6">
              <div className="flex items-center gap-3"><IconBadge name="rupee" /><p className="t-eyebrow">{fees("title")}</p></div>
              <dl className="mt-3 space-y-1 text-lg">
                <div className="flex flex-wrap gap-x-2"><dt className="text-muted">{fees("fee")}:</dt><dd className="font-semibold text-ink">{SITE.fees.consultation.display}</dd></div>
              </dl>
              <ul className="mt-3 flex flex-wrap gap-2" aria-label={fees("pay")}>
                <li className="chip"><Icon name="scan" className="h-4 w-4 text-primary" />{fees("upi")}</li>
                <li className="chip"><Icon name="cash" className="h-4 w-4 text-primary" />{fees("cash")}</li>
              </ul>
            </div>
          ) : null}
          <ButtonLink href="/book">{c("book")}</ButtonLink>
        </div>
        <div>
          <p className="t-eyebrow mb-2">{t("map")}</p>
          {mapsEmbedUrl ? (
            <iframe
              title={t("map")}
              src={mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="aspect-[4/3] w-full rounded-2xl border border-line"
            />
          ) : <DevTodo>{t("mapTodo")}</DevTodo>}
        </div>
      </div>
    </div>
    </PageBackdrop>
  );
}
