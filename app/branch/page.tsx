import type { Metadata } from "next";
import { Mail, MapPin, Phone, Scale, UserRound } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { site, offices, type Office } from "@/lib/site";
import { media } from "@/lib/media";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { Section, SectionLabel } from "@/components/ui/Section";
import { MediaFrame } from "@/components/ui/MediaFrame";
import RevealEngine from "@/components/layout/RevealEngine";

export const metadata: Metadata = {
  title: "Our Offices — Head Office, Margao & Branch Office, Goa",
  description:
    "BSM Security Agency offices in Goa: the Head Office at Aquem, Margao and the Branch Office at Kadamba Govt Housing Society, Chimbel — addresses, contact numbers, email and leadership.",
  alternates: { canonical: "/branch" },
  openGraph: {
    title: "Our Offices | BSM Security, Goa",
    description:
      "Head Office at Aquem, Margao and Branch Office at Chimbel, Goa — addresses, contacts and leadership.",
    url: `${site.url}/branch`,
  },
};

/** One frame per office, so there are exactly two photographs on this page. */
const officeShots = {
  "head-office": media.headOffice,
  "branch-office-goa": media.branchOfficeGoa,
} as const;

export default function BranchPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Branch", path: "/branch" },
        ])}
      />

      {offices.map((office, i) => (
        <OfficeBlock key={office.id} office={office} tinted={i % 2 === 1} first={i === 0} />
      ))}

      <RevealEngine />
    </>
  );
}

