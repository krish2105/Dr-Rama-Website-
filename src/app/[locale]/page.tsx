import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SITE, telHref, waHref, mapsDirectionsHref, isDev } from "@/lib/site";
import { getAbout } from "@/lib/content";
import { Rosette } from "@/components/ui/Motif";
import { CaseHead } from "@/components/ui/CaseHead";
import { ButtonLink, ExternalButton } from "@/components/ui/Button";
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

  const action = "flex min-h-[4.25rem] items-center justify-between gap-4 rounded-full px-6 py-2 text-start transition-transform hover:-translate-y-0.5";

  return (
    <>
      {/* Hero: text + floating action card, pottery ring with portrait */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-12 pt-6 sm:px-6 md:grid-cols-[1.05fr_0.95fr] md:gap-8 md:pb-20 md:pt-12">
          <div className="order-2 md:order-1">
            <p className="fade-in marginalia">{t("eyebrow")}</p>
            <h1 className="mt-3 max-w-xl text-[2.35rem] text-ink md:text-[3.6rem]">{t("title")}</h1>
            <p className="mt-2 text-xl font-semibold text-primary md:text-2xl">{t("titleSub")}</p>
            <p className="mt-5 max-w-lg text-lg text-muted">{t("lead")}</p>
            {timings ? <div className="mt-4"><OpenNow timings={timings} /></div> : null}

            <div className="float-card fade-in d2 mt-8 max-w-xl space-y-2.5 p-2.5" role="group" aria-label={t("actionsLabel")}>
              <a href={telHref} data-evt="click_call" className={`${action} bg-primary text-onprimary`}>
                <span><span className="block font-display text-lg font-bold">{t("actionCall")}</span><span className="text-sm opacity-90">{SITE.phone.display}</span></span>
                <span aria-hidden="true">→</span>
              </a>
              <div className="grid gap-2.5 sm:grid-cols-2">
                <a href={waHref(c("whatsappPrefill"))} data-evt="click_whatsapp" target="_blank" rel="noopener noreferrer" className={`${action} bg-soft text-ink`}>
                  <span><span className="block font-display text-base font-bold">{t("actionWhatsapp")}</span><span className="text-sm text-muted">{t("actionWhatsappNote")}</span></span>
                </a>
                <Link href="/book" data-evt="click_book" className={`${action} bg-soft text-ink`}>
                  <span><span className="block font-display text-base font-bold">{t("actionBook")}</span><span className="text-sm text-muted">{t("actionBookNote")}</span></span>
                </Link>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2"><HeroVisual /></div>
        </div>
      </section>

      {/* Trust strip: floating stat cards */}
      <section aria-labelledby="cred" className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 id="cred" className="sr-only">{t("credTitle")}</h2>
        <dl className="grid grid-cols-3 gap-2.5 sm:gap-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="float-card bg-soft/60 p-3 text-center sm:p-6">
              <dt className="font-display text-3xl font-bold text-primary sm:text-5xl">{t(`cred${n}Big`)}</dt>
              <dd className="mt-1 text-[0.8rem] leading-snug text-muted sm:mt-2 sm:text-base">{t(`cred${n}`)}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* RIICO service record */}
      <section aria-labelledby="riico" className="mx-auto mt-20 max-w-6xl px-4 sm:px-6">
        <div className="pottery-dots relative overflow-hidden rounded-[2.5rem] bg-primary px-6 py-10 text-onprimary shadow-[var(--shadow-float)] sm:px-12 sm:py-14">
          <Rosette className="pointer-events-none absolute -bottom-20 -start-20 h-72 w-72 opacity-[0.12]" />
          <div className="relative grid items-center gap-8 md:grid-cols-[auto_1fr]">
            <div className="text-center md:text-start">
              <p className="font-display text-[5.5rem] font-bold leading-none md:text-[7rem]">{t("riicoNum")}</p>
              <p className="mt-1 text-lg font-semibold">{t("riicoYears")}</p>
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.14em] opacity-85">{t("riicoKicker")}</p>
              <h2 id="riico" className="mt-2 text-[1.7rem] md:text-[2.2rem]">{t("riicoTitle")}</h2>
              <p className="mt-3 text-lg">{t("riicoPeriod")} · {t("riicoRole")}</p>
              <p className="mt-2 text-sm opacity-90">{t("riicoOrg")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How she practises: wording from her CV only */}
      <section aria-labelledby="practice" className="mx-auto mt-24 max-w-6xl px-4 sm:px-6">
        <CaseHead id="practice" eyebrow={t("practiceMargin")} title={t("practiceTitle")} />
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <li key={n} className="specimen p-6 pt-8" data-label={`${n}`}>
              <p className="text-lg">{t(`practice${n}`)}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* About preview with qualifications */}
      <section aria-labelledby="about" className="mx-auto mt-24 max-w-6xl px-4 sm:px-6">
        <div className="float-card relative overflow-hidden p-6 sm:p-10">
          <Rosette className="pointer-events-none absolute -end-12 -top-12 h-56 w-56 text-primary opacity-[0.08]" />
          <CaseHead id="about" title={t("aboutTitle")} />
          <p className="mt-6 max-w-2xl text-lg">{t("aboutBody")}</p>
          <ul className="mt-6 flex flex-wrap gap-2.5" aria-label={t("qualTitle")}>
            {about.qualifications.map((q) => (
              <li key={q.title} className="rounded-full bg-soft px-4 py-2 text-[0.95rem] font-semibold text-primary">
                {q.title} <span className="font-normal text-muted">· {q.when}</span>
              </li>
            ))}
          </ul>
          <ButtonLink href="/about" variant="secondary" className="mt-8">{t("aboutLink")}</ButtonLink>
        </div>
      </section>

      {/* Gallery: real photos only */}
      {hasPhotos() || isDev ? (
        <section aria-labelledby="gallery" className="mx-auto mt-24 max-w-6xl px-4 sm:px-6">
          <CaseHead id="gallery" eyebrow={t("galleryNote")} title={t("galleryTitle")} />
          <div className="mt-10"><Gallery limit={5} /></div>
        </section>
      ) : null}

      {/* Visit */}
      <section aria-labelledby="visit" className="mx-auto mt-24 max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <CaseHead id="visit" title={t("visitTitle")} />
            <p className="mt-6 text-muted">{t("visitBody")}</p>
            <address className="mt-4 text-lg not-italic">{lines.map((x) => <span key={x} className="block">{x}</span>)}</address>
            <div className="mt-6 flex flex-wrap gap-3">
              <ExternalButton href={mapsDirectionsHref()} target="_blank" rel="noopener noreferrer" variant="secondary">{c("directions")}</ExternalButton>
              <ExternalButton href={telHref} variant="ghost">{SITE.phone.display}</ExternalButton>
            </div>
          </div>
          <div className="space-y-3">
            {timings ? (
              <div className="float-card p-6">
                <p className="marginalia mb-3">{t("visitHours")}</p>
                <HoursList timings={timings} />
              </div>
            ) : <DevTodo>{t("timingsMissing")} Timings and weekly off day are in content/TODO.md.</DevTodo>}
            {!SITE.mapsUrl ? <DevTodo>{t("visitTodoMap")} Directions button uses a search link for now.</DevTodo> : null}
          </div>
        </div>
      </section>

      {/* Book CTA */}
      <section className="mx-auto mt-24 max-w-6xl px-4 sm:px-6">
        <div className="float-card relative overflow-hidden bg-soft px-6 py-12 text-center sm:px-12">
          <Rosette className="pointer-events-none absolute -start-10 -top-10 h-44 w-44 text-primary opacity-[0.1]" />
          <Rosette className="pointer-events-none absolute -bottom-12 -end-10 h-52 w-52 text-primary opacity-[0.1]" />
          <h2 className="relative text-[1.9rem] text-ink md:text-[2.4rem]">{t("ctaTitle")}</h2>
          <p className="relative mx-auto mt-3 max-w-xl text-muted">{t("ctaBody")}</p>
          <ButtonLink href="/book" className="relative mt-7">{c("book")}</ButtonLink>
        </div>
      </section>
    </>
  );
}
