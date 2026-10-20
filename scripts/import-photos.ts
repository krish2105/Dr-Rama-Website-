/**
 * Import real photos from /source/photos into the site.
 *   npm run photos
 * - files whose names start with doctor or portrait become the doctor portrait; everything else goes in the clinic gallery
 * - resized (max 1800px), auto-rotated, ALL metadata (EXIF, GPS) stripped, saved to public/photos
 * - alt text (EN + HI) is left empty on purpose: npm run check-content fails until it is written
 * Certificates and plaques in photos must not be altered; this script never edits pixels beyond resize.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const srcDir = path.join(root, "source/photos");
const outDir = path.join(root, "public/photos");
const sitePath = path.join(root, "content/site.json");
const galleryPath = path.join(root, "content/gallery.json");

type Photo = { src: string; width: number; height: number; altEn: string; altHi: string };

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  const files = fs.readdirSync(srcDir).filter((f) => /\.(jpe?g|png|webp|avif|tiff?)$/i.test(f)).sort();
  const skipped = fs.readdirSync(srcDir).filter((f) => /\.(heic|heif)$/i.test(f));
  if (skipped.length) console.log(`Skipped (convert to JPG first): ${skipped.join(", ")}`);
  if (!files.length) return console.log("No photos found in source/photos.");

  const site = JSON.parse(fs.readFileSync(sitePath, "utf8"));
  const gallery = JSON.parse(fs.readFileSync(galleryPath, "utf8"));
  const existing = new Map<string, Photo>((gallery.photos ?? []).map((p: Photo) => [p.src, p]));
  const photos: Photo[] = [];

  for (const f of files) {
    const isPortrait = /^(doctor|portrait|dr)/i.test(f);
    const slug = isPortrait ? "doctor-portrait" : path.parse(f).name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const outName = `${slug}.jpg`;
    const info = await sharp(path.join(srcDir, f)).rotate().resize({ width: 1800, withoutEnlargement: true }).jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(outDir, outName));
    const src = `/photos/${outName}`;
    const prev = isPortrait ? site.portraitPhoto : existing.get(src);
    const entry: Photo = { src, width: info.width, height: info.height, altEn: prev?.altEn ?? "", altHi: prev?.altHi ?? "" };
    if (isPortrait) site.portraitPhoto = entry;
    else photos.push(entry);
    console.log(`${isPortrait ? "portrait" : "gallery "} ${f} -> public${src} (${info.width}x${info.height})${entry.altEn && entry.altHi ? "" : "  alt text needed"}`);
  }
  gallery.photos = photos;
  fs.writeFileSync(sitePath, JSON.stringify(site, null, 2) + "\n");
  fs.writeFileSync(galleryPath, JSON.stringify(gallery, null, 2) + "\n");
}
main();
