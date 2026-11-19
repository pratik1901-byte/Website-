import type { Metadata } from "next";
import { site, clients } from "@/lib/site";
import { clientLogos } from "@/lib/media";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionLabel } from "@/components/ui/Section";
import CallToAction from "@/components/sections/CallToAction";
import RevealEngine from "@/components/layout/RevealEngine";

export const metadata: Metadata = {
  title: "Clients — Security Deployments Across Goa",
  description:
    "The environments BSM protects across Goa, India — corporate, hospitality, residential, industrial, retail and event sites — and what clients can expect from a deployment.",
  alternates: { canonical: "/clients" },
  openGraph: {
    title: "Clients | BSM Security, Goa",
    description:
      "The environments BSM protects across Goa, India, and what a client relationship involves.",
    url: `${site.url}/clients`,
  },
};

export default function ClientsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Clients", path: "/clients" },
        ])}
      />

      <PageHero
        eyebrow="Clients"
        index="03"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Clients", href: "/clients" },
        ]}
        title={
          <>
            The sites we hold, and the people who{" "}
            <span className="accent-serif text-brass">rely</span> on it.
          </>
        }
        lead="Our client portfolio includes reputed organisations across aviation, energy, maritime, industrial, research, public-sector and logistics sectors."
        leadClass="text-justify"
      />

      {/* Client roster */}
      <Section id="roster" label="Our esteemed clients">
        <SectionLabel index="01">Our clients</SectionLabel>
        <h2
          data-split
          className="mt-8 text-display font-semibold uppercase tracking-[-0.01em] text-bone"
        >
          Our Esteemed <span className="text-brass">Clients</span>
        </h2>

        <p data-reveal="up" className="mt-10 max-w-2xl text-justify text-lead text-mist">
          Organisations BSM is engaged with, with the locations and operational details as supplied.
          Public sector undertakings, government establishments, defence facilities and airports
          among them.
        </p>

        {/* Ten cards: five across and two deep on a desktop, three across on a
            tablet, one on a phone. Bordered cards rather than a hairline grid,
            so a short final row leaves no empty cells behind. */}
        <div
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
          data-stagger
        >
          {clients.map((client) => {
            /* Artwork comes from the clientLogos dictionary in lib/media.ts —
               a local file or a URL on the organisation's own site. */
            const logo = clientLogos[client.slug];
            return (
              <article
                key={client.slug}
                data-stagger-item
                className="group relative flex h-full flex-col border border-line bg-void p-6 transition-colors duration-500 hover:border-brass/45"
              >
                <span className="ticks pointer-events-none absolute inset-0" aria-hidden="true" />

                {/* One frame per client, identical in every card, so official
                    artwork drops in without the layout moving. Logos are
                    printed on a light plate: these are the organisations' own
                    marks, in their own colours, and are drawn for white. An
                    empty frame keeps the dark surface. */}
                <div
                  className={`relative flex w-full items-center justify-center overflow-hidden border-2 border-brass/55 ${
                    logo ? "bg-white p-4" : "bg-surface"
                  }`}
                  style={{ aspectRatio: "3 / 2" }}
                >
                  {logo ? (
                    <img
                      src={logo}
                      alt={`${client.name} logo`}
                      loading="lazy"
                      decoding="async"
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-brass/80">
                      [Logo]
                    </span>
                  )}
                </div>

                <h3 className="mt-6 font-display text-base font-semibold leading-snug text-white">
                  {client.name}
                </h3>
                {client.abbr && (
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-brass">
                    {client.abbr}
                  </p>
                )}

                <ul className="mt-4 space-y-2.5 border-t border-line-soft pt-4">
                  {client.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-start gap-2.5 text-[13px] leading-relaxed text-mist"
                    >
                      {client.details.length > 1 && (
                        <span
                          className="mt-[0.55rem] h-px w-2.5 shrink-0 bg-brass/70"
                          aria-hidden="true"
                        />
                      )}
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </Section>

      <CallToAction
        showContacts={false}
        eyebrow="Become a client"
        title="Start with a site survey."
        body="Tell us where the site is and what the hours look like. We will walk it, then put a written deployment plan in front of you."
      />
      <RevealEngine />
    </>
  );
}
