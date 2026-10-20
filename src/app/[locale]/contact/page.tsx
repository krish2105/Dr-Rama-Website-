import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMeta } from "@/lib/meta";
import { CaseHead } from "@/components/ui/CaseHead";
import { DevTodo } from "@/components/ui/DevTodo";
import { ExternalButton, ButtonLink } from "@/components/ui/Button";
import { SITE, telHref, waHref, mapsDirectionsHref } from "@/lib/site";
import { isOpenNow, type Timings } from "@/lib/openNow";

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
  const lines = locale === "hi" ? SITE.address.linesHi : SITE.address.lines;
  const open = isOpenNow(SITE.timings as Timings | null);
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 md:py-14">
      <CaseHead as="h1" title={t("title")} />
      <p className="mt-6 text-lg text-muted">{t("lead")}</p>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <div className="card p-6">
            <p className="marginalia">{c("address")}</p>
            <address className="mt-2 text-lg not-italic">{lines.map((l) => <span key={l} className="block">{l}</span>)}</address>
            <ExternalButton href={mapsDirectionsHref()} target="_blank" rel="noopener noreferrer" variant="secondary" className="mt-4">{c("directions")}</ExternalButton>
          </div>
          <div className="card p-6">
            <p className="marginalia">{c("phone")}</p>
            <p className="mt-2 text-lg">{SITE.phone.display}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <ExternalButton href={telHref}>{c("call")}</ExternalButton>
              <ExternalButton href={waHref(c("whatsappPrefill"))} target="_blank" rel="noopener noreferrer" variant="secondary">{c("whatsapp")}</ExternalButton>
            </div>
            <p className="marginalia mt-6">{t("emailLabel")}</p>
            <a className="mt-1 inline-flex min-h-12 items-center text-lg text-primary underline" href={`mailto:${SITE.email.value}`}>{SITE.email.value}</a>
          </div>
          <div className="card p-6">
            <p className="marginalia">{t("hours")}</p>
            {open === null ? <div className="mt-3"><DevTodo>{t("hoursTodo")}</DevTodo></div> : (
              <p className="mt-2 text-lg font-semibold">{open ? t("openNow") : t("closedNow")}</p>
            )}
          </div>
          <ButtonLink href="/book">{c("book")}</ButtonLink>
        </div>
        <div>
          <p className="marginalia mb-2">{t("map")}</p>
          {SITE.mapsUrl ? (
            <iframe
              title={t("map")}
              src={SITE.mapsUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="aspect-[4/3] w-full rounded-2xl border border-line"
            />
          ) : <DevTodo>{t("mapTodo")}</DevTodo>}
        </div>
      </div>
    </div>
  );
}
