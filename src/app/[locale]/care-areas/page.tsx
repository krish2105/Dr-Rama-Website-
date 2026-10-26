import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getJson } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import Image from "next/image";
import { portrait, altFor } from "@/lib/photos";
import { CaseHead } from "@/components/ui/CaseHead";
import { ButtonLink } from "@/components/ui/Button";
import { GlobuleScatter, HOMEO_GLYPHS, HomeoGlyph } from "@/components/ui/HomeoArt";
import { ArtBackdrop } from "@/components/ui/ArtBackdrop";

type Care = { _status: string; title: string; items: { title: string; concerns: string[] }[] };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = getJson<Care>(locale, "care-areas");
  return pageMeta(locale, "/care-areas", d.title, { noindex: d._status === "DRAFT" });
}

export default async function CareAreasPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const d = getJson<Care>(locale, "care-areas");
  const t = await getTranslations({ locale, namespace: "careAreas" });
  const c = await getTranslations({ locale, namespace: "common" });
  return (
    <div className="relative">
      <ArtBackdrop src="/art/services-bg.webp" className="inset-x-0 -top-24 h-[28rem]" opacity={0.8} />
      <ArtBackdrop src="/art/dark-pattern.webp" dark className="inset-x-0 -top-24 h-[22rem]" opacity={0.3} />
      <div className="relative z-10 mx-auto max-w-4xl px-4 py-10 sm:px-6 md:py-14">
      <CaseHead as="h1" title={d.title} />
      <p className="mt-6 text-lg text-muted">{t("lead")}</p>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {d.items.map((x, i) => (
          <li key={x.title} className="float-card relative min-h-32 overflow-hidden p-5">
            <GlobuleScatter className="pointer-events-none absolute -bottom-3 -end-3 h-20 w-28 opacity-60" />
            <div className="relative flex items-center gap-3">
              <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-primary/35 bg-soft text-primary">
                <HomeoGlyph name={HOMEO_GLYPHS[i % HOMEO_GLYPHS.length]} />
              </span>
              <h2 className="font-display text-lg font-semibold text-ink">{x.title}</h2>
            </div>
            {x.concerns.length ? (
              <div className="relative">
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.1em] text-muted">{t("concernsLabel")}</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {x.concerns.map((k) => <li key={k} className="rounded-lg bg-soft px-2.5 py-1 text-sm text-ink">{k}</li>)}
                </ul>
              </div>
            ) : null}
          </li>
        ))}
      </ul>
      <p className="mt-8 text-muted">{t("referral")}</p>
      <section aria-labelledby="doc" className="float-card mt-12 overflow-hidden">
        <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-[auto_1fr] md:items-start">
          {portrait ? (
            <div className="relative mx-auto aspect-[4/5] w-40 shrink-0 overflow-hidden rounded-2xl border border-line md:w-44">
              <Image src={portrait.src} alt={altFor(portrait, locale)} fill sizes="176px" className="object-cover" style={{ objectPosition: portrait.focus ?? "50% 20%" }} />
            </div>
          ) : null}
          <div>
            <h2 id="doc" className="t-h2">{t("aboutTitle")}</h2>
            <ul className="mt-4 space-y-2.5">
              {(["f1", "f2", "f3", "f4", "f5", "f6"] as const).map((k) => (
                <li key={k} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  <span>{t(k)}</span>
                </li>
              ))}
            </ul>
            <ButtonLink href="/about" variant="secondary" className="mt-6">{t("more")}</ButtonLink>
          </div>
        </div>
      </section>
      <ButtonLink href="/book" className="mt-8">{c("book")}</ButtonLink>
      </div>
    </div>
  );
}
