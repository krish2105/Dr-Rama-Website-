import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { ALL_ROUTES, SITE_URL } from "@/lib/site";
import { getPosts } from "@/lib/content";

// Pages with no confirmed content yet are noindex and left out of the sitemap.
const THIN = new Set(["/experiences"]); // empty pages stay out of the sitemap

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const add = (route: string) => {
    const languages = Object.fromEntries(routing.locales.map((l) => [l, `${SITE_URL}/${l}${route}`]));
    for (const l of routing.locales) entries.push({ url: `${SITE_URL}/${l}${route}`, alternates: { languages } });
  };
  for (const r of ALL_ROUTES) if (!THIN.has(r)) add(r);
  // Drafts are noindex, so they stay out until approved.
  for (const p of getPosts("en").filter((p) => p.status !== "DRAFT")) add(`/blog/${p.slug}`);
  return entries;
}
