"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";

type Pref = "light" | "dark" | "system";

function apply(pref: Pref) {
  const dark = pref === "dark" || (pref === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  document.documentElement.dataset.themePref = pref;
}

const icons: Record<Pref, React.ReactNode> = {
  light: <circle cx="12" cy="12" r="4" />,
  dark: <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" />,
  system: <><rect x="3" y="5" width="18" height="12" rx="2" /><path d="M8 21h8M12 17v4" /></>,
};

const listeners = new Set<() => void>();
const subscribe = (cb: () => void) => { listeners.add(cb); return () => { listeners.delete(cb); }; };
const getPref = (): Pref => {
  const v = document.documentElement.dataset.themePref;
  return v === "light" || v === "dark" ? v : "system";
};

export function ThemeToggle() {
  const t = useTranslations("common");
  const pref = useSyncExternalStore(subscribe, getPref, () => "system" as Pref);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => document.documentElement.dataset.themePref !== "light" && document.documentElement.dataset.themePref !== "dark" && apply("system");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  function choose(p: Pref) {
    try { localStorage.setItem("theme", p); } catch {}
    apply(p);
    listeners.forEach((l) => l());
  }

  const labels: Record<Pref, string> = { light: t("themeLight"), dark: t("themeDark"), system: t("themeSystem") };

  return (
    <div role="radiogroup" aria-label={t("theme")} className="inline-flex rounded-full border border-line bg-surface p-1">
      {(["light", "system", "dark"] as Pref[]).map((p) => (
        <button
          key={p}
          type="button"
          role="radio"
          aria-checked={pref === p}
          aria-label={labels[p]}
          title={labels[p]}
          onClick={() => choose(p)}
          className={`grid h-10 w-10 place-items-center rounded-full transition-colors ${
            pref === p ? "bg-primary text-onprimary" : "text-muted hover:bg-soft"
          }`}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {icons[p]}
          </svg>
        </button>
      ))}
    </div>
  );
}
