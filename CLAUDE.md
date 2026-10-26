# CLAUDE.md: Raajesh Homeo Home website (EN + HI)

**Name (owner, 26 Oct 2026): the English name is "Raajesh Homeo Home" (double a). Earlier 20 Oct: not "Rajesh Homeo Clinic" as in PROJECT-BRIEF.md, and not "Rajesh Homeo Home". "Rajesh Homeo Home" and "Rajesh Homoeo Home" stay only as `alternateNames` in search data. Hindi: "राजेश होम्यो होम". Never write "Rajesh Homeo Clinic".**

Bilingual website for Dr. Rama Mathur, M.D. (Homoeopathy), Raajesh Homeo Home, Jaipur. Source of truth: `PROJECT-BRIEF.md`. Goal: turn a mobile visitor into a call, WhatsApp message or booking in under 30 seconds, and make her 35+ years and qualifications easy to trust.

## Rule 1: Never invent facts
- Use only facts in `PROJECT-BRIEF.md` or `/source` (cv, photos, brand). Nothing from memory, the web or assumptions.
- Anything missing goes in `/content/TODO.md` and shows a clear placeholder **in development only**. Production builds must never render a fake or placeholder fact (hide the section or omit the line instead).
- Facts marked CONFIRM (phone, email, address) are flagged `confirmed: false` in `content/site.json` until the doctor confirms in writing.

## Rule 2: Images
- Anything showing the clinic or the doctor uses real photos from `/source/photos` only. Never generate, stylise or replace them.
- Do not redraw, retype or alter certificates or plaques visible in photos.
- Vector decoration (rosettes, dot rules) is allowed as decoration only, never as a stand-in for a clinic or doctor photo.
- Generated artwork (blue-pottery patterns, banner, backgrounds, share image) is allowed **only as decoration** with no people and no clinic scenes; it lives in `public/art`, originals in `source/art` (git-ignored). AI-enhanced room images (05, 06 from the pack) are allowed only on the owner's instruction and only with the visible caption "Image enhanced with AI from a real photograph." (`ai: true` in `content/gallery.json`). AI images of certificates, plaques, the display cabinet or the entrance are never used, even as a "concept", because they invent text and places. See `docs/IMAGE-INTEGRATION-PROMPT.md` for the image decisions.
- Photo workflow: put real photos in `source/photos` (name the doctor portrait `doctor-...jpg`), run `npm run photos` (resizes, strips EXIF/GPS, writes `public/photos`, `content/gallery.json`, `content/site.json`), then write alt text in EN + HI. `npm run check-content` fails until alt text exists.
- Every image has alt text in English and Hindi. Use `next/image`. Reserve dimensions (no layout shift).
- No before/after images.

## Rule 3: Compliance (hard constraints)
- Never promise or imply a cure, guaranteed result or success percentage. No cure claims for any named disease.
- No superlatives or self-praise: best, exceptional, superior, strong, top, leading, miracle, permanent relief, 100%, guaranteed, cure/cured/curing (and Hindi equivalents).
- The footer disclaimer line was removed on the owner's instruction (26 Oct 2026). The Privacy page keeps the full disclaimer, and the FAQ and the urgent-care article keep their emergency guidance (hospital or 112). Do not re-add the footer line unless the owner asks.
- Show the state council registration number once received (see TODO).
- Collect minimum personal data. Booking: name, phone, preferred date/time, one-line reason, consent. Clear consent checkbox linked to the privacy page. Offer data deletion by email.
- Patient stories only with recorded consent, about the care experience, never results.
- GA4 events must carry no health details (no reason text, no condition names).
- Not legal advice: recommend a qualified review before launch (Drugs and Magic Remedies Act 1954, DPDP Act 2023 / Rules 2025, council advertising rules).

