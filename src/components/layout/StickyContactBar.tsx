import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { telHref, waHref } from "@/lib/site";

const icon = "h-5 w-5 shrink-0";

export function StickyContactBar() {
  const t = useTranslations("common");
  const cell = "flex min-h-14 flex-1 items-center justify-center gap-2 text-[0.95rem] font-semibold";
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface pb-[env(safe-area-inset-bottom)] shadow-[0_-6px_20px_rgb(0_0_0/0.08)] md:hidden">
      <div className="mx-auto flex max-w-xl divide-x divide-line">
        <a href={telHref} data-evt="click_call" className={`${cell} text-primary`}>
          <svg className={icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg>
          {t("call")}
        </a>
        <a href={waHref(t("whatsappPrefill"))} data-evt="click_whatsapp" target="_blank" rel="noopener noreferrer" className={`${cell} text-primary`}>
          <svg className={icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 20l1.3-4.1A8 8 0 1 1 8.2 18.8L4 20Z" /><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-.8.7a3.5 3.5 0 0 1-1.9-1.9l.7-.8-1-2L9 9.500Z" /></svg>
          {t("whatsapp")}
        </a>
        <Link href="/book" data-evt="click_book" className={`${cell} bg-primary text-onprimary`}>
          {t("bookShort")}
        </Link>
      </div>
    </div>
  );
}
