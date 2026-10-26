import site from "../../content/site.json";
import gallery from "../../content/gallery.json";
import camp from "../../content/camp-gallery.json";

export type Photo = { src: string; width: number; height: number; altEn: string; altHi: string; focus?: string; ai?: boolean; insetFor?: string; captionEn?: string; captionHi?: string };

/** Real photos only. Both are empty until files from /source/photos are imported (npm run photos). */
export const portrait = (site.portraitPhoto ?? null) as Photo | null;
const allPhotos = (gallery.photos ?? []) as Photo[];

export const clinicPhotos = allPhotos;

/** Medical-camp photos. Shown only because the owner confirmed every person pictured agreed (see content/camp-gallery.json). */
export const campPhotos = (camp.photos ?? []) as Photo[];

/** The photo of Dr. Rama Mathur at her desk in the consultation room (shown on About). */
export const deskPhoto = allPhotos.find((p) => p.src.includes("clinic-doctor-at-desk")) ?? null;

export const captionFor = (p: Photo, locale: string) => (locale === "hi" ? p.captionHi : p.captionEn) ?? "";

export const altFor = (p: Photo, locale: string) => (locale === "hi" ? p.altHi : p.altEn);
