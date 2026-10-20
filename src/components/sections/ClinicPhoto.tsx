import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { altFor, clinicPhotos } from "@/lib/photos";
import { isDev } from "@/lib/site";

export function hasPhotos() {
  return clinicPhotos.length > 0;
}



/** Real photos only, shown as floating cards. With none supplied: dev placeholder, nothing in production. */
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
  const single = list.length === 1;
  return (
    <ul className={single ? "mx-auto max-w-3xl" : "grid gap-5 sm:grid-cols-2 lg:grid-cols-3"}>
      {list.map((p, i) => (
        <li
          key={p.src}
          className={`overflow-hidden rounded-[18px] border border-line bg-surface shadow-[var(--shadow-float)] ${i === 0 && list.length >= 3 ? "lg:col-span-2 lg:row-span-2" : ""}`}
        >
          <div className={`relative h-full min-h-48 w-full ${single ? "aspect-[4/3] sm:aspect-[16/10]" : "aspect-[4/3]"}`}>
            <Image
              src={p.src}
              alt={altFor(p, locale)}
              fill
              sizes={i === 0 && list.length >= 3 ? "(min-width:1024px) 66vw, (min-width:640px) 50vw, 100vw" : "(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"}
              className="object-cover"
              style={p.focus ? { objectPosition: p.focus } : undefined}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
