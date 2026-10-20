import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NAV, SITE } from "@/lib/site";
import { LogoMark } from "@/components/ui/Motif";
import { buttonClass } from "@/components/ui/Button";
import { LangToggle } from "./LangToggle";
import { ThemeToggle } from "./ThemeToggle";
import { MobileNav } from "./MobileNav";

/** Floating header: a slim glass bar inset from the edges. */
export function Header() {
  const t = useTranslations();
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-2.5 sm:px-5">
      <div className="glass mx-auto flex h-14 max-w-7xl items-center gap-2 rounded-2xl pe-2 ps-3 shadow-[var(--shadow-float)] sm:gap-3 sm:pe-2.5 sm:ps-4">
        <Link href="/" className="flex min-h-12 items-center gap-2.5" aria-label={`${t("meta.siteName")}: ${t("nav.home")}`}>
          <LogoMark className="h-8 w-8 shrink-0 text-primary" />
          <span className="leading-tight">
            <span className="block font-display text-[1.0625rem] font-semibold text-ink sm:whitespace-nowrap">{t("meta.siteName")}</span>
            <span className="hidden text-[0.6875rem] font-medium tracking-[0.06em] text-muted sm:block">{SITE.doctor.degree}</span>
          </span>
        </Link>
        <nav aria-label="Main" className="ms-4 hidden flex-1 xl:block">
          <ul className="flex items-center">
            {NAV.map((n) => (
              <li key={n.key}>
                <Link href={n.href} className="inline-flex min-h-12 items-center whitespace-nowrap rounded-lg px-3 text-sm font-medium text-muted hover:bg-soft hover:text-ink">
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
            <Link href="/book" className={buttonClass("primary", "!min-h-10 !px-4")}>{t("common.bookShort")}</Link>
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
