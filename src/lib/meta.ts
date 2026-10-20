import type { Metadata } from "next";

/** Canonical + hreflang for a page, optionally noindex (thin pages with no confirmed content yet). */
export function pageMeta(locale: string, route: string, title: string, opts: { description?: string; noindex?: boolean } = {}): Metadata {
  return {
    title,
    ...(opts.description ? { description: opts.description } : {}),
    alternates: { canonical: `/${locale}${route}`, languages: { en: `/en${route}`, hi: `/hi${route}`, "x-default": `/en${route}` } },
    ...(opts.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
