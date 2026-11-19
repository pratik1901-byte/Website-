/**
 * Single source of truth for BSM's site content.
 *
 * Anything wrapped in square brackets is an UNVERIFIED placeholder. It renders
 * on the page with a distinct treatment (see <Placeholder />) so it is obvious
 * what still needs real information from BSM. Nothing here invents awards,
 * certifications, client names, headcount, years of operation or statistics.
 */

export const site = {
  name: "BSM",
  legalName: "BSM SECURITY AGENCY",
  tagline: "Protecting industries. Securing Businesses. Building Trust.",
  description:
    "BSM is a professional security agency based in Goa, India, providing trained security personnel and managed protection services for corporate, residential, industrial, hospitality and event environments.",
  url: "https://www.bsmsecurity.in",
  locale: "en_IN",
  region: "Goa, India",

  contact: {
    /* All three lines, in the order BSM gave them. The first is primary. */
    phones: [
      { display: "+91 94212 49677", href: "tel:+919421249677" },
      { display: "+91 87889 65649", href: "tel:+918788965649" },
      { display: "+91 87623 26038", href: "tel:+918762326038" },
    ],
    phone: "+91 94212 49677",
    phoneHref: "tel:+919421249677",
    email: "contact@bsmsecurityagency.com",
    emailHref: "mailto:contact@bsmsecurityagency.com",
    /* WhatsApp lines, same formatting as the phone list. */
    whatsapps: [{ display: "+91 94212 49677", href: "https://wa.me/919421249677" }],
    /* The WhatsApp line for each office, shown separately on the contact page. */
    whatsappByOffice: [
      {
        label: "Head Office",
        display: "+91 94212 49677",
        href: "https://wa.me/919421249677",
      },
      {
        label: "Branch Office",
        display: "+91 87623 26038",
        href: "https://wa.me/918762326038",
      },
    ],
    whatsapp: "+91 94212 49677",
    whatsappHref: "https://wa.me/919421249677",
    address: {
      street: "Kurtarkar Classic A2, Shop no. G-7, Opposite Lawande Hospital, Aquem",
      locality: "Margao",
      region: "Goa",
      postalCode: "403601",
      country: "India",
    },
    hours: [{ days: "Monday – Saturday", time: "9:00 AM – 5:30 PM" }],
    /* Service availability is separate from when the office is open. */
    servicesAvailable: "24 × 7",
    mapsLink:
      "https://www.google.com/maps/search/?api=1&query=Kurtarkar+Classic+A2,+Shop+no.+G-7,+Opposite+Lawande+Hospital,+Aquem,+Margao,+Goa+403601",
  },

  nav: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Branch", href: "/branch" },
    { label: "Clients", href: "/clients" },
    { label: "Services", href: "/services" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ],

  /** Where enquiries are delivered. Mirrors ENQUIRY_TO_EMAIL on the server. */
  enquiryInbox: "contact@bsmsecurityagency.com",
} as const;

export type ServiceSlug =
  | "public-sector-government-defence-security"
  | "industrial-corporate-security"
  | "security-guard-services"
  | "bouncer-personal-security-services"
  | "access-control-surveillance"
  | "banking-commercial-security"
  | "residential-institutional-security"
  | "wedding-event-specialised-security"
  | "security-training-personnel-development"
  | "housekeeping-services";

export type Service = {
  slug: ServiceSlug;
  index: string;
  title: string;
  points: string[];
  /**
   * An additional service offered alongside the core security categories,
   * carried through the page with the brass treatment.
   */
  highlight?: boolean;
};

/**
 * BSM's service categories, supplied by BSM and reproduced verbatim —
 * headings and bullet points are not reworded, reordered or added to.
 */
