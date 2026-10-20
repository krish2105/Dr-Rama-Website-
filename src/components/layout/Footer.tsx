import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SITE, telHref, mapsDirectionsHref } from "@/lib/site";
import { DevTodo } from "@/components/ui/DevTodo";

const LINKS: [string, string][] = [
  ["about", "/about"], ["services", "/services"], ["careAreas", "/care-areas"], ["book", "/book"], ["reach", "/how-to-reach"], ["firstVisit", "/first-visit"], ["online", "/online-consultation"],
  ["experiences", "/experiences"], ["blog", "/blog"], ["faq", "/faq"], ["contact", "/contact"], ["privacy", "/privacy"],
];

export function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const lines = locale === "hi" ? SITE.address.linesHi : SITE.address.lines;
  const reg = SITE.registration;
  return (
    <footer className="mx-3 mb-28 mt-24 sm:mx-5 md:mb-8">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-line bg-surface2">
        <div aria-hidden="true" className="h-6 w-full opacity-60" style={{ backgroundImage: "url(/art/tile-band.webp)", backgroundSize: "auto 100%", backgroundRepeat: "repeat-x" }} />
        <div className="relative grid gap-10 px-6 py-10 sm:px-10 md:grid-cols-3">
          <div>
            <p className="font-display text-xl font-semibold text-ink">{t("meta.siteName")}</p>
            <p className="mt-1 text-muted">
              {locale === "hi" ? SITE.doctor.nameHi : SITE.doctor.name}, {locale === "hi" ? SITE.doctor.degreeHi : SITE.doctor.degree}
            </p>
            <div className="mt-4 text-sm">
              {reg.number ? <p>{t("footer.registration")}: {reg.council}, {t("footer.regNo")} {reg.number}</p> : <DevTodo>State council name and registration number are missing (content/TODO.md).</DevTodo>}
            </div>
          </div>
          <div>
            <p className="t-eyebrow mb-2">{t("footer.visit")}</p>
            <address className="not-italic text-muted">{lines.map((l) => <span key={l} className="block">{l}</span>)}</address>
            <p className="mt-3 flex flex-col gap-1">
              <a className="inline-flex min-h-12 items-center text-primary underline" href={telHref}>{SITE.phone.display}</a>
              <a className="inline-flex min-h-12 items-center text-primary underline" href={mapsDirectionsHref()} target="_blank" rel="noopener noreferrer">{t("common.directions")}</a>
            </p>
          </div>
          <div>
            <p className="t-eyebrow mb-2">{t("footer.explore")}</p>
            <ul className="grid grid-cols-2 gap-x-4">
              {LINKS.map(([k, href]) => (
                <li key={k}><Link href={href} className="inline-flex min-h-12 items-center text-ink hover:text-primary hover:underline">{t(`nav.${k}`)}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="relative border-t border-line px-6 py-5 text-sm text-muted sm:px-10">
          <p className="font-semibold text-ink">{t("footer.disclaimer")}</p>
          <p className="mt-1">© {new Date().getFullYear()} {t("footer.rights")}. {t("footer.dataNote")}</p>
        </div>
      </div>
    </footer>
  );
}
