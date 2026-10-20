import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMeta } from "@/lib/meta";
import { CaseHead } from "@/components/ui/CaseHead";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { DevTodo } from "@/components/ui/DevTodo";
import { ButtonLink, ExternalButton } from "@/components/ui/Button";
import { SITE, telHref, waHref, mapsDirectionsHref, mapsEmbedUrl } from "@/lib/site";
import { OpenNow } from "@/components/sections/OpenNow";
import { HoursList } from "@/components/sections/HoursList";
import type { Timings } from "@/lib/openNow";
import { PageBackdrop } from "@/components/ui/PageBackdrop";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "reach" });
  return pageMeta(locale, "/how-to-reach", t("title"), { description: t("lead") });
}

export default async function ReachPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "reach" });
  const c = await getTranslations({ locale, namespace: "common" });
  const h = await getTranslations({ locale, namespace: "hours" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const lines = locale === "hi" ? SITE.address.linesHi : SITE.address.lines;
  const timings = SITE.timings as Timings | null;
  return (
    <PageBackdrop>
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 md:py-14">
      <JsonLd data={breadcrumbSchema(locale, [{ name: nav("home"), route: "" }, { name: t("title"), route: "/how-to-reach" }])} />
      <CaseHead as="h1" title={t("title")} />
      <p className="t-lead mt-5 max-w-2xl">{t("lead")}</p>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <section className="card p-6" aria-labelledby="steps-h">
            <h2 id="steps-h" className="t-eyebrow">{t("stepsTitle")}</h2>
            <ol className="mt-4 space-y-4">
              {(["s1", "s2", "s3", "s4"] as const).map((k, i) => (
                <li key={k} className="flex gap-4">
                  <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary font-semibold text-onprimary">{i + 1}</span>
                  <span className="pt-1 text-lg">{t(k, { phone: SITE.phone.display })}</span>
                </li>
              ))}
            </ol>
          </section>
          <section className="card p-6">
            <h2 className="t-eyebrow">{t("addressTitle")}</h2>
            <address className="mt-2 text-lg not-italic">{lines.map((l) => <span key={l} className="block">{l}</span>)}</address>
            <div className="mt-4 flex flex-wrap gap-3">
              <ExternalButton href={mapsDirectionsHref()} target="_blank" rel="noopener noreferrer">{c("directions")}</ExternalButton>
              <ExternalButton href={telHref} variant="secondary">{c("call")}</ExternalButton>
              <ExternalButton href={waHref(c("whatsappPrefill"))} target="_blank" rel="noopener noreferrer" variant="secondary">{c("whatsapp")}</ExternalButton>
            </div>
          </section>
          {timings ? (
            <section className="card space-y-4 p-6">
              <OpenNow timings={timings} />
              <HoursList timings={timings} />
              <p className="text-sm text-muted">{h("byAppointment")}</p>
            </section>
          ) : null}
          <DevTodo>{t("todoLandmark")}</DevTodo>
          <DevTodo>{t("todoEntrance")}</DevTodo>
          <ButtonLink href="/book">{c("book")}</ButtonLink>
        </div>
        <div>
          <p className="t-eyebrow mb-2">{t("mapTitle")}</p>
          {mapsEmbedUrl ? (
            <iframe title={t("mapTitle")} src={mapsEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="aspect-[4/3] w-full rounded-2xl border border-line" />
          ) : <DevTodo>{t("todoMap")}</DevTodo>}
        </div>
      </div>
    </div>
    </PageBackdrop>
  );
}
