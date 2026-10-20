import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getJson } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import { CaseHead } from "@/components/ui/CaseHead";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { getTranslations } from "next-intl/server";
import { PageBackdrop } from "@/components/ui/PageBackdrop";

type Faq = { title: string; items: { q: string; a: string }[] };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(locale, "/faq", getJson<Faq>(locale, "faq").title);
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const faq = getJson<Faq>(locale, "faq");
  const nav = await getTranslations({ locale, namespace: "nav" });
  return (
    <PageBackdrop>
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 md:py-14">
      <JsonLd data={{ "@graph": [faqSchema(faq.items), breadcrumbSchema(locale, [{ name: nav("home"), route: "" }, { name: faq.title, route: "/faq" }])] }} />
      <CaseHead as="h1" title={faq.title} />
      <div className="mt-8 space-y-3">
        {faq.items.map((i) => (
          <details key={i.q} className="card group p-5">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold text-primary">
              {i.q}
              <span aria-hidden="true" className="text-accent transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-lg">{i.a}</p>
          </details>
        ))}
      </div>
    </div>
    </PageBackdrop>
  );
}
