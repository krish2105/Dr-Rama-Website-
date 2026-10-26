# What remains (updated 20 Oct 2026)

How to do each item, plus the Instagram and Google Business setup: `docs/LAUNCH-AND-INSTAGRAM-GUIDE.md`. For the clinic (non-technical, Hinglish, costs in INR): `docs/Rajesh-Homeo-Home-Go-Live-Guide-Hinglish.pdf`.

Nothing below may be invented. Placeholders show in development only; production builds never show a fake fact.

## Done
- Name, doctor facts, qualifications, experience (35+ years, since 1991), RIICO service record, memberships, conferences, community work
- Phone, landline, email, address, website domain, hours (business card), appointment policy (prior appointment)
- State council registration: Rajasthan Board of Homoeopathic Medicine, No. 3780 (shown in the footer and on About)
- Portrait and consultation-room photo, approved blue-pottery artwork, share image
- Social launch pack (Word) and templates in `social/templates/`
- Confirmed by the owner on 21 Oct 2026: Dr. Mathur herself answers the phone and confirms booking requests; the address is written "Raj Vilas Apartment 1" (there is also an Apartment 2); registration No. 3780 is current and valid (the site still states no validity date); hours as on the website; pin code 302016; WhatsApp is the same number; slot length 20 minutes with one patient per slot; consultation fee ₹800; payment by UPI or cash (no UPI ID is published); Dr. Mathur approved the site text

## 1. Needed from the doctor
- [ ] Localities patients come from (optional).
- [ ] Doctor to confirm the current portrait (white coat; AI-assisted from a real photo) is a faithful likeness.
- [ ] Confirm the "Honoured by Rajasthan Patrika" line (2012) may be published.

### Booking v2 questions (Phase 1.5)
- [ ] Landmark near Raj Vilas Apartment 1, parking, and whether there is a lift (How to reach page shows a dev-only note until supplied).
- [ ] ABDM Healthcare Professional Registry ID, if the doctor has one (not shown until supplied).
- [ ] Existing online listings (Google, Practo, Justdial, Facebook) so `profiles` can be filled in `content/site.json` for structured data.
- [ ] After the real domain is live: run `SITE_URL=https://rajeshhomoeohome.in npm run pdfs`, commit, and only then print the QR poster.
- [ ] The globules picture is our own blue-pottery illustration, captioned as an illustration. A real photo of globules can replace it if the doctor wants one.

### Added 21 Oct 2026 (after the owner's changes)
- [ ] Keep the **written consent** of each person in the 5 camp photos (shown on Home and About). The owner confirmed in chat that all agreed.
- [ ] Keep Dr. Mathur's **written approval** of the site text on file (the owner reports she approved it on 21 Oct 2026). A native Hindi review is still worth doing.
- [ ] Care areas now list common complaints from the handout (Schedule items left out). Ask a qualified reviewer to confirm the wording is acceptable under the NCH circular and the 1954 Act before launch.
- [ ] Check the **map pin** on Contact, Home and How to reach. It searches the written address; if the pin is off, paste the Share > Embed src into `mapsEmbedUrl`.
- [ ] Patient testimonials: none exist. To add real ones, get a signed consent from each person for the exact words and keep results out of them. The Experiences page shows an empty state until then.

### Added 26 Oct 2026 (doctor's message)
- [ ] **Held back, needs a qualified legal opinion before listing:** breast cancer, cervical cancer, uterine fibroids, endometriosis, menstrual disorders, pelvic inflammatory disease. Most are on the Schedule of the Drugs and Magic Remedies Act 1954 (cancer; tumours; diseases of the uterus; female diseases in general; disorders of menstrual flow). Listing cancer as a condition a homoeopathy clinic treats is also a patient-safety risk. The site refers patients to specialists instead.
- [ ] Nutritionist: send the course or institution if she wants it shown (the site currently says only "Nutritionist").
- [ ] MRDC: send the full name of MRDC if she wants it spelled out (the site says "MRDC Satellite Hospital, Banipark, Jaipur").
- [ ] New hours are live (Mon to Sat 10:30 am to 2:00 pm and 6:00 pm to 8:30 pm; Sunday 10:30 am to 2:00 pm). The Hinglish go-live guide, the Word launch pack and the Instagram templates still show the old hours and need a refresh.

