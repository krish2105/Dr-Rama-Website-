"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export function LangToggle() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("common");
  return (
    <div role="group" aria-label={t("language")} className="inline-flex rounded-xl bg-soft p-0.5 text-sm font-semibold">
      <Link
        href={pathname}
        locale="en"
        hrefLang="en"
        lang="en"
        aria-current={locale === "en" ? "true" : undefined}
        className={`grid h-10 min-w-9 place-items-center rounded-[10px] px-2 sm:min-w-10 sm:px-2.5 ${locale === "en" ? "bg-primary text-onprimary" : "text-muted hover:bg-surface"}`}
      >
        EN
      </Link>
      <Link
        href={pathname}
        locale="hi"
        hrefLang="hi"
        lang="hi"
        aria-current={locale === "hi" ? "true" : undefined}
        className={`grid h-10 min-w-9 place-items-center rounded-[10px] px-2 sm:min-w-10 sm:px-2.5 ${locale === "hi" ? "bg-primary text-onprimary" : "text-muted hover:bg-surface"}`}
      >
        हिं
      </Link>
    </div>
  );
}
