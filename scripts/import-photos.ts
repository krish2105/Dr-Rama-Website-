/**
 * Import real photos from /source/photos into the site.
 *   npm run photos
 * - files whose names start with doctor or portrait become the doctor portrait; files starting with camp go in the medical-camp gallery
 *   (only after every person shown has agreed; the owner confirms this in content/camp-gallery.json); everything else goes in the clinic gallery
 * - resized (max 1800px), auto-rotated, ALL metadata (EXIF, GPS) stripped, saved to public/photos
 * - alt text (EN + HI) is left empty on purpose: npm run check-content fails until it is written
 * Certificates and plaques in photos must not be altered; this script never edits pixels beyond resize.
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import sharp from "sharp";

const root = process.cwd();
const srcDir = path.join(root, "source/photos");
const outDir = path.join(root, "public/photos");
const sitePath = path.join(root, "content/site.json");
const galleryPath = path.join(root, "content/gallery.json");
const campPath = path.join(root, "content/camp-gallery.json");

type Photo = { src: string; width: number; height: number; altEn: string; altHi: string; focus?: string; ai?: boolean; insetFor?: string; captionEn?: string; captionHi?: string };

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  const files = fs.readdirSync(srcDir, { withFileTypes: true }).filter((e) => e.isFile()).map((e) => e.name).filter((f) => /\.(jpe?g|png|webp|avif|tiff?)$/i.test(f)).sort();
  const skipped = fs.readdirSync(srcDir).filter((f) => /\.(heic|heif)$/i.test(f));
  if (skipped.length) console.log(`Skipped (convert to JPG first): ${skipped.join(", ")}`);
  if (!files.length) return console.log("No photos found in source/photos.");

  const site = JSON.parse(fs.readFileSync(sitePath, "utf8"));
  const gallery = JSON.parse(fs.readFileSync(galleryPath, "utf8"));
  const camp = JSON.parse(fs.readFileSync(campPath, "utf8"));
  // Output files carry a content hash so a replaced photo always busts browser and CDN caches.
const slugOf = (src: string) => path.basename(src).replace(/(\.[0-9a-f]{8})?\.jpg$/, "");
const existing = new Map<string, Photo>([...(gallery.photos ?? []), ...(camp.photos ?? [])].map((p: Photo) => [slugOf(p.src), p]));
  const photos: Photo[] = [];
  const campPhotos: Photo[] = [];

  for (const f of files) {
    const isPortrait = /^(doctor|portrait|dr)/i.test(f);
    const isCamp = /^camp/i.test(f);
    const slug = isPortrait ? "doctor-portrait" : path.parse(f).name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const { data, info } = await sharp(path.join(srcDir, f)).rotate().resize({ width: 1800, withoutEnlargement: true }).jpeg({ quality: 82, mozjpeg: true }).toBuffer({ resolveWithObject: true });
    const hash = crypto.createHash("sha1").update(data).digest("hex").slice(0, 8);
    const outName = `${slug}.${hash}.jpg`;
    for (const old of fs.readdirSync(outDir)) if (slugOf(old) === slug && old !== outName) fs.rmSync(path.join(outDir, old));
    fs.writeFileSync(path.join(outDir, outName), data);
    const src = `/photos/${outName}`;
    const prev = isPortrait ? site.portraitPhoto : existing.get(slug);
    const entry: Photo = { src, width: info.width, height: info.height, altEn: prev?.altEn ?? "", altHi: prev?.altHi ?? "", ...(prev?.focus ? { focus: prev.focus } : {}), ...(prev?.ai ? { ai: true } : {}), ...(prev?.insetFor ? { insetFor: prev.insetFor } : {}), ...(prev?.captionEn ? { captionEn: prev.captionEn, captionHi: prev.captionHi } : {}) };
    if (isPortrait) site.portraitPhoto = entry;
    else if (isCamp) campPhotos.push(entry);
    else photos.push(entry);
    console.log(`${isPortrait ? "portrait" : isCamp ? "camp    " : "gallery "} ${f} -> public${src} (${info.width}x${info.height})${entry.altEn && entry.altHi ? "" : "  alt text needed"}`);
  }
  const rank = (p: Photo) => { const i = (gallery.photos ?? []).findIndex((o: Photo) => slugOf(o.src) === slugOf(p.src)); return i < 0 ? 999 : i; };
  photos.sort((a, b) => rank(a) - rank(b));
  gallery.photos = photos;
  camp.photos = campPhotos;
  fs.writeFileSync(sitePath, JSON.stringify(site, null, 2) + "\n");
  fs.writeFileSync(galleryPath, JSON.stringify(gallery, null, 2) + "\n");
  fs.writeFileSync(campPath, JSON.stringify(camp, null, 2) + "\n");
}
main();
