import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMeta } from "@/lib/meta";
import { QrCode } from "@/components/ui/QrCode";
import { PrintButton } from "@/components/ui/PrintButton";
import { SITE, SITE_URL } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "poster" });
  return pageMeta(locale, "/qr-poster", t("title"), { noindex: true });
}

export default async function PosterPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "poster" });
  const m = await getTranslations({ locale, namespace: "meta" });
  const c = await getTranslations({ locale, namespace: "common" });
  const hi = locale === "hi";
  const url = `${SITE_URL}/${locale}/book?utm_source=qr&utm_medium=print`;
  const lines = hi ? SITE.address.linesHi : SITE.address.lines;
  return (
    <div className="poster-page px-4 py-8">
      <style>{"@page{size:A4;margin:0}@media print{html,body{background:#FBF5E6!important}.poster-page{padding:0!important}.poster{max-width:none!important;width:198mm!important;height:297mm!important;margin:0 auto!important;border-radius:0!important;box-shadow:none!important}}"}</style>
      <div className="poster-wrap">
        <div className="poster relative mx-auto aspect-[2/3] w-full max-w-[560px] overflow-hidden rounded-2xl bg-[#FBF5E6] text-[#13203F] shadow-[var(--shadow-float)]" style={{ containerType: "inline-size" }}>
          <Image src="/art/qr-poster-frame.webp" alt="" fill priority sizes="560px" className="object-fill" />
          <div className="absolute left-[25%] top-[19.5%] w-[50%]">
            <QrCode url={url} label={t("scan")} className="w-full" />
          </div>
          <p className="absolute inset-x-[14%] top-[60.3%] text-center font-display font-semibold leading-tight" style={{ fontSize: "5.2cqw" }}>{t("scan")}</p>
          <div className="absolute inset-x-[18%] top-[66%] text-center leading-snug">
            <p className="font-semibold" style={{ fontSize: "3.4cqw" }}>{m("siteName")}</p>
            <p style={{ fontSize: "2.8cqw" }}>{hi ? SITE.doctor.nameHi : SITE.doctor.name}, {hi ? SITE.doctor.degreeHi : SITE.doctor.degree}</p>
            <p className="mt-[1cqw]" style={{ fontSize: "2.6cqw" }}>{t("sub")}</p>
            <p className="mt-[1cqw] font-semibold" style={{ fontSize: "3cqw" }}>{t("callLine")} {SITE.phone.display}</p>
          </div>
          <div className="absolute inset-x-[12%] top-[83.4%] text-center leading-tight" style={{ fontSize: "1.95cqw" }}>
            <p>{lines.slice(0, 2).join(", ")}</p>
          </div>
        </div>
      </div>
      <div className="no-print mx-auto mt-6 flex max-w-[560px] justify-center"><PrintButton label={c("print")} /></div>
    </div>
  );
}
