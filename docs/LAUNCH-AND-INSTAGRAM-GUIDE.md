# Rajesh Homeo Home: launch checklist, how to add what is missing, and Instagram guide

Written 20 Oct 2026. Open items are also in `content/TODO.md`. Nothing here is legal advice: have a qualified person review the final copy and the social plan.

> For the full social launch (Instagram, Facebook, WhatsApp, ads, 24 posts with captions, Reels, rules), use the Word pack `docs/Rajesh-Homeo-Home-Instagram-Meta-Ads-Launch-Pack.docx` and the templates in `social/templates/`. This file is the shorter version.

## A. What is remaining, in the order to do it

### This week (needs the doctor or the owner, no developer)
1. **Current registration renewal.** The slip we hold was valid to 19/5/2020. Get the latest renewal. Until then the site shows the number (3780) and no validity date.
2. **Re-confirm the hours.** The site follows the business card (every day 6:00 to 8:30 pm, Sunday 10:00 am to 2:30 pm). The Hindi handout listed extra morning hours.
3. **Doctor reads and approves the DRAFT text:** About, Services, Care areas, FAQ, Privacy, 3 blog posts. A native Hindi speaker checks the Hindi.
4. **Fees and payment methods.** Not supplied, so nothing is shown. Send them and they go on Contact and FAQ.
5. **Google Maps link** (see B1).
6. **Real photos:** close-ups of the cabinet and certificate wall, a studio-quality portrait, and the flat's entrance door with the nameplate. Shoot list in Prompt Pack v3.
7. **Logo.** The card has a cross and an Om-swastika symbol but no wordmark. Decide whether to keep that symbol or commission a simple wordmark.
8. **Reprint the handout without disease names and the word "इलाज".** Several named conditions on it are on the schedule of the Drugs and Magic Remedies Act 1954.

