# TODO: facts and assets still missing

Nothing below may be invented. Each item shows a dev-only placeholder on the site until supplied. Tick when received and entered in `/content`.

## Facts the brief says are missing
- [ ] State council name and registration number (shown in footer once received)
- [ ] CONFIRM clinic timings: taken from the printed handout (daily 10:30 am to 2:00 pm and 6:00 pm to 8:30 pm; Sunday 10:30 am to 2:00 pm, Sunday evening closed). Then set `timingsConfirmed: true` in `content/site.json`.
- [ ] Consultation fees and payment methods
- [ ] Google Maps link / place ID
- [ ] WhatsApp number, if different from +91 94143 62499
- [ ] Appointment policy (appointment only, or walk-in); the handout does not say
- [ ] Localities patients come from
- [ ] Doctor portrait photo
- [ ] Logo (`/source/brand`)

## Confirmations needed before publishing (CONFIRM in brief)
- [ ] Phone +91 94143 62499 may be public (Call and WhatsApp buttons)
- [ ] Email rama_mathur@yahoo.com may be public; or a clinic email, which is preferred
- [ ] Address (202, 2nd Floor, Rajvilas Apartment, Meera Marg, Banipark, Jaipur 302016) is the clinic address and may be published

## Source material not yet received
- [ ] `/source/photos`: real clinic and consultation-room photos, with permission to publish. The folder does not exist yet; owner will supply later.
- [ ] `/source/cv`: three CV photos, to cross-check the facts typed in the brief (not published). Only the typed brief has been used so far.
- [ ] `/source/brand`: logo files

## Content the brief does not provide
- [ ] Services and care-areas list in the doctor's own words (the brief lists none; no condition-specific claims)
- [ ] FAQ answers in the doctor's words
- [ ] Patient experience stories with recorded consent (none exist; page shows an empty state)
- [ ] Doctor approval of DRAFT About text (EN + HI) and the 3 DRAFT blog posts
- [ ] Native Hindi review of all Hindi text, including the footer disclaimer

## Accounts and operations
- [ ] Domain name
- [ ] Vercel account / project
- [ ] Supabase project (URL, anon key, service role key)
- [ ] Email-alert provider and the clinic email that receives booking alerts
- [ ] GA4 measurement ID
- [ ] Who handles data-deletion requests by email, and how long booking data is kept

## Compliance follow-up
- [ ] Ask whether her state council issued advertising guidance for registered practitioners
- [ ] Qualified review of the final copy (Drugs and Magic Remedies Act 1954, DPDP Act 2023 and Rules 2025)

## Added during build
- [ ] Decide how long booking data is kept (privacy page shows a dev-only TODO until stated)
- [ ] Doctor to confirm the "Honoured by Rajasthan Patrika for outstanding service and dedication" line may be published (wording is from the brief; reported honour, not self-praise)
- [ ] Services, Care areas, Experiences and Online consultation pages are `noindex` and out of the sitemap until they have real content
- [ ] Recheck Lighthouse on the live domain (lab scores: English 94 to 95, Hindi 91 to 92)
- [ ] Replace the wordmark/leaf mark with the real logo when supplied
- [ ] After photos arrive: run `npm run photos`, write EN + HI alt text, check the hero, About and gallery layouts with the real images

## From the printed handout and photos (20 Oct 2026)
- [x] Experience is 32 years (confirmed by the owner 20 Oct 2026; the CV said 31). Site updated.
- [ ] CONFLICT: the brief says "2nd Floor", the handout says "1st". The site says 2nd Floor. Doctor to confirm.
- [ ] Doctor to approve the DRAFT Care areas and Services pages. The handout lists many named conditions; the site uses broad categories only (no diabetes, blood pressure, menstrual disorders, stones or other named diseases). Ask whether the doctor wants the handout reprinted without disease claims.
- [ ] Doctor portrait: the current portrait is a 560 px crop from a medical-camp photo. Replace with a proper portrait (window light, plain wall).
- [ ] Consultation-room photo is the original wide-angle shot, cropped to the lower part. Reshoot per the checklist in Prompt Pack v3 for a better gallery.
- [ ] Photo of the flat's entrance door and nameplate (Rajvilas Apartment, 2nd floor), so visitors can find it.
- [ ] Five medical-camp photos are held in `source/photos/_pending-consent/` (they show patients and other people). Each person needs to consent before any is published. Decide which, if any, to use for the Community work section. Also confirm what the honour-handover photo shows before using it.
- [ ] Doctor to confirm the website may show her portrait and the room photo.

## From the generated image pack (20 Oct 2026)
- [ ] Real close-up photos for the About and Visit galleries: display cabinet, certificate and plaque wall, glass desk with chairs (shot per the checklist in Prompt Pack v3). The generated versions (04 to 08) were not used because they alter the room and invent certificate text.
- [ ] Real photo of the flat's entrance door and nameplate. The generated entrance images (09, 10) were not used.
- [ ] Doctor to confirm the lit portrait (03) is a faithful likeness of her.
- [ ] Upload `source/brand/google-business-profile-cover.png` to the Google Business Profile once the profile exists.