## Added after the printed handout and photos (2026-10-20)
- The practice is inside a flat (202, Raj Vilas Apartment 1). No storefront or street-signboard imagery.
- `source/reference/` holds the printed handout and the original room photo. They are private and never published. The handout lists named diseases and says "इलाज"; do not copy that wording. Take only plain facts from it (hours, address, phone).
- Named diseases are never published as treated conditions. Several (diabetes, blood pressure, menstrual flow disorders, kidney and gall stones) are on the schedule of the Drugs and Magic Remedies Act 1954. Care areas stay broad categories. `npm run check-content` fails on a list of named diseases.
- Photos showing patients or other people stay in `source/photos/_pending-consent/` until each person consents. Never send such photos to an AI tool.
- Hours (doctor's message, 26 Oct 2026, replaces the business card): Monday to Saturday 10:30 am to 2:00 pm and 6:00 pm to 8:30 pm; Sunday 10:30 am to 2:00 pm, evening off. Consultation is by prior appointment. Registration: Rajasthan Board of Homoeopathic Medicine, No. 3780 (the slip we hold was valid only to 19/5/2020; never state a validity date).
- The English name is "Raajesh Homeo Home" (owner, 26 Oct 2026) although the card and domain spell "Rajesh Homoeo"; the old spellings are kept as `alternateNames` in JSON-LD. The web address rajeshhomoeohome.in does not change.
- Experience is **35+ years of clinical experience, since 1991** (owner, 2026-10-20; earlier the CV said 31 and the handout 32). Always write "35+", never an exact figure.
- Floor: the slip and card say 2nd floor; the handout's "1st" means Apartment I. Address reads "202, 2nd Floor, Raj Vilas Apartment 1" (owner, 21 Oct 2026: there is also a Raj Vilas Apartment 2, so write "Raj Vilas Apartment 1", Hindi "राज विलास अपार्टमेंट 1").
- `source/reference/` also holds the business card and registration slip (private, never published; the slip names a family member).

## Confirmed 21 Oct 2026 (owner)
- Consultation fee ₹800; payment by UPI or cash. Show them as plain facts (Contact, Home, Book, First visit, FAQ, schema). Never publish a UPI ID, QR code for payment, discounts or follow-up pricing unless supplied.
- Registration No. 3780 is current and valid; still show the number only, no validity date. Hours as on the site. WhatsApp = the main number. Pin code 302016. Slot length 20 minutes, one patient per slot.
- Dr. Mathur herself answers the phone and confirms booking requests.
- Dr. Mathur approved the site text (reported by the owner); keep her written approval on file.

## Do NOT publish
Date of birth, gender, nationality, hobbies, "personal objective", the declaration, management skills, governance or harassment-prevention trainings, her internal committee roles at RIICO. The CV itself is never published.

## Content
- All clinic text lives in `/content` (JSON + MDX) so the doctor can edit it without code.
- Drafts are marked `DRAFT` and need the doctor's approval (About text, blog posts). Hindi needs native review.
- Safe practice wording only: keeps detailed clinical notes and records for each patient; refers patients to other health practitioners when appropriate; communicates clearly with patients.

## Design
- Direction chosen by the client (2026-10-20): **Option B, "Blue Pottery, Friendly"**. No green anywhere. Green from the brief was rejected.
- Palette (tokens in `src/styles/globals.css`): ivory `#F6F1E4`, cobalt `#1D4E9F`, soft blue `#E3EBF8`, navy ink `#13203F`, brass `#B58A33` (ornament only; text uses `#85601D`). Dark: night `#0D1630`, light cobalt `#8DB0F2`, brass `#D8B15C`.
- Fonts: Newsreader 500/600 (EN headings), DM Sans (EN body), Mukta (Hindi, self-hosted in `public/fonts`, preloaded on `/hi` only). Type scale (client said the first version was too large, 20 Oct 2026): body 16px (17px at 768+; Hindi 17 / 17.5px), h1 30 to 46px, h2 24 to 32px, headings weight 500 (Hindi 600). Use the `.t-h1 .t-page .t-h2 .t-lead .t-eyebrow` roles, not ad-hoc sizes. Tap targets stay at least 48px.
- Floating UI: floating glass pill header, floating contact dock on mobile (Call / WhatsApp / Book), floating round buttons on desktop, floating chips and cards around the portrait ring, tilted floating gallery cards. Gentle float only; respect `prefers-reduced-motion`.
- Signature: a tall portrait card with a brass offset frame and a faint blue-pottery rosette. Rosettes and dot rules are vector decoration only.
- Theme: Light / Dark / System toggle, no flash, WCAG AA in both. Mobile-first; check at 360px.
- RIICO service record has its own section on Home (24 years, "Empanelled homoeopathic doctor, RIICO"; the owner, 21 Oct 2026, removed the "Service record" label and the full corporation name, so write just "RIICO"). The owner (21 Oct 2026) removed the dates (1999 to 2023) and the retirement / Deputy General Manager line; do not add them back. Never publish her internal committee roles at RIICO.

## Added with Phase 1.5 (2026-10-20)
- Booking times are **requests**, never confirmations; wording must say so. Booking forms collect: patient name, guardian name (child or other person), phone, slot, visit type chosen from a list, consent. No free-text health reason. GA4 events carry none of it.
- Generated or drawn illustrations (for example the tube-and-globules picture in `HomeoArt.tsx`, redrawn from the clinic business card) are labelled "Illustration". No remedy labels or brand names in them.
- Motion: `data-motion` is full / lite / off, set before paint; honour `prefers-reduced-motion` and data-saver; never hide content behind an animation. Provide the Aa display controls on every page.
- The QR code encodes `SITE_URL`; regenerate `public/downloads` (`npm run pdfs`) whenever the domain changes.

## Owner decisions, 21 Oct 2026 round (these override earlier lines above where they differ)
- **AI caption:** the visible "Image enhanced with AI from a real photograph." caption was removed on the owner's instruction. `ai: true` stays in `content/gallery.json` as a record. Never present an AI image of a certificate, plaque, cabinet or entrance as real.
- **DRAFT labels** were removed from every page and the content statuses set to PUBLISHED on the owner's instruction. The doctor's written approval and the native Hindi review are still outstanding (see `content/TODO.md`); do not claim they are done.
- **Camp photos:** the 5 photos in `content/camp-gallery.json` show patients and guests. The owner confirmed in chat that every person agreed to appear. Keep the written consents in the clinic's records; if anyone withdraws, remove the photo. Originals stay out of git (`source/photos/camp-*`).
- **Care areas** now list common complaints taken from the printed handout, **excluding** anything on the Schedule of the Drugs and Magic Remedies Act 1954 (for example diabetes, blood pressure, stones, menstrual disorders, leucoderma, fevers in general). The list is framed as concerns people consult about, with no result promised. Do not add Schedule items.
- **Qualification years** are not shown in the About points, Home card or hero. Degree order: M.D. (Homoeopathy), MBA (HR), NDDY.
- **Testimonials:** never write or generate patient reviews or stories. Only real ones with recorded consent (Rule 3). The Experiences page stays empty until then.
- **Map:** `mapsEmbedUrl` is a Google embed of the written address (not an exact pin). Verify the pin or replace it with the Share > Embed src.

## Owner decisions, 26 Oct 2026 (from the doctor's message)
- Always write the doctor as "Dr. Rama Mathur" (Hindi "डॉ. रमा माथुर"), never "Dr. Mathur" alone.
- Credentials line: M.D. (Homoeopathy), NDDY, Dietitian (owner, 26 Oct 2026: replaces "Nutritionist"; never add "Registered" unless she supplies proof of registration). The doctor also gives services at MRDC Satellite Hospital, Banipark, Jaipur (shown on the RIICO card and About).
- Women's health (updated later the same day, doctor insisted) lists PCOS, endometriosis, uterine fibroids, menstrual disorders, pelvic inflammatory disease, menopause-related conditions, urinary tract infections and vaginal infections. Breast cancer and cervical cancer are still NOT listed. Earlier note: these were first held back: cancer, tumours (fibroids), diseases of the uterus, female diseases in general and disorders of menstrual flow are on the Schedule of the Drugs and Magic Remedies Act 1954 (section 3(d) bars suggesting a drug treats them). Add them only on a written opinion from a qualified lawyer or the regulator.
- The conference count was removed. The Online consultation page and menu tab were removed (old links redirect to Book); online consultation is stated as "by prior booking and online payment" and is a visit type on the booking form.

## Owner decisions, 26 Oct 2026 (third round)
- **35+ years** is the highlighted item: the blue box on Home, the blue stat in the hero, and a highlighted point on Home, About and Care areas. **24 years (RIICO) and the MRDC line are plain, not highlighted.**
- About opens with: "stalwart in the field of homeopathy" + M.D. thesis topic (menopausal syndrome), then "treats different types of acute and chronic diseases" (the owner chose her exact words despite the self-praise rule).
- Care areas now also list: slip disc, skin blemishes, menorrhagia, disturbed behaviour, migraine, dental health, kidney and urinary health (including kidney stones), obesity management, diabetes management and physiotherapy; "Children's health" became "Children's and adult health". The owner chose to add Schedule items without any on-page flag. Cancers are still not listed. The content check no longer blocks "diabetes" or "kidney stone".
- The urgent-care blog article's emergency section (and its 112 text) was removed at the owner's request; it is now about working with other doctors. 112 text remains in Privacy, FAQ and First visit unless the owner asks otherwise.

## Stack
Next.js App Router + TypeScript + Tailwind; next-intl (en, hi; `/en`, `/hi`); MDX blog; Supabase for bookings; Vercel. Secrets only in env vars (`.env.example` documents them).

## Process
1. Build order: tokens, layout and i18n; Home; Book; About; remaining pages; SEO; analytics.
2. After each step run typecheck, lint and build; fix before moving on.
3. Finish with: what is done, what is TODO, how to run locally and deploy.

## Quality bar
Lighthouse mobile: performance 90+, accessibility 95+, SEO 95+. WCAG AA contrast, keyboard navigable, correct Hindi rendering, no layout shift.
