import { z } from "zod";

export const TIME_SLOTS = ["morning", "afternoon", "evening", "any"] as const;

// Minimum data only: name, phone, preferred date/time, one-line reason, consent.
export const bookingSchema = z.object({
  name: z.string().trim().min(2, "name").max(80, "name"),
  phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/[\s()-]/g, ""))
    .refine((v) => /^(\+91|91|0)?[6-9]\d{9}$/.test(v), "phone"),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "date")
    .refine((v) => {
      const d = new Date(`${v}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return !Number.isNaN(d.getTime()) && d >= today;
    }, "date"),
  time: z.enum(TIME_SLOTS, { message: "time" }),
  reason: z.string().trim().min(3, "reason").max(160, "reason"),
  consent: z.literal(true, { message: "consent" }),
  website: z.string().max(200).optional(), // honeypot: must stay empty (checked in the API route)
  locale: z.enum(["en", "hi"]).default("en"),
});

export type BookingInput = z.infer<typeof bookingSchema>;
export type FieldKey = "name" | "phone" | "date" | "time" | "reason" | "consent";

export function fieldErrors(error: z.ZodError): Partial<Record<FieldKey, true>> {
  const out: Partial<Record<FieldKey, true>> = {};
  for (const issue of error.issues) {
    const k = issue.path[0];
    if (typeof k === "string" && ["name", "phone", "date", "time", "reason", "consent"].includes(k)) out[k as FieldKey] = true;
  }
  return out;
}
