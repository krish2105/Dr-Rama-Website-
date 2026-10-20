"use client";

import Image from "next/image";
import { useState, useSyncExternalStore } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  bookingSchema, callbackSchema, cleanSource, fieldErrors, CALLBACK_WINDOWS, PATIENT_TYPES, VISIT_TYPES,
  type FieldKey,
} from "@/lib/booking";
import { buildIcs } from "@/lib/ics";
import { getSlotDays, SLOT_MINUTES, type SlotDay } from "@/lib/slots";
import { fmtTime } from "@/lib/openNow";
import { mapsDirectionsHref, SITE, telHref, waHref } from "@/lib/site";

type Errors = Partial<Record<FieldKey, true>>;
type Status = "idle" | "sending" | "done" | "error" | "unavailable";
type Tab = "book" | "call";
type Summary = { name: string; date: string; time: string };

// Open request slots are computed once in the browser (India time); the server render shows a placeholder.
let slotCache: SlotDay[] | null = null;
const noop = () => () => {};
const getDays = () => (slotCache ??= getSlotDays());

const field = "mt-1 block min-h-12 w-full rounded-2xl border border-line bg-bg px-4 text-base text-ink placeholder:text-muted focus:border-primary";
const labelCls = "block font-medium text-ink";
const chip = (on: boolean) =>
  `press min-h-12 rounded-2xl border px-4 text-sm font-semibold ${on ? "border-primary bg-primary text-onprimary" : "border-line bg-bg text-ink hover:bg-soft"}`;

function source() {
  try { return { source: cleanSource(sessionStorage.getItem("src")), medium: sessionStorage.getItem("med") || undefined }; } catch { return { source: "direct" as const, medium: undefined }; }
}

async function send(payload: Record<string, unknown>): Promise<{ status: Status; fields?: Errors; mode?: string }> {
  try {
    const res = await fetch("/api/booking", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.ok) return { status: "done", mode: data.mode };
    if (data?.error === "not_configured") return { status: "unavailable" };
    return { status: "error", fields: data?.fields };
  } catch {
    return { status: "error" };
  }
}

export function BookingForm() {
  const t = useTranslations("book");
  const [tab, setTab] = useState<Tab>("book");
  return (
    <div>
      <div role="tablist" aria-label={t("title")} className="mb-5 inline-flex rounded-2xl bg-soft p-1">
        {(["book", "call"] as Tab[]).map((k) => (
          <button key={k} id={`tab-${k}-btn`} type="button" role="tab" aria-selected={tab === k} onClick={() => setTab(k)} className={`press min-h-12 rounded-xl px-4 text-sm font-semibold ${tab === k ? "bg-primary text-onprimary" : "text-muted hover:bg-surface"}`}>
            {k === "book" ? t("tabBook") : t("tabCall")}
          </button>
        ))}
      </div>
      {tab === "book" ? <Wizard /> : <CallBack />}
      <p className="mt-4 text-sm text-muted">{t("deletion")}</p>
    </div>
  );
}

function PreferCall() {
  const t = useTranslations("book");
  return (
    <a href={telHref} data-evt="click_call" className="press mt-5 inline-flex min-h-12 items-center rounded-full border border-primary/40 px-5 text-sm font-semibold text-primary hover:bg-soft">
      {t("preferCall")} {SITE.phone.display}
    </a>
  );
}

