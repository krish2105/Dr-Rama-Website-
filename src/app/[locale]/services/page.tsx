import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getJson } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import { CaseHead } from "@/components/ui/CaseHead";
import { ButtonLink } from "@/components/ui/Button";
import { Globules } from "@/components/ui/Globules";
import { ArtBackdrop } from "@/components/ui/ArtBackdrop";

type Services = { _status: string; title: string; items: { title: string; text: string }[] };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const d = getJson<Services>(locale, "services");
  return pageMeta(locale, "/services", d.title, { noindex: d._status === "DRAFT" });
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const d = getJson<Services>(locale, "services");
  const c = await getTranslations({ locale, namespace: "common" });
  const v = await getTranslations({ locale, namespace: "visit" });
  return (
    <div className="relative">
      <ArtBackdrop src="/art/services-bg.webp" className="inset-x-0 -top-24 h-[28rem]" opacity={0.8} />
      <div className="relative z-10 mx-auto max-w-3xl px-4 py-10 sm:px-6 md:py-14">
      <CaseHead as="h1" title={d.title} />
      <ul className="mt-10 space-y-5">
        {d.items.map((i) => (
          <li key={i.title} className="float-card p-6">
            <h2 className="text-2xl text-ink">{i.title}</h2>
            <p className="mt-2 text-lg text-muted">{i.text}</p>
          </li>
        ))}
      </ul>
      <figure className="mx-auto mt-10 w-44">
        <Globules className="h-auto w-full" />
        <figcaption className="mt-1 text-center text-xs text-muted">{v("globulesCaption")}</figcaption>
      </figure>
      <ButtonLink href="/book" className="mt-8">{c("book")}</ButtonLink>
      </div>
    </div>
  );
}
