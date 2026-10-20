import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SITE, telHref, mapsDirectionsHref } from "@/lib/site";
import { DevTodo } from "@/components/ui/DevTodo";

export function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const lines = locale === "hi" ? SITE.address.linesHi : SITE.address.lines;
  const reg = SITE.registration;
  return (
    <footer className="mt-24 border-t border-line bg-surface2 pb-24 md:pb-0">
      <div className="wood-edge" aria-hidden="true" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-xl font-semibold text-primary">{t("meta.siteName")}</p>
          <p className="mt-1 text-muted">
            {locale === "hi" ? SITE.doctor.nameHi : SITE.doctor.name}, {locale === "hi" ? SITE.doctor.degreeHi : SITE.doctor.degree}
          </p>
          <div className="mt-4 text-sm">
            {reg.number ? (
              <p>{t("footer.registration")}: {reg.council} {reg.number}</p>
            ) : (
              <DevTodo>State council name and registration number are missing (content/TODO.md).</DevTodo>
            )}
          </div>
        </div>
        <div>
          <p className="marginalia mb-2">{t("footer.visit")}</p>
          <address className="not-italic text-muted">
            {lines.map((l) => <span key={l} className="block">{l}</span>)}
          </address>
          <p className="mt-3 flex flex-col gap-1">
            <a className="inline-flex min-h-12 items-center text-primary underline" href={telHref}>{SITE.phone.display}</a>
            <a className="inline-flex min-h-12 items-center text-primary underline" href={mapsDirectionsHref()} target="_blank" rel="noopener noreferrer">{t("common.directions")}</a>
          </p>
        </div>
        <div>
          <p className="marginalia mb-2">{t("footer.explore")}</p>
          <ul className="grid grid-cols-2 gap-x-4">
            {(["about", "services", "careAreas", "book", "online", "experiences", "blog", "faq", "contact", "privacy"] as const).map((k) => {
              const hrefs: Record<string, string> = { about: "/about", services: "/services", careAreas: "/care-areas", book: "/book", online: "/online-consultation", experiences: "/experiences", blog: "/blog", faq: "/faq", contact: "/contact", privacy: "/privacy" };
              return (
                <li key={k}>
                  <Link href={hrefs[k]} className="inline-flex min-h-12 items-center text-ink hover:text-primary hover:underline">{t(`nav.${k}`)}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-5 text-sm text-muted sm:px-6">
          <p className="font-medium text-ink">{t("footer.disclaimer")}</p>
          <p className="mt-1">© {new Date().getFullYear()} {t("footer.rights")}. {t("footer.dataNote")}</p>
        </div>
      </div>
    </footer>
  );
}
