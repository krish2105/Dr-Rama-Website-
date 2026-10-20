# PROJECT BRIEF: Rajesh Homeo Clinic website (Phase 1)

You are building a bilingual (English + Hindi) website for a homeopathy clinic in Jaipur, Rajasthan, India. Start in plan mode: read this brief and everything in /source, tell me what you understood, list what is still missing, then propose a plan and wait for my approval before writing code.

Rule for facts: use only the facts in this brief or in /source. Never invent a fact. Anything missing goes in /content/TODO.md and shows a clear placeholder on the site in development only.

## 1. Source material (in /source)
- /source/cv/ : three photos of the doctor's printed CV. Read them for facts. Do not publish the CV itself.
- /source/photos/ : real photos of the clinic and the doctor. Use only these for anything that shows the clinic or the doctor. Never replace them with generated images.
- /source/brand/ : logo files, when available.

## 2. Clinic and doctor facts (from her CV)
- Clinic name: Rajesh Homeo Clinic
- Doctor: Dr. Rama Mathur, M.D. (Homoeopathy)
- Experience: 31 years of clinical experience
- Languages: Hindi, English
- Phone: +91 94143 62499 (CONFIRM it may be public; use for the Call and WhatsApp buttons)
- Email: rama_mathur@yahoo.com (CONFIRM; prefer a clinic email when one exists)
- Address: 202, 2nd Floor, Rajvilas Apartment, Meera Marg, Banipark, Jaipur, Rajasthan 302016 (CONFIRM this is the clinic address and may be published)
- The real consultation room has cream walls, warm wood trim and furniture, a glass-top desk, wooden chairs with blue floral cushions, glass-door display cabinets with certificates, and bamboo blinds.

### Still missing (do not invent; list in /content/TODO.md)
State council name and registration number, clinic timings and weekly off day, consultation fees and payment methods, Google Maps link, WhatsApp number if different from the phone, appointment policy (appointment or walk-in), localities patients come from, doctor portrait photo, logo.

### Qualifications
- M.D. (Homoeopathy), Rajasthan University, 2001
- NDDY, Gandhi National Academy of Naturopathy, May 2004
- MBA (HR), June 2010

### Experience
- Medical Officer, Khandelwal Vaishya Sewa Sangh, Shastri Nagar, Jaipur (1996 to 2005)
- Guest faculty (Assistant Professor), SKHMC & RC (2005)
- Medical Officer, Orange Cross, engaged by Kamla Poddar Institute, Banipark, Jaipur; managed their health care and wellness programme (2010)
- Empanelled homoeopathic doctor at RIICO (Rajasthan State Industrial Development & Investment Corporation Ltd), Jaipur; 24 years of service (1999 to 2023), retired as Deputy General Manager

### Memberships
- Liga International Homoeopathic Medical League, Delhi (2016)
- Life Member, Rajasthan Swasthya Yog Parishad (1992)

### Conferences attended (show as a collapsed list on the About page)
1. National Conference on Homoeopathy, 2019 (Nainital, Uttarakhand)
2. 18th National Homoeopathic Conference, 2019 (Jammu and Kashmir)
3. International Conference Liga, 2016 (New Delhi)
4. Rajasthan Homoeo Physician Association, 2010 (Jaipur)
5. State Campaign of Homoeopathy for Mother and Child Care, 2009 (Jaipur)
6. 11th Homoeopathic Conference, 2009 (Agra)
7. Department of AYUSH, Ministry of Health and Family Welfare, 2005 (Jaipur)
8. International Yoga Conference "YOGACON", 2004 (Jaipur)
9. International Homoeopathic Conference, 2003 (Agra)
10. 14th AHML International Homoeopathic Conference, 2003 (New Delhi)
11. Homoeopathy Millennium Conference, 2001 (Jaipur)
12. 9th International Homoeopathic Conference, 1997 (Jaipur)
13. National Homoeopathic Conference, 1994 (Jaipur)

