"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { DisplayControls } from "./DisplayControls";

const ITEMS = [
  ["home", "/"], ["about", "/about"], ["services", "/services"], ["careAreas", "/care-areas"],
  ["book", "/book"], ["reach", "/how-to-reach"], ["firstVisit", "/first-visit"], ["experiences", "/experiences"],
  ["blog", "/blog"], ["faq", "/faq"], ["contact", "/contact"], ["privacy", "/privacy"],
] as const;

export function MobileNav() {
  const t = useTranslations();
  const pathname = usePathname();
  // Open only for the page it was opened on, so navigating closes it without an effect.
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;
  const setOpen = (v: boolean | ((o: boolean) => boolean)) => {
    const next = typeof v === "function" ? v(open) : v;
    setOpenAt(next ? pathname : null);
  };
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); btn.current?.focus(); } };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <div className="xl:hidden">
      <button
        ref={btn}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
        className="grid h-11 w-11 place-items-center rounded-xl text-ink hover:bg-soft sm:h-12 sm:w-12"
        aria-label={open ? t("common.close") : t("common.menu")}
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>
      {open ? createPortal(
        <nav id="mobile-menu" aria-label={t("common.menu")} className="fixed inset-x-3 top-[4.5rem] bottom-24 z-40 overflow-y-auto rounded-2xl xl:hidden border border-line bg-surface p-4 shadow-[var(--shadow-float)]">
          <ul className="mx-auto max-w-md">
            {ITEMS.map(([key, href]) => (
              <li key={key} className="border-b border-line">
                <Link
                  href={href}
                  aria-current={pathname === href ? "page" : undefined}
                  className="flex min-h-14 items-center justify-between font-display text-lg font-medium text-ink"
                >
                  {t(`nav.${key}`)}
                  <span aria-hidden="true" className="text-accentink">→</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mx-auto mt-6 max-w-md border-t border-line pt-5">
            <DisplayControls />
          </div>
        </nav>,
        document.body,
      ) : null}
    </div>
  );
}
