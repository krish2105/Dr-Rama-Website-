"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
type Choice = "granted" | "denied";

declare global {
  interface Window { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void }
}

function gtag(...args: unknown[]) {
  (window.dataLayer ??= []).push(args);
}

/** Only these events exist. They carry no health details and no personal data. */
const EVENTS = ["click_call", "click_whatsapp", "click_book", "booking_submit"] as const;

export function Analytics() {
  const t = useTranslations("consent");
  const [choice, setChoice] = useState<Choice | "unset" | "loading">("loading");

  useEffect(() => {
    let stored: string | null = null;
    try { stored = localStorage.getItem("analytics-consent"); } catch {}
    // Reading the browser-only stored choice after mount is the whole point of this effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setChoice(stored === "granted" || stored === "denied" ? stored : "unset");
  }, []);

  useEffect(() => {
    if (!GA_ID || choice !== "granted") return;
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-evt]");
      const name = el?.dataset.evt as (typeof EVENTS)[number] | undefined;
      if (name && EVENTS.includes(name)) gtag("event", name, { language: document.documentElement.lang });
    };
    document.addEventListener("click", onClick);
    const onSubmitted = () => gtag("event", "booking_submit", { language: document.documentElement.lang });
    window.addEventListener("clinic:booking-submitted", onSubmitted);
    return () => { document.removeEventListener("click", onClick); window.removeEventListener("clinic:booking-submitted", onSubmitted); };
  }, [choice]);

  function decide(c: Choice) {
    try { localStorage.setItem("analytics-consent", c); } catch {}
    setChoice(c);
  }

  if (!GA_ID) return null; // No measurement ID yet: no analytics, no banner.

  return (
    <>
      {choice === "granted" ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true,allow_ad_personalization_signals:false,send_page_view:true});`}</Script>
        </>
      ) : null}
      {choice === "unset" ? (
        <div role="region" aria-label={t("text")} className="fixed inset-x-3 bottom-[5.5rem] z-50 mx-auto max-w-xl rounded-3xl border border-line bg-surface p-4 shadow-[var(--shadow)] md:bottom-4">
          <p className="text-[0.95rem]">{t("text")} <Link href="/privacy" className="text-primary underline">{t("more")}</Link></p>
          <div className="mt-3 flex gap-3">
            <button type="button" onClick={() => decide("granted")} className="min-h-12 rounded-full bg-primary px-6 font-semibold text-onprimary">{t("accept")}</button>
            <button type="button" onClick={() => decide("denied")} className="min-h-12 rounded-full border-2 border-primary px-6 font-semibold text-primary">{t("decline")}</button>
          </div>
        </div>
      ) : null}
    </>
  );
}
