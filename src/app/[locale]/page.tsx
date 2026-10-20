import { useLocale, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { Link } from "@/i18n/navigation";
import { SITE, telHref, waHref, mapsDirectionsHref } from "@/lib/site";
import { Sprig } from "@/components/ui/Sprig";
import { CaseHead } from "@/components/ui/CaseHead";
import { ButtonLink, ExternalButton } from "@/components/ui/Button";
import { DevTodo } from "@/components/ui/DevTodo";
import { Gallery, hasPhotos } from "@/components/sections/ClinicPhoto";
import { isDev } from "@/lib/site";

export default function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = use(params);
  setRequestLocale(l);
  const t = useTranslations("home");
  const c = useTranslations("common");
  const locale = useLocale();
  const lines = locale === "hi" ? SITE.address.linesHi : SITE.address.lines;

  return (
    <>
      {/* Hero + 30-second action path */}
      <section className="relative overflow-hidden">
        <Sprig className="pointer-events-none absolute -right-6 top-6 hidden h-72 text-sage opacity-60 md:block" />
        <Sprig flip className="pointer-events-none absolute -left-10 bottom-0 hidden h-56 text-sage opacity-30 lg:block" />
        <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-10 sm:px-6 md:pt-16">
          <p className="marginalia text-base">{t("eyebrow")}</p>
          <h1 className="mt-3 max-w-3xl text-[2.15rem] font-semibold leading-[1.12] text-primary md:text-[3.4rem]">
            {t("title")}
            <span className="mt-2 block text-[1.2rem] font-normal text-wood md:text-[1.6rem]">{t("titleSub")}</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted">{t("lead")}</p>

          <div className="fade-in d3 mt-8 grid max-w-3xl gap-3 sm:grid-cols-3" role="group" aria-label={t("actionsLabel")}>
            <a href={telHref} data-evt="click_call" className="card group flex min-h-20 flex-col justify-center px-5 py-3 transition-transform hover:-translate-y-0.5">
              <span className="font-display text-lg font-semibold text-primary">{t("actionCall")}</span>
              <span className="text-sm text-muted">{SITE.phone.display}</span>
            </a>
            <a href={waHref(c("whatsappPrefill"))} data-evt="click_whatsapp" target="_blank" rel="noopener noreferrer" className="card flex min-h-20 flex-col justify-center px-5 py-3 transition-transform hover:-translate-y-0.5">
              <span className="font-display text-lg font-semibold text-primary">{t("actionWhatsapp")}</span>
              <span className="text-sm text-muted">{t("actionWhatsappNote")}</span>
            </a>
            <Link href="/book" data-evt="click_book" className="flex min-h-20 flex-col justify-center rounded-[14px] bg-primary px-5 py-3 text-onprimary shadow-[var(--shadow)] transition-transform hover:-translate-y-0.5">
              <span className="font-display text-lg font-semibold">{t("actionBook")}</span>
              <span className="text-sm opacity-85">{t("actionBookNote")}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section aria-labelledby="cred" className="mx-auto max-w-6xl px-4 sm:px-6">
        <CaseHead id="cred" title={t("credTitle")} />
        <dl className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="card p-5">
              <dt className="font-display text-4xl font-semibold text-primary">{t(`cred${n}Big`)}</dt>
              <dd className="mt-2 text-[0.95rem] leading-snug text-muted">{t(`cred${n}`)}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* How she practises: wording from her CV only */}
      <section aria-labelledby="practice" className="mx-auto mt-20 max-w-6xl px-4 sm:px-6">
        <div className="grid items-start gap-10 md:grid-cols-[1fr_1.1fr]">
          <div>
            <CaseHead id="practice" eyebrow={t("practiceMargin")} title={t("practiceTitle")} />
            <div className="wood-edge mt-8 max-w-xs" aria-hidden="true" />
          </div>
          <ol className="space-y-4">
            {[1, 2, 3].map((n) => (
              <li key={n} className="specimen flex gap-4 p-5" data-label={`№ ${n}`}>
                <span aria-hidden="true" className="mt-1 h-3 w-3 shrink-0 rounded-full bg-accent" />
                <p className="text-lg">{t(`practice${n}`)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* About preview */}
      <section aria-labelledby="about" className="mx-auto mt-20 max-w-6xl px-4 sm:px-6">
        <div className="card relative overflow-hidden p-6 sm:p-10">
          <Sprig className="pointer-events-none absolute -right-4 -top-2 h-52 text-sage opacity-30" />
          <CaseHead id="about" title={t("aboutTitle")} />
          <p className="mt-6 max-w-2xl text-lg">{t("aboutBody")}</p>
          <ButtonLink href="/about" variant="secondary" className="mt-6">{t("aboutLink")}</ButtonLink>
        </div>
      </section>

      {/* Gallery: real photos only */}
      {hasPhotos() || isDev ? (
        <section aria-labelledby="gallery" className="mx-auto mt-20 max-w-6xl px-4 sm:px-6">
          <CaseHead id="gallery" eyebrow={t("galleryNote")} title={t("galleryTitle")} />
          <div className="mt-8"><Gallery limit={3} /></div>
        </section>
      ) : null}

      {/* Visit */}
      <section aria-labelledby="visit" className="mx-auto mt-20 max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <CaseHead id="visit" title={t("visitTitle")} />
            <p className="mt-6 text-muted">{t("visitBody")}</p>
            <address className="mt-4 not-italic text-lg">
              {lines.map((x) => <span key={x} className="block">{x}</span>)}
            </address>
            <div className="mt-5 flex flex-wrap gap-3">
              <ExternalButton href={mapsDirectionsHref()} target="_blank" rel="noopener noreferrer" variant="secondary">{c("directions")}</ExternalButton>
              <ExternalButton href={telHref} variant="ghost">{SITE.phone.display}</ExternalButton>
            </div>
          </div>
          <div className="space-y-3">
            {!SITE.timings ? <DevTodo>{t("timingsMissing")} Timings and weekly off day are in content/TODO.md.</DevTodo> : null}
            {!SITE.mapsUrl ? <DevTodo>Google Maps embed needs the map link / place ID (content/TODO.md). Directions button uses a search link for now.</DevTodo> : null}
          </div>
        </div>
      </section>

      {/* Book CTA */}
      <section className="mx-auto mt-20 max-w-6xl px-4 sm:px-6">
        <div className="rounded-3xl bg-primary px-6 py-12 text-center text-onprimary sm:px-12">
          <h2 className="text-[1.75rem] font-semibold md:text-[2.2rem]">{t("ctaTitle")}</h2>
          <p className="mx-auto mt-3 max-w-xl opacity-90">{t("ctaBody")}</p>
          <Link href="/book" className="mt-7 inline-flex min-h-12 items-center rounded-full bg-onprimary px-8 font-semibold text-primary hover:brightness-95">
            {c("book")}
          </Link>
        </div>
      </section>
    </>
  );
}
