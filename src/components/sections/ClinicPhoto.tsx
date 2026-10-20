import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { altFor, clinicPhotos } from "@/lib/photos";
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
    <ul className={list.length === 1 ? "mx-auto max-w-md" : "columns-1 gap-5 sm:columns-2"}>
      {list.map((p) => (
        <li key={p.src} className="mb-5 break-inside-avoid">
          <figure className="overflow-hidden rounded-[18px] border border-line bg-surface shadow-[var(--shadow-float)]">
            <div className="relative w-full" style={{ aspectRatio: `${p.width} / ${p.height}` }}>
              <Image
                src={p.src}
                alt={altFor(p, locale)}
                fill
                sizes="(min-width:1024px) 400px, (min-width:640px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            {p.ai ? <figcaption className="px-4 py-2 text-xs text-muted">{t("aiEnhanced")}</figcaption> : null}
          </figure>
        </li>
      ))}
    </ul>
  );
}
