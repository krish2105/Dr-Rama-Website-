"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { DisplayControls } from "./DisplayControls";

/** Header button that opens a small panel with theme, text size and animations. */
export function DisplayMenu() {
  const t = useTranslations("display");
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const onDown = (e: PointerEvent) => { if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", onDown); };
  }, [open]);

  return (
    <div ref={wrap} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="display-panel"
        aria-label={t("title")}
        title={t("title")}
        onClick={() => setOpen((o) => !o)}
        className="press grid h-12 w-12 place-items-center rounded-xl text-ink hover:bg-soft"
      >
        <span aria-hidden="true" className="font-display text-lg font-semibold leading-none">Aa</span>
      </button>
      {open ? (
        <div id="display-panel" role="dialog" aria-label={t("title")} className="absolute end-0 top-[calc(100%+0.6rem)] z-50 w-72 rounded-2xl border border-line bg-surface p-4 shadow-[var(--shadow-float)]">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-accentink">{t("title")}</p>
          <DisplayControls />
        </div>
      ) : null}
    </div>
  );
}
