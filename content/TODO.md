# What remains (updated 20 Oct 2026)

Nothing below may be invented. Placeholders show in development only; production builds never show a fake fact.

## Done
- Name, doctor facts, qualifications, experience (32 years), RIICO service record, memberships, conferences, community work
- Phone, landline, email, address, website domain, hours (business card), appointment policy (prior appointment)
- State council registration: Rajasthan Board of Homoeopathic Medicine, No. 3780 (shown in the footer and on About)
- Portrait and consultation-room photo, approved blue-pottery artwork, share image

## 1. Needed from the doctor
- [ ] **Current registration.** The renewal slip we have was valid only until 19/5/2020. Send the latest renewal. The site shows the number only and does not state a validity date.
- [ ] **Re-confirm the hours.** The site uses the business card (daily 6:00 pm to 8:30 pm; Sunday 10:00 am to 2:30 pm). The handout listed extra morning hours (10:30 am to 2:00 pm). The live "Open now" label follows the card.
- [ ] **Approve the DRAFT pages:** About (EN + HI), Services, Care areas, the 3 blog posts, FAQ, Privacy. Native Hindi review of all Hindi text.
- [ ] Care areas: the handout names diseases (several on the Drugs and Magic Remedies Act 1954 schedule). The site uses broad categories only. Decide whether to reprint the handout without disease claims.
- [ ] Confirm the address line "Rajvilas Apartment I" (the card says "Appartment I", the registration slip omits the "I").
- [ ] Pin code: the card and brief say 302016; the registration slip says 302006. The site uses 302016.
- [ ] Fees and payment methods (none supplied; nothing is shown).
- [ ] Localities patients come from (optional).
- [ ] WhatsApp number: the site assumes it is the same as +91 94143 62499.
- [ ] Doctor to confirm the current portrait (white coat; AI-assisted from a real photo) is a faithful likeness.
- [ ] Confirm the "Honoured by Rajasthan Patrika" line (2012) may be published.

## 2. Photos and brand
- [ ] Real close-up photos: display cabinet, certificate and plaque wall (shoot list in Prompt Pack v3). The generated versions (07, 08) are not used because they invent certificate text. The room images on the site (05, 06) are AI-enhanced and carry a disclosure caption; replace them with real photos when available.
- [ ] Real photo of the flat's entrance door and nameplate (Rajvilas Apartment, 2nd floor).
- [ ] A studio-quality portrait (window light, plain wall) to replace the current one.
- [ ] Logo. The business card uses a cross and an Om-swastika symbol, no wordmark. Until a logo is supplied the site uses a simple rosette mark.
- [ ] Medical-camp photos (5) sit in `source/photos/_pending-consent/`. Each person shown must consent before any is published.
- [ ] Patient experience stories with recorded consent (the page shows an empty state).

## 3. Accounts and launch
- [ ] Domain: the card prints rajeshhomoeohome.in. Confirm the clinic owns it, then point it at Vercel and set `NEXT_PUBLIC_SITE_URL=https://rajeshhomoeohome.in`.
- [ ] Vercel project. Supabase project (run `supabase/migrations/0001_bookings.sql`; add URL and service-role key). Email-alert provider (Resend) and the clinic address that receives alerts. GA4 measurement ID.
- [ ] Google Maps link or place ID (the Visit section and Contact page show a dev-only reminder until supplied).
- [ ] Decide how long booking data is kept and who handles deletion requests by email (the Privacy page shows a dev-only reminder).
- [ ] Add Vercel Firewall rate limiting on `/api/booking`.
- [ ] Run `npm run check-content -- --strict`, then Lighthouse on the live URL, then submit the sitemap in Search Console.
- [ ] Create the Google Business Profile and upload `source/brand/google-business-profile-cover.png`.

## 4. Compliance review before launch
- [ ] A qualified person reviews the final copy against the Drugs and Magic Remedies Act 1954, the Digital Personal Data Protection Act 2023 and Rules 2025, and her council's advertising rules.
- [ ] Ask whether the council issued advertising guidance for registered practitioners.

## 5. Left for a later phase
- [ ] Online consultation (Phase 2 placeholder page exists).
- [ ] Publish the blog posts and set their status from DRAFT to PUBLISHED after approval.
- [ ] Switch Services, Care areas and Experiences from noindex once approved and filled.

## Never publish
Date of birth, gender, nationality, hobbies, personal objective, declaration, management skills, governance or harassment trainings, her internal committee roles at RIICO, the name of her spouse or father on the registration slip, the CV, the printed handout and the registration slip images. The card title "Homoeopathic Advisor" is not used; the site uses M.D. (Homoeopathy) from her CV.
