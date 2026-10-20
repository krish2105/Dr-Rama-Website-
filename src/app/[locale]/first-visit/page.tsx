import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { pageMeta } from "@/lib/meta";
import { CaseHead } from "@/components/ui/CaseHead";
import { ButtonLink } from "@/components/ui/Button";
import { Globules } from "@/components/ui/Globules";
import { QrCode } from "@/components/ui/QrCode";
import { PrintButton } from "@/components/ui/PrintButton";
import { HoursList } from "@/components/sections/HoursList";
import { SITE, SITE_URL, telHref } from "@/lib/site";
import type { Timings } from "@/lib/openNow";
import { PageBackdrop } from "@/components/ui/PageBackdrop";


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "visit" });
  return pageMeta(locale, "/first-visit", t("title"), { description: t("lead") });
}

export default async function FirstVisitPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "visit" });
  const c = await getTranslations({ locale, namespace: "common" });
  const f = await getTranslations({ locale, namespace: "footer" });
  const lines = locale === "hi" ? SITE.address.linesHi : SITE.address.lines;
  const timings = SITE.timings as Timings | null;
  const bookUrl = `${SITE_URL}/${locale}/book?utm_source=qr&utm_medium=print`;
  return (
    <PageBackdrop>
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 md:py-14">
      <style>{"@page{size:A4;margin:14mm}"}</style>
      <div aria-hidden="true" className="relative mb-8 h-14 overflow-hidden rounded-2xl sm:h-20">
        <Image src="/art/first-visit-header.webp" alt="" fill priority sizes="(min-width:768px) 768px, 100vw" className="object-cover object-top" />
      </div>
      <CaseHead as="h1" title={t("title")} />
      <p className="t-lead mt-5">{t("lead")}</p>

      <div className="mt-8 space-y-6">
        <section className="card p-6">
          <h2 className="text-2xl text-ink">{t("beforeTitle")}</h2>
          <p className="mt-2 text-lg">{t("beforeText")}</p>
          {timings ? <div className="mt-4"><HoursList timings={timings} /></div> : null}
          <p className="mt-4 text-lg"><a className="font-semibold text-primary underline" href={telHref}>{SITE.phone.display}</a></p>
        </section>

        <section className="card p-6">
          <h2 className="text-2xl text-ink">{t("bringTitle")}</h2>
          <ul className="mt-3 list-disc space-y-2 ps-6 text-lg">
            {(["bring1", "bring2", "bring3"] as const).map((k) => <li key={k}>{t(k)}</li>)}
          </ul>
        </section>

        <section className="card grid items-center gap-6 p-6 sm:grid-cols-[1fr_auto]">
          <div>
            <h2 className="text-2xl text-ink">{t("expectTitle")}</h2>
            <ul className="mt-3 list-disc space-y-2 ps-6 text-lg">
              {(["expect1", "expect2", "expect3", "expect4"] as const).map((k) => <li key={k}>{t(k)}</li>)}
            </ul>
          </div>
          <figure className="mx-auto w-44 sm:w-48">
            <Globules className="h-auto w-full" />
            <figcaption className="mt-1 text-center text-xs text-muted">{t("globulesCaption")}</figcaption>
          </figure>
        </section>

        <section className="card p-6">
          <h2 className="text-2xl text-ink">{t("findTitle")}</h2>
          <address className="mt-2 text-lg not-italic">{lines.map((l) => <span key={l} className="block">{l}</span>)}</address>
          <Link href="/how-to-reach" className="mt-3 inline-flex min-h-12 items-center font-semibold text-primary underline">{t("findLink")}</Link>
        </section>

        <section className="rounded-2xl border border-accent/40 bg-accent/10 p-6">
          <h2 className="text-xl text-ink">{t("emergencyTitle")}</h2>
          <p className="mt-1 text-lg">{t("emergencyText")}</p>
          <p className="mt-2 text-sm font-semibold text-ink">{f("disclaimer")}</p>
        </section>

        <section className="card flex flex-wrap items-center gap-6 p-6">
          <QrCode url={bookUrl} label={t("scanTitle")} className="w-36 rounded-xl border border-line" />
          <div className="min-w-0 flex-1">
            <h2 className="text-xl text-ink">{t("scanTitle")}</h2>
            <p className="mt-1 text-muted">{t("scanText")}</p>
          </div>
        </section>
      </div>

      <div className="no-print mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/book">{c("book")}</ButtonLink>
        <PrintButton label={c("print")} />
        <a href={`/downloads/first-visit-${locale}.pdf`} download className="press inline-flex min-h-12 items-center rounded-full border border-primary/50 px-5 font-semibold text-primary hover:bg-soft">{c("downloadPdf")}</a>
      </div>
    </div>
    </PageBackdrop>
  );
}
