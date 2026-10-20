import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import { CaseHead } from "@/components/ui/CaseHead";
import { ButtonLink } from "@/components/ui/Button";
import { PageBackdrop } from "@/components/ui/PageBackdrop";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "online" });
  return pageMeta(locale, "/online-consultation", t("title"), { noindex: true });
}

export default async function OnlinePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "online" });
  const c = await getTranslations({ locale, namespace: "common" });
  return (
    <PageBackdrop>
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 md:py-14">
      <CaseHead as="h1" title={t("title")} eyebrow="Phase 2" />
      <p className="mt-6 text-lg">{t("lead")}</p>
      <p className="mt-3 text-muted">{t("body")}</p>
      <ButtonLink href="/book" className="mt-8">{c("book")}</ButtonLink>
    </div>
    </PageBackdrop>
  );
}
