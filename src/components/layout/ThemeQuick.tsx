"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { setThemePref, subscribeTheme } from "./ThemeToggle";

// What is actually painted (data-theme), so "Auto" counts. The server snapshot is light, so hydration always matches.
function subscribe(cb: () => void) {
  const off = subscribeTheme(cb);
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => { off(); mo.disconnect(); };
}
const getDark = () => document.documentElement.dataset.theme === "dark";

/** One-tap light/dark switch for the header. The full Light / Auto / Dark choice stays in the Aa menu. */
export function ThemeQuick() {
  const t = useTranslations("common");
  const isDark = useSyncExternalStore(subscribe, getDark, () => false);
  const label = isDark ? t("themeLight") : t("themeDark");
  return (
    <button
      type="button"
      onClick={() => setThemePref(isDark ? "light" : "dark")}
      aria-label={`${t("theme")}: ${label}`}
      title={`${t("theme")}: ${label}`}
      className="press grid h-10 w-10 shrink-0 place-items-center rounded-xl text-ink hover:bg-soft"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {isDark ? (
          <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>
        ) : (
          <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" />
        )}
      </svg>
    </button>
  );
}
