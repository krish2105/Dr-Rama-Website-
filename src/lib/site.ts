import site from "../../content/site.json";

export const SITE = site;
export const isDev = process.env.NODE_ENV !== "production";
// Canonical origin: explicit env first, then the Vercel production URL, then localhost.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

// Search engines are blocked until NEXT_PUBLIC_INDEXABLE=true is set (do this at launch, with the real domain).
export const INDEXABLE = process.env.NEXT_PUBLIC_INDEXABLE === "true";

export const telHref = `tel:${site.phone.e164}`;

export function waNumber(): string {
  const n = site.whatsapp.sameAsPhone ? site.phone.e164 : site.whatsapp.e164;
  return (n ?? site.phone.e164).replace(/\D/g, "");
}

export function waHref(message?: string): string {
  const base = `https://wa.me/${waNumber()}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const mapsEmbedUrl = (site.mapsEmbedUrl ?? null) as string | null;

export function mapsDirectionsHref(): string {
  if (site.mapsUrl) return site.mapsUrl;
  const q = [site.clinic.name, site.address.street, site.address.locality, site.address.postalCode].join(", ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}

export const NAV = [
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "careAreas", href: "/care-areas" },
  { key: "blog", href: "/blog" },
  { key: "faq", href: "/faq" },
  { key: "contact", href: "/contact" },
] as const;

export const ALL_ROUTES = [
  "",
  "/about",
  "/services",
  "/care-areas",
  "/book",
  "/how-to-reach",
  "/first-visit",
  "/experiences",
  "/blog",
  "/faq",
  "/contact",
  "/privacy",
] as const;
