# Rajesh Homeo Home: Phase 1.5, 1.6 and 2 feature plan (v2)

Written 20 Oct 2026 after reading the repo (krish2105/Dr-Rama-Website-) and the research below. **v2 adds Phase 1.6: UI, UX, motion, floating UI and 3D (section 3B).** Nothing here is legal advice; a qualified person reviews the final copy and the data handling before launch.

## 0. Decisions already made (from Krishna)
- The **doctor herself** handles booking requests daily, so the admin page must be very simple, mobile first, with Hindi labels.
- After launch, text is updated by **both**: Krishna publishes by default, and the doctor can edit small things (hours, notices).
- Booking upgrades wanted first: **slot-based availability, WhatsApp confirm and reminder, request a call back, booking for a child or someone else**, plus "more research and add".
- Patient experience for this phase: **How to reach page, First-visit PDF and QR codes**.
- Added in v2 (Krishna, 20 Oct 2026): "ultra smooth" animations, relevant 3D, floating UI and the best UI/UX upgrades. Built as **Phase 1.6** after the booking and admin work, because a smooth site that cannot take bookings reliably is not a win. Smooth means fast and calm first; flashy comes second.

## 1. What the research changes
| Finding | What we do |
|---|---|
| The NCH circular (29 Jan 2026) lists guaranteed-cure claims, testimonials used in place of data, emotional patient stories, before/after photos, and treatment advice (general or specific) in posts, reels, comments, DMs or lives as prohibited. | No testimonial widget, no review embed, no "tips" that tell people what to take. Education is about process only. Instagram and DM replies say "please call or book". |
| Generic AI-search advice says to list conditions treated on provider pages. | **We do not follow that part.** Use broad care categories and question-led process pages instead. Follow the rest: structured data, consistent name/address/phone, FAQ in natural language, complete profiles. |
| Jaipur homeopath search results are mostly aggregator listings (Bajaj Finserv Health, MediBuddy, DocIndia, Drlogy and similar), few own sites. | Own site plus Google Business Profile can compete. Also claim and fill the aggregator listings with the **exact same** name, address and phone. |
| Reminder evidence: average healthcare no-show is about 23% (as cited by one source); one non-randomised vendor cohort in Indore reported about 31% falling to about 10%; WhatsApp trials are mixed (a Brazil trial was significant, Mexico and India trials were not). | Treat reminders as cheap and likely helpful, not a guaranteed fix. Measure no-shows before and after. |
| Reminder good practice: consent at booking, a message about 24 hours before and, if unconfirmed, about 2 hours before, only the date, time and clinic name, Confirm / Reschedule / Cancel buttons, stop on cancel, no duplicate sends, send from the clinic number patients already know. | Build exactly that. No health detail in any message. |
| WhatsApp utility template is about Rs 0.145 per message; marketing about Rs 1.09; from 1 Oct 2026 utility messages inside the 24-hour window are no longer free. | A 30-patient-a-day clinic pays only a few rupees a month in message fees. A provider's monthly fee will be the real cost (not checked). |
| DPDP Rules 2025: separate plain-language notice, contact for access/correction/erasure, delete when the purpose ends, parent or guardian consent for a child, breach notice. Main duties start about 18 months after notification (around mid-May 2027; confirm the date). | Build these in now: consent log, retention job, deletion tool, child option. |
| Vercel Hobby is non-commercial. Pro is about $20 per seat per month with 1 TB bandwidth included. | Move to a Pro team owned by the clinic, one seat. |
| Razorpay article: keep payment descriptions generic; verify RBI authorisation and PCI DSS before signing; fees not stated. | Payments only in Phase 2, with generic descriptions. Check Razorpay's own pricing page. |

## 2. Launch blockers (before any new feature)
1. Current registration renewal (the slip we hold ended 19/5/2020). Until then show the number only, no validity date.
2. Doctor approves all DRAFT text (About, Services, Care areas, FAQ, Privacy, 3 blog posts); native Hindi review.
3. Confirm pin code (302016 vs 302006), "Rajvilas Apartment I", hours, WhatsApp number.
4. Google Maps share link and embed URL in `content/site.json`.
5. Real studio portrait to replace the AI-assisted one (decision for the doctor).
6. Domain owned by the clinic; Vercel Pro team owned by the clinic; Supabase project in the Mumbai region; Resend domain verified (SPF/DKIM).
7. Vercel Firewall rate limit on `/api/booking`.
8. `NEXT_PUBLIC_INDEXABLE=true` only on launch day. Submit the sitemap.
9. Google Business Profile created and verified; aggregator listings claimed with identical details.

