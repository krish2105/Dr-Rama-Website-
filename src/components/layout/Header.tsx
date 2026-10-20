import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NAV, SITE } from "@/lib/site";
import { LogoMark } from "@/components/ui/Motif";
import { buttonClass } from "@/components/ui/Button";
import { LangToggle } from "./LangToggle";
import { ThemeToggle } from "./ThemeToggle";
import { MobileNav } from "./MobileNav";

/** Floating pill header: sits above the page with a soft glass surface. */
export function Header() {
  const t = useTranslations();
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div className="glass mx-auto flex h-[4.25rem] max-w-7xl items-center gap-2 rounded-full pe-2 ps-3 shadow-[var(--shadow-float)] sm:gap-3 sm:pe-3 sm:ps-4">
        <Link href="/" className="flex min-h-12 items-center gap-2.5 text-primary" aria-label={`${t("meta.siteName")}: ${t("nav.home")}`}>
          <LogoMark className="h-9 w-9 shrink-0 text-primary" />
          <span className="leading-tight">
            <span className="block font-display text-[0.98rem] font-bold text-ink sm:whitespace-nowrap sm:text-lg">{t("meta.siteName")}</span>
            <span className="hidden text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-accentink sm:block">{SITE.doctor.degree}</span>
          </span>
        </Link>
        <nav aria-label="Main" className="ms-4 hidden flex-1 xl:block">
          <ul className="flex items-center gap-0.5">
            {NAV.map((n) => (
              <li key={n.key}>
                <Link href={n.href} className="inline-flex min-h-12 items-center whitespace-nowrap rounded-full px-2.5 text-[0.92rem] font-medium text-ink hover:bg-soft">
                  {t(n.key === "about" ? "nav.aboutShort" : `nav.${n.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ms-auto flex items-center gap-1.5 sm:gap-2">
          <div className="hidden sm:block"><ThemeToggle /></div>
          <LangToggle />
          <div className="hidden md:block">
            <Link href="/book" className={buttonClass("primary")}>{t("common.bookShort")}</Link>
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
