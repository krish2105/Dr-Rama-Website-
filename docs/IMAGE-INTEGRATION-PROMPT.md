# Image integration: revised master prompt (v2) and image decisions

Reviewed on 20 Oct 2026 against the hard rules in `CLAUDE.md` and `PROJECT-BRIEF.md`. The original prompt is kept in spirit; the changes are marked **CHANGED**.

## Review of the supplied pack (18 images)

All 18 are AI generated. They fall into two groups.

**Decorative artwork (no people, no clinic scenes): allowed.**
| # | Image | Decision |
|---|---|---|
| 12 | Hero Blue Pottery | Used: Home hero background, desktop only, 38% opacity, faded toward the text |
| 13 | Jaipur Inspired Banner | Used: Home full-width banner before "Visit the clinic" (text is real HTML) |
| 14 | Services Section Background | Used: backdrop on Services and Care areas pages |
| 15 | Icon Set | Re-drawn as SVG (`src/components/ui/Icon.tsx`), sheet itself not shown |
| 16 | Share Image | Used: Open Graph and Twitter image (`public/og/share.jpg`, 1200x630) |
| 17 | Google Business Profile Cover | Kept in `source/brand/` for Google Business Profile. Not shown on the site |
| 18 | Blue Pottery Tile Pattern | Used: thin tile band above the footer (cropped, 15 KB) |
| 11 | Hero Background, botanical | Not used: green, rejected palette |
| 01 | Visual Moodboard | Not used: internal reference |

**AI images of the doctor and the clinic: restricted by the hard rules.**
| # | Image | Decision and reason |
|---|---|---|
| 03 | Doctor portrait | Already live. Pixel-near-identical to the portrait supplied earlier (mean difference 2.3 of 255). Doctor must confirm it is a faithful likeness |
| 04 | Room, perspective corrected | **Not used.** Re-rendered, not corrected: the window view changed (a leafy tree now), the desk etching and fittings were redrawn |
| 05 | Room, decluttered | **Not used.** Same reason as 04 |
| 06 | Glass desk and chairs crop | **Not used.** Same reason: desk pattern, window and objects differ from the real room |
| 07 | Certificate and plaque wall | **Not used.** Certificate and plaque text is invented pseudo-text. Hard rule: never invent, rewrite or enhance certificate text |
| 08 | Display cabinet crop | **Not used.** A certificate now reads "Patient's Health Clinic ... Foundation Course in Classical Homeopathy". That text is not in the real photo |
| 09 | Entrance, storefront | **Not used.** The practice is inside a flat; there is no storefront |
| 10 | Entrance, residential flat | **Not used, even as a labelled concept.** It invents a gate, a plant and a "CLINIC" sign (the name is "Home"). Visitors would look for a door that does not exist |
| 02 | Meet the doctor background | **Not used.** An invented room scene with blank frames |

The real photograph (`clinic-consultation-room`, cropped from the original) is what the site shows for the clinic until better real photos exist.

## Revised master prompt

Review the existing website first and preserve its structure, content, functionality, responsiveness, bilingual support, type hierarchy, booking / Call / WhatsApp flows and the Blue Pottery identity (ivory, cobalt, brass, Newsreader + DM Sans, Mukta for Hindi). Do not rebuild. Integrate approved artwork only where it improves the design, and keep the site calm and uncluttered.

**CHANGED: Image classes.** (1) Real photographs, optionally lightly lit or cropped, are the only images allowed to show the clinic, the doctor, patients, certificates or the entrance. (2) Generated artwork is allowed only as decoration: patterns, banners, backgrounds, icons, share images. (3) Never use an AI re-render of a room, certificate, plaque, cabinet or entrance, even if labelled "concept" or "placeholder". If a real photo is missing, show a dev-only TODO and nothing in production.

1. **Hero.** Keep the current composition. Use the generated blue-pottery artwork as a subtle, desktop-only background faded toward the text. The doctor stays the focal point. Phones get no artwork.
2. **Care areas and Services.** Use the services backdrop behind the page header only, faded so cards stay on a clean ground. Use the cobalt line-icon language as inline SVG (calendar, phone, WhatsApp, pin, clock, directions, clipboard, question) in contact and visit rows. Never use the icon sheet image in the UI.
3. **About.** Keep the portrait, qualifications, service record and practice principles. **CHANGED:** certificate, cabinet and desk imagery appears only from real close-up photographs of the real room. Until those exist, show nothing.
4. **Visit the clinic.** Address, hours and phone with icons beside a gallery of real photos. **CHANGED:** no entrance concept image. The entrance slot is a dev-only TODO until a real photograph of the flat's door and nameplate exists.
5. **Jaipur identity.** One full-width banner before the Visit section. Text and buttons are HTML on the artwork's clean left side. No text baked into the image.
6. **Decoration.** The tile pattern is a thin cropped band above the footer. Never tile it across pages.
7. **Social.** Share image as Open Graph and Twitter large image. The Google Business cover stays in `source/brand/`.
8. **Visual rules.** Calm, medical, premium. No green. No competing patterns. No excess animation. No stock imagery.
9. **Image engineering.** `next/image`, correct `sizes`, WebP, no layout shift, lazy below the fold, hero portrait `priority`, EN and HI alt text for photos, empty alt for decoration, never stretch faces. Files hashed by `npm run photos`.
10. **Responsive QA.** 360, 390, 768, 1024, 1440 px. No horizontal overflow. Decorative patterns reduced on phones.
11. **Rules.** Do not alter facts, claims, registration, phones, timings, URLs or credentials. Run typecheck, lint, production build, `npm run check-content`, responsive QA, an accessibility check and Lighthouse, then report: images used and where, images not shown and why, files changed, performance impact, remaining real-photo TODOs.
