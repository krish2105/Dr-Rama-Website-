import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SITE, telHref, waHref, mapsDirectionsHref, mapsEmbedUrl, isDev } from "@/lib/site";
import { getAbout, getJson } from "@/lib/content";
import { Rosette } from "@/components/ui/Motif";
import { CaseHead } from "@/components/ui/CaseHead";
import { ButtonLink, ExternalButton, buttonClass } from "@/components/ui/Button";
import { DevTodo } from "@/components/ui/DevTodo";
import { HeroVisual } from "@/components/sections/Portrait";
import { Gallery, hasPhotos } from "@/components/sections/ClinicPhoto";
import { feeLine } from "@/components/ui/FeeNote";
import { GlobuleVial } from "@/components/ui/HomeoArt";
import { CampFloat } from "@/components/sections/CampFloat";
import Image from "next/image";
import { ArtBackdrop } from "@/components/ui/ArtBackdrop";
import { HeroTilt } from "@/components/ui/HeroTilt";
import { IconBadge } from "@/components/ui/Icon";
import { HoursList } from "@/components/sections/HoursList";
import type { Timings } from "@/lib/openNow";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const m = await getTranslations({ locale, namespace: "meta" });
  return { title: { absolute: m("homeTitle") }, alternates: { canonical: `/${locale}`, languages: { en: "/en", hi: "/hi", "x-default": "/en" } } };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home" });
  const c = await getTranslations({ locale, namespace: "common" });
  const h = await getTranslations({ locale, namespace: "hours" });
  const about = getAbout(locale);
  const care = getJson<{ items: { title: string }[] }>(locale, "care-areas");
  const faq = getJson<{ items: { q: string; a: string }[] }>(locale, "faq");
  const fee = await feeLine(locale);
  const feeT = await getTranslations({ locale, namespace: "fees" });
  const timings = SITE.timings as Timings | null;
  const lines = locale === "hi" ? SITE.address.linesHi : SITE.address.lines;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-x-clip">
        <ArtBackdrop src="/art/hero-pottery.webp" className="inset-0" opacity={0.38} position="right center" desktopOnly fade="to left" />
        <ArtBackdrop dark src="/art/dark-hero.webp" className="inset-0" opacity={0.7} position="right center" fade="to left" />
        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-4 pb-14 pt-6 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-20 lg:pt-12">
          <div>
            <p className="fade-in t-eyebrow">{t("eyebrow")}</p>
            <h1 className="t-h1 mt-3 max-w-xl">{t("title")}</h1>
            <p className="mt-3 text-lg font-medium text-primary">{t("titleSub")}</p>

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

          </div>
          <div className="pb-4"><HeroTilt><HeroVisual /></HeroTilt></div>
        </div>
      </section>

      {/* 35+ years: the highlighted blue box (owner request) */}
      <section aria-labelledby="exp35" className="mx-auto mt-4 max-w-6xl px-4 sm:px-6 reveal">
        <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-8 text-onprimary sm:px-10 sm:py-10">
          <Rosette className="pointer-events-none absolute -bottom-16 -end-10 h-64 w-64 opacity-[0.1]" />
          <div className="relative grid items-center gap-6 md:grid-cols-[auto_1fr] md:gap-12">
            <div>
              <p className="font-display text-6xl font-medium leading-none md:text-7xl">35+</p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.1em] opacity-90">{t("yearsLabel")}</p>
            </div>
            <div className="md:border-s md:border-white/25 md:ps-12">
              <h2 id="exp35" className="text-2xl md:text-3xl">{t("acuteChronic")}</h2>
              <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-white/10 p-4">
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] opacity-80">{t("acuteLabel")}</dt>
                  <dd className="mt-1.5 text-base leading-snug opacity-95">{t("acuteText")}</dd>
                </div>
                <div className="rounded-xl bg-white/10 p-4">
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] opacity-80">{t("chronicLabel")}</dt>
                  <dd className="mt-1.5 text-base leading-snug opacity-95">{t("chronicText")}</dd>
                </div>
              </dl>
              <Link href="/care-areas" className="press mt-5 inline-flex min-h-12 items-center rounded-full border border-white/50 px-5 text-[0.9375rem] font-semibold text-onprimary hover:bg-white/10">{t("careLink")}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* RIICO and MRDC: second blue box, below the 35+ box */}
      <section aria-labelledby="riico" className="mx-auto mt-4 max-w-6xl px-4 sm:px-6 reveal">
        <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-8 text-onprimary sm:px-10 sm:py-10">
          <Rosette className="pointer-events-none absolute -bottom-16 -start-10 h-64 w-64 opacity-[0.1]" />
          <div className="relative grid items-center gap-6 md:grid-cols-[auto_1fr] md:gap-12">
            <div>
              <p className="font-display text-6xl font-medium leading-none md:text-7xl">24</p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.1em] opacity-90">{t("riicoYears")}</p>
            </div>
            <div className="md:border-s md:border-white/25 md:ps-12">
              <h2 id="riico" className="text-2xl md:text-3xl">{t("riicoTitle")}</h2>
              <p className="my-4 h-px w-16 bg-white/35" aria-hidden="true" />
              <p className="font-display text-2xl leading-snug md:text-3xl">{t("riicoMrdc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Care areas at a glance */}
      <section aria-labelledby="carestrip" className="mx-auto mt-16 max-w-6xl px-4 sm:px-6 reveal">
        <CaseHead id="carestrip" title={t("careStripTitle")} />
        <p className="mt-4 max-w-2xl text-muted">{t("careStripLead")}</p>
        <ul className="mt-6 flex flex-wrap gap-2.5">
          {care.items.map((i) => (
            <li key={i.title}>
              <Link href="/care-areas" className="press inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-4 text-[0.9375rem] font-medium text-ink hover:border-primary/50 hover:bg-soft">{i.title}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="practice" className="mx-auto mt-20 max-w-6xl px-4 sm:px-6 reveal">
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
      <section aria-labelledby="about" className="mx-auto mt-20 max-w-6xl px-4 sm:px-6 reveal">
        <div className="float-card relative overflow-hidden p-6 sm:p-9">
          <Rosette className="pointer-events-none absolute -end-12 -top-12 h-56 w-56 text-primary opacity-[0.08]" />
          <CaseHead id="about" title={t("aboutTitle")} />
          <ul className="mt-6 max-w-2xl space-y-3" aria-label={t("qualTitle")}>
            {about.homePoints.map((x) => (
              <li key={x} className="flex gap-3 text-base">
                <span aria-hidden="true" className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                {x}
              </li>
            ))}
          </ul>
          <GlobuleVial className="pointer-events-none absolute -bottom-4 end-4 hidden h-44 w-auto opacity-90 md:block" />
          <ButtonLink href="/about" variant="secondary" className="mt-8">{t("aboutLink")}</ButtonLink>
        </div>
      </section>

      {/* Consultation services */}
      <section aria-labelledby="svc" className="mx-auto mt-16 max-w-6xl px-4 sm:px-6 reveal">
        <CaseHead id="svc" title={t("servicesTitle")} />
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {([["svc1", "/services"], ["svc2", "/book"], ["svc3", "/first-visit"]] as const).map(([k, href]) => (
            <li key={k}>
              <Link href={href} className="float-card block h-full p-6 transition-transform hover:-translate-y-0.5">
                <h3 className="font-display text-xl font-semibold text-ink">{t(k)}</h3>
                <p className="mt-2 text-muted">{t(`${k}t`)}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="reveal"><CampFloat /></div>

      {/* Jaipur identity: one full-width visual break. Text is real HTML on the artwork's clean left side. */}
      <section aria-labelledby="banner" className="mx-auto mt-20 max-w-6xl px-4 sm:px-6 reveal">
        <div className="relative overflow-hidden rounded-2xl border border-line bg-[#f6ead7] text-[#13203f]">
          <div className="relative h-40 w-full sm:h-48 md:absolute md:inset-0 md:h-auto">
            <Image src="/art/jaipur-banner.webp" alt="" fill sizes="(min-width:1152px) 1152px, 100vw" quality={72} className="object-cover object-right" />
          </div>
          <div className="relative p-6 sm:p-8 md:max-w-[56%] md:py-14 md:ps-12">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#85601d]">{t("bannerKicker")}</p>
            <h2 id="banner" className="t-h2 mt-2 !text-[#13203f]">{t("bannerTitle")}</h2>
            <p className="mt-3 max-w-md text-base text-[#3f4a63]">{t("bannerBody")}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={mapsDirectionsHref()} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center rounded-full bg-[#1d4e9f] px-5 text-[0.9375rem] font-semibold text-white hover:brightness-110">{c("directions")}</a>
              <Link href="/book" className="inline-flex min-h-12 items-center rounded-full border border-[#1d4e9f]/50 px-5 text-[0.9375rem] font-semibold text-[#1d4e9f] hover:bg-white/50">{c("book")}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Visit the clinic: details with icons, then real photos only */}
      <section aria-labelledby="visit" className="mx-auto mt-20 max-w-6xl px-4 sm:px-6 reveal">
        <CaseHead id="visit" title={t("visitTitle")} />
        <p className="mt-4 max-w-2xl text-muted">{t("locationNote")}</p>
        <div className="mt-9 grid gap-8 md:grid-cols-2">
          <ul className="space-y-6">
            <li className="flex gap-4">
              <IconBadge name="pin" />
              <div>
                <p className="font-semibold text-ink">{c("address")}</p>
                <address className="text-muted not-italic">{lines.map((x) => <span key={x} className="block">{x}</span>)}</address>
              </div>
            </li>
            <li className="flex gap-4">
              <IconBadge name="clock" />
              <div>
                <p className="mb-2 font-semibold text-ink">{t("visitHours")}</p>
                {timings ? <><HoursList timings={timings} /><p className="mt-2 text-sm text-muted">{h("byAppointment")}</p></> : <DevTodo>{t("timingsMissing")} Timings and weekly off day are in content/TODO.md.</DevTodo>}
              </div>
            </li>
            {fee ? (
              <li className="flex gap-4">
                <IconBadge name="rupee" />
                <div>
                  <p className="font-semibold text-ink">{feeT("title")}</p>
                  <p className="text-muted">{fee}</p>
                </div>
              </li>
            ) : null}
            <li className="flex gap-4">
              <IconBadge name="phone" />
              <div>
                <p className="font-semibold text-ink">{c("phone")}</p>
                <a href={telHref} data-evt="click_call" className="inline-flex min-h-12 items-center text-primary underline">{SITE.phone.display}</a>
              </div>
            </li>
          </ul>
          <div className="space-y-4">
            {hasPhotos() ? <Gallery limit={6} /> : isDev ? <Gallery /> : null}
            {mapsEmbedUrl ? (
              <iframe title={c("directions")} src={mapsEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="aspect-[4/3] w-full rounded-2xl border border-line" />
            ) : isDev ? <DevTodo>{t("visitTodoMap")} Directions button uses a search link for now.</DevTodo> : null}
            <ExternalButton href={mapsDirectionsHref()} target="_blank" rel="noopener noreferrer" variant="secondary">
              {c("directions")}
            </ExternalButton>
          </div>
        </div>
      </section>

      {/* Common questions */}
      <section aria-labelledby="faqs" className="mx-auto mt-20 max-w-3xl px-4 sm:px-6 reveal">
        <CaseHead id="faqs" title={t("faqTitle")} />
        <div className="mt-8 space-y-3">
          {faq.items.slice(0, 4).map((i) => (
            <details key={i.q} className="card group p-5">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold text-primary">
                {i.q}
                <span aria-hidden="true" className="text-accent transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-lg">{i.a}</p>
            </details>
          ))}
        </div>
        <ButtonLink href="/faq" variant="secondary" className="mt-6">{t("faqLink")}</ButtonLink>
      </section>

      {/* Book CTA */}
      <section className="reveal mx-auto mt-20 max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl bg-soft px-6 py-10 text-center sm:px-12 sm:py-12">
          <Rosette className="pointer-events-none absolute -start-10 -top-10 h-44 w-44 text-primary opacity-[0.1]" />
          <Rosette className="pointer-events-none absolute -bottom-12 -end-10 h-52 w-52 text-primary opacity-[0.1]" />
          <GlobuleVial className="relative mx-auto mb-2 h-28 w-auto" />
          <h2 className="t-h2 relative">{t("ctaTitle")}</h2>
          <p className="t-lead relative mx-auto mt-3 max-w-xl">{t("ctaBody")}</p>
          <ol className="relative mx-auto mt-6 grid max-w-2xl gap-3 text-start sm:grid-cols-3">
            {(["next1", "next2", "next3"] as const).map((k, i) => (
              <li key={k} className="flex gap-3 rounded-xl bg-surface/70 p-3">
                <span aria-hidden="true" className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary text-sm font-semibold text-onprimary">{i + 1}</span>
                <span className="text-sm leading-snug">{feeT(k)}</span>
              </li>
            ))}
          </ol>
          <ButtonLink href="/book" className="relative mt-7">{c("book")}</ButtonLink>
        </div>
      </section>
    </>
  );
}