export const services: Service[] = [
  {
    slug: "public-sector-government-defence-security",
    index: "01",
    title: "PUBLIC SECTOR, GOVERNMENT & DEFENCE SECURITY",
    points: [
      "Security services for Public Sector Undertakings (PSUs).",
      "Security for government departments and establishments.",
      "Security services for defence-related establishments.",
      "Security personnel deployment for public infrastructure.",
      "Security arrangements for government institutions and facilities.",
    ],
  },
  {
    slug: "industrial-corporate-security",
    index: "02",
    title: "INDUSTRIAL & CORPORATE SECURITY",
    points: [
      "Security services for industrial establishments and manufacturing units.",
      "Corporate offices and commercial premises security.",
      "Security for factories, warehouses and industrial facilities.",
      "Perimeter security and restricted-area monitoring.",
      "Protection of industrial assets, equipment and infrastructure.",
    ],
  },
  {
    slug: "security-guard-services",
    index: "03",
    title: "SECURITY GUARD SERVICES",
    points: [
      "Deployment of trained and uniformed security guards.",
      "Armed and unarmed security personnel, subject to applicable licences and permissions.",
      "Static security and round-the-clock guarding.",
      "Entry and exit point security.",
      "Visitor management and identity verification.",
      "Protection of personnel, property and premises.",
    ],
  },
  {
    slug: "bouncer-personal-security-services",
    index: "04",
    title: "BOUNCER & PERSONAL SECURITY SERVICES",
    points: [
      "Professional bouncer deployment for weddings and private events.",
      "Bouncer services for clubs, bars, hotels and entertainment venues.",
      "VIP and guest protection.",
      "Crowd control and access management.",
      "Prevention of unauthorised entry and disturbance management.",
      "Security personnel for concerts, parties and special events.",
      "Personal security assistance for individuals and special guests.",
    ],
  },
  {
    slug: "access-control-surveillance",
    index: "05",
    title: "ACCESS CONTROL & SURVEILLANCE",
    points: [
      "Entry and exit monitoring.",
      "Visitor and contractor verification.",
      "Vehicle movement monitoring.",
      "Restricted-area access management.",
      "CCTV surveillance monitoring and reporting.",
      "Security checks and incident reporting.",
    ],
  },
  {
    slug: "banking-commercial-security",
    index: "06",
    title: "BANKING & COMMERCIAL SECURITY",
    points: [
      "Security for banks and financial establishments.",
      "Security for commercial complexes and business premises.",
      "ATM premises security.",
      "Cash movement escort services, subject to applicable requirements.",
      "Protection of valuable assets and business infrastructure.",
    ],
  },
  {
    slug: "residential-institutional-security",
    index: "07",
    title: "RESIDENTIAL & INSTITUTIONAL SECURITY",
    points: [
      "Security for residential complexes and housing societies.",
      "Security for educational institutions and campuses.",
      "Security for hospitals and healthcare establishments.",
      "Security for hotels, resorts and hospitality premises.",
      "Security for shopping complexes and retail establishments.",
    ],
  },
  {
    slug: "wedding-event-specialised-security",
    index: "08",
    title: "WEDDING, EVENT & SPECIALISED SECURITY",
    points: [
      "Security arrangements for marriage ceremonies and wedding receptions.",
      "Security for private celebrations, parties and social gatherings.",
      "Security for corporate events and official functions.",
      "Crowd management and access regulation.",
      "VIP and guest movement coordination.",
      "Entry and exit management for event venues.",
      "Temporary security deployment for special occasions.",
      "Event premises and infrastructure protection.",
    ],
  },
  {
    slug: "security-training-personnel-development",
    index: "09",
    title: "SECURITY TRAINING & PERSONNEL DEVELOPMENT",
    points: [
      "Military-guided discipline and professional conduct.",
      "Security awareness and operational preparedness.",
      "Emergency response and crisis management.",
      "Fire safety awareness and evacuation procedures.",
      "Patrolling, vigilance and surveillance techniques.",
      "Communication, teamwork and supervisory training.",
    ],
  },
  {
    slug: "housekeeping-services",
    index: "10",
    title: "HOUSEKEEPING SERVICES",
    /**
     * An additional service, separate from BSM's core security categories.
     * Its sub-services are awaited from BSM — nothing is invented here, so
     * the section carries the heading and its frame only until they arrive.
     */
    points: [],
    highlight: true,
  },
];

export const industries = [
  {
    name: "Hospitality & Resorts",
    note: "Hotels, resorts, beach clubs and restaurants.",
  },
  { name: "Corporate & IT", note: "Offices, IT parks and shared workspaces." },
  {
    name: "Residential Communities",
    note: "Villas, apartments and gated societies.",
  },
  {
    name: "Industrial & Logistics",
    note: "Factories, warehouses and estates.",
  },
  {
    name: "Retail & Commercial",
    note: "Showrooms, malls and commercial complexes.",
  },
  {
    name: "Events & Entertainment",
    note: "Weddings, festivals and private events.",
  },
  {
    name: "Healthcare & Education",
    note: "Hospitals, clinics, schools and campuses.",
  },
  {
    name: "Construction & Projects",
    note: "Project sites and material yards.",
  },
];

