import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getJson } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import { CaseHead } from "@/components/ui/CaseHead";
import { ButtonLink } from "@/components/ui/Button";
import { ArtBackdrop } from "@/components/ui/ArtBackdrop";

type Care = { _status: string; title: string; items: string[] };

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
      <div className="relative z-10 mx-auto max-w-4xl px-4 py-10 sm:px-6 md:py-14">
      <CaseHead as="h1" title={d.title} />
      {d._status === "DRAFT" ? <p className="mt-4 inline-block rounded-full bg-accent/15 px-3 py-1 text-sm font-semibold text-accentink">{c("draft")}</p> : null}
      <p className="mt-6 text-lg text-muted">{t("lead")}</p>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {d.items.map((x) => (
          <li key={x} className="float-card flex min-h-24 items-center gap-3 p-5">
            <span aria-hidden="true" className="h-3 w-3 shrink-0 rounded-full bg-accent" />
            <span className="font-display text-lg font-semibold text-ink">{x}</span>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-muted">{t("referral")}</p>
      <p className="mt-2 font-semibold text-ink">{t("urgent")}</p>
      <ButtonLink href="/book" className="mt-8">{c("book")}</ButtonLink>
      </div>
    </div>
  );
}
