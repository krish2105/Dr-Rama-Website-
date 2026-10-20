# Rajesh Homeo Home website (English + Hindi)

Next.js 16 (App Router) + TypeScript + Tailwind 4 + next-intl + MDX. Facts and rules: `PROJECT-BRIEF.md`, `CLAUDE.md`. Open items: `content/TODO.md`.

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
1. Create a Supabase project and run `supabase/migrations/0001_bookings.sql`.
2. Set `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (server only), and for the email alert `RESEND_API_KEY`, `BOOKING_ALERT_TO`, `BOOKING_ALERT_FROM`.
3. Without these, development logs a mock success; production returns an error so no request is silently lost.

## Analytics
Set `NEXT_PUBLIC_GA_ID`. GA4 loads only after the visitor accepts. Events (`click_call`, `click_whatsapp`, `click_book`, `booking_submit`) carry no personal or health data.

## Deploy (Vercel)
1. Push the repo, import it in Vercel, add the env vars above plus `NEXT_PUBLIC_SITE_URL` (the real domain).
2. Run `npm run check-content -- --strict` and resolve every item.
3. Add Vercel Firewall rate limiting on `/api/booking` (the in-code limiter is best effort per instance).
4. Re-run Lighthouse on the live URL; submit the sitemap in Search Console.
