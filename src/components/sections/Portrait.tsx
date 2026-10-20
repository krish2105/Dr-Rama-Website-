import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Rosette } from "@/components/ui/Motif";
import { altFor, clinicPhotos, portrait } from "@/lib/photos";
import { isDev } from "@/lib/site";

/**
 * Hero visual: a blue-pottery rosette ring around the doctor's real portrait,
 * with floating chips and a floating clinic photo. No photo supplied: the ring
 * stays as pure vector art (no face, no fake image) and dev builds show a TODO.
 */
export function HeroVisual() {
  const locale = useLocale();
  const t = useTranslations("home");
  const c = useTranslations("common");
  const clinic = clinicPhotos[0];

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[16.5rem] sm:max-w-[22rem] md:max-w-[28rem]">
      <Rosette className="bob absolute inset-0 h-full w-full text-primary opacity-90" />
      <div className="absolute inset-[16%] overflow-hidden rounded-full border-[6px] border-surface bg-soft shadow-[var(--shadow-float)]">
        {portrait ? (
          <Image src={portrait.src} alt={altFor(portrait, locale)} fill priority sizes="(min-width:768px) 340px, 260px" className="object-cover" style={portrait.focus ? { objectPosition: portrait.focus } : undefined} />
        ) : (
          <div className="grid h-full w-full place-items-end p-6 pb-10 text-center">
            <Rosette className="absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)] text-primary opacity-20" petals={8} />
            {isDev ? <p className="relative text-sm font-medium text-muted">TODO (dev only): {t("portraitTodo")}</p> : null}
          </div>
        )}
      </div>
      <span className="chip bob absolute -start-2 top-[10%] md:-start-8">
        <b className="font-display text-xl text-primary">32</b>
        <span className="max-w-[8rem]">{t("chipYears")}</span>
      </span>
      <span className="chip bob b2 absolute -end-2 top-[66%] md:-end-8 md:top-[60%]">{t("chipDegree")}</span>
      <span className="chip bob b3 absolute bottom-[-2%] start-[2%] md:bottom-[6%]">{t("chipLanguages")}</span>
      {clinic ? (
        <div className="bob b2 absolute -bottom-3 -end-1 hidden w-36 overflow-hidden rounded-3xl border-[5px] border-surface shadow-[var(--shadow-float)] sm:block md:w-44">
          <div className="relative aspect-[4/3]">
            <Image src={clinic.src} alt={altFor(clinic, locale)} fill sizes="176px" className="object-cover" style={clinic.focus ? { objectPosition: clinic.focus } : undefined} />
          </div>
        </div>
      ) : isDev ? (
        <div className="dev-todo absolute -bottom-3 -end-1 hidden w-40 p-2 text-xs sm:block">{c("photoPlaceholder")}</div>
      ) : null}
    </div>
  );
}
