import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { telHref, waHref } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";

const PhoneIcon = () => <Icon name="phone" className="h-5 w-5 shrink-0" />;
const WaIcon = () => <Icon name="whatsapp" className="h-5 w-5 shrink-0" />;

/**
 * Mobile: a floating dock above the bottom edge (Call / WhatsApp / Book).
 * Desktop: floating round buttons at the lower right.
 */
export function FloatingContact() {
  const t = useTranslations("common");
  return (
    <>
      <div className="fixed inset-x-3 bottom-3 z-40 pb-[env(safe-area-inset-bottom)] md:hidden">
        <div className="glass mx-auto flex max-w-md items-center gap-1 rounded-2xl p-1 shadow-[var(--shadow-float)]">
          <a href={telHref} data-evt="click_call" className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl text-sm font-semibold text-ink active:bg-soft">
            <PhoneIcon />{t("call")}
          </a>
          <a href={waHref(t("whatsappPrefill"))} data-evt="click_whatsapp" target="_blank" rel="noopener noreferrer" className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl text-sm font-semibold text-ink active:bg-soft">
            <WaIcon />{t("whatsapp")}
          </a>
          <Link href="/book" data-evt="click_book" className="flex min-h-12 flex-1 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-onprimary">
            {t("bookShort")}
          </Link>
        </div>
      </div>
      <div className="fixed bottom-6 end-6 z-40 hidden flex-col items-end gap-3 md:flex">
        <a href={waHref(t("whatsappPrefill"))} data-evt="click_whatsapp" target="_blank" rel="noopener noreferrer" aria-label={t("whatsapp")} title={t("whatsapp")} className="grid h-12 w-12 place-items-center rounded-full bg-surface text-primary shadow-[var(--shadow-float)] ring-1 ring-line transition-transform hover:-translate-y-0.5">
          <WaIcon />
        </a>
        <a href={telHref} data-evt="click_call" aria-label={t("call")} title={t("call")} className="grid h-12 w-12 place-items-center rounded-full bg-primary text-onprimary shadow-[var(--shadow-float)] transition-transform hover:-translate-y-0.5">
          <PhoneIcon />
        </a>
      </div>
    </>
  );
}