export const processSteps = [
  {
    index: "01",
    title: "Consultation",
    body: "We start with a conversation about the site, the risk you are actually worried about, and what the day looks like when everything runs well.",
  },
  {
    index: "02",
    title: "Site Survey",
    body: "A physical walk-through of entry points, blind spots, lighting, movement patterns and the hours that matter most.",
  },
  {
    index: "03",
    title: "Deployment Plan",
    body: "A written plan: post locations, shift pattern, patrol routes, reporting formats and the escalation chain — agreed before anyone is deployed.",
  },
  {
    index: "04",
    title: "Personnel Selection",
    body: "Personnel matched to the environment and briefed on the site specifically. [VERIFICATION AND TRAINING PROCESS]",
  },
  {
    index: "05",
    title: "Supervision",
    body: "Field supervision, surprise checks and shift discipline — because a deployment is only as good as the night nobody is watching.",
  },
  {
    index: "06",
    title: "Review & Reporting",
    body: "Regular reporting back to you, with review points to adjust the deployment as the site, season or risk profile changes.",
  },
];

export const values = [
  {
    index: "01",
    title: "Integrity",
    body: "Security is a position of trust before it is a service. We say what we will deploy, and we deploy it.",
  },
  {
    index: "02",
    title: "Discipline",
    body: "Uniform, punctuality, handover, register. The unglamorous routines are exactly what make a site secure.",
  },
  {
    index: "03",
    title: "Vigilance",
    body: "Attention that does not decay across a twelve-hour shift, and supervision built to verify that it does not.",
  },
  {
    index: "04",
    title: "Accountability",
    body: "Documented rounds, written incident reports and a named point of contact who answers for the deployment.",
  },
  {
    index: "05",
    title: "Respect",
    body: "Guests, residents, staff and visitors are treated with courtesy. Firmness and politeness are not opposites.",
  },
  {
    index: "06",
    title: "Local Knowledge",
    body: "Goa is not one place. A beachfront resort, an industrial estate in the hinterland and a city office each need different judgement.",
  },
];

export const goaPresence = [
  { name: "Coastal properties", note: "[COVERAGE DETAILS]" },
  { name: "Urban and commercial", note: "[COVERAGE DETAILS]" },
  { name: "Industrial estates", note: "[COVERAGE DETAILS]" },
  { name: "Residential societies", note: "[COVERAGE DETAILS]" },
];

export const faqs = [
  {
    q: "Which areas of Goa does BSM cover?",
    a: "BSM operates across Goa. Specific taluka-level coverage and response times are confirmed at the time of enquiry. [COVERAGE DETAILS]",
  },
  {
    q: "How quickly can personnel be deployed?",
    a: "Deployment timelines depend on the scope, shift pattern and number of personnel required. [DEPLOYMENT TIMELINE]",
  },
  {
    q: "Is BSM licensed under PSARA?",
    a: "[PSARA LICENCE NUMBER AND ISSUING AUTHORITY — TO BE CONFIRMED BY BSM]",
  },
  {
    q: "How are personnel screened and trained?",
    a: "[VERIFICATION, BACKGROUND CHECK AND TRAINING PROCESS — TO BE CONFIRMED BY BSM]",
  },
  {
    q: "Can deployments be scaled up for a season or an event?",
    a: "Yes. Seasonal and event deployments are planned from a site survey and a written deployment plan. [SCALING TERMS]",
  },
];

/* --------------------------------------------------------------------------
   Clients
   Supplied by BSM and reproduced verbatim: organisation names, abbreviations,
   locations and operational details are not reworded, reordered or added to.
   Logos live in their own dictionary — clientLogos in lib/media.ts — keyed by
   the slugs below, so artwork can be added or removed there without touching
   this roster or the page itself.
   -------------------------------------------------------------------------- */

/**
 * One key per client. The logo dictionary in lib/media.ts is keyed by these
 * same slugs, so adding a client here and forgetting its logo line (or
 * mistyping one) is a type error rather than a silently missing image.
 */
export type ClientSlug =
  "hpcl" | "gsl" | "csir-nio" | "aai" | "iocl" | "bpcl" | "gia" | "ins-hansa" | "esic" | "concor";

export type ClientEntry = {
  /** Stable key; the logo for this client is clientLogos[slug]. */
  slug: ClientSlug;
  index: string;
  /** Organisation name, exactly as supplied. */
  name: string;
  /** Abbreviation, where BSM supplied one. */
  abbr?: string;
  /** Locations and operational details, one per line, exactly as supplied. */
  details: string[];
};

