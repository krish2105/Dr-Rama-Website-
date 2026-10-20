import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Rosette } from "@/components/ui/Motif";
import { altFor, clinicPhotos, portrait } from "@/lib/photos";
import { SITE, isDev } from "@/lib/site";

/**
 * Hero visual: the doctor's real portrait on a tall card with a brass offset frame, a faint pottery rosette,
 * a small name card and a floating real clinic photo. With no photo supplied the card shows pure vector art
 * (no face, no fake image) and dev builds show a TODO.
 */
export function HeroVisual() {
  const locale = useLocale();
  const t = useTranslations("home");
  const c = useTranslations("common");
  const clinic = clinicPhotos[0];

  return (
    <div className="relative mx-auto w-full max-w-[18rem] sm:max-w-[22rem] lg:max-w-[26rem]">
      <div className="depth-1 pointer-events-none absolute -end-20 -top-20"><Rosette className="h-80 w-80 text-primary opacity-[0.07] md:hidden" /></div>
      <div aria-hidden="true" className="depth-2 absolute inset-0 translate-x-3 translate-y-3 rounded-[22px] border border-accent/70" />
      <div className="tilt-card relative aspect-[4/5] overflow-hidden rounded-[22px] border border-line bg-soft shadow-[var(--shadow-float)]">
        {portrait ? (
          <Image
            src={portrait.src}
            alt={altFor(portrait, locale)}
            fill
            priority
            sizes="(min-width:1024px) 416px, (min-width:640px) 352px, 288px"
            className="object-cover"
            style={{ objectPosition: portrait.focus ?? "50% 20%" }}
          />
        ) : (
          <div className="grid h-full w-full place-items-end p-6 text-center">
            <Rosette className="absolute inset-8 h-[calc(100%-4rem)] w-[calc(100%-4rem)] text-primary opacity-20" petals={8} />
            {isDev ? <p className="relative text-sm font-medium text-muted">TODO (dev only): {t("portraitTodo")}</p> : null}
          </div>
        )}
      </div>
      <div className="glass depth-1 absolute -bottom-4 -start-3 rounded-xl px-4 py-2.5 shadow-[var(--shadow-float)] sm:-start-6">
        <p className="font-display text-base font-semibold leading-tight text-ink">{locale === "hi" ? SITE.doctor.nameHi : SITE.doctor.name}</p>
        <p className="text-xs text-muted">{locale === "hi" ? SITE.doctor.degreeHi : SITE.doctor.degree}</p>
      </div>
      {clinic ? (
        <div className="absolute -end-3 -top-4 hidden w-28 overflow-hidden rounded-2xl border-[3px] border-surface shadow-[var(--shadow-float)] sm:block sm:-end-6 md:w-32">
          <div className="relative aspect-[4/3]">
            <Image src={clinic.src} alt={altFor(clinic, locale)} fill sizes="128px" className="object-cover" style={clinic.focus ? { objectPosition: clinic.focus } : undefined} />
          </div>
        </div>
      ) : isDev ? (
        <div className="dev-todo absolute -end-3 -top-4 hidden w-32 p-2 text-xs sm:block">{c("photoPlaceholder")}</div>
      ) : null}
    </div>
  );
}
