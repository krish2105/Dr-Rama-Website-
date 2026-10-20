import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/Button";
import { CaseHead } from "@/components/ui/CaseHead";
import { PageBackdrop } from "@/components/ui/PageBackdrop";
import { GlobuleVial } from "@/components/ui/HomeoArt";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: await getLocale(), namespace: "notFound" });
  return { title: t("title"), robots: { index: false, follow: false } };
}

export default async function NotFound() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "notFound" });
  const c = await getTranslations({ locale, namespace: "common" });
  const n = await getTranslations({ locale, namespace: "nav" });
  return (
    <PageBackdrop>
      <div className="mx-auto max-w-2xl px-4 py-14 text-center sm:px-6 md:py-20">
        <GlobuleVial className="mx-auto mb-4 h-36 w-auto" />
        <CaseHead as="h1" title={t("title")} className="flex flex-col items-center" />
        <p className="t-lead mx-auto mt-5 max-w-md">{t("body")}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">{n("home")}</ButtonLink>
          <ButtonLink href="/book" variant="secondary">{c("book")}</ButtonLink>
        </div>
      </div>
    </PageBackdrop>
  );
}