## 3. Phase 1.5 (build next)
| # | Feature | Notes and acceptance criteria |
|---|---|---|
| 1 | **Admin page** at `/admin` | Email one-time-code login for an allowlist of 2 addresses (Supabase Auth). Mobile first, Hindi/English toggle. Today view, upcoming, search by phone. Actions: Confirm, Suggest another time, Cancel, Mark visited, Mark no-show. Each action offers a one-tap `wa.me` message with a ready template. CSV export. Every change logged in an audit table. |
| 2 | **Slot-based booking** | Doctor sets weekly hours, slot length (for example 15 or 20 minutes), maximum patients per slot, and blocked dates (Diwali, travel). The booking form shows only open slots, in her time zone. Two people cannot take the last slot (database constraint, not only UI). Sunday and evening hours follow the confirmed card. |
| 3 | **Request a call back** | Name, phone, preferred time window, consent. No reason field. Appears in the same admin list. |
| 4 | **Booking for a child or someone else** | Option: myself / my child / someone else. For a child or another adult, ask for the guardian's or caller's name and a declaration that they are the parent, guardian or authorised. Stored with the consent time. Flag for legal review. |
| 5 | **Replace free-text reason** | Dropdown: First consultation / Follow-up / Report review / Not sure. Optional note field removed. The doctor asks about health on the call or in the room. Less health data stored and emailed. |
| 6 | **Confirmation and calendar** | Success screen with date and time, address, a Maps link, and an **.ics** "Add to calendar" file. The WhatsApp message holds name, date and slot only. |
| 7 | **Closure banner and notices** | Doctor sets "Clinic closed 1 to 3 Nov" in admin; a banner shows on every page and closed dates disappear from the booking form. |
| 8 | **How to reach page** (EN + HI) | Landmarks, parking, stairs or lift to the 2nd floor, auto/cab tips, map, photo of the building entrance (real photo only). Facts come from the doctor; nothing invented. |
| 9 | **First-visit PDF and QR codes** | Bilingual one-page "What to bring". QR codes for the door, visiting card and handout pointing to `/book?utm_source=qr&utm_medium=print`. |
| 10 | **Source tracking** | Save only `source` and `medium` from UTM (instagram, google, qr, direct) on each booking. No other tracking data. Feeds the monthly report. |
| 11 | **Data retention and deletion** | Decide the retention period with the doctor. Scheduled job deletes older rows. Admin "Delete this person's data" tool. Consent log table. Privacy page updated. |
| 12 | **Structured data upgrade** | Add FAQPage, BreadcrumbList, `sameAs` (Instagram, Google Business Profile, aggregator profiles), `medicalSpecialty` Homeopathy, `availableLanguage`. Only confirmed facts. |
| 13 | **Doctor page for search and AI answers** | Dedicated doctor profile: qualifications, years, languages, registration number, ABDM HPR ID if she has one, which clinic. Broad care areas only. |
| 14 | **Accessibility and seniors** | A-/A+ text toggle (remembered), larger tap targets option, high-contrast check in both themes. |
| 15 | **Hardening** | Turnstile or similar instead of only a honeypot, security headers, uptime monitor, error alerts, database backups, Lighthouse run on the live URL. |

## 3B. Phase 1.6: UI, UX, motion, floating UI and 3D

### 3B.1 What the repo already has (do not rebuild)
- Tokens, light/dark/system theme without flash, and the "Blue Pottery" look in `src/styles/globals.css`.
- Floating glass pill header, a floating Call / WhatsApp / Book dock on mobile, floating round buttons on desktop, floating chips and cards around the portrait, tilted gallery cards.
- One entrance animation (`rise`, 0.7s) with delays, and a `prefers-reduced-motion` block that switches animations and transitions off.
- Mukta (Hindi) is self-hosted and preloaded on `/hi` only; the Instagram feed is not embedded.

So this phase **upgrades and unifies** the motion and the floating UI. It does not restart the design.

