import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SITE, telHref, waHref, mapsDirectionsHref, isDev } from "@/lib/site";
import { getAbout } from "@/lib/content";
import { Rosette } from "@/components/ui/Motif";
import { CaseHead } from "@/components/ui/CaseHead";
import { ButtonLink, ExternalButton, buttonClass } from "@/components/ui/Button";
import { DevTodo } from "@/components/ui/DevTodo";
import { HeroVisual } from "@/components/sections/Portrait";
import { Gallery, hasPhotos } from "@/components/sections/ClinicPhoto";
import { OpenNow } from "@/components/sections/OpenNow";
import { HoursList } from "@/components/sections/HoursList";
import type { Timings } from "@/lib/openNow";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home" });
  const c = await getTranslations({ locale, namespace: "common" });
  const about = getAbout(locale);
  const timings = SITE.timings as Timings | null;
  const lines = locale === "hi" ? SITE.address.linesHi : SITE.address.lines;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-x-clip">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-14 pt-6 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-20 lg:pt-12">
          <div>
            <p className="fade-in t-eyebrow">{t("eyebrow")}</p>
            <h1 className="t-h1 mt-3 max-w-xl">{t("title")}</h1>
            <p className="mt-3 text-lg font-medium text-primary">{t("titleSub")}</p>
            <p className="t-lead mt-4 max-w-lg">{t("lead")}</p>

            <div className="mt-7 grid gap-3 sm:flex sm:flex-wrap" role="group" aria-label={t("actionsLabel")}>
              <a href={telHref} data-evt="click_call" className={buttonClass("primary", "w-full sm:w-auto")}>
                {c("call")} · {SITE.phone.display}
              </a>
              <div className="grid grid-cols-2 gap-3 sm:contents">
                <a href={waHref(c("whatsappPrefill"))} data-evt="click_whatsapp" target="_blank" rel="noopener noreferrer" className={buttonClass("secondary")}>
                  {c("whatsapp")}
                </a>
                <Link href="/book" data-evt="click_book" className={buttonClass("secondary")}>
                  {c("bookShort")}
                </Link>
              </div>
            </div>
            {timings ? <div className="mt-5"><OpenNow timings={timings} /></div> : null}

            <h2 className="sr-only">{t("credTitle")}</h2>
            <dl className="mt-9 grid max-w-xl grid-cols-3 divide-x divide-line border-t border-line pt-5">
              {[1, 2, 3].map((n) => (
                <div key={n} className="px-3 first:ps-0 sm:px-5">
                  <dt className="font-display text-2xl font-semibold text-primary sm:text-3xl">{t(`cred${n}Big`)}</dt>
                  <dd className="mt-1 text-xs leading-snug text-muted sm:text-[0.8125rem]">{t(`cred${n}`)}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="pb-4"><HeroVisual /></div>
        </div>
      </section>

      {/* RIICO service record */}
      <section aria-labelledby="riico" className="mx-auto mt-4 max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-8 text-onprimary sm:px-10 sm:py-10">
          <Rosette className="pointer-events-none absolute -bottom-16 -end-10 h-64 w-64 opacity-[0.1]" />
          <div className="relative grid items-center gap-6 md:grid-cols-[auto_1fr] md:gap-12">
            <div>
              <p className="font-display text-6xl font-medium leading-none md:text-7xl">{t("riicoNum")}</p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.1em] opacity-90">{t("riicoYears")}</p>
            </div>
            <div className="md:border-s md:border-white/25 md:ps-12">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] opacity-80">{t("riicoKicker")}</p>
              <h2 id="riico" className="mt-2 text-2xl md:text-3xl">{t("riicoTitle")}</h2>
              <p className="mt-2 text-base">{t("riicoPeriod")} · {t("riicoRole")}</p>
              <p className="mt-1 text-sm opacity-85">{t("riicoOrg")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How she practises: wording from her CV only */}
      <section aria-labelledby="practice" className="mx-auto mt-20 max-w-6xl px-4 sm:px-6">
        <CaseHead id="practice" eyebrow={t("practiceMargin")} title={t("practiceTitle")} />
        <ol className="mt-9 grid gap-5 md:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <li key={n} className="specimen p-5 pt-7" data-label={`${n}`}>
              <p className="text-base">{t(`practice${n}`)}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* About preview with qualifications */}
      <section aria-labelledby="about" className="mx-auto mt-20 max-w-6xl px-4 sm:px-6">
        <div className="float-card relative overflow-hidden p-6 sm:p-9">
          <Rosette className="pointer-events-none absolute -end-12 -top-12 h-56 w-56 text-primary opacity-[0.08]" />
          <CaseHead id="about" title={t("aboutTitle")} />
          <p className="mt-5 max-w-2xl text-base">{t("aboutBody")}</p>
          <ul className="mt-6 flex flex-wrap gap-2.5" aria-label={t("qualTitle")}>
            {about.qualifications.map((q) => (
              <li key={q.title} className="rounded-lg bg-soft px-3 py-1.5 text-sm font-semibold text-primary">
                {q.title} <span className="font-normal text-muted">· {q.when}</span>
              </li>
            ))}
          </ul>
          <ButtonLink href="/about" variant="secondary" className="mt-8">{t("aboutLink")}</ButtonLink>
        </div>
      </section>

      {/* Gallery: real photos only */}
      {hasPhotos() || isDev ? (
        <section aria-labelledby="gallery" className="mx-auto mt-20 max-w-6xl px-4 sm:px-6">
          <CaseHead id="gallery" eyebrow={t("galleryNote")} title={t("galleryTitle")} />
          <div className="mt-10"><Gallery limit={5} /></div>
        </section>
      ) : null}

      {/* Visit */}
      <section aria-labelledby="visit" className="mx-auto mt-20 max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <CaseHead id="visit" title={t("visitTitle")} />
            <p className="mt-6 text-muted">{t("visitBody")}</p>
            <address className="mt-4 text-base not-italic">{lines.map((x) => <span key={x} className="block">{x}</span>)}</address>
            <div className="mt-6 flex flex-wrap gap-3">
              <ExternalButton href={mapsDirectionsHref()} target="_blank" rel="noopener noreferrer" variant="secondary">{c("directions")}</ExternalButton>
              <ExternalButton href={telHref} variant="ghost">{SITE.phone.display}</ExternalButton>
            </div>
          </div>
          <div className="space-y-3">
            {timings ? (
              <div className="float-card p-6">
                <p className="t-eyebrow mb-3">{t("visitHours")}</p>
                <HoursList timings={timings} />
              </div>
            ) : <DevTodo>{t("timingsMissing")} Timings and weekly off day are in content/TODO.md.</DevTodo>}
            {!SITE.mapsUrl ? <DevTodo>{t("visitTodoMap")} Directions button uses a search link for now.</DevTodo> : null}
          </div>
        </div>
      </section>

      {/* Book CTA */}
      <section className="mx-auto mt-20 max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl bg-soft px-6 py-10 text-center sm:px-12 sm:py-12">
          <Rosette className="pointer-events-none absolute -start-10 -top-10 h-44 w-44 text-primary opacity-[0.1]" />
          <Rosette className="pointer-events-none absolute -bottom-12 -end-10 h-52 w-52 text-primary opacity-[0.1]" />
          <h2 className="t-h2 relative">{t("ctaTitle")}</h2>
          <p className="t-lead relative mx-auto mt-3 max-w-xl">{t("ctaBody")}</p>
          <ButtonLink href="/book" className="relative mt-7">{c("book")}</ButtonLink>
        </div>
      </section>
    </>
  );
}
