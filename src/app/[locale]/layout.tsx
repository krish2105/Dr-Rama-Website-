import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import { preload } from "react-dom";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { SITE_URL } from "@/lib/site";
import { clinicSchema } from "@/lib/schema";
import { Analytics } from "@/components/layout/Analytics";
import "@/styles/globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = DM_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f1e4" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1630" },
  ],
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t("siteName"), template: `%s | ${t("siteName")}` },
    description: t("defaultDescription"),
    alternates: { canonical: `/${locale}`, languages: { en: "/en", hi: "/hi", "x-default": "/en" } },
    openGraph: { siteName: t("siteName"), locale: locale === "hi" ? "hi_IN" : "en_IN", type: "website" },
  };
}

// Runs before paint: no flash of the wrong theme.
const themeInit = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark')t='system';var d=t==='dark'||(t==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);var r=document.documentElement;r.dataset.theme=d?'dark':'light';r.dataset.themePref=t}catch(e){}})()`;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  // Devanagari webfont is self-hosted and fetched only on Hindi pages (English pages never download it).
  if (locale === "hi") {
    preload("/fonts/mukta-devanagari-700.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
    preload("/fonts/mukta-devanagari-400.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  }
  const t = await getTranslations({ locale, namespace: "common" });

  return (
    <html lang={locale} suppressHydrationWarning className={`${display.variable} ${body.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <NextIntlClientProvider>
          <a href="#main" className="skip-link">{t("skip")}</a>
          <Header />
          <main id="main" className="pt-24">{children}</main>
          <Footer />
          <FloatingContact />
          <Analytics />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema(locale)) }} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
