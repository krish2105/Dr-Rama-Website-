"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { bookingSchema, fieldErrors, TIME_SLOTS, type FieldKey } from "@/lib/booking";
import { telHref, waHref } from "@/lib/site";

type Errors = Partial<Record<FieldKey, true>>;
type Status = "idle" | "sending" | "done" | "error" | "unavailable";

const field =
  "mt-1 block min-h-12 w-full rounded-2xl border border-line bg-bg px-4 text-base text-ink placeholder:text-muted focus:border-primary";
// Set when the field is focused, so the server render and the browser never disagree on "today".
function setMinToday(el: HTMLInputElement) {
  if (el.min) return;
  const d = new Date();
  el.min = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}
const labelCls = "block font-medium text-ink";

export function BookingForm() {
  const t = useTranslations("book");
  const locale = useLocale() as "en" | "hi";
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [mode, setMode] = useState<string | undefined>();
  const [summary, setSummary] = useState({ name: "", date: "", time: "" });
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = {
      name: fd.get("name"),
      phone: fd.get("phone"),
      date: fd.get("date"),
      time: fd.get("time"),
      reason: fd.get("reason"),
      consent: fd.get("consent") === "on",
      website: fd.get("website") ?? "",
      locale,
    };
    const parsed = bookingSchema.safeParse(raw);
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      setStatus("idle");
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/booking", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        if (data?.fields) setErrors(data.fields);
        if (data?.error === "not_configured") {
          setSummary({ name: parsed.data.name, date: parsed.data.date, time: parsed.data.time });
          setStatus("unavailable");
          return;
        }
        setStatus("error");
        return;
      }
      setMode(data.mode);
      setSummary({ name: parsed.data.name, date: parsed.data.date, time: parsed.data.time });
      window.dispatchEvent(new Event("clinic:booking-submitted")); // no details attached
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "unavailable") {
    // No database yet: hand the visitor a ready WhatsApp message (name, date, slot only; never the reason).
    const msg = t("unavailableMsg", { name: summary.name, date: summary.date, slot: t(`slot_${summary.time}`) });
    return (
      <div className="form-card" role="status">
        <h2 className="text-xl text-primary">{t("unavailableTitle")}</h2>
        <p className="mt-3 text-base">{t("unavailableBody")}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href={waHref(msg)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center rounded-full bg-primary px-5 font-semibold text-onprimary">{t("unavailableWhatsapp")}</a>
          <a href={telHref} className="inline-flex min-h-12 items-center rounded-full border border-primary/50 px-5 font-semibold text-primary">{t("unavailableCall")}</a>
        </div>
      </div>
    );
  }

  if (status === "done") {
    // The WhatsApp message carries name, date and slot only: never the reason (health detail).
    const msg = `${t("successWhatsappMsg", { name: summary.name, date: summary.date, slot: t(`slot_${summary.time}`) })}`;
    return (
      <div className="form-card" role="status">
        <h2 className="text-2xl text-primary">{t("successTitle")}</h2>
        <p className="mt-3 text-lg">{t("successBody")}</p>
        {mode === "dev" ? <p className="dev-todo mt-4">{t("devNote")}</p> : null}
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={waHref(msg)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center rounded-full bg-primary px-6 font-semibold text-onprimary"
          >
            {t("successWhatsapp")}
          </a>
        </div>
      </div>
    );
  }

  const err = (k: FieldKey, key: string) =>
    errors[k] ? (
      <p id={`${k}-err`} className="mt-1 text-[0.95rem] font-medium text-accentink">{t(key)}</p>
    ) : null;
  const aria = (k: FieldKey) => ({ "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `${k}-err` : undefined });

  return (
    <form onSubmit={onSubmit} noValidate className="form-card space-y-5" aria-describedby="form-lead">
      {/* honeypot: hidden from people, visible to bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div>
        <label htmlFor="name" className={labelCls}>{t("name")}</label>
        <input id="name" name="name" type="text" autoComplete="name" required className={field} {...aria("name")} />
        {err("name", "errName")}
      </div>
      <div>
        <label htmlFor="phone" className={labelCls}>{t("phone")}</label>
        <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required className={field} {...aria("phone")} />
        <p className="mt-1 text-sm text-muted">{t("phoneHint")}</p>
        {err("phone", "errPhone")}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="date" className={labelCls}>{t("date")}</label>
          <input id="date" name="date" type="date" onFocus={(e) => setMinToday(e.currentTarget)} required className={field} {...aria("date")} />
          {err("date", "errDate")}
        </div>
        <div>
          <label htmlFor="time" className={labelCls}>{t("time")}</label>
          <select id="time" name="time" required defaultValue="" className={field} {...aria("time")}>
            <option value="" disabled>—</option>
            {TIME_SLOTS.map((s) => <option key={s} value={s}>{t(`slot_${s}`)}</option>)}
          </select>
          {err("time", "errTime")}
        </div>
      </div>
      <div>
        <label htmlFor="reason" className={labelCls}>{t("reason")}</label>
        <input id="reason" name="reason" type="text" maxLength={160} required className={field} {...aria("reason")} />
        <p className="mt-1 text-sm text-muted">{t("reasonHint")}</p>
        {err("reason", "errReason")}
      </div>
      <div>
        <label className="flex min-h-12 items-start gap-3">
          <input type="checkbox" name="consent" className="mt-1 h-6 w-6 shrink-0 accent-[var(--primary)]" {...aria("consent")} />
          <span>
            {t("consent")}{" "}
            <Link href="/privacy" className="font-medium text-primary underline">{t("consentLink")}</Link>
          </span>
        </label>
        {err("consent", "errConsent")}
      </div>
      {status === "error" ? <p role="alert" className="font-medium text-accentink">{t("errGeneric")}</p> : null}
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-primary px-8 text-lg font-semibold text-onprimary hover:brightness-110 disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? t("sending") : t("submit")}
      </button>
      <p className="text-sm text-muted">{t("deletion")}</p>
    </form>
  );
}
