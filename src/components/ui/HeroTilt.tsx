"use client";

import { useEffect, useRef } from "react";

/**
 * Soft 3D tilt (max 6 degrees) and layered depth for the hero portrait.
 * Pointer devices only, full motion only. Pure CSS variables, no library.
 */
export function HeroTilt({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(pointer: fine)").matches && window.matchMedia("(hover: hover)").matches;
    if (!fine) return;
    let raf = 0;
    const set = (rx: number, ry: number, px: number, py: number) => {
      el.style.setProperty("--rx", `${rx}deg`);
      el.style.setProperty("--ry", `${ry}deg`);
      el.style.setProperty("--px", String(px));
      el.style.setProperty("--py", String(py));
    };
    const onMove = (e: PointerEvent) => {
      if (document.documentElement.dataset.motion !== "full") return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const px = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2));
        const py = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2));
        set(-py * 6, px * 6, px, py);
      });
    };
    const reset = () => { cancelAnimationFrame(raf); set(0, 0, 0, 0); };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", reset);
    return () => { el.removeEventListener("pointermove", onMove); el.removeEventListener("pointerleave", reset); cancelAnimationFrame(raf); };
  }, []);

  return <div ref={ref} className={`tilt-stage ${className}`}>{children}</div>;
}
