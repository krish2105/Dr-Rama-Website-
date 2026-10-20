import { getTranslations } from "next-intl/server";
import { SITE } from "@/lib/site";

/** One plain line with the confirmed fee and payment methods. Renders nothing if the clinic has not confirmed them. */
export async function feeLine(locale: string) {
  if (!SITE.fees?.confirmed || !SITE.payment?.confirmed) return null;
  const t = await getTranslations({ locale, namespace: "fees" });
  return t("line", { amount: SITE.fees.consultation.display });
}
