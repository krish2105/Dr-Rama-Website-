import site from "../../content/site.json";
import gallery from "../../content/gallery.json";
import camp from "../../content/camp-gallery.json";

export type Photo = { src: string; width: number; height: number; altEn: string; altHi: string; focus?: string; ai?: boolean };

/** Real photos only. Both are empty until files from /source/photos are imported (npm run photos). */
export const portrait = (site.portraitPhoto ?? null) as Photo | null;
export const clinicPhotos = (gallery.photos ?? []) as Photo[];

/** Medical-camp photos. Shown only because the owner confirmed every person pictured agreed (see content/camp-gallery.json). */
export const campPhotos = (camp.photos ?? []) as Photo[];

export const altFor = (p: Photo, locale: string) => (locale === "hi" ? p.altHi : p.altEn);