export const clients: ClientEntry[] = [
  {
    slug: "hpcl",
    index: "01",
    name: "Hindustan Petroleum Corporation Limited",
    abbr: "HPCL",
    details: [
      "LPG Bottling Plant, Kundaim Industrial Estate, Goa",
      "Goa ASF, Chicalim",
      "Goa ASF, Aviation Service Facility, Vasco, Goa",
    ],
  },
  {
    slug: "gsl",
    index: "02",
    name: "Goa Shipyard Limited",
    abbr: "GSL",
    details: [
      "Vasco-da-Gama, Goa — A Government of India undertaking under the Ministry of Defence.",
    ],
  },
  {
    slug: "csir-nio",
    index: "03",
    name: "CSIR – National Institute of Oceanography",
    abbr: "CSIR-NIO",
    details: ["Dona Paula, Goa."],
  },
  {
    slug: "aai",
    index: "04",
    name: "Airports Authority of India",
    abbr: "AAI",
    details: [
      "International Airport, Goa, Vasco",
      "AAI Cargo Logistics and Allied Services Company Limited, Goa International Airport, Goa",
    ],
  },
  {
    slug: "iocl",
    index: "05",
    name: "Indian Oil Corporation Limited",
    abbr: "IOCL",
    details: ["Sada, Vasco, Goa."],
  },
  {
    slug: "bpcl",
    index: "06",
    name: "Bharat Petroleum Corporation Limited",
    abbr: "BPCL",
    details: ["Aviation, Chicalim, Goa", "Mopa International Airport, Aviation"],
  },
  {
    slug: "gia",
    index: "07",
    name: "Goa International Airport",
    abbr: "GIA",
    details: ["JCO for Airport Operational Control Centre."],
  },
  {
    slug: "ins-hansa",
    index: "08",
    name: "INS Hansa – SBTF Naval Air Station",
    details: ["Dabolim, Goa."],
  },
  {
    slug: "esic",
    index: "09",
    name: "Employees’ State Insurance Corporation",
    abbr: "ESIC",
    details: ["Regional Office, Patto, Panjim, Goa."],
  },
  {
    slug: "concor",
    index: "10",
    name: "Container Corporation of India Limited",
    abbr: "CONCOR",
    details: ["A Government of India Enterprise."],
  },
];

/** Figures BSM will confirm; shown as fields, never as claims. */
export const clientFacts = [
  { k: "Active deployments", v: "[NUMBER]" },
  { k: "Sites covered", v: "[NUMBER]" },
  { k: "Years in operation", v: "[NUMBER]" },
  { k: "Personnel on roll", v: "[NUMBER]" },
];

/* --------------------------------------------------------------------------
   Offices
   Supplied by BSM. Addresses, numbers, emails, names and designations are
   reproduced exactly as given — nothing here is inferred or invented.
   Exactly two locations are mapped: Head Office address A and the Goa branch.
   Head Office address B is shown as text and is deliberately NOT mapped.
   -------------------------------------------------------------------------- */

export type OfficePerson = {
  name: string;
  role: string;
  /** Marks the one non-partner advisory role at the Head Office. */
  advisory?: boolean;
  phone?: { display: string; href: string };
  email?: { display: string; href: string };
  responsibilities?: string;
};

export type Office = {
  id: string;
  index: string;
  kind: string;
  name: string;
  /** How the primary address is designated on the page. */
  addressLabel: string;
  /** The mapped address. */
  address: string;
  /** Shown as text only — never a second map pin for this office. */
  additionalAddress?: string;
  /** How that second address is designated. */
  additionalAddressLabel?: string;
  /** Google Maps embed for the mapped address. */
  mapEmbed: string;
  /** Opens the location in Google Maps. */
  mapLink: string;
  mapTitle: string;
  phones: { display: string; href: string }[];
  whatsapps: { display: string; href: string }[];
  email: { display: string; href: string };
  leadershipLabel: string;
  leadership: OfficePerson[];
};

