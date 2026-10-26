# Rajesh Homeo Home website (English + Hindi)

Next.js 16 (App Router) + TypeScript + Tailwind 4 + next-intl + MDX. Facts and rules: `PROJECT-BRIEF.md`, `CLAUDE.md`. Open items: `content/TODO.md`.

## Live site and repository
- Live (pre-launch, hidden from search engines): https://dr-rama-website.vercel.app
- Code: https://github.com/krish2105/Dr-Rama-Website- (branch `main`). Every push to `main` deploys to Vercel production automatically.
- Vercel project: `dr-rama-website` (account krishnamathur008-1499). Until Supabase and the email keys are added, the booking form shows a "not switched on yet" message with a prefilled WhatsApp message and a Call button.

## What is in this repository
| Path | What |
|---|---|
| `src/` | The Next.js site (English and Hindi under `/en` and `/hi`) |
| `content/` | All clinic text as JSON and MDX so the doctor can edit it: `site.json` (facts), `messages/` (page text), `en/` and `hi/` (About, FAQ, Privacy, Services, Care areas), `blog/` |
| `public/` | Optimised photos, artwork, fonts and the share image |
| `social/templates/` | Blue-pottery templates for Instagram, Facebook and ads, at posting sizes |
| `docs/` | `LAUNCH-AND-INSTAGRAM-GUIDE.md`, the Word pack `Rajesh-Homeo-Home-Instagram-Meta-Ads-Launch-Pack.docx` (setup, 24 posts with captions, Reels, 6 ads, rules), the Hinglish go-live guide for the clinic `Rajesh-Homeo-Home-Go-Live-Guide-Hinglish` (.docx and .pdf: what is missing, costs in INR, step by step) and the image-decision notes |
| `scripts/` | `npm run photos` (import photos) and `npm run check-content` (compliance check) |
| `content/TODO.md` | Everything still open |

Key facts on the site: Dr. Rama Mathur, M.D. (Homoeopathy), 35+ years of clinical experience (since 1991), Hindi and English, by prior appointment, hours (Mon to Sat 10:30 am to 2:00 pm and 6:00 pm to 8:30 pm; Sunday 10:30 am to 2:00 pm), Rajasthan Board of Homoeopathic Medicine registration No. 3780.

## Phase 1.5 (built from `docs/PHASE-1.5-FEATURE-PLAN.md`, no database needed)
- **Booking v2** (`/book`): 3 steps (who is it for, pick a time, details), time chips grouped Morning / Afternoon / Evening, "Request a call back" tab, booking for a child or another person (guardian name + confirmation), visit type from a short list (no free-text health reason), `.ics` calendar file, WhatsApp confirm, how the visitor found the site (UTM, whitelist only). Slots are **requests** the clinic confirms; they come from `content/site.json` timings and `content/availability.json` (slot length, days ahead, blocked dates).
- **New pages:** `/how-to-reach`, `/first-visit` (printable, PDF download, QR, globules illustration; DRAFT, noindex until approved), `/qr-poster` (A4 poster with the QR; noindex).
- **PDFs and QR codes:** `SITE_URL=https://rajeshhomoeohome.in npm run pdfs` rebuilds `public/downloads/first-visit-{en,hi}.pdf` and `qr-poster-{en,hi}.pdf` (needs Google Chrome). **Re-run it with the real domain before printing anything**: the QR encodes `SITE_URL/<locale>/book?utm_source=qr&utm_medium=print`. The committed PDFs point at the Vercel address.
- **Display controls** ("Aa" menu, and in the mobile menu): theme, text size (A / A+ / A++), animations On / Off. **Motion system:** scroll-driven reveals, header shrink, press and lift feedback, hero tilt on desktop. Reduced-motion and data-saver visitors get less; `NEXT_PUBLIC_MOTION_LEVEL=off` turns all motion off site-wide.
- **Floating dock v2** with open-now and next-slot status; **notice banner** from `content/notices.json` (date window, dismissible); **Jump to** menu on About and Privacy; empty-state artwork; print styles.
- **Structured data:** MedicalClinic + Physician + ReserveAction (site-wide), FAQPage and BreadcrumbList (FAQ, About, How to reach). `sameAs` appears only after `profiles` URLs are added to `content/site.json`.
- **Not built yet (needs the clinic's Supabase account):** staff admin screen, slot capacity enforcement, reminders, retention job. `supabase/migrations/0002_phase15.sql` is prepared but **not applied**. Also deferred: WebGL hero, 360 tour.

## Run locally
```bash
npm install
cp .env.example .env.local     # optional; blank values use the dev mock handlers
npm run dev                    # http://localhost:3000  (redirects to /en)
```
Checks: `npm run typecheck`, `npm run lint`, `npm run build`, `npm run check-content`.
Before any deploy run `npm run check-content -- --strict`; it fails while facts are unconfirmed or missing.

## Where the doctor edits text (no code)
| What | File |
|---|---|
| Name, phone, email, address, timings, registration, confirmations | `content/site.json` |
| Page copy and UI text | `content/messages/en.json`, `content/messages/hi.json` |
| About page | `content/en/about.json`, `content/hi/about.json` |
| FAQ, Privacy | `content/{en,hi}/faq.json`, `privacy.json` |
| Blog posts | `content/blog/{en,hi}/*.mdx` (`status: "DRAFT"` until approved, then `"PUBLISHED"`) |
| Real photos | put files in `source/photos/` (portrait named `doctor-...`), run `npm run photos`, then add `altEn` / `altHi` in `content/gallery.json` and `content/site.json` |

Set `confirmed: true` in `site.json` only after the doctor confirms in writing. JSON-LD only includes confirmed facts.

## Bookings (Supabase + email alert)
1. Create a Supabase project and run `supabase/migrations/0001_bookings.sql` and then `0002_phase15.sql`.
2. Set `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (server only), and for the email alert `RESEND_API_KEY`, `BOOKING_ALERT_TO`, `BOOKING_ALERT_FROM`.
3. Without these, development logs a mock success; production returns an error so no request is silently lost.

## Analytics
Set `NEXT_PUBLIC_GA_ID`. GA4 loads only after the visitor accepts. Events (`click_call`, `click_whatsapp`, `click_book`, `booking_submit`) carry no personal or health data.

## Deploy (Vercel)
1. Push the repo, import it in Vercel, add the env vars above plus `NEXT_PUBLIC_SITE_URL` (the real domain).
2. Run `npm run check-content -- --strict` and resolve every item.
3. Add Vercel Firewall rate limiting on `/api/booking` (the in-code limiter is best effort per instance).
4. Re-run Lighthouse on the live URL; submit the sitemap in Search Console.