### Added 26 Oct 2026 (new photo)
- [ ] The photo of Dr. Rama Mathur at her desk (Home "Visit the clinic" gallery and About "Consultation room") was supplied by the owner on 26 Oct 2026. Confirm it is a real photograph (or note if it is AI-enhanced) and that the doctor approves the likeness. The original sits in `source/photos/clinic-doctor-at-desk.webp`.

## 2. Photos and brand
- [ ] Real close-up photos: display cabinet, certificate and plaque wall (shoot list in Prompt Pack v3). The generated versions (07, 08) are not used because they invent certificate text. The room images on the site (05, 06) are AI-enhanced and carry a disclosure caption; replace them with real photos when available.
- [ ] Real photo of the flat's entrance door and nameplate (Raj Vilas Apartment 1, 2nd floor).
- [ ] A studio-quality portrait (window light, plain wall) to replace the current one.
- [ ] Logo. The business card uses a cross and an Om-swastika symbol, no wordmark. Until a logo is supplied the site uses a simple rosette mark.
- [ ] Patient experience stories with recorded consent (the page shows an empty state).

## 3. Accounts and launch
- [ ] Domain: the card prints rajeshhomoeohome.in. Confirm the clinic owns it, then point it at Vercel and set `NEXT_PUBLIC_SITE_URL=https://rajeshhomoeohome.in`.
- [x] GitHub repo (krish2105/Dr-Rama-Website-) and Vercel project (dr-rama-website) are set up; pushes to `main` deploy automatically. Live at https://dr-rama-website.vercel.app (blocked from search engines until `NEXT_PUBLIC_INDEXABLE=true`).
- [ ] Supabase project (run `supabase/migrations/0001_bookings.sql` then `0002_phase15.sql` (the booking form needs both); add URL and service-role key). Email-alert provider (Resend) and the clinic address that receives alerts. GA4 measurement ID.
- [ ] Google Maps: paste the Share link as `mapsUrl` and the embed `src` as `mapsEmbedUrl` in `content/site.json` (steps in the guide). The Visit section and Contact page show a dev-only reminder until then.
- [ ] Decide how long booking data is kept and who handles deletion requests by email (the Privacy page shows a dev-only reminder).
- [ ] Add Vercel Firewall rate limiting on `/api/booking`.
- [ ] Run `npm run check-content -- --strict`, then Lighthouse on the live URL, then submit the sitemap in Search Console.
- [ ] Native Hindi review of all Hindi text, including the Hindi name of the registration council ("राजस्थान होम्योपैथिक चिकित्सा बोर्ड"; confirm the official Hindi name).
- [ ] Create the Google Business Profile and upload `source/brand/google-business-profile-cover.png`.

## 4. Compliance review before launch
- [ ] A qualified person reviews the final copy against the Drugs and Magic Remedies Act 1954, the Digital Personal Data Protection Act 2023 and Rules 2025, and her council's advertising rules.
- [ ] Ask whether the council issued advertising guidance for registered practitioners.

## 5. Left for a later phase
- [ ] Phase 1.5 items that need the clinic's Supabase account: staff admin screen, one-booking-per-slot enforcement, reminders, booking-data retention job (migration `0002_phase15.sql` ready, not applied). Also WebGL hero and 360 tour.
- [ ] Online consultation (Phase 2 placeholder page exists).
- [ ] Publish the blog posts and set their status from DRAFT to PUBLISHED after approval.
- [ ] Switch Services, Care areas and Experiences from noindex once approved and filled.

## Never publish
Date of birth, gender, nationality, hobbies, personal objective, declaration, management skills, governance or harassment trainings, her internal committee roles at RIICO, the name of her spouse or father on the registration slip, the CV, the printed handout and the registration slip images. The card title "Homoeopathic Advisor" is not used; the site uses M.D. (Homoeopathy) from her CV.

## Social launch
- [ ] Doctor approves posts 1 to 6 and ads A1 to A3 in the Word pack; keep an approval log.
- [ ] Create the Instagram account, Facebook Page, Meta Business Suite, WhatsApp Business (steps in the Word pack).
- [ ] Replace [Maps link] in the saved replies once the Google Maps link exists.
