import { SITE, SITE_URL } from "./site";
import { DAYS, type Timings } from "./openNow";

const SCHEMA_DAY = { mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday", sat: "Saturday", sun: "Sunday" } as const;

/** JSON-LD from confirmed facts only. Anything with confirmed:false or null is left out. */
/** Public profile URLs (Instagram, Google Business, Facebook). Empty until the clinic creates them: `sameAs` is left out rather than guessed. */
const profiles: string[] = ((SITE as { profiles?: string[] }).profiles ?? []).filter(Boolean);

export function clinicSchema(locale: string) {
  const url = `${SITE_URL}/${locale}`;
  const a = SITE.address;
  const address = a.confirmed
    ? { "@type": "PostalAddress", streetAddress: a.street, addressLocality: a.locality, addressRegion: a.region, postalCode: a.postalCode, addressCountry: a.country }
    : undefined;
  const physician = {
    "@type": "Physician",
    "@id": `${SITE_URL}/#physician`,
    name: SITE.doctor.name,
    honorificPrefix: "Dr.",
    description: `${SITE.doctor.degree}. ${SITE.doctor.experienceYears}+ years of clinical experience.`,
    knowsLanguage: ["hi", "en"],
    alumniOf: { "@type": "CollegeOrUniversity", name: "Rajasthan University" },
    worksFor: { "@id": `${SITE_URL}/#clinic` },
    ...(SITE.registration.number ? { identifier: { "@type": "PropertyValue", name: `${SITE.registration.council} registration number`, value: SITE.registration.number } } : {}),
    ...(address ? { address } : {}),
  };
  const clinic = {
    "@type": "MedicalClinic",
    "@id": `${SITE_URL}/#clinic`,
    name: SITE.clinic.name,
    url,
    ...(SITE.alternateNames?.length ? { alternateName: SITE.alternateNames } : {}),
    ...(SITE.phone.confirmed ? { telephone: [SITE.phone.e164, ...(SITE.landline?.confirmed ? [SITE.landline.e164] : [])] } : {}),
    ...(SITE.email.confirmed ? { email: SITE.email.value } : {}),
    ...(address ? { address } : {}),
    availableLanguage: ["Hindi", "English"],
    ...(SITE.timingsConfirmed && SITE.timings
      ? {
          openingHoursSpecification: DAYS.flatMap((d) =>
            ((SITE.timings as Timings)[d] ?? []).map(([opens, closes]) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: SCHEMA_DAY[d], opens, closes })),
          ),
        }
      : {}),
    employee: { "@id": `${SITE_URL}/#physician` },
    ...(profiles.length ? { sameAs: profiles } : {}),
    potentialAction: { "@type": "ReserveAction", name: "Request an appointment", target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/${locale}/book`, actionPlatform: ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"] } },
  };
  return { "@context": "https://schema.org", "@graph": [clinic, physician] };
}

/** BreadcrumbList for a page under the home page. */
export function breadcrumbSchema(locale: string, crumbs: { name: string; route: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: `${SITE_URL}/${locale}${c.route}` })),
  };
}

/** FAQPage from the answers shown on the FAQ page. */
export function faqSchema(items: { q: string; a: string }[]) {
  return { "@type": "FAQPage", mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })) };
}
