import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { altFor, captionFor, campPhotos } from "@/lib/photos";
import { CaseHead } from "@/components/ui/CaseHead";

// Gentle tilt and offset per card so the photos read as floating prints, not a grid.
const TILT = [-2.2, 1.6, -1.2, 2.1, -1.8];
const LIFT = ["md:mt-0", "md:mt-8", "md:mt-2", "md:mt-10", "md:mt-4"];

/** Floating photo cards of medical camps and events. Real photos only; nothing is added or altered. */
export function CampFloat({ headingId = "camp" }: { headingId?: string }) {
  const locale = useLocale();
  const t = useTranslations("camp");
  if (campPhotos.length === 0) return null;
  return (
    <section aria-labelledby={headingId} className="mx-auto mt-20 max-w-6xl px-4 sm:px-6">
      <CaseHead id={headingId} title={t("title")} />
      <p className="mt-4 max-w-2xl text-muted">{t("lead")}</p>
      <ul className="camp-row -mx-4 mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-6 md:mx-0 md:flex-wrap md:justify-center md:gap-x-6 md:gap-y-2 md:overflow-visible md:px-0">
        {campPhotos.map((p, i) => (
          <li key={p.src} className={`camp-card min-w-[78%] snap-center sm:min-w-[46%] md:min-w-0 md:w-[31%] ${LIFT[i % LIFT.length]}`} style={{ ["--tilt" as string]: `${TILT[i % TILT.length]}deg`, ["--delay" as string]: `${i * -1.1}s` }}>
            <figure className="overflow-hidden rounded-[18px] border border-line bg-surface p-2 shadow-[var(--shadow-float)]">
              <div className="relative w-full overflow-hidden rounded-xl" style={{ aspectRatio: `${p.width} / ${p.height}` }}>
                <Image src={p.src} alt={altFor(p, locale)} fill sizes="(min-width:768px) 31vw, 78vw" className="object-cover" />
              </div>
              {captionFor(p, locale) ? <figcaption className="px-1 pb-0.5 pt-2 text-center text-sm text-muted">{captionFor(p, locale)}</figcaption> : null}
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
