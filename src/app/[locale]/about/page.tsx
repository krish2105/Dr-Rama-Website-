import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAbout } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { CaseHead } from "@/components/ui/CaseHead";
import { DevTodo } from "@/components/ui/DevTodo";
import { Rosette } from "@/components/ui/Motif";
import Image from "next/image";
import { portrait, deskPhoto, altFor } from "@/lib/photos";
import { ButtonLink } from "@/components/ui/Button";
import { SITE } from "@/lib/site";
import { CampFloat } from "@/components/sections/CampFloat";
import { JumpTo } from "@/components/layout/JumpTo";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { PageBackdrop } from "@/components/ui/PageBackdrop";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const a = getAbout(locale);
  return {
    title: a.title,
    alternates: { canonical: `/${locale}/about`, languages: { en: "/en/about", hi: "/hi/about", "x-default": "/en/about" } },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const a = getAbout(locale);
  const t = await getTranslations({ locale, namespace: "about" });
  const c = await getTranslations({ locale, namespace: "common" });
  const home = await getTranslations({ locale, namespace: "home" });
  const nav = await getTranslations({ locale, namespace: "nav" });

  return (
    <PageBackdrop>
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14">
      <JsonLd data={breadcrumbSchema(locale, [{ name: nav("home"), route: "" }, { name: a.title, route: "/about" }])} />
      <JumpTo label={nav("jump")} items={[["quals", t("qualifications")], ["exp", t("experience")], ["mem", t("memberships")], ["conf", t("conferences")], ["comm", t("community")]].map(([id, label]) => ({ id, label }))} />
      <header className="relative">
        <Rosette className="pointer-events-none absolute -end-10 -top-10 hidden h-64 w-64 text-primary opacity-[0.08] md:block" />
        <CaseHead as="h1" title={a.title} eyebrow={locale === "hi" ? SITE.doctor.degreeHi : SITE.doctor.degree} />
        <div className="mt-6 grid gap-8 md:grid-cols-[1.4fr_1fr]">
          <div className="space-y-4 text-lg">
            <ul className="space-y-3">
              {a.points.map((x) => (
                <li key={x} className="flex gap-3">
                  <span aria-hidden="true" className="mt-3 h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />
                  {x}
                </li>
              ))}
            </ul>
            {SITE.registration.number ? (
              <p className="rounded-xl bg-soft px-4 py-3 text-sm text-ink">{t("registration", { council: (locale === "hi" ? SITE.registration.councilHi : SITE.registration.council) ?? "", number: SITE.registration.number })}</p>
            ) : null}
          </div>
          <div>
            {portrait ? (
              <div className="float-card relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden !rounded-[22px]">
                <Image src={portrait.src} alt={altFor(portrait, locale)} fill sizes="(min-width:768px) 384px, 90vw" className="object-cover" priority />
              </div>
            ) : <DevTodo>{t("portraitTodo")}</DevTodo>}
          </div>
        </div>
      </header>

      <section aria-labelledby="quals" className="mt-16">
        <CaseHead id="quals" title={t("qualifications")} />
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {a.qualifications.map((q) => (
            <li key={q.title} className="card p-5">
              <p className="font-display text-xl font-semibold text-primary">{q.title}</p>
              {q.org ? <p className="mt-1 text-muted">{q.org}</p> : null}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="exp" className="mt-16">
        <CaseHead id="exp" title={t("experience")} />
        <ol className="relative mt-8 space-y-6 border-s-2 border-line ps-6">
          {a.experience.map((e) => (
            <li key={e.role + e.org} className="relative">
              <span aria-hidden="true" className="absolute -start-[1.95rem] top-2 h-3 w-3 rounded-full bg-accent ring-4 ring-bg" />
              {e.when ? <p className="text-sm font-semibold uppercase tracking-wider text-wood">{e.when}</p> : null}
              <p className="font-display text-xl font-semibold text-primary">{e.role}</p>
              <p className="text-muted">{e.org}</p>
              {e.note ? <p className="mt-1">{e.note}</p> : null}
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="mem" className="mt-16">
        <CaseHead id="mem" title={t("memberships")} />
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {a.memberships.map((m) => (
            <li key={m.name} className="specimen p-5" data-label="•">
              <p className="text-lg">{m.name}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="conf" className="mt-16">
        <CaseHead id="conf" title={t("conferences")} />
        <p className="mt-4 max-w-2xl text-muted">{t("conferencesLead")}</p>
        <details className="float-card group mt-6 overflow-hidden">
          <summary className="flex min-h-16 cursor-pointer list-none items-center gap-4 px-5 py-4 sm:px-6">
            <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-primary/35 bg-soft text-primary">
              <Icon name="calendar" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-lg font-semibold text-ink">{t("conferencesSummary")}</span>
              <span className="block text-sm text-muted group-open:hidden">{t("conferencesTap")}</span>
            </span>
            <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-soft text-primary transition-transform group-open:rotate-180">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
            </span>
          </summary>
          <ul className="grid gap-3 border-t border-line p-4 sm:grid-cols-2 sm:p-5">
            {a.conferences.map((cf) => (
              <li key={cf.name + cf.where} className="rounded-xl bg-soft px-4 py-3">
                <p className="font-medium text-ink">{cf.name}</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted"><Icon name="pin" className="h-3.5 w-3.5 shrink-0 text-primary" />{cf.where}</p>
              </li>
            ))}
          </ul>
        </details>
      </section>

      <section aria-labelledby="comm" className="mt-16">
        <CaseHead id="comm" title={t("community")} />
        <ul className="mt-8 space-y-3">
          {a.community.map((x) => (
            <li key={x} className="flex gap-3 text-lg">
              <span aria-hidden="true" className="mt-3 h-2.5 w-2.5 shrink-0 rounded-full bg-sage" />
              {x}
            </li>
          ))}
        </ul>
      </section>

      {deskPhoto ? (
        <section aria-labelledby="room" className="mx-auto mt-16 max-w-3xl">
          <CaseHead id="room" title={t("room")} />
          <figure className="float-card mt-8 overflow-hidden !rounded-[22px]">
            <div className="relative w-full" style={{ aspectRatio: `${deskPhoto.width} / ${deskPhoto.height}` }}>
              <Image src={deskPhoto.src} alt={altFor(deskPhoto, locale)} fill sizes="(min-width:768px) 768px, 100vw" className="object-cover" />
            </div>
          </figure>
        </section>
      ) : null}

      <CampFloat headingId="camp" />

      <div className="float-card mt-16 bg-primary px-6 py-10 text-center text-onprimary">
        <h2 className="text-2xl font-semibold">{home("ctaTitle")}</h2>
        <ButtonLink href="/book" variant="secondary" className="mt-5 !border-onprimary !text-onprimary hover:!bg-white/10">{c("book")}</ButtonLink>
      </div>
    </div>
    </PageBackdrop>
  );
}
