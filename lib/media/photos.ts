/**
 * Photographs — the dictionary.
 *
 * Every photograph on the site is one entry here, and nowhere else. To change
 * an image, point its `src` at another file in /public/media. To remove one,
 * set `src` to "" and the frame falls back to the composed placeholder that
 * states on the page what photograph belongs there. To add one, drop the file
 * in /public/media and add an entry; pass it to <MediaFrame shot={...} />.
 *
 * `ratio` is optional: give it when the photograph must be shown whole rather
 * than cropped to the frame.
 *
 * Current state: stand-in images under the Unsplash License, free for
 * commercial use. They are NOT photographs of BSM, its personnel or its sites.
 * Replace each `src` with BSM's own photography before launch and rewrite the
 * `alt` text to describe the real image; `brief` records what the shot is
 * meant to show.
 */

import type { Shot } from "./types";

export const media = {
  heroDeployment: {
    src: "/media/hero-security-officer.jpg",
    alt: "Security officer in a dark suit wearing a security identification lanyard, lit from one side",
    label: "Personnel on post",
    brief: "Replace with BSM's own photography — a guard at a gate or lobby, shot in low light.",
  },
  briefing: {
    src: "/media/briefing-team.jpg",
    alt: "Group of people silhouetted against the windows of an empty building interior",
    label: "Shift briefing before deployment",
    brief: "Supervisor briefing a team at handover.",
  },
  patrol: {
    src: "/media/patrol-light-shadow.jpg",
    alt: "Uniformed officer walking through bands of light and shadow cast across a floor",
    label: "Patrol round in progress",
    brief: "Supervisor or guard walking a perimeter on a real site.",
  },
  records: {
    src: "/media/records-occurrence-book.jpg",
    alt: "Open notebook with handwritten entries, a pen and reading glasses on a dark desk",
    label: "Occurrence book and gate register",
    brief: "Close-up of the documentation kept on post.",
  },
  coast: {
    src: "/media/goa-beach-huts.jpg",
    alt: "Thatched beach huts and sun loungers along a palm-lined shore",
    label: "Coastal property, Goa",
    brief: "A resort or beachfront perimeter BSM covers, ideally after dark.",
  },
  estate: {
    src: "/media/industrial-hall-night.jpg",
    alt: "Long industrial hall lit at the far end, empty and dark in the foreground",
    label: "Industrial estate, night shift",
    brief: "Gate register and material movement control at an estate.",
  },
  goaLandscape: {
    src: "/media/coast-goa-evening.jpg",
    alt: "Palm trees above a rocky shoreline with the sea beyond",
    label: "Goa coastline",
    brief: "A recognisable Goa location relevant to BSM's coverage.",
  },
  guarding: {
    src: "/media/corporate-lobby-guard.jpg",
    alt: "Security officer standing in the dark lobby of a commercial building near the entrance doors",
    label: "Guard on static post",
    brief: "Uniformed personnel at a gate or lobby.",
  },
  corporate: {
    src: "/media/reception-desk-corporate.jpg",
    alt: "Dark marble reception counter in a corporate lobby",
    label: "Reception and access control",
    brief: "Front-desk security at a corporate entrance.",
  },
  residential: {
    src: "/media/residential-gate.jpg",
    alt: "Entrance gate and driveway of a walled residential property",
    label: "Gated community entrance",
    brief: "Gate management at a residential society.",
  },
  event: {
    src: "/media/event-crowd-barrier.jpg",
    alt: "Crowd pressed against a barrier at a night-time event",
    label: "Event entry lane",
    brief: "Accreditation and crowd flow at an event gate.",
  },
  industrial: {
    src: "/media/industrial-interior.jpg",
    alt: "Interior of a large industrial building with structural columns receding into darkness",
    label: "Material gate check",
    brief: "Inward and outward movement being documented.",
  },
  hospitality: {
    src: "/media/hotel-reception-dark.jpg",
    alt: "Low-lit hotel reception desk in dark stone with warm pendant lighting",
    label: "Hotel lobby presence",
    brief: "Guest-facing security in a hospitality setting.",
  },
  publicSectorSecurity: {
    src: "/media/public-sector-security-v2.jpg",
    alt: "Two uniformed security officers on post at the gated entrance of a government building, with the national flag flying above the dome behind them",
    label: "Public sector and government premises",
    brief: "Supplied by BSM for the public sector, government and defence service category.",
    ratio: "1122 / 1402",
  },
  industrialCorporateSecurity: {
    src: "/media/industrial-corporate-security-v2.jpg",
    alt: "Security officer with a radio on post outside an industrial complex, with plant structures behind",
    label: "Industrial and corporate premises",
    brief: "Supplied by BSM for the industrial and corporate service category.",
    ratio: "1122 / 1402",
  },
  securityGuardServices: {
    src: "/media/security-guard-services-v2.jpg",
    alt: "Uniformed security officer at a corporate office entrance while a visitor passes through the access gate",
    label: "Guarding and visitor management",
    brief: "Supplied by BSM for the security guard services category.",
    ratio: "1122 / 1402",
  },
  bouncerPersonalSecurity: {
    src: "/media/bouncer-personal-security-v2.jpg",
    alt: "Suited personal security officers managing a roped guest arrival at a venue entrance",
    label: "Bouncer and personal security",
    brief: "Supplied by BSM for the bouncer and personal security category.",
    ratio: "1199 / 1312",
  },
  accessControlSurveillance: {
    src: "/media/access-control-surveillance-v2.jpg",
    alt: "Security officer on radio beside a monitoring station showing camera feeds, with a dome camera above the entrance",
    label: "Access control and surveillance",
    brief: "Supplied by BSM for the access control and surveillance category.",
    ratio: "1402 / 1122",
  },
  bankingCommercialSecurity: {
    src: "/media/banking-commercial-security-v2.jpg",
    alt: "Security officers at a bank entrance, one screening a visitor at the walk-through detector",
    label: "Banking and commercial premises",
    brief: "Supplied by BSM for the banking and commercial category.",
    ratio: "1536 / 1024",
  },
  residentialInstitutionalSecurity: {
    src: "/media/residential-institutional-security-v2.jpg",
    alt: "Security officers at the lit entrance of a residential community, with a vehicle at the boom barrier",
    label: "Residential and institutional premises",
    brief: "Supplied by BSM for the residential and institutional category.",
    ratio: "1122 / 1402",
  },
  weddingEventSecurity: {
    src: "/media/wedding-event-security-v2.jpg",
    alt: "Event security team on a red-carpet entrance at a decorated wedding venue, with guests screened at the detector",
    label: "Wedding and event security",
    brief: "Supplied by BSM for the wedding, event and specialised category.",
    ratio: "1536 / 1024",
  },
  securityTrainingDevelopment: {
    src: "/media/security-training-development-v2.jpg",
    alt: "Instructor addressing ranks of security personnel standing to attention on a training ground",
    label: "Training and personnel development",
    brief: "Supplied by BSM for the training and personnel development category.",
    ratio: "1671 / 941",
  },
  housekeepingServices: {
    src: "",
    alt: "",
    label: "Housekeeping services",
    brief: "Photograph awaited from BSM for the housekeeping services category.",
  },
  leaderPrincipalPartner: {
    src: "/media/leader-principal-partner.webp",
    alt: "Mr. Dattatray B. Naik, Principal Partner of BSM Security Agency",
    label: "Mr. Dattatray B. Naik",
    brief: "Supplied by BSM. Master in assets-src/media.",
    /* The photograph's own proportions, so the brass border sits on its edges
       instead of enclosing empty bands above and below it. */
    ratio: "1552 / 1600",
  },
  leaderTrainingPartner: {
    src: "/media/leader-training-partner.webp",
    alt: "Lt. Col. Bhupinder Singh Malhi (Retd.), Partner – Military Discipline & Training",
    /* The photograph's own proportions, so the brass border sits on its
       edges rather than enclosing empty bands. */
    ratio: "1084 / 1451",
    label: "Lt. Col. Bhupinder Singh Malhi (Retd.)",
    brief: "Supplied by BSM. Master in assets-src/media.",
  },
  leaderAdminPartner: {
    src: "/media/leader-admin-partner.webp",
    alt: "Mrs. Bhagyashree Dattatray Naik, Partner – Administration & Accounts",
    ratio: "1143 / 1376",
    label: "Mrs. Bhagyashree Dattatray Naik",
    brief: "Supplied by BSM. Master in assets-src/media.",
  },
  headOffice: {
    src: "/media/head-office.webp",
    alt: "The BSM Security Services signboard above the Head Office entrance, stating D.G.R. Government of India Ministry of Defence empanelment no. 3028",
    label: "Head Office — Aquem, Margao",
    brief: "Supplied by BSM. Master in assets-src/media.",
    /* The photograph's own proportions, so the brass border sits on its edges
       and the signboard is never cropped. */
    ratio: "1297 / 1212",
  },
  branchOfficeGoa: {
    src: "",
    alt: "",
    label: "Branch Office — Chimbel, Goa",
    brief:
      "Awaiting BSM's photograph of the Goa branch office. Drop the file into /public/media and set `src`.",
  },
  night: {
    src: "/media/night-torch.jpg",
    alt: "Torch beam thrown across the ground in near darkness",
    label: "After dark",
    brief: "Imagery follows once the specialised service list is verified.",
  },
} satisfies Record<string, Shot>;

export type MediaKey = keyof typeof media;

/**
 * The BSM logo. The only image on the site that is genuinely BSM's own —
 * used at its native square proportions and never stretched or recoloured.
 */
export const logo = {
  src: "/bsm-logo.jpg",
  alt: "BSM Security logo",
  width: 1254,
  height: 1254,
} as const;