### 3B.2 Research that sets the rules
| Finding | Rule for us |
|---|---|
| CSS scroll-driven animations (`animation-timeline: view()` / `scroll()`) run off the main thread. One 2026 article reports Chrome and Edge since Chrome 115, Safari from 26 (Sept 2025), and Firefox still behind a flag in stable (Firefox 152), about 82.6% global support. | Use them for scroll reveals and the header, **only inside `@supports (animation-timeline: view())`** and inside `@media (prefers-reduced-motion: no-preference)`. Without support the content is simply visible. Never leave content at `opacity: 0` as the default state. |
| Animating `transform` and `opacity` stays on the compositor; animating `width`, `height` or `margin` causes layout work and jank. | Animate only `transform` and `opacity` (and `filter` sparingly). Never animate layout properties. |
| Next.js `experimental.viewTransition` exists, but the docs call it experimental, subject to change and not recommended for production. | **Do not ship route transitions with that flag.** Revisit when it is stable. Use the native View Transitions API only for small same-page changes, as progressive enhancement. |
| web.dev motion guidance: avoid flashing (not more than 3 flashes per second); non-essential auto-playing motion longer than 5 seconds needs a pause, stop or hide control; default to less motion; read `prefers-reduced-motion`; consider an on-site animation toggle. | Every looping or long motion has a pause control or stops within 5 seconds. Add a site-level **Animations: On / Off** switch next to the theme toggle. No flashing anywhere. |
| A mobile performance budget used as a starting point: LCP 2.5 s, INP 200 ms, CLS 0.1 at the 75th percentile; JS about 250 KB compressed per route; images 300 KB; fonts 100 KB; page weight 800 KB; at most 10 third-party resources. Lab profile: slow 4G, 4x CPU slowdown, Moto G4 viewport 360x640. | Adopt these as hard limits. Test with the Lighthouse mobile preset (4x CPU slowdown). Our existing goal stays: performance 90+, accessibility 95+, SEO 95+. |
| Floating call/WhatsApp buttons are a common pattern; the figures I found were vendor claims about vet clinics, not independent evidence. | Keep the dock (it matches the "call, message or book in 30 seconds" goal), but **A/B-measure it with the existing `click_call`, `click_whatsapp`, `click_book` events** rather than assuming a lift. |
| Design rules from this project (not from a study): the audience includes elderly patients; Hindi is Devanagari. | Calm, slow, small movements. Never animate Hindi text letter by letter or word by word (it breaks matras and conjuncts); animate the whole line or block. No parallax that moves large areas. |

### 3B.3 Motion system (one file, used everywhere)
- **Motion level switch:** `full`, `lite`, `off`. Default `full` only when the OS does not ask for reduced motion. Automatically `lite` when `Save-Data` is on, device memory is 4 GB or less, or logical cores are 4 or fewer. `off` when the OS asks for reduced motion or the visitor turns animations off. Store the choice (try/catch around storage) and expose `data-motion` on `<html>`.
- **Tokens (CSS variables):** `--dur-micro: 150ms`, `--dur-ui: 280ms`, `--dur-reveal: 500ms`, `--dur-hero: 700ms` (the existing value is the maximum), easing `cubic-bezier(.2,.8,.2,1)` for entrances and `cubic-bezier(.4,0,.2,1)` for state changes. Nothing is longer than 700 ms except the optional 3D idle motion (see 3B.5).
- **Rules:** transform and opacity only; no animation on first paint of the LCP element (the hero image and headline must not wait for an animation); stagger at most 4 items, 60 ms apart; no infinite loops except the optional idle float, which stops after 5 seconds or has a pause button.
- **Library choice:** CSS first. Add a small JS animation library only if a feature needs it (layout animation in the slot picker, for example), loaded on that route only, and only if the route stays under the JS budget. If unsure, do not add it.

