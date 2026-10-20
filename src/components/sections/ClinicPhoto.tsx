import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import gallery from "../../../content/gallery.json";
import { isDev } from "@/lib/site";

type Photo = { src: string; width: number; height: number; altEn: string; altHi: string };
const photos = gallery.photos as Photo[];

export function hasPhotos() {
  return photos.length > 0;
}

/** Real photos only. With none supplied: dev placeholder, nothing in production. */
export function Gallery({ limit }: { limit?: number }) {
  const locale = useLocale();
  const t = useTranslations("common");
  const list = limit ? photos.slice(0, limit) : photos;

  if (list.length === 0) {
    if (!isDev) return null;
    return (
      <div className="dev-todo grid min-h-48 place-items-center text-center">
        <p>TODO (dev only): {t("photoPlaceholder")}. Add files to /source/photos, then list them in content/gallery.json.</p>
      </div>
    );
  }
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((p) => (
        <li key={p.src} className="overflow-hidden rounded-2xl border border-line bg-surface">
          <Image
            src={p.src}
            width={p.width}
            height={p.height}
            alt={locale === "hi" ? p.altHi : p.altEn}
            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            className="h-auto w-full object-cover"
          />
        </li>
      ))}
    </ul>
  );
}
