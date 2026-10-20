"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts up once when scrolled into view. The final value is in the HTML first (no-JS, screen readers, LCP).
 * Skipped for anything already visible at load (no flicker) and whenever animations are off.
 */
export function CountUp({ value, suffix = "", className = "" }: { value: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (document.documentElement.dataset.motion === "off") return;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // already on screen at load
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const dur = 900;
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / dur);
        setShown(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      setShown(0);
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value]);

  return (
    <span ref={ref} className={className} aria-label={`${value}${suffix}`}>
      <span aria-hidden="true">{shown}{suffix}</span>
    </span>
  );
}