### 3B.4 Motion catalogue
| # | Where | Effect | How | Fallback |
|---|---|---|---|---|
| M1 | Home sections, About, cards | Soft reveal (fade + 12 px rise) as sections enter | CSS `animation-timeline: view()` | Visible, no animation |
| M2 | Header | Floating pill shrinks slightly and gains shadow after scrolling | CSS `scroll()` timeline or an `IntersectionObserver` flag | Static pill |
| M3 | Hero | Staggered entrance of eyebrow, headline, buttons (existing `rise`, tidied); portrait card settles with a 6 px shift | Existing CSS, tokens | None |
| M4 | Buttons and links | Press feedback (scale 0.98), hover lift 2 px, focus ring that animates in | CSS | Instant |
| M5 | Credentials strip ("35+", "24") | Count up once when visible, then stays; final value is in the HTML for screen readers and no-JS | Small script with `IntersectionObserver` | Final value shown |
| M6 | Booking stepper | Slide and fade between steps; slot chips select with a small scale | CSS (or the library on `/book` only) | Instant swap |
| M7 | Confirmation | Check mark draws in once, under 600 ms, then a calm message | SVG stroke animation | Static check |
| M8 | Open-now chip | Soft pulse on the green dot for 3 cycles, then still | CSS, `animation-iteration-count: 3` | Static dot |
| M9 | Gallery cards | Existing tilt becomes a gentle hover lift; on touch, a swipe carousel with scroll-snap | CSS scroll-snap | Grid |
| M10 | Theme toggle | Cross-fade of colours (200 ms), no flash | CSS transition on colour variables | Instant |
| M11 | Admin page | Skeleton loaders, list item enter and exit, one-tap action confirmation | CSS | None |
| M12 | Language switch | Text swaps instantly; no animated reflow of Hindi | None | None |

### 3B.5 3D that is relevant (and safe)
The brief and the audience say calm and trustworthy, so 3D is used in **small, optional, well-contained** places. Each item has a static fallback and can be switched off with the motion level.
| # | Idea | Why it fits | Approach | Budget and rules |
|---|---|---|---|---|
| D1 | **Tilt and depth on the doctor portrait card and key cards** | Gives the signature card a tactile feel at no weight | CSS 3D (`perspective`, small `rotateX/Y` from pointer position); only when `pointer: fine`; max 6 degrees | No library, near zero JS. Off on touch and reduced motion |
| D2 | **Layered "pottery" depth in the hero** (rosette and tile layers moving 4 to 8 px at different rates) | Reinforces the Blue Pottery identity without a 3D engine | CSS transforms on 2 or 3 layers | Decorative only, no people, no clinic scenes (per CLAUDE.md) |
| D3 | **Real 360-degree tour of the consultation room and the entrance** | Helps first-time patients find a flat on the 2nd floor and see the room before they come. It is real, not generated | Shoot with a phone panorama or a 360 camera; either link a Google Business Profile tour or use a small viewer loaded on tap ("View the room in 360") | Never autoloads. Poster image first. Needs her permission and no patients in frame |
| D4 | **Optional WebGL accent**: a slowly turning blue-pottery rosette or tile, extruded from the existing vector motif | The only "real 3D" worth considering. Only if the doctor likes it after seeing D1 and D2 | Lazy `dynamic()` import after idle, `IntersectionObserver`, pixel ratio capped at 1.5, paused when off-screen or the tab is hidden, model compressed, WebGL failure falls back to a static WebP poster | Desktop and capable devices only (width 1024 or more, `full` motion). Must keep LCP 2.5 s or less and JS within budget with the 3D chunk counted. If it cannot, drop D4 |
Not doing: 3D human or organ models, an AI-generated 3D clinic, a 3D "walkthrough" that invents rooms, or autoplay video with sound.

### 3B.6 Floating UI v2
| # | Change | Reason |
|---|---|---|
| F1 | Mobile dock gets an **"Open now / Opens at 6:00 pm"** label and the **next available slot** (from the slot data) as a small chip above it | Answers "can I go now?" without leaving the page |
| F2 | The dock **collapses to icons while scrolling down fast and expands when scrolling stops or near the end of a section**; it never fully hides | Keeps the page readable but keeps Call within one tap |
| F3 | The dock **moves out of the way when a form field is focused** and when the cookie or consent banner is showing | Covered fields and stacked banners are the common mobile bugs |
| F4 | Safe-area spacing for iPhones and Android gesture bars; z-index scale in tokens | Avoids clashes between header, dock, banner and toasts |
| F5 | Desktop floating buttons expand to show a label on hover and keyboard focus | Clearer than icons alone |
| F6 | A floating **"Jump to"** contents chip on long pages (About, FAQ, Privacy) | Navigation without scrolling back |
| F7 | A closure or notice banner (from the admin page) floats under the header and can be dismissed for the session | Uses the notices feature from Phase 1.5 |
| F8 | Every floating element has a visible focus style, is reachable by keyboard, and never covers the main call-to-action or form fields | Accessibility |

