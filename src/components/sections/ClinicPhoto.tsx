import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { altFor, clinicPhotos, insetOf } from "@/lib/photos";
import { isDev } from "@/lib/site";

export function hasPhotos() {
  return clinicPhotos.length > 0;
}

/**
 * Gallery of real photos (and AI-enhanced real photos, which carry a disclosure caption).
 * Each card keeps its own aspect ratio, so portrait and square images are never cropped badly.
 * With none supplied: dev placeholder, nothing in production.
 */
export function Gallery({ limit }: { limit?: number }) {
  const locale = useLocale();
  const t = useTranslations("common");
  const list = limit ? clinicPhotos.slice(0, limit) : clinicPhotos;

  if (list.length === 0) {
    if (!isDev) return null;
    return (
      <div className="dev-todo grid min-h-48 place-items-center text-center">
        <p>TODO (dev only): {t("photoPlaceholder")}. Put files in source/photos, run <code>npm run photos</code>, then add alt text in content/gallery.json.</p>
      </div>
    );
  }
  return (
    <ul className={list.length === 1 ? "mx-auto max-w-md" : "-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:block sm:columns-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0"}>
      {list.map((p) => (
        <li key={p.src} className="min-w-[82%] snap-center sm:mb-5 sm:min-w-0 sm:break-inside-avoid">
          <figure className="overflow-hidden rounded-[18px] border border-line bg-surface shadow-[var(--shadow-float)]">
            <div className="relative w-full" style={{ aspectRatio: `${p.width} / ${p.height}` }}>
              <Image
                src={p.src}
                alt={altFor(p, locale)}
                fill
                sizes="(min-width:1024px) 400px, (min-width:640px) 45vw, 100vw"
                className="object-cover"
              />
              {(() => {
                const inset = insetOf(p);
                if (!inset) return null;
                return (
                  <a
                    href={inset.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t("openPhoto")}: ${altFor(inset, locale)}`}
                    className="press absolute bottom-2.5 end-2.5 w-[44%] rotate-[-2deg] overflow-hidden rounded-xl border-[3px] border-surface shadow-[var(--shadow-float)]"
                  >
                    <span className="relative block" style={{ aspectRatio: `${inset.width} / ${inset.height}` }}>
                      <Image src={inset.src} alt="" fill sizes="(min-width:1024px) 180px, 45vw" className="object-cover" style={inset.focus ? { objectPosition: inset.focus } : undefined} />
                    </span>
                  </a>
                );
              })()}
            </div>
          </figure>
        </li>
      ))}
    </ul>
  );
}