function OfficeBlock({
  office,
  tinted,
  first,
}: {
  office: Office;
  tinted: boolean;
  first: boolean;
}) {
  const shot = officeShots[office.id as keyof typeof officeShots];
  /* A ratio below 1 is taller than it is wide. */
  const [w, h] = (shot.ratio ?? "4 / 3").split("/").map((n) => parseFloat(n));
  const portrait = w / h < 1;
  /* With no page hero, the first block carries the h1 and clears the navbar. */
  const Heading = first ? "h1" : "h2";

  return (
    <Section
      id={office.id}
      label={office.kind}
      className={`scroll-mt-28 md:scroll-mt-32 ${tinted ? "bg-ink" : ""} ${
        first ? "border-t-0 pt-40 md:pt-52" : ""
      }`}
    >
      <SectionLabel index={office.index}>{office.kind}</SectionLabel>
      <Heading
        data-split
        className="mt-8 max-w-3xl text-display font-semibold text-bone lg:max-w-none lg:whitespace-nowrap"
      >
        {office.name}
      </Heading>

      <div className="mt-14 grid gap-10 lg:grid-cols-12">
        {/* Photograph. A portrait shot is held to a narrower measure: at the
            column's full width it would stand nearly twice the height of the
            address block beside it. */}
        <div className="lg:col-span-5">
          <div className={portrait ? "mx-auto w-full max-w-sm lg:mx-0 lg:max-w-[78%]" : ""}>
            <MediaFrame
              shot={shot}
              figure={`${office.index} / ${office.kind}`}
              ratio="4 / 3"
              sizes="(max-width: 1024px) 100vw, 30vw"
            />
          </div>
        </div>

        {/* Address and contact */}
        <div className="lg:col-span-6 lg:col-start-7">
          <div className="grid gap-px border border-line bg-line" data-stagger>
            <div data-stagger-item className="bg-void p-7 md:p-8">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-brass" strokeWidth={1.5} />
                <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
                  {office.addressLabel}
                </h3>
              </div>
              <address className="mt-4 not-italic leading-relaxed text-mist">
                {office.address}
              </address>

              {office.additionalAddress && (
                <div className="mt-6 border-l border-brass/50 pl-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim">
                    {office.additionalAddressLabel}
                  </p>
                  <address className="mt-2 not-italic leading-relaxed text-mist">
                    {office.additionalAddress}
                  </address>
                </div>
              )}
            </div>

            <div data-stagger-item className="bg-void p-7 md:p-8">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-brass" strokeWidth={1.5} />
                <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
                  {office.phones.length > 1 ? "Contact numbers" : "Contact number"}
                </h3>
              </div>
              <ul className="mt-4 space-y-2">
                {office.phones.map((line) => (
                  <li key={line.href}>
                    <a
                      href={line.href}
                      className="link-wipe font-display text-lg font-semibold tracking-[-0.01em] text-bone transition-colors duration-300 hover:text-brass"
                    >
                      {line.display}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {office.whatsapps.length > 0 && (
              <div data-stagger-item className="bg-void p-7 md:p-8">
                <div className="flex items-center gap-3">
                  <WhatsAppIcon className="h-4 w-4 shrink-0 text-brass" />
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
                    WhatsApp
                  </h3>
                </div>
                <ul className="mt-4 space-y-2">
                  {office.whatsapps.map((line) => (
                    <li key={line.href}>
                      <a
                        href={line.href}
                        target="_blank"
                        rel="noreferrer"
                        className="link-wipe font-display text-lg font-semibold tracking-[-0.01em] text-bone transition-colors duration-300 hover:text-brass"
                      >
                        {line.display}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div data-stagger-item className="bg-void p-7 md:p-8">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-brass" strokeWidth={1.5} />
                <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">Email</h3>
              </div>
              <a
                href={office.email.href}
                className="link-wipe mt-4 inline-block font-display text-lg font-semibold tracking-[-0.01em] text-bone transition-colors duration-300 hover:text-brass"
              >
                {office.email.display}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Map and leadership, side by side */}
      <div className="mt-10 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <figure data-reveal="up">
            <div className="relative h-[220px] w-full overflow-hidden border-2 border-brass/55 bg-surface md:h-[240px]">
              <iframe
                src={office.mapEmbed}
                title={office.mapTitle}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0 grayscale-[0.9] contrast-[1.1] invert-[0.92] hue-rotate-180"
              />
            </div>
            <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
                Location
              </span>
              <a
                href={office.mapLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-brass bg-brass/10 px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-brass transition-colors duration-300 hover:bg-brass hover:text-void"
              >
                <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} />
                Open in Google Maps
              </a>
            </figcaption>
          </figure>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div className="flex items-center gap-4" data-reveal="up">
            <span className="h-px w-8 bg-brass" />
            <span className="eyebrow">{office.leadershipLabel}</span>
          </div>

          <div
            className={`mt-8 grid gap-px border border-line bg-line ${
              office.leadership.length > 1 ? "sm:grid-cols-2" : ""
            }`}
            data-stagger
          >
            {office.leadership.map((person) => (
              <article
                key={person.name}
                data-stagger-item
                className={`group relative p-7 md:p-8 ${tinted ? "bg-ink" : "bg-void"}`}
              >
                <span className="ticks pointer-events-none absolute inset-0" aria-hidden="true" />
                {person.advisory ? (
                  <Scale className="h-5 w-5 text-brass" strokeWidth={1.25} />
                ) : (
                  <UserRound className="h-5 w-5 text-brass" strokeWidth={1.25} />
                )}

                <h3 className="mt-6 font-display text-xl font-semibold tracking-[-0.02em] text-bone">
                  {person.name}
                </h3>
                <p
                  className={`mt-3 font-mono text-[11px] uppercase tracking-[0.18em] ${
                    person.advisory ? "text-brass" : "text-mist"
                  }`}
                >
                  {person.role}
                  {person.advisory && (
                    <span className="mt-1 block text-dim">To the Head Office</span>
                  )}
                </p>

                {person.responsibilities && (
                  <div className="mt-6 border-t border-line-soft pt-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim">
                      Responsibilities
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-mist">
                      {person.responsibilities}
                    </p>
                  </div>
                )}

                {(person.phone || person.email) && (
                  <dl className="mt-6 space-y-3 border-t border-line-soft pt-5">
                    {person.phone && (
                      <div>
                        <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim">
                          Contact number
                        </dt>
                        <dd className="mt-1.5">
                          <a
                            href={person.phone.href}
                            className="link-wipe font-display text-base font-semibold tracking-[-0.01em] text-bone transition-colors duration-300 hover:text-brass"
                          >
                            {person.phone.display}
                          </a>
                        </dd>
                      </div>
                    )}
                    {person.email && (
                      <div>
                        <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim">
                          Email
                        </dt>
                        <dd className="mt-1.5">
                          <a
                            href={person.email.href}
                            className="link-wipe font-display text-base font-semibold tracking-[-0.01em] text-bone transition-colors duration-300 hover:text-brass"
                          >
                            {person.email.display}
                          </a>
                        </dd>
                      </div>
                    )}
                  </dl>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
