"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { ThemeToggle } from "./ThemeToggle";

const listeners = new Set<() => void>();
const subscribe = (cb: () => void) => { listeners.add(cb); return () => { listeners.delete(cb); }; };
const notify = () => listeners.forEach((l) => l());

const store = (k: string, v: string) => { try { localStorage.setItem(k, v); } catch {} };

type Size = "normal" | "large" | "xlarge";
const getSize = (): Size => {
  const v = document.documentElement.dataset.textsize;
  return v === "large" || v === "xlarge" ? v : "normal";
};
function setSize(s: Size) {
  if (s === "normal") delete document.documentElement.dataset.textsize;
  else document.documentElement.dataset.textsize = s;
  store("textsize", s);
  notify();
}

type MotionPref = "auto" | "on" | "off";
const getMotionPref = (): MotionPref => {
  const v = document.documentElement.dataset.motionPref;
  return v === "on" || v === "off" ? v : "auto";
};
function setMotion(next: "on" | "off") {
  const r = document.documentElement;
  const osReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  r.dataset.motionPref = next;
  r.dataset.motion = next === "off" || osReduced ? "off" : "full";
  store("motion", next);
  notify();
}

const seg = "inline-flex rounded-xl bg-soft p-0.5";
const btn = (on: boolean) =>
  `grid h-10 min-w-10 place-items-center rounded-[10px] px-3 text-sm font-semibold ${on ? "bg-primary text-onprimary" : "text-muted hover:bg-surface"}`;

/** Theme, text size and animations. Used in the header popover and in the mobile menu. */
export function DisplayControls() {
  const t = useTranslations("display");
  const size = useSyncExternalStore(subscribe, getSize, () => "normal" as Size);
  const pref = useSyncExternalStore(subscribe, getMotionPref, () => "auto" as MotionPref);
  const motionOn = pref !== "off" && typeof document !== "undefined" ? document.documentElement.dataset.motion !== "off" : pref !== "off";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm text-muted">{t("theme")}</span>
        <ThemeToggle />
      </div>
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm text-muted" id="ts-label">{t("textSize")}</span>
        <div role="group" aria-labelledby="ts-label" className={seg}>
          {([["normal", "A"], ["large", "A+"], ["xlarge", "A++"]] as [Size, string][]).map(([v, label]) => (
            <button key={v} type="button" aria-pressed={size === v} aria-label={t(`size_${v}`)} onClick={() => setSize(v)} className={btn(size === v)}>
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm text-muted" id="mo-label">{t("animations")}</span>
        <div role="group" aria-labelledby="mo-label" className={seg}>
          <button type="button" aria-pressed={motionOn} onClick={() => setMotion("on")} className={btn(motionOn)}>{t("on")}</button>
          <button type="button" aria-pressed={!motionOn} onClick={() => setMotion("off")} className={btn(!motionOn)}>{t("off")}</button>
        </div>
      </div>
    </div>
  );
}
