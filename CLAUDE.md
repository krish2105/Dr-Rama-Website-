# CLAUDE.md: Rajesh Homeo Home website (EN + HI)

**Name correction (owner, 2026-10-20): the name is "Rajesh Homeo Home", not "Rajesh Homeo Clinic" as written in PROJECT-BRIEF.md. Hindi: "राजेश होम्यो होम". Never write "Rajesh Homeo Clinic".**

Bilingual website for Dr. Rama Mathur, M.D. (Homoeopathy), Rajesh Homeo Home, Jaipur. Source of truth: `PROJECT-BRIEF.md`. Goal: turn a mobile visitor into a call, WhatsApp message or booking in under 30 seconds, and make her 31 years and qualifications easy to trust.

## Rule 1: Never invent facts
- Use only facts in `PROJECT-BRIEF.md` or `/source` (cv, photos, brand). Nothing from memory, the web or assumptions.
- Anything missing goes in `/content/TODO.md` and shows a clear placeholder **in development only**. Production builds must never render a fake or placeholder fact (hide the section or omit the line instead).
- Facts marked CONFIRM (phone, email, address) are flagged `confirmed: false` in `content/site.json` until the doctor confirms in writing.

## Rule 2: Images
- Anything showing the clinic or the doctor uses real photos from `/source/photos` only. Never generate, stylise or replace them.
- Do not redraw, retype or alter certificates or plaques visible in photos.
- Vector decoration (rosettes, dot rules) is allowed as decoration only, never as a stand-in for a clinic or doctor photo.
- Photo workflow: put real photos in `source/photos` (name the doctor portrait `doctor-...jpg`), run `npm run photos` (resizes, strips EXIF/GPS, writes `public/photos`, `content/gallery.json`, `content/site.json`), then write alt text in EN + HI. `npm run check-content` fails until alt text exists.
- Every image has alt text in English and Hindi. Use `next/image`. Reserve dimensions (no layout shift).
- No before/after images.

## Rule 3: Compliance (hard constraints)
- Never promise or imply a cure, guaranteed result or success percentage. No cure claims for any named disease.
- No superlatives or self-praise: best, exceptional, superior, strong, top, leading, miracle, permanent relief, 100%, guaranteed, cure/cured/curing (and Hindi equivalents).
- Footer on every page, EN and HI: "Homeopathic care does not replace emergency or specialist medical treatment." Hindi version needs native review.
- Show the state council registration number once received (see TODO).
- Collect minimum personal data. Booking: name, phone, preferred date/time, one-line reason, consent. Clear consent checkbox linked to the privacy page. Offer data deletion by email.
- Patient stories only with recorded consent, about the care experience, never results.
- GA4 events must carry no health details (no reason text, no condition names).
- Not legal advice: recommend a qualified review before launch (Drugs and Magic Remedies Act 1954, DPDP Act 2023 / Rules 2025, council advertising rules).

## Do NOT publish
Date of birth, gender, nationality, hobbies, "personal objective", the declaration, management skills, governance or harassment-prevention trainings, her internal committee roles at RIICO. The CV itself is never published.

## Content
- All clinic text lives in `/content` (JSON + MDX) so the doctor can edit it without code.
- Drafts are marked `DRAFT` and need the doctor's approval (About text, blog posts). Hindi needs native review.
- Safe practice wording only: keeps detailed clinical notes and records for each patient; refers patients to other health practitioners when appropriate; communicates clearly with patients.

## Design
- Direction chosen by the client (2026-10-20): **Option B, "Blue Pottery, Friendly"**. No green anywhere. Green from the brief was rejected.
- Palette (tokens in `src/styles/globals.css`): ivory `#F6F1E4`, cobalt `#1D4E9F`, soft blue `#E3EBF8`, navy ink `#13203F`, brass `#B58A33` (ornament only; text uses `#85601D`). Dark: night `#0D1630`, light cobalt `#8DB0F2`, brass `#D8B15C`.
- Fonts: Bricolage Grotesque (EN headings), DM Sans (EN body), Mukta (Hindi, self-hosted in `public/fonts`, preloaded on `/hi` only). Base text 17-18px, tap targets at least 48px.
- Floating UI: floating glass pill header, floating contact dock on mobile (Call / WhatsApp / Book), floating round buttons on desktop, floating chips and cards around the portrait ring, tilted floating gallery cards. Gentle float only; respect `prefers-reduced-motion`.
- Signature: blue-pottery rosette ring around the doctor's real portrait. Rosettes and dot rules are vector decoration only.
- Theme: Light / Dark / System toggle, no flash, WCAG AA in both. Mobile-first; check at 360px.
- RIICO service record has its own section on Home (full corporation name, 24 years, 1999 to 2023, retired as Deputy General Manager). Never publish her internal committee roles at RIICO.

## Stack
Next.js App Router + TypeScript + Tailwind; next-intl (en, hi; `/en`, `/hi`); MDX blog; Supabase for bookings; Vercel. Secrets only in env vars (`.env.example` documents them).

## Process
1. Build order: tokens, layout and i18n; Home; Book; About; remaining pages; SEO; analytics.
2. After each step run typecheck, lint and build; fix before moving on.
3. Finish with: what is done, what is TODO, how to run locally and deploy.

## Quality bar
Lighthouse mobile: performance 90+, accessibility 95+, SEO 95+. WCAG AA contrast, keyboard navigable, correct Hindi rendering, no layout shift.
