"use client";

import { useEffect } from "react";

/** Marks <html data-scrolling="fast"> while the page is scrolled quickly, so the dock can shrink to icons. */
export function ScrollState() {
  useEffect(() => {
    const r = document.documentElement;
    let last = window.scrollY;
    let lastT = performance.now();
    let timer: number | undefined;
    const onScroll = () => {
      const now = performance.now();
      const dy = window.scrollY - last;
      const v = dy / Math.max(1, now - lastT);
      last = window.scrollY;
      lastT = now;
      if (v > 1.1) r.dataset.scrolling = "fast";
      window.clearTimeout(timer);
      timer = window.setTimeout(() => { delete r.dataset.scrolling; }, 450);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); window.clearTimeout(timer); delete r.dataset.scrolling; };
  }, []);
  return null;
}
