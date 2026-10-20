import { SITE, SITE_URL } from "./site";

/** JSON-LD from confirmed facts only. Anything with confirmed:false or null is left out. */
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
    description: `${SITE.doctor.degree}. ${SITE.doctor.experienceYears} years of clinical experience.`,
    knowsLanguage: ["hi", "en"],
    alumniOf: { "@type": "CollegeOrUniversity", name: "Rajasthan University" },
    worksFor: { "@id": `${SITE_URL}/#clinic` },
    ...(address ? { address } : {}),
  };
  const clinic = {
    "@type": "MedicalClinic",
    "@id": `${SITE_URL}/#clinic`,
    name: SITE.clinic.name,
    url,
    ...(SITE.phone.confirmed ? { telephone: SITE.phone.e164 } : {}),
    ...(SITE.email.confirmed ? { email: SITE.email.value } : {}),
    ...(address ? { address } : {}),
    availableLanguage: ["Hindi", "English"],
    employee: { "@id": `${SITE_URL}/#physician` },
  };
  return { "@context": "https://schema.org", "@graph": [clinic, physician] };
}