function Wizard() {
  const t = useTranslations("book");
  const c = useTranslations("common");
  const locale = useLocale();
  const days = useSyncExternalStore(noop, getDays, () => null);
  const [step, setStep] = useState(1);
  const [patientType, setPatientType] = useState<(typeof PATIENT_TYPES)[number] | "">("");
  const [visitType, setVisitType] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [mode, setMode] = useState<string | undefined>();
  const [sum, setSum] = useState<Summary>({ name: "", date: "", time: "" });

  const intl = locale === "hi" ? "hi-IN" : "en-IN";
  const dayLabel = (d: Date) => new Intl.DateTimeFormat(intl, { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" }).format(d);
  const dayLong = (iso: string) => new Intl.DateTimeFormat(intl, { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));
  const chosen = days?.find((d) => d.date === date);

  const errKey: Record<FieldKey, string> = {
    patientType: "errPatientType", visitType: "errVisitType", slot: "errSlot", name: "errName", guardianName: "errGuardianName",
    authorised: "errAuthorised", phone: "errPhone", consent: "errConsent", window: "errWindow",
  };
  const fail = (e: Errors) => { setErrors(e); return false; };

  function next() {
    if (step === 1) {
      const e: Errors = {};
      if (!patientType) e.patientType = true;
      if (!visitType) e.visitType = true;
      if (Object.keys(e).length) return void fail(e);
    }
    if (step === 2 && (!date || !time)) return void fail({ slot: true });
    setErrors({});
    setStep((s) => s + 1);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = {
      kind: "booking", patientType, name: fd.get("name"), guardianName: fd.get("guardianName") || undefined, authorised: fd.get("authorised") === "on",
      phone: fd.get("phone"), date, time, visitType, consent: fd.get("consent") === "on", website: fd.get("website") ?? "", locale, ...source(),
    };
    const parsed = bookingSchema.safeParse(raw);
    if (!parsed.success) return void fail(fieldErrors(parsed.error));
    setErrors({});
    setStatus("sending");
    const r = await send({ ...parsed.data, kind: "booking" });
    setSum({ name: parsed.data.name, date, time });
    setMode(r.mode);
    if (r.status === "error" && r.fields) setErrors(r.fields);
    setStatus(r.status);
    if (r.status === "done") window.dispatchEvent(new Event("clinic:booking-submitted")); // no details attached
  }

  const when = sum.date ? `${dayLong(sum.date)}, ${fmtTime(sum.time, locale)}` : "";

  if (status === "unavailable") {
    const msg = t("unavailableMsg", { name: sum.name, date: dayLong(sum.date), time: fmtTime(sum.time, locale) });
    return (
      <div className="form-card" role="status">
        <Image src="/art/empty-phone.webp" alt="" width={96} height={96} className="fade-in mb-3 h-24 w-24" />
        <h2 className="text-xl text-primary">{t("unavailableTitle")}</h2>
        <p className="mt-3 text-base">{t("unavailableBody")}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href={waHref(msg)} target="_blank" rel="noopener noreferrer" className="press inline-flex min-h-12 items-center rounded-full bg-primary px-5 font-semibold text-onprimary">{t("unavailableWhatsapp")}</a>
          <a href={telHref} className="press inline-flex min-h-12 items-center rounded-full border border-primary/50 px-5 font-semibold text-primary">{t("unavailableCall")}</a>
        </div>
      </div>
    );
  }

  if (status === "done") {
    const msg = t("successWhatsappMsg", { name: sum.name, date: dayLong(sum.date), time: fmtTime(sum.time, locale) });
    const downloadIcs = () => {
      const ics = buildIcs({
        date: sum.date, time: sum.time, minutes: SLOT_MINUTES, summary: t("icsSummary"),
        location: [...SITE.address.lines].join(", "), description: t("icsNote"),
      });
      const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
      const a = document.createElement("a");
      a.href = url; a.download = "appointment-request.ics"; a.click();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    };
    return (
      <div className="form-card" role="status">
        <Image src="/art/booking-confirmed.webp" alt="" width={112} height={112} className="fade-in mb-3 h-28 w-28" />
        <h2 className="text-2xl text-primary">{t("successTitle")}</h2>
        <p className="mt-3 text-base">{t("successBody")}</p>
        <dl className="mt-5 space-y-1 rounded-2xl bg-soft p-4 text-sm">
          <dt className="font-semibold text-ink">{t("yourRequest")}</dt>
          <dd>{sum.name}</dd>
          <dd>{when}</dd>
          <dd className="text-muted">{SITE.address.lines.join(", ")}</dd>
        </dl>
        {mode === "dev" ? <p className="dev-todo mt-4">{t("devNote")}</p> : null}
        <div className="mt-5 flex flex-wrap gap-3">
          <a href={waHref(msg)} target="_blank" rel="noopener noreferrer" className="press inline-flex min-h-12 items-center rounded-full bg-primary px-5 font-semibold text-onprimary">{t("successWhatsapp")}</a>
          <button type="button" onClick={downloadIcs} className="press inline-flex min-h-12 items-center rounded-full border border-primary/50 px-5 font-semibold text-primary">{t("addCalendar")}</button>
          <a href={mapsDirectionsHref()} target="_blank" rel="noopener noreferrer" className="press inline-flex min-h-12 items-center rounded-full px-5 font-semibold text-primary underline">{c("directions")}</a>
        </div>
      </div>
    );
  }

  const errList = (Object.keys(errors) as FieldKey[]).map((k) => t(errKey[k]));
  const fe = (k: FieldKey) => (errors[k] ? <p id={`${k}-err`} className="mt-1 text-sm font-medium text-accentink">{t(errKey[k])}</p> : null);
  const aria = (k: FieldKey) => ({ "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `${k}-err` : undefined });
  const grouped = (from: number, to: number) => chosen?.slots.filter((s) => Number(s.slice(0, 2)) >= from && Number(s.slice(0, 2)) < to) ?? [];

  return (
    <form onSubmit={onSubmit} noValidate className="form-card space-y-5" aria-labelledby="step-title">
      <div className="absolute -left-[9999px]" aria-hidden="true"><label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label></div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accentink">{t("stepLabel", { n: step })}</p>
        <div className="mt-2 h-1.5 rounded-full bg-soft" aria-hidden="true"><div className="h-full rounded-full bg-primary transition-[width] duration-300" style={{ width: `${(step / 3) * 100}%` }} /></div>
        <h2 id="step-title" className="mt-3 text-xl text-ink">{t(`step${step}`)}</h2>
      </div>

      {errList.length ? (
        <div role="alert" className="rounded-2xl border border-accent/50 bg-accent/10 p-3 text-sm">
          <p className="font-semibold text-accentink">{t("summaryTitle")}</p>
          <ul className="mt-1 list-disc ps-5">{errList.map((m) => <li key={m}>{m}</li>)}</ul>
        </div>
      ) : null}
      {status === "error" ? <p role="alert" className="font-medium text-accentink">{t("errGeneric")}</p> : null}

      {step === 1 ? (
        <>
          <div role="radiogroup" aria-label={t("step1")} className="grid gap-3 sm:grid-cols-3">
            {PATIENT_TYPES.map((p) => (
              <button key={p} type="button" role="radio" aria-checked={patientType === p} onClick={() => setPatientType(p)} className={chip(patientType === p)}>
                {t(p === "self" ? "forSelf" : p === "child" ? "forChild" : "forOther")}
              </button>
            ))}
          </div>
          {fe("patientType")}
          <div>
            <label htmlFor="visitType" className={labelCls}>{t("visitType")}</label>
            <select id="visitType" value={visitType} onChange={(e) => setVisitType(e.target.value)} className={field} {...aria("visitType")}>
              <option value="" disabled>—</option>
              {VISIT_TYPES.map((v) => <option key={v} value={v}>{t(`visit_${v}`)}</option>)}
            </select>
            <p className="mt-1 text-sm text-muted">{t("visitHint")}</p>
            {fe("visitType")}
          </div>
        </>
      ) : null}

      {step === 2 ? (
        days === null ? (
          <p className="text-muted">{t("loadingSlots")}</p>
        ) : days.length === 0 ? (
          <div className="text-center">
            <Image src="/art/empty-calendar.webp" alt="" width={96} height={96} className="mx-auto mb-2 h-24 w-24" />
            <p className="font-display text-lg font-semibold text-ink">{t("noSlotsTitle")}</p>
            <p className="mt-1 text-muted">{t("noSlotsBody")}</p>
            <button type="button" onClick={() => document.getElementById("tab-call-btn")?.click()} className="press mt-3 inline-flex min-h-12 items-center rounded-full bg-primary px-5 font-semibold text-onprimary">{t("tabCall")}</button>
          </div>
        ) : (
          <>
            <div>
              <p className="font-medium text-ink" id="day-label">{t("pickDay")}</p>
              <div role="radiogroup" aria-labelledby="day-label" className="-mx-1 mt-2 flex snap-x gap-2 overflow-x-auto px-1 pb-2">
                {days.map((d) => (
                  <button key={d.date} type="button" role="radio" aria-checked={date === d.date} onClick={() => { setDate(d.date); setTime(""); }} className={`${chip(date === d.date)} snap-start whitespace-nowrap`}>
                    {dayLabel(d.label)}
                  </button>
                ))}
              </div>
            </div>
            {chosen ? (
              <div>
                <p className="font-medium text-ink" id="time-label">{t("pickTime")}</p>
                {([[0, 12, "morning"], [12, 16, "afternoon"], [16, 24, "evening"]] as [number, number, string][]).map(([a, b, k]) => {
                  const list = grouped(a, b);
                  return list.length ? (
                    <div key={k} className="mt-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">{t(k)}</p>
                      <div role="radiogroup" aria-labelledby="time-label" className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
                        {list.map((s) => (
                          <button key={s} type="button" role="radio" aria-checked={time === s} onClick={() => setTime(s)} className={chip(time === s)}>{fmtTime(s, locale)}</button>
                        ))}
                      </div>
                    </div>
                  ) : null;
                })}
              </div>
            ) : null}
            {date && time ? <p className="rounded-xl bg-soft px-4 py-2 text-sm font-medium">{t("selected")}: {dayLong(date)}, {fmtTime(time, locale)}</p> : null}
            {fe("slot")}
          </>
        )
      ) : null}

      {step === 3 ? (
        <>
          <div>
            <label htmlFor="name" className={labelCls}>{patientType === "self" ? t("yourName") : t("patientName")}</label>
            <input id="name" name="name" type="text" autoComplete={patientType === "self" ? "name" : "off"} required className={field} {...aria("name")} />
            {fe("name")}
          </div>
          {patientType !== "self" ? (
            <>
              <div>
                <label htmlFor="guardianName" className={labelCls}>{t("guardianName")}</label>
                <input id="guardianName" name="guardianName" type="text" autoComplete="name" className={field} {...aria("guardianName")} />
                {fe("guardianName")}
              </div>
              <div>
                <label className="flex min-h-12 items-start gap-3">
                  <input type="checkbox" name="authorised" className="mt-1 h-6 w-6 shrink-0 accent-[var(--primary)]" {...aria("authorised")} />
                  <span>{t("authorised")}</span>
                </label>
                {fe("authorised")}
              </div>
            </>
          ) : null}
          <div>
            <label htmlFor="phone" className={labelCls}>{t("phone")}</label>
            <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required className={field} {...aria("phone")} />
            <p className="mt-1 text-sm text-muted">{t("phoneHint")}</p>
            {fe("phone")}
          </div>
          <div>
            <label className="flex min-h-12 items-start gap-3">
              <input type="checkbox" name="consent" className="mt-1 h-6 w-6 shrink-0 accent-[var(--primary)]" {...aria("consent")} />
              <span>{t("consent")}{" "}<Link href="/privacy" className="font-medium text-primary underline">{t("consentLink")}</Link></span>
            </label>
            {fe("consent")}
          </div>
        </>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        {step > 1 ? <button type="button" onClick={() => { setErrors({}); setStep((s) => s - 1); }} className="press min-h-12 rounded-full border border-primary/40 px-5 font-semibold text-primary">{t("back")}</button> : null}
        {step < 3 ? (
          <button type="button" onClick={next} className="press min-h-12 rounded-full bg-primary px-8 font-semibold text-onprimary">{t("next")}</button>
        ) : (
          <button type="submit" disabled={status === "sending"} className="press min-h-12 rounded-full bg-primary px-8 text-base font-semibold text-onprimary disabled:opacity-60">
            {status === "sending" ? t("sending") : t("submit")}
          </button>
        )}
      </div>
      <PreferCall />
    </form>
  );
}

function CallBack() {
  const t = useTranslations("book");
  const locale = useLocale();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [sum, setSum] = useState({ name: "", window: "" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = { kind: "callback", name: fd.get("name"), phone: fd.get("phone"), window: fd.get("window"), consent: fd.get("consent") === "on", website: fd.get("website") ?? "", locale, source: source().source };
    const parsed = callbackSchema.safeParse(raw);
    if (!parsed.success) return void setErrors(fieldErrors(parsed.error));
    setErrors({});
    setStatus("sending");
    const r = await send({ ...parsed.data, kind: "callback" });
    setSum({ name: parsed.data.name, window: t(parsed.data.window) });
    setStatus(r.status);
  }

  if (status === "done") {
    return (
      <div className="form-card" role="status">
        <Image src="/art/booking-confirmed.webp" alt="" width={96} height={96} className="fade-in mb-3 h-24 w-24" />
        <h2 className="text-xl text-primary">{t("cbSuccessTitle")}</h2>
        <p className="mt-3">{t("cbSuccessBody")}</p>
      </div>
    );
  }
  if (status === "unavailable") {
    const msg = t("cbUnavailableMsg", { name: sum.name, window: sum.window });
    return (
      <div className="form-card" role="status">
        <Image src="/art/empty-phone.webp" alt="" width={96} height={96} className="fade-in mb-3 h-24 w-24" />
        <h2 className="text-xl text-primary">{t("unavailableTitle")}</h2>
        <p className="mt-3">{t("unavailableBody")}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href={waHref(msg)} target="_blank" rel="noopener noreferrer" className="press inline-flex min-h-12 items-center rounded-full bg-primary px-5 font-semibold text-onprimary">{t("unavailableWhatsapp")}</a>
          <a href={telHref} className="press inline-flex min-h-12 items-center rounded-full border border-primary/50 px-5 font-semibold text-primary">{t("unavailableCall")}</a>
        </div>
      </div>
    );
  }
  const fe = (k: FieldKey, key: string) => (errors[k] ? <p className="mt-1 text-sm font-medium text-accentink">{t(key)}</p> : null);
  return (
    <form onSubmit={onSubmit} noValidate className="form-card space-y-5">
      <div className="absolute -left-[9999px]" aria-hidden="true"><label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <div>
        <h2 className="text-xl text-ink">{t("cbTitle")}</h2>
        <p className="mt-1 text-muted">{t("cbLead")}</p>
      </div>
      {status === "error" ? <p role="alert" className="font-medium text-accentink">{t("errGeneric")}</p> : null}
      <div>
        <label htmlFor="cb-name" className={labelCls}>{t("yourName")}</label>
        <input id="cb-name" name="name" type="text" autoComplete="name" className={field} />
        {fe("name", "errName")}
      </div>
      <div>
        <label htmlFor="cb-phone" className={labelCls}>{t("phone")}</label>
        <input id="cb-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" className={field} />
        {fe("phone", "errPhone")}
      </div>
      <div>
        <label htmlFor="cb-window" className={labelCls}>{t("cbWindow")}</label>
        <select id="cb-window" name="window" defaultValue="" className={field}>
          <option value="" disabled>—</option>
          {CALLBACK_WINDOWS.map((w) => <option key={w} value={w}>{t(w)}</option>)}
        </select>
        {fe("window", "errWindow")}
      </div>
      <div>
        <label className="flex min-h-12 items-start gap-3">
          <input type="checkbox" name="consent" className="mt-1 h-6 w-6 shrink-0 accent-[var(--primary)]" />
          <span>{t("consent")}{" "}<Link href="/privacy" className="font-medium text-primary underline">{t("consentLink")}</Link></span>
        </label>
        {fe("consent", "errConsent")}
      </div>
      <button type="submit" disabled={status === "sending"} className="press min-h-12 rounded-full bg-primary px-8 font-semibold text-onprimary disabled:opacity-60">{status === "sending" ? t("sending") : t("cbSubmit")}</button>
      <div><PreferCall /></div>
    </form>
  );
}
