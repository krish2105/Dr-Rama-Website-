import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { telHref, waHref } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";
import { DockStatus } from "./DockStatus";

const PhoneIcon = () => <Icon name="phone" className="h-5 w-5 shrink-0" />;
const WaIcon = () => <Icon name="whatsapp" className="h-5 w-5 shrink-0" />;

/**
 * Mobile: floating dock (Call / WhatsApp / Book) with an open-now chip. It shrinks to icons while scrolling fast,
 * slides away while a form field is focused or a banner is showing, and never fully hides otherwise.
 * Desktop: round floating buttons that show their label on hover and keyboard focus.
 */
export function FloatingContact() {
  const t = useTranslations("common");
  return (
    <>
      <div className="dock fixed inset-x-3 bottom-3 z-40 pb-[env(safe-area-inset-bottom)] md:hidden">
        <DockStatus />
        <div className="glass mx-auto flex max-w-md items-center gap-1 rounded-2xl p-1 shadow-[var(--shadow-float)]">
          <a href={telHref} data-evt="click_call" className="press flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl text-sm font-semibold text-ink active:bg-soft">
            <PhoneIcon /><span className="dock-label">{t("call")}</span>
          </a>
          <a href={waHref(t("whatsappPrefill"))} data-evt="click_whatsapp" target="_blank" rel="noopener noreferrer" className="press flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl text-sm font-semibold text-ink active:bg-soft">
            <WaIcon /><span className="dock-label">{t("whatsapp")}</span>
          </a>
          <Link href="/book" data-evt="click_book" className="press flex min-h-12 flex-1 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-onprimary">
            {t("bookShort")}
          </Link>
        </div>
      </div>
      <div className="fab-wrap fixed bottom-6 end-6 z-40 hidden flex-col items-end gap-3 md:flex">
        <a href={waHref(t("whatsappPrefill"))} data-evt="click_whatsapp" target="_blank" rel="noopener noreferrer" aria-label={t("whatsapp")} className="fab press lift inline-flex h-12 items-center gap-0 overflow-hidden rounded-full bg-surface px-3.5 text-primary shadow-[var(--shadow-float)] ring-1 ring-line hover:gap-2 focus-visible:gap-2">
          <WaIcon /><span className="fab-label text-sm font-semibold">{t("whatsapp")}</span>
        </a>
        <a href={telHref} data-evt="click_call" aria-label={t("call")} className="fab press lift inline-flex h-12 items-center gap-0 overflow-hidden rounded-full bg-primary px-3.5 text-onprimary shadow-[var(--shadow-float)] hover:gap-2 focus-visible:gap-2">
          <PhoneIcon /><span className="fab-label text-sm font-semibold">{t("call")}</span>
        </a>
      </div>
    </>
  );
}