### Community work
- Founder and Chairperson, Abhilasha Women's Welfare Society, Jaipur (registered NGO with the Government of Rajasthan since 2006)
- Honoured by Rajasthan Patrika for outstanding service and dedication at a medical camp (2012)
- Contributed to a blood donation camp organised by Swasthya Kalyan Blood Bank, Jaipur

### How she practises (safe wording taken from her CV)
Keeps detailed clinical notes and records for each patient; refers patients to other health practitioners when appropriate; communicates clearly with patients.

### Do NOT publish
Date of birth, gender, nationality, hobbies, the "personal objective", the declaration, management skills, trainings on governance or harassment prevention, and her internal committee roles at RIICO. Do not copy self-praise words from the CV such as "exceptional", "superior" or "strong" (see the compliance rules).

## 3. Goal
Turn a mobile visitor from Google or Instagram into a call, WhatsApp message or booking in under 30 seconds, and make the doctor's 31 years and qualifications easy to trust.

## 4. Stack
Next.js App Router + TypeScript + Tailwind; next-intl (en, hi); MDX blog; Supabase for bookings; deploy on Vercel. Keep all clinic text in /content (JSON + MDX) so the doctor can edit it without code.

## 5. Design
Calm, botanical, trustworthy, not a hospital template. Tokens: cream #FAF7F0, deep green #1F4D3A, sage #8FAE8B, sandstone #C8704F, and warm wood brown #6B4A32 as a secondary accent that echoes the clinic's real furniture. Fraunces for headings, Inter for body, Noto Sans Devanagari for Hindi. Base text 17-18px, tap targets at least 48px. Real photos only (mark placeholders TODO). Gentle fade-ins only; respect prefers-reduced-motion. Mobile-first, check at 360px.

## 6. Pages (each under /en and /hi)
Home, About the doctor (qualifications, experience, memberships, conferences, community work), Services, Care areas, Book, Online consultation (Phase 2 placeholder), Patient experiences, Blog, FAQ, Contact, Privacy and disclaimer.
Write a first draft of the About text in simple English and Hindi from the facts above, mark it DRAFT, and keep it in /content so the doctor can approve it.

## 7. Phase 1 features
- Sticky Call + WhatsApp bar on mobile; language toggle
- Booking form: name, phone, preferred date/time, one-line reason, consent checkbox linked to the privacy page. Save to Supabase, send an email alert to the clinic, and show a WhatsApp click-to-chat confirmation link
- Google Map embed, directions, open-now label (needs the timings; use a TODO until given)
- Photo gallery of the real clinic with alt text in English and Hindi
- MDX blog with 3 starter posts (drafts for the doctor to approve)
- JSON-LD for MedicalClinic and Physician using only the confirmed facts; sitemap, robots, hreflang
- GA4 with no health details in events

## 8. Compliance (hard constraints)
- Never promise or imply a cure, guaranteed result or success percentage. No before/after images. No superlatives such as "best" or "exceptional". No cure claims for any named disease.
- Show the council registration number (when received) and this line in the footer: "Homeopathic care does not replace emergency or specialist medical treatment."
- Do not redraw, retype or alter certificates or plaques shown in photos.
- Collect minimum personal data, show clear consent, offer a data deletion request by email.
- Patient stories only with a recorded consent, about the care experience, never results.

## 9. Quality bar
Lighthouse mobile targets: performance 90+, accessibility 95+, SEO 95+. WCAG AA contrast, keyboard navigable, correct Hindi font rendering, no layout shift, next/image with alt text in both languages.

## 10. Process
1. Plan mode: summarise what you understood, list the missing facts, show the file tree and task list, and wait for my approval.
2. Build in order: tokens, layout and i18n; Home; Book; About; remaining pages; SEO; analytics.
3. After each step run typecheck, lint and build; fix before moving on.
4. Finish with: what is done, what is TODO (missing facts, photos), how to run locally and deploy.