### Then (accounts and launch)
9. Confirm the clinic owns **rajeshhomoeohome.in**.
10. Create accounts: GitHub, Vercel, Supabase, Resend (email alerts), Google Analytics 4, Google Business Profile.
11. Decide how long booking data is kept and who handles deletion requests by email.
12. A qualified person reviews the copy (Drugs and Magic Remedies Act 1954, DPDP Act 2023 and Rules 2025, her council's advertising rules).
13. Deploy, run `npm run check-content -- --strict`, run Lighthouse on the live URL, submit the sitemap in Google Search Console.

### Later
14. Online consultation (Phase 2 placeholder page exists). Publish the blog posts after approval. Remove noindex from Services, Care areas and Experiences once approved and filled.

## B. How to add each missing item

**B1. Google Maps link and map**
1. Open google.com/maps on a computer and search the clinic (or the address). If the clinic is not listed yet, search "Raj Vilas Apartment 1, Meera Marg, Bani Park, Jaipur" and click the exact building.
2. Click **Share**. Under **Send a link** copy the link. Paste it into `content/site.json` as `"mapsUrl"`. This makes the Get directions buttons open Google Maps.
3. In the same Share box open **Embed a map**, copy the HTML, and take **only the address inside `src="..."`** (it starts with `https://www.google.com/maps/embed?pb=`). Paste it as `"mapsEmbedUrl"`.
4. Reload the site. The dev-only reminder disappears and the map shows on Home (Visit the clinic) and Contact.
Check that the pin sits on the right building.

**B2. WhatsApp number if different:** in `content/site.json` set `"whatsapp": { "sameAsPhone": false, "e164": "+91XXXXXXXXXX" }`.

**B3. Registration renewal:** update `registration` in `content/site.json` only if the number changes. Do not add a validity date until the doctor confirms it.

**B4. Photos:** copy files into `source/photos/` (name the portrait `doctor-...jpg`), run `npm run photos`, then write English and Hindi alt text in `content/gallery.json` (or `content/site.json` for the portrait). Photos with patients or other people go to `source/photos/_pending-consent/` until each person consents in writing.

**B5. Approving text:** in each content file change `"_status": "DRAFT"` to `"PUBLISHED"` (About, Services, Care areas, FAQ) and `status: "DRAFT"` to `"PUBLISHED"` in each blog post. Drafts show a DRAFT label and stay out of search results.

**B6. Domain, hosting and accounts**
1. Push the project to a private GitHub repository.
2. Vercel: import the repository. Add environment variables (see `.env.example`): `NEXT_PUBLIC_SITE_URL=https://rajeshhomoeohome.in`, `NEXT_PUBLIC_GA_ID`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `BOOKING_ALERT_TO`, `BOOKING_ALERT_FROM`.
3. Supabase: create a project, open SQL Editor and run `supabase/migrations/0001_bookings.sql`. Keep the service-role key secret (server only).
4. Resend: add and verify the sending domain; choose the clinic address that receives booking alerts.
5. GA4: create a property, copy the measurement ID (G-XXXX). It only loads after a visitor accepts.
6. Domain: in Vercel add rajeshhomoeohome.in and set the DNS records at the registrar.
7. The site is blocked from search engines (robots.txt and noindex) until you set `NEXT_PUBLIC_INDEXABLE=true` in Vercel. Do that on launch day, together with the real domain in `NEXT_PUBLIC_SITE_URL`.
8. After launch: submit `https://rajeshhomoeohome.in/sitemap.xml` in Search Console and test a booking end to end.

**B7. Fees (once supplied):** tell me the amounts and payment methods; I add a row to Contact and an FAQ answer.

## C. Instagram: setup

1. **Account type.** Create a new account, then Settings > Account type and tools > **Switch to professional account > Business**, category **Doctor** (or Homeopath if offered). Use the clinic's email, not a personal one.
2. **Handle.** Match the card and domain: `@rajeshhomoeohome`. If taken, `@rajeshhomoeohome.jaipur`. Keep the same name on Google, Facebook and WhatsApp.
3. **Name field (searchable):** `Dr. Rama Mathur | Rajesh Homeo Home`.
4. **Profile photo:** a square crop of the real portrait (face centred). A logo can replace it later.
5. **Bio (about 150 characters), English and Hindi in one:**
   `Homeopathic consultations, Banipark, Jaipur. M.D. (Homoeopathy). Hindi & English. By appointment. होम्योपैथिक परामर्श`
6. **Link:** `https://rajeshhomoeohome.in/en/book?utm_source=instagram&utm_medium=bio` (the UTM tags let Google Analytics show how many bookings came from Instagram).
7. **Contact buttons:** add Call (+91 94143 62499), Email (rama_mathur@yahoo.com) and the address, so people can tap Call or Directions. Add a **Book** action button pointing to the link above if available.
8. **Highlights (made from Stories, cover in the site's blue and ivory):** About, Hours and location, How to book, What to bring, FAQs.
9. **Connect:** link a Facebook Page (needed for scheduling posts in Meta Business Suite) and the Google Business Profile.
10. **WhatsApp Business app** (separate from Instagram): create a business profile with the same address, hours and greeting message ("Thank you for messaging Rajesh Homeo Home. Consultation is by prior appointment. Please share your name and preferred day, and the clinic will reply."). Do not collect health details on WhatsApp.
11. **Who runs it:** one named person posts; the doctor approves each post before it goes live; keep a simple list of what was posted.

## D. What to post

### Content pillars (aim for 3 feed posts and 3 to 5 Stories a week, 1 to 2 Reels a week)
1. **Meet the doctor:** real portrait, her qualifications as facts, languages, 35+ years of experience, her RIICO service record, the community work (with consent).
2. **Know the clinic:** hours, how to book, what to bring on a first visit, where to find the flat.
3. **Everyday health tips (general only):** drink water, sleep, seasonal habits for monsoon, winter and summer. No disease names, no promises.
4. **Homeopathy explained simply:** what a consultation is, why records are kept, when to see a specialist or go to hospital.
5. **Community and festivals:** camps (only with consent from every person visible), Diwali and other greetings.
6. **FAQs in Hindi:** 30 to 45 second Reels answering one question each.

### First 4 weeks, ready to use
| Week | Post | Format | Caption idea (check each against section E) |
|---|---|---|---|
| 1 | Meet Dr. Rama Mathur | Photo (portrait) | "M.D. (Homoeopathy). 35+ years of clinical experience. Hindi and English. Consultation in Banipark, Jaipur, by appointment." |
| 1 | Hours and location card | Image | Hours, address, phone, "Consultation is with a prior appointment." |
| 1 | How to book in 3 steps | Reel or carousel | Call, WhatsApp, or the website form |
| 2 | What to bring on your first visit | 4-slide carousel | Earlier reports, list of current medicines, questions |
| 2 | Her service record | Carousel | Empanelled homoeopathic doctor at RIICO for 24 years |
| 2 | When to go to a hospital | Image | "Homeopathic care does not replace emergency or specialist medical treatment. In an emergency call 112." |
| 3 | Monsoon habits | Illustration | General tips only |
| 3 | Why we keep detailed notes | Reel | From her own practice wording: keeps detailed clinical notes, refers patients when appropriate, communicates clearly |
| 3 | FAQ: Do I need an appointment? | Hindi Reel | Yes, consultation is by prior appointment |
| 4 | A look at the consultation room | Photo (label AI-enhanced images as such) | "Where we meet our patients." |
| 4 | Community work | Photo or text (consent first) | Founder and Chairperson, Abhilasha Women's Welfare Society |
| 4 | Diwali greeting | Illustration | Greeting only |

Use the artwork from Prompt Pack v3 (groups B and C) for the illustrated posts. Add the text in Canva yourself, in English and Hindi, because image tools misspell text.

### Hashtags (5 to 8 per post, not 30)
`#HomeopathyJaipur #JaipurDoctor #BaniPark #DrRamaMathur #Homoeopathy` plus a Hindi one such as `#होम्योपैथी`.

## E. Rules for what you post (very important)

Indian rules change and differ by system of medicine. Homoeopathic practitioners fall under the National Commission for Homoeopathy (NCH). Its January 2026 circular lists false, misleading, exaggerated or guaranteed-cure claims, including on social media, as prohibited conduct. The NMC's October 2026 advertising guidelines (written for allopathic doctors) also ban patient testimonials, paid or fake reviews and guaranteed claims, which shows the direction of regulation. The Drugs and Magic Remedies (Objectionable Advertisements) Act 1954 also applies. Get the actual NCH text from nch.org.in and have it reviewed.

**Do**
- State facts only: qualifications, experience, hours, address, languages.
- Add this line to health-education posts: "Homeopathic care does not replace emergency or specialist medical treatment."
- Get written consent before showing any patient or visitor, and do not post names, prescriptions or reports.
- Say "AI-enhanced" under any AI-edited image of the clinic.
- Answer comments and DMs with "please call or book" only.

**Do not**
- Promise or imply a cure, guaranteed result, success rate or "100%".
- Name diseases as conditions you treat (diabetes, blood pressure, stones, menstrual disorders and others are on the Act's schedule).
- Post before-and-after images or results stories.
- Post patient testimonials or run review incentives.
- Give diagnosis, treatment advice or remedy names in comments or DMs.
- Argue about homeopathy online.

## F. Google Business Profile (do this before Instagram)
1. Create or claim the listing at business.google.com. Category: Homeopathic Clinic or Homeopath.
2. Enter the same name, address, phone, hours and the website. Add the real photos and the cover from `source/brand/google-business-profile-cover.png`.
3. Verification (video or postcard) can take about a week.
4. Add the booking link `https://rajeshhomoeohome.in/en/book?utm_source=google&utm_medium=gbp`.
5. Reviews: patients may leave them on their own; do not ask in exchange for anything; reply with thanks only and never confirm that someone is a patient or discuss health.

## G. Sources
- NCH circular of 29 Jan 2026 on prohibited acts: https://nch.org.in/upload/NCH(BERH) Circular 29.01.2026.pdf
- NMC advertising guidelines coverage: https://thesouthfirst.com/health/doctors-on-instagram-nmc-says-no-to-patient-testimonials-paid-ads-ai-promotions-and-guaranteed-claims/
- Drugs and Magic Remedies Act 1954 (India Code): https://www.indiacode.nic.in/indiacode/bitstream/123456789/1412/1/A1954-21.pdf
