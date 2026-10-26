import site from "../../content/site.json";
import gallery from "../../content/gallery.json";
import camp from "../../content/camp-gallery.json";

export type Photo = { src: string; width: number; height: number; altEn: string; altHi: string; focus?: string; ai?: boolean; insetFor?: string };

/** Real photos only. Both are empty until files from /source/photos are imported (npm run photos). */
export const portrait = (site.portraitPhoto ?? null) as Photo | null;
const allPhotos = (gallery.photos ?? []) as Photo[];
const slugOf = (src: string) => (src.split("/").pop() ?? "").replace(/(\.[0-9a-f]{8})?\.jpg$/, "");

/** Photos that get their own card in the gallery. Photos marked `insetFor` appear as a small inset on another card instead. */
export const clinicPhotos = allPhotos.filter((p) => !p.insetFor);

/** The inset photo (if any) that belongs on this gallery photo. */
export const insetOf = (p: Photo) => allPhotos.find((i) => i.insetFor === slugOf(p.src)) ?? null;

/** Medical-camp photos. Shown only because the owner confirmed every person pictured agreed (see content/camp-gallery.json). */
export const campPhotos = (camp.photos ?? []) as Photo[];

/** The photo of Dr. Rama Mathur at her desk in the consultation room (shown on About). */
export const deskPhoto = allPhotos.find((p) => p.src.includes("clinic-doctor-at-desk")) ?? null;

export const altFor = (p: Photo, locale: string) => (locale === "hi" ? p.altHi : p.altEn);
