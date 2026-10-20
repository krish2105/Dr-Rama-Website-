"use client";

import { useEffect } from "react";
import { cleanSource } from "@/lib/booking";

/** Keeps only utm_source and utm_medium (whitelisted) for the visit, so a booking can record where it came from. */
export function UtmCapture() {
  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search);
      if (q.has("utm_source")) {
        sessionStorage.setItem("src", cleanSource(q.get("utm_source")));
        sessionStorage.setItem("med", (q.get("utm_medium") ?? "").slice(0, 24).replace(/[^a-z0-9_-]/gi, ""));
      }
    } catch {}
  }, []);
  return null;
}
