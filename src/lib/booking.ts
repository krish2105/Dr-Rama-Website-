import { z } from "zod";

export const PATIENT_TYPES = ["self", "child", "other"] as const;
export const VISIT_TYPES = ["first", "followup", "report", "notsure"] as const;
export const CALLBACK_WINDOWS = ["morning", "afternoon", "evening"] as const;
export const SOURCES = ["instagram", "facebook", "google", "qr", "whatsapp", "direct", "other"] as const;

const phone = z
  .string()
  .trim()
  .transform((v) => v.replace(/[\s()-]/g, ""))
  .refine((v) => /^(\+91|91|0)?[6-9]\d{9}$/.test(v), "phone");

/** Minimum data only: who, which slot, contact, visit type (no free-text health detail), consent. */
export const bookingSchema = z
  .object({
    patientType: z.enum(PATIENT_TYPES, { message: "patientType" }),
    name: z.string().trim().min(2, "name").max(80, "name"),
    guardianName: z.string().trim().max(80, "guardianName").optional(),
    authorised: z.boolean().optional(),
    phone,
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "slot")
      .refine((v) => {
        const d = new Date(`${v}T00:00:00`);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return !Number.isNaN(d.getTime()) && d.getTime() >= today.getTime() - 86_400_000;
      }, "slot"),
    time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "slot"),
    visitType: z.enum(VISIT_TYPES, { message: "visitType" }),
    consent: z.literal(true, { message: "consent" }),
    source: z.enum(SOURCES).optional(),
    medium: z.string().max(24).optional(),
    website: z.string().max(200).optional(), // honeypot: must stay empty (checked in the API route)
    locale: z.enum(["en", "hi"]).default("en"),
  })
  .superRefine((v, ctx) => {
    if (v.patientType !== "self") {
      if (!v.guardianName || v.guardianName.length < 2) ctx.addIssue({ code: "custom", path: ["guardianName"], message: "guardianName" });
      if (v.authorised !== true) ctx.addIssue({ code: "custom", path: ["authorised"], message: "authorised" });
    }
  });

export const callbackSchema = z.object({
  name: z.string().trim().min(2, "name").max(80, "name"),
  phone,
  window: z.enum(CALLBACK_WINDOWS, { message: "window" }),
  consent: z.literal(true, { message: "consent" }),
  source: z.enum(SOURCES).optional(),
  website: z.string().max(200).optional(),
  locale: z.enum(["en", "hi"]).default("en"),
});

export type BookingInput = z.infer<typeof bookingSchema>;
export type FieldKey = "patientType" | "name" | "guardianName" | "authorised" | "phone" | "slot" | "visitType" | "consent" | "window";
const FIELDS = ["patientType", "name", "guardianName", "authorised", "phone", "slot", "visitType", "consent", "window"];

export function fieldErrors(error: z.ZodError): Partial<Record<FieldKey, true>> {
  const out: Partial<Record<FieldKey, true>> = {};
  for (const issue of error.issues) {
    const k = String(issue.path[0] ?? "");
    const key = k === "date" || k === "time" ? "slot" : k;
    if (FIELDS.includes(key)) out[key as FieldKey] = true;
  }
  return out;
}

/** Only these UTM values are kept (source and medium), nothing else about the visit. */
export function cleanSource(v: string | null | undefined): (typeof SOURCES)[number] {
  const s = (v ?? "").toLowerCase();
  return (SOURCES as readonly string[]).includes(s) ? (s as (typeof SOURCES)[number]) : s ? "other" : "direct";
}
