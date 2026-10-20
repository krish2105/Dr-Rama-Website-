import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import { CaseHead } from "@/components/ui/CaseHead";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "experiences" });
  return pageMeta(locale, "/experiences", t("title"), { noindex: true }); // empty until consented stories exist
}

export default async function ExperiencesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "experiences" });
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 md:py-14">
      <CaseHead as="h1" title={t("title")} />
      <p className="mt-6 text-lg">{t("lead")}</p>
      <p className="specimen mt-8 p-6 text-muted" data-label="—">{t("empty")}</p>
    </div>
  );
}
