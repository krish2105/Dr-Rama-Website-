import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NAV, SITE } from "@/lib/site";
import { LogoMark } from "@/components/ui/Sprig";
import { buttonClass } from "@/components/ui/Button";
import { LangToggle } from "./LangToggle";
import { ThemeToggle } from "./ThemeToggle";
import { MobileNav } from "./MobileNav";

export function Header() {
  const t = useTranslations();
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur supports-[backdrop-filter]:bg-bg/80">
      <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center gap-2 px-4 sm:gap-3 sm:px-6">
        <Link href="/" className="flex min-h-12 items-center gap-2.5 text-primary" aria-label={`${t("meta.siteName")}: ${t("nav.home")}`}>
          <LogoMark className="h-8 w-8 shrink-0 sm:h-9 sm:w-9" />
          <span className="leading-tight">
            <span className="block font-display text-base font-semibold sm:whitespace-nowrap sm:text-xl">{t("meta.siteName")}</span>
            <span className="hidden text-[0.72rem] uppercase tracking-[0.14em] text-wood sm:block">{SITE.doctor.degree}</span>
          </span>
        </Link>
        <nav aria-label="Main" className="ml-6 hidden flex-1 xl:block">
          <ul className="flex items-center gap-1">
            {NAV.map((n) => (
              <li key={n.key}>
                <Link href={n.href} className="inline-flex min-h-12 items-center whitespace-nowrap rounded-full px-3 text-[0.95rem] text-ink hover:bg-soft">
                  {t(`nav.${n.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto flex items-center gap-2">
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
