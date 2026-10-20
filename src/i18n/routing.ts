import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "hi"],
  defaultLocale: "en",
  localePrefix: "always",
  // Stable URLs for SEO: no automatic redirect by browser language.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