export const offices: Office[] = [
  {
    id: "head-office",
    index: "01",
    kind: "Head Office",
    name: "Head Office — Margao",
    addressLabel: "Office address",
    address:
      "Kurtarkar Classic A2, Shop no. G-7, Opposite Lawande Hospital, Aquem, Margao, Goa – 403601.",
    additionalAddress:
      "42/D/7, God's Gift Residency, Plot no. 15, Dicarpale Davorlim, Navelim, Salcete, Goa.",
    additionalAddressLabel: "Registered address",
    mapEmbed:
      "https://www.google.com/maps?q=Kurtarkar+Classic+A2,+Shop+no.+G-7,+Opposite+Lawande+Hospital,+Aquem,+Margao,+Goa+403601&output=embed",
    /* BSM's own Google Maps link for the registered address. */
    mapLink: "https://share.google/qjQSkfbcxMmjiws4j",
    mapTitle: "Map showing the BSM Head Office at Aquem, Margao, Goa",
    phones: [
      { display: "+91 94212 49677", href: "tel:+919421249677" },
      { display: "+91 87889 65649", href: "tel:+918788965649" },
    ],
    whatsapps: [
      { display: "+91 94212 49677", href: "https://wa.me/919421249677" },
      { display: "+91 87889 65649", href: "https://wa.me/918788965649" },
    ],
    email: {
      display: "headoffice@bsmsecurityagency.com",
      href: "mailto:headoffice@bsmsecurityagency.com",
    },
    leadershipLabel: "Leadership and management",
    leadership: [
      {
        name: "Mr. Dattatray B Naik",
        role: "Principal Partner",
        phone: { display: "+91 94212 49677", href: "tel:+919421249677" },
      },
      { name: "Lt. Col. Bhupinder S Malhi (retd.)", role: "Partner" },
      { name: "Mrs. Bhagyashree Dattatray Naik", role: "Partner" },
      {
        name: "Adv Nihal D Naik",
        role: "Legal Advisor",
        advisory: true,
      },
    ],
  },
  {
    id: "branch-office-goa",
    index: "02",
    kind: "Branch Office",
    name: "Branch Office — Panjim, Old Goa",
    addressLabel: "Address",
    address:
      "House 3, Kadamba Govt Housing Society, National Hwy 4A Bypass Rd, Chimbel, Goa – 403006.",
    mapEmbed:
      "https://www.google.com/maps?q=House+3,+Kadamba+Govt+Housing+Society,+National+Hwy+4A+Bypass+Rd,+Chimbel,+Goa+403006&output=embed",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=House+3,+Kadamba+Govt+Housing+Society,+National+Hwy+4A+Bypass+Rd,+Chimbel,+Goa+403006",
    mapTitle: "Map showing the BSM Branch Office at Kadamba Govt Housing Society, Chimbel, Goa",
    phones: [{ display: "+91 87623 26038", href: "tel:+918762326038" }],
    whatsapps: [{ display: "+91 87623 26038", href: "https://wa.me/918762326038" }],
    email: {
      display: "bsmgoa.dgr@gmail.com",
      href: "mailto:bsmgoa.dgr@gmail.com",
    },
    leadershipLabel: "Branch leadership",
    leadership: [
      {
        name: "Mr. Vighnesh Shet (M.D)",
        role: "Branch In-Charge – Panjim Operations",
        responsibilities:
          "Responsible for branch administration, security operations, manpower coordination, client relations and operational supervision.",
      },
      {
        name: "Mrs. Pranali V Shet",
        role: "She heads Administration & Billing department - Panjim",
        phone: { display: "+91 91086 63502", href: "tel:+919108663502" },
      },
    ],
  },
];

/* --------------------------------------------------------------------------
   Core strengths, vision and mission — supplied by BSM, reproduced verbatim.
   -------------------------------------------------------------------------- */

export const coreStrengths = [
  {
    index: "01",
    title: "Experienced Leadership",
    body: "Over three decades of security industry experience at the leadership level.",
  },
  {
    index: "02",
    title: "Established Agency",
    body: "Established in 2013 as a DGR-sponsored security agency.",
  },
  {
    index: "03",
    title: "PSU Operational Experience",
    body: "Operational experience in providing security services to major Public Sector Undertakings.",
  },
  {
    index: "04",
    title: "Professional Management",
    body: "Strong leadership, structured supervision and professional operational management.",
  },
  {
    index: "05",
    title: "Military-Guided Training",
    body: "Emphasis on military-guided training, discipline, alertness and professional conduct.",
  },
  {
    index: "06",
    title: "Trained Security Personnel",
    body: "Experienced security supervisors and trained personnel committed to maintaining high standards of security.",
  },
  {
    index: "07",
    title: "Compliance & Client Commitment",
    body: "Commitment to statutory compliance, service quality and client satisfaction.",
  },
];

export const vision =
  "To establish BSM Security Agency as a trusted and respected name in the security industry through professional management, disciplined personnel and reliable security solutions.";

export const mission =
  "To safeguard people, property, infrastructure and business operations by delivering dependable, professionally managed and well-supervised security services, driven by discipline, integrity and commitment.";