### 3B.7 UI and UX upgrades
1. **Hero in 5 seconds:** one line that says who she is and where, the real portrait, **Call, WhatsApp, Book**, the open-now label, and the registration number within one scroll. Nothing important waits for an animation.
2. **Booking as three clear steps:** Who is it for (me / my child / someone else), When (slot chips grouped Morning / Evening, big touch targets), Confirm (name, phone, consent). Progress shown. A permanent "Prefer to call?" button at every step. Errors summarised at the top and next to each field, in the page language.
3. **Mobile form details:** `inputmode="tel"`, `autocomplete` attributes, no zoom on focus (16 px or larger text), the right keyboard for each field, phone number formatting that forgives spaces and +91.
4. **Thumb-zone layout:** primary actions at the bottom half on mobile; tap targets 48 px or more (already a rule).
5. **Hindi-first option:** pick the starting language from the browser's language settings with a visible switch at all times; remember the choice. Hindi labels in the admin page.
6. **Skeleton and empty states:** the admin page and slot picker show skeletons while loading and a friendly message with a phone number if the system is unavailable (the form already has this pattern; extend it).
7. **Trust placement without claims:** registration number, years of practice, languages, real photos, address and hours. No review wall, no awards language beyond facts.
8. **Print styles:** the contact and hours card and the first-visit page print cleanly (patients often print directions).
9. **Reading comfort:** line length 60 to 75 characters, generous Hindi line height, text size toggle (already planned), high-contrast check in both themes.
10. **Instagram on the site:** no embedded feed (third-party scripts and weight). Show 3 or 4 curated images with links out, or none.
11. **Micro-copy:** short, calm, in simple Hindi and English; no pressure language ("limited slots", countdowns). No pop-ups that block the page.

### 3B.8 Testing and acceptance
| Check | Pass condition |
|---|---|
| Lighthouse mobile (4x CPU slowdown) on Home, Book, About | Performance 90+, accessibility 95+, SEO 95+, LCP 2.5 s or less, CLS 0.1 or less |
| INP in the lab while using the booking steps and the dock | 200 ms or less |
| JS per route (compressed) | 250 KB or less including any 3D chunk |
| Reduced motion (OS setting) and the on-site Animations switch | No animation runs; everything still works |
| Firefox and older Safari | Content visible without scroll animations |
| Real low-end Android phone (a Moto G-class or similar) and an iPhone | Scrolling stays smooth; dock never blocks a field |
| Hindi pages | No broken conjuncts, no animated text splitting, correct font loading |
| Photosensitivity | No flashing; nothing flickers more than 3 times per second |
| Compliance | `npm run check-content` passes; no animated health claims; no AI imagery of people or the clinic |
| Rollback | A single env or setting (`MOTION_LEVEL=off`) disables every effect without a redeploy of code |

### 3B.9 Order of work for Phase 1.6
1. Motion tokens, motion level switch, the on-site Animations toggle, and cleanup of existing animations (M3, M4, M10).
2. Scroll reveals and the header (M1, M2) with `@supports` guards.
3. Booking stepper and slot chips (M6, M7), with the UX items 2 and 3.
4. Floating UI v2 (F1 to F8) and the open-now chip (M8).
5. Credentials count-up (M5), gallery swipe (M9).
6. CSS 3D (D1, D2) and measure.
7. 360 tour (D3) once the doctor has approved photos.
8. WebGL accent (D4) only if steps 1 to 7 leave budget and she wants it.
9. Full test pass (3B.8).

