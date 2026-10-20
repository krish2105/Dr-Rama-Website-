import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { BookingForm } from "@/components/booking/BookingForm";
import { CaseHead } from "@/components/ui/CaseHead";
import { Sprig } from "@/components/ui/Sprig";
import { SITE, telHref, waHref } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "book" });
  return { title: t("title"), alternates: { canonical: `/${locale}/book`, languages: { en: "/en/book", hi: "/hi/book" } } };
}

export default async function BookPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "book" });
  const c = await getTranslations({ locale, namespace: "common" });
  return (
    <div className="relative mx-auto max-w-3xl px-4 py-10 sm:px-6 md:py-14">
      <Sprig className="pointer-events-none absolute -right-10 top-4 hidden h-60 text-sage opacity-40 lg:block" />
      <CaseHead as="h1" title={t("title")} />
      <p id="form-lead" className="mt-5 max-w-xl text-lg text-muted">{t("lead")}</p>
      <div className="mt-8"><BookingForm /></div>
      <p className="mt-8 text-muted">
        <a className="inline-flex min-h-12 items-center text-primary underline" href={telHref}>{c("call")}: {SITE.phone.display}</a>
        {" · "}
        <a className="inline-flex min-h-12 items-center text-primary underline" href={waHref(c("whatsappPrefill"))} target="_blank" rel="noopener noreferrer">{c("whatsapp")}</a>
      </p>
    </div>
  );
}
