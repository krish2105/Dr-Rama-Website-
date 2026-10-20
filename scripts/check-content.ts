/**
 * Content compliance check. Run: npm run check-content          (warnings do not fail)
 *                               npm run check-content -- --strict (use before deploy: unconfirmed facts fail)
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const strict = process.argv.includes("--strict");
const errors: string[] = [];
const warnings: string[] = [];

// Hard-banned (brief section 8). Whole-word, case-insensitive for English.
const BANNED_EN = ["cure", "cured", "cures", "curing", "guarantee", "guaranteed", "100%", "best", "exceptional", "superior", "strong", "miracle", "miraculous", "permanent relief", "no side effects", "success rate"];
const BANNED_HI = ["गारंटी", "चमत्कार", "सर्वश्रेष्ठ", "सबसे अच्छ", "100%", "पक्का इलाज", "जड़ से"];
// Allowed only as a quote of a real honour (reported, not self-praise); review by hand.
const REVIEW = ["outstanding", "उत्कृष्ट", "leading", "renowned"];
// Named diseases must not appear as treated conditions (brief + Drugs and Magic Remedies Act 1954 schedule). Review by hand if one is needed.
const NAMED_DISEASES = ["diabetes", "blood pressure", "hypertension", "cancer", "kidney stone", "gall stone", "epilepsy", "paralysis", "डायबिटीज", "डायबिटिज", "ब्लड प्रेशर", "कैंसर", "पथरी", "मिर्गी", "लकवा"];
// Brief: do not publish.
const DO_NOT_PUBLISH = ["date of birth", "nationality", "hobbies", "personal objective", "declaration", "management skills", "harassment", "internal committee", "जन्म तिथि", "राष्ट्रीयता"];

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}

const files = [...walk(path.join(root, "content")), ...walk(path.join(root, "src"))].filter((f) => /\.(json|mdx|tsx?)$/.test(f) && !f.endsWith("TODO.md"));
const isContent = (f: string) => f.includes(`${path.sep}content${path.sep}`) || f.includes(`${path.sep}app${path.sep}`) || f.includes(`${path.sep}components${path.sep}`);

for (const f of files) {
  if (!isContent(f)) continue;
  const rel = path.relative(root, f);
  const text = fs.readFileSync(f, "utf8");
  // Ignore code identifiers: only scan quoted strings and MDX body text.
  const scan = rel.endsWith(".tsx") || rel.endsWith(".ts") ? (text.match(/(["'`])(?:(?!\1).)*[A-Za-zऀ-ॿ]{3,}(?:(?!\1).)*\1/g) ?? []).join("\n").replace(/\[[^\]]*\]/g, "") : text; // drop Tailwind arbitrary values like h-[calc(100%-2rem)]
  // "100%" in code is CSS (sizes, masks), not a claim; it is still banned in content files.
  const claimWords = (list: string[]) => (rel.startsWith("src") ? list.filter((w) => w !== "100%") : list);
  for (const w of claimWords(BANNED_EN)) if (new RegExp(`(^|[^A-Za-z])${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^A-Za-z]|$)`, "i").test(scan)) errors.push(`${rel}: banned word "${w}"`);
  for (const w of claimWords(BANNED_HI)) if (scan.includes(w)) errors.push(`${rel}: banned Hindi word "${w}"`);
  for (const w of REVIEW) if (!rel.startsWith("src") && (new RegExp(`(^|[^A-Za-z])${w}([^A-Za-z]|$)`, "i").test(scan) || (/[ऀ-ॿ]/.test(w) && scan.includes(w)))) warnings.push(`${rel}: review wording "${w}" (allowed only as a reported honour)`);
  for (const w of NAMED_DISEASES) if (!rel.startsWith("src") && scan.toLowerCase().includes(w)) errors.push(`${rel}: named disease "${w}" (no named-disease claims)`);
  for (const w of DO_NOT_PUBLISH) if (scan.toLowerCase().includes(w)) errors.push(`${rel}: do-not-publish topic "${w}"`);
}

// EN/HI message key parity
function keys(o: unknown, prefix = ""): string[] {
  if (o && typeof o === "object") return Object.entries(o as Record<string, unknown>).flatMap(([k, v]) => keys(v, prefix ? `${prefix}.${k}` : k));
  return [prefix];
}
const en = JSON.parse(fs.readFileSync(path.join(root, "content/messages/en.json"), "utf8"));
const hi = JSON.parse(fs.readFileSync(path.join(root, "content/messages/hi.json"), "utf8"));
const kEn = new Set(keys(en)), kHi = new Set(keys(hi));
for (const k of kEn) if (!kHi.has(k)) errors.push(`messages: "${k}" missing in hi`);
for (const k of kHi) if (!kEn.has(k)) errors.push(`messages: "${k}" missing in en`);

// Footer disclaimer present in both languages
if (!en.footer?.disclaimer?.includes("does not replace emergency or specialist medical treatment")) errors.push("footer disclaimer (en) missing or changed");
if (!hi.footer?.disclaimer) errors.push("footer disclaimer (hi) missing");

// Blog parity
const blogEn = walk(path.join(root, "content/blog/en")).map((f) => path.basename(f)).sort();
const blogHi = walk(path.join(root, "content/blog/hi")).map((f) => path.basename(f)).sort();
if (blogEn.join() !== blogHi.join()) errors.push("blog: en and hi posts differ");

// Gallery alt text in both languages
const gallery = JSON.parse(fs.readFileSync(path.join(root, "content/gallery.json"), "utf8"));
for (const p of gallery.photos ?? []) {
  if (!p.altEn || !p.altHi) errors.push(`gallery: ${p.src} needs altEn and altHi`);
  if (!fs.existsSync(path.join(root, "public", p.src))) errors.push(`gallery: ${p.src} not found in /public`);
}

const portraitPhoto = JSON.parse(fs.readFileSync(path.join(root, "content/site.json"), "utf8")).portraitPhoto;
if (portraitPhoto) {
  if (!portraitPhoto.altEn || !portraitPhoto.altHi) errors.push("portrait: needs altEn and altHi");
  if (!fs.existsSync(path.join(root, "public", portraitPhoto.src))) errors.push(`portrait: ${portraitPhoto.src} not found in /public`);
}

// Unconfirmed / missing facts (TODO.md). Warn in dev, fail with --strict.
const site = JSON.parse(fs.readFileSync(path.join(root, "content/site.json"), "utf8"));
const pending: string[] = [];
if (!site.phone.confirmed) pending.push("phone not confirmed as public");
if (!site.email.confirmed) pending.push("email not confirmed as public");
if (!site.address.confirmed) pending.push("address not confirmed as publishable");
if (!site.registration.number) pending.push("council registration number missing");
if (!site.timings) pending.push("clinic timings missing");
else if (!site.timingsConfirmed) pending.push("clinic timings not confirmed");
if (!site.mapsUrl || !site.mapsEmbedUrl) pending.push("Google Maps share link and embed URL missing");
if (!site.portraitPhoto) pending.push("doctor portrait missing");
if (!site.logo) pending.push("logo missing");
if (!(gallery.photos ?? []).length) pending.push("no real clinic photos yet");
if (!process.env.NEXT_PUBLIC_GA_ID) pending.push("GA4 measurement ID not set (analytics off)");
(strict ? errors : warnings).push(...pending.map((p) => `TODO: ${p}`));

console.log(`\ncheck-content: ${files.length} files scanned${strict ? " (strict)" : ""}`);
for (const w of warnings) console.log(`  warn  ${w}`);
for (const e of errors) console.log(`  FAIL  ${e}`);
console.log(errors.length ? `\n${errors.length} problem(s)` : "\nOK: no compliance errors");
process.exit(errors.length ? 1 : 0);