## 4. Phase 2 (after Phase 1.5 and 1.6 are live and measured)
| Feature | Notes |
|---|---|
| **Automatic WhatsApp reminders** via the WhatsApp Cloud API through a provider | Consent at booking; template only; about 24 hours before, then about 2 hours before if unconfirmed; Confirm / Reschedule / Cancel; stop on cancel; idempotent sending. Check whether the clinic's existing number can be used and whether the WhatsApp Business app can keep running on it. |
| **Follow-up reminders** | The doctor sets a follow-up date in admin; the patient gets "Your follow-up with Dr. Mathur is due on [date]. Reply to confirm." No health detail. |
| **Monthly report** | Calls, WhatsApp taps, bookings, no-shows, by source. Sent by email in Hindi/English summary. |
| **Editor for the doctor** | Small editor for hours, notices, FAQ answers and blog drafts. Everything else stays with Krishna. Drafts need approval before publishing. |
| **Community page** | Abhilasha Women's Welfare Society and camps, only with consent from everyone shown; text first. |
| **Private feedback form** | Visible only to the doctor. Not published anywhere. Not a testimonial feature. |
| **Online consultation** | Only after reading the official telemedicine guidelines for homoeopathic practitioners (approved April 2020; text not verified here). Needs consent, records, identity checks, a payment link with a generic description, a meeting link. |
| **Hinglish logistics chatbot** (hours, address, how to book) | Optional. No health answers. Must hand off to call or WhatsApp. |

## 5. Not recommended
Testimonial or review widget, "treats X" lists, before/after images, a symptom checker, an AI that answers health questions, storing prescriptions or clinical records on this site (use proper clinic software), WhatsApp marketing broadcasts without clear opt-in, route transitions through the experimental Next.js flag, an embedded Instagram feed, letter-by-letter or word-by-word text animation (especially Hindi), large-area parallax, autoplay video with sound, heavy 3D scenes or a 3D library that breaks the JS budget, and pop-ups or countdown pressure.

## 6. Data model sketch (Supabase, Mumbai region)
- `bookings`: id, created_at, status (requested, confirmed, cancelled, visited, no_show), slot_id, patient_type (self, child, other), name, phone, guardian_name (nullable), visit_type, source, medium, locale, consent_at, confirmed_at, last_reminder_at.
- `slots` or `availability_rules` + `blocked_dates`: weekly hours, slot length, capacity.
- `callbacks`: id, name, phone, window, consent_at, status.
- `notices`: text_en, text_hi, starts_on, ends_on.
- `consent_log`: booking_id, text_version, timestamp.
- `audit_log`: admin_user, action, target, timestamp.
- Row-level security on for every table; the website writes through server routes only; admin reads through authenticated, allowlisted sessions.

## 7. Compliance guardrails for every feature
1. No cure, guarantee, success rate, superlative or named-disease claims. `npm run check-content` must pass.
2. No health detail in WhatsApp, email subjects or analytics events.
3. Minimum data. Consent text versioned and logged. Deletion by request, and automatic after the retention period.
4. Real photos only for the clinic and doctor. AI-enhanced images carry the visible caption.
5. Patient stories or photos only with written consent, about the experience, never results.
6. Hindi text reviewed by a native speaker.
7. A qualified person reviews copy and data handling before launch.

## 8. Facts still needed from the doctor or Krishna
- Patients per day, slot length she wants, maximum per slot, any lunch or personal break.
- Who answers the phone and WhatsApp during consultation hours.
- Lift or stairs to the 2nd floor, parking, landmarks, nearest main road.
- Does she have an ABDM Healthcare Professionals Registry ID?
- Is there a Google Business Profile, Practo, JustDial, Bajaj Finserv Health or other listing already, and who controls it?
- Fees and payment methods (UPI QR at the clinic today?).
- Whether the clinic WhatsApp number runs the WhatsApp Business app.
- How long to keep booking data.
- Whether the doctor wants the admin in Hindi, English or both.

