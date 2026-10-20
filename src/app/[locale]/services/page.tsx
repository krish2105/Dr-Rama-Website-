import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import { CaseHead } from "@/components/ui/CaseHead";
import { DevTodo } from "@/components/ui/DevTodo";
import { ButtonLink } from "@/components/ui/Button";
import { isDev } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return pageMeta(locale, "/services", t("title"), { noindex: true }); // thin until the doctor supplies the list
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "services" });
  const c = await getTranslations({ locale, namespace: "common" });
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 md:py-14">
      <CaseHead as="h1" title={t("title")} />
      <p className="mt-6 text-lg">{t("lead")}</p>
      <div className="mt-6">{isDev ? <DevTodo>{t("todo")}</DevTodo> : <p className="text-muted">{t("prod")}</p>}</div>
      <ButtonLink href="/book" className="mt-8">{c("book")}</ButtonLink>
    </div>
  );
}