## 9. Sources
- NCH circular, 29 Jan 2026: https://nch.org.in/upload/NCH(BERH) Circular 29.01.2026.pdf
- DPDP Rules 2025 highlights: https://www.scconline.com/blog/post/2025/12/26/digital-personal-data-protection-rules-2025-key-highlights/
- Vercel pricing 2026: https://dev.to/nayankyada/vercel-pricing-2026-what-you-actually-pay-for-a-real-nextjs-project-33md
- WhatsApp pricing update, Oct 2026: https://m.aisensy.com/blog/whatsapp-pricing-update-october-2026/
- Clinic WhatsApp reminders and no-show evidence: https://whapi.cloud/blog/how-clinics-cut-no-shows-with-whatsapp-appointment-reminders
- AI visibility audit for practices: https://www.repugen.com/blog/is-your-practice-invisible-to-ai-10-point-visibility-audit
- Provider and location pages for AI search: https://healthcaresuccess.com/blog/healthcare-marketing/are-your-doctor-and-location-pages-quietly-killing-your-visibility-in-the-age-of-ai.html
- Razorpay on healthcare payments: https://razorpay.com/blog/payment-gateway-support-for-healthcare-businesses-unique-challenges-and-how-to-solve-them-in-2026/
- Telemedicine guidelines for homoeopathic practitioners (summary only): https://iasexamportal.com/the-gist/sample/pib-telemedicine-guidelines-approved-for-homoeopathic-practitioners
- CSS scroll-driven animations, browser support and fallbacks (2026): https://www.buildmvpfast.com/blog/css-scroll-driven-animations-replace-js-2026
- Next.js `viewTransition` option (experimental): https://nextjs.org/docs/app/api-reference/config/next-config-js/viewTransition
- web.dev, animation and motion accessibility: https://web.dev/learn/accessibility/motion
- Mobile web performance budget (Core Web Vitals, JS, images, Lighthouse profile): https://tessl.io/registry/testland/mobile-web-perf-budget
- Floating button claim (vendor, vet clinics, not independent): https://www.vetstoria.com/blog/how-a-floating-button-on-your-veterinary-website-drives-19-more-bookings/

---

## 10. Paste into Claude Code (inside the repo)
Two prompts. Run **A** first. Run **B** only after A is working on the preview URL. Both start in plan mode.

### Prompt A: Phase 1.5 (booking, admin, data, pages)
```
Read CLAUDE.md, PROJECT-BRIEF.md, content/TODO.md and docs/PHASE-1.5-FEATURE-PLAN.md fully.
Start in plan mode. Build Phase 1.5 (section 3 of the plan) in this order:
1) data model + migrations (Mumbai region assumptions), 2) slot-based booking + call-back + child/other option + dropdown reason + .ics,
3) /admin (email one-time-code login, allowlist, Hindi/English, wa.me templates, audit log), 4) closure banner + notices,
5) How to reach page + first-visit PDF + QR, 6) structured data upgrade + doctor page, 7) text-size toggle, 8) retention job + deletion tool + privacy page update, 9) hardening.
Rules: keep every rule in CLAUDE.md (no invented facts, no cure/named-disease claims, no health detail in WhatsApp/email/analytics, real photos only).
After each step run typecheck, lint, build and npm run check-content. Put anything you cannot know in content/TODO.md.
Show me the plan, the schema and the task list first, and wait for my approval.
```

### Prompt B: Phase 1.6 (UI, UX, motion, floating UI, 3D)
```
Read CLAUDE.md, PROJECT-BRIEF.md, content/TODO.md and docs/PHASE-1.5-FEATURE-PLAN.md, especially section 3B.
Phase 1.5 must already be merged. Start in plan mode and audit src/styles/globals.css, Header, FloatingContact, Portrait and the booking form first.
Build Phase 1.6 in the order of section 3B.9:
1) motion tokens + motion level switch (full/lite/off, auto-lite on Save-Data or low-end devices, off on prefers-reduced-motion) + an on-site Animations toggle,
2) scroll reveals and header effect with CSS scroll-driven animations, guarded by @supports and prefers-reduced-motion, content visible by default,
3) three-step booking stepper with slot chips and the check-mark confirmation, 4) floating UI v2 (F1 to F8), 5) count-up credentials and gallery swipe,
6) CSS 3D tilt and layered depth (D1, D2), 7) 360 tour viewer that loads only on tap (only if approved real photos exist), 8) the WebGL accent (D4) ONLY if budget allows and I approve it after you show measurements.
Hard rules: animate transform and opacity only; no flashing; no looping motion longer than 5 seconds without a pause control; never animate Hindi text letter by letter; no route transitions via the experimental Next.js flag; no third-party embeds; no animation on the LCP element; keep every rule in CLAUDE.md (no invented facts, no cure/named-disease claims, real photos only, AI imagery of people or the clinic never).
Budgets: Lighthouse mobile performance 90+, accessibility 95+, SEO 95+; LCP 2.5 s, INP 200 ms, CLS 0.1; JS 250 KB compressed per route including any 3D chunk.
After each step run typecheck, lint, build, npm run check-content and a Lighthouse mobile run; report the numbers before and after. Add a MOTION_LEVEL kill switch.
Put anything you cannot know in content/TODO.md. Show me the plan, the file list and the task list first, and wait for my approval.
```
