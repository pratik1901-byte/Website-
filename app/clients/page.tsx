import type { Metadata } from "next";
import { Building2, Quote, ShieldCheck } from "lucide-react";
import { site, clients, testimonials, clientFacts } from "@/lib/site";
import { clientLogos } from "@/lib/media";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionLabel } from "@/components/ui/Section";
import { Placeholder, Copy } from "@/components/ui/Placeholder";
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

/** What a client relationship involves. Process, not claims. */
const commitments = [
  {
    title: "A named point of contact",
    body: "One supervisor accountable for the deployment, reachable without going through a switchboard.",
  },
  {
    title: "A written deployment plan",
    body: "Post locations, shift pattern, patrol routes, reporting formats and the escalation chain — agreed before anyone is deployed.",
  },
  {
    title: "Records you can inspect",
    body: "Gate registers, patrol checkpoints, occurrence books and handover notes, maintained on site and available to you.",
  },
  {
    title: "Review points",
    body: "Scheduled reviews so the deployment moves with the site, the season and the risk — not with the invoice cycle.",
  },
];

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
        lead="The organisations below are BSM's clients, listed exactly as BSM supplied them. Logos remain each organisation's own artwork and are shown only once official files are provided."
      >
        <div
          className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4"
          data-stagger
        >
          {clientFacts.map((fact) => (
            <div key={fact.k} data-stagger-item className="bg-void p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">{fact.k}</p>
              <p className="mt-4 font-display text-2xl font-semibold text-bone">
                <Copy text={fact.v} />
              </p>
            </div>
          ))}
        </div>
      </PageHero>

      {/* Client roster */}
      <Section id="roster" label="Our esteemed clients">
        <SectionLabel index="01">Our clients</SectionLabel>
        <h2
          data-split
          className="mt-8 text-display font-semibold uppercase tracking-[-0.01em] text-bone"
        >
          Our Esteemed <span className="text-brass">Clients</span>
        </h2>

        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          <p data-reveal="up" className="max-w-2xl text-lead text-mist lg:col-span-6">
            Organisations BSM is engaged with, with the locations and operational details as
            supplied. Public sector undertakings, government establishments, defence facilities and
            airports among them.
          </p>
          <div
            className="flex items-start gap-3 border-l border-brass/50 pl-4 lg:col-span-5 lg:col-start-8"
            data-reveal="up"
          >
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brass" strokeWidth={1.5} />
            <p className="text-sm text-dim">
              Each card carries a frame for the organisation&apos;s official logo. Logos are their
              proprietors&apos; artwork, so none is reproduced here until the file is supplied — the
              frames are never filled with substitutes.
            </p>
          </div>
        </div>

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

      {/* What clients get */}
      <Section label="What a client relationship involves" className="bg-ink">
        <SectionLabel index="02">Working with BSM</SectionLabel>
        <h2 data-split className="mt-8 max-w-3xl text-display font-semibold text-bone">
          What every client gets, named or not.
        </h2>

        <div className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-2" data-stagger>
          {commitments.map((item, i) => (
            <div key={item.title} data-stagger-item className="group relative bg-ink p-8 md:p-10">
              <span className="ticks pointer-events-none absolute inset-0" aria-hidden="true" />
              <span className="font-mono text-[11px] tracking-[0.2em] text-dim">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 font-display text-title font-semibold text-bone">{item.title}</h3>
              <p className="mt-4 max-w-md text-mist">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section label="Client testimonials">
        <div className="flex items-end justify-between gap-8">
          <div>
            <SectionLabel index="03">In their words</SectionLabel>
            <h2 data-split className="mt-8 max-w-2xl text-display font-semibold text-bone">
              Testimonials, once they are given.
            </h2>
          </div>
          <Building2 className="hidden h-8 w-8 shrink-0 text-brass/50 md:block" strokeWidth={1} />
        </div>

        <p data-reveal="up" className="mt-8 max-w-xl text-mist">
          No quotation is published until a client has written it and approved its use. The three
          frames below are where they go.
        </p>

        <div className="mt-16 grid gap-px border border-line bg-line lg:grid-cols-3" data-stagger>
          {testimonials.map((item, i) => (
            <figure key={i} data-stagger-item className="group relative bg-void p-8 md:p-10">
              <span className="ticks pointer-events-none absolute inset-0" aria-hidden="true" />
              <Quote className="h-5 w-5 text-brass" strokeWidth={1.25} />
              <blockquote className="mt-6 text-lead text-mist">
                <Placeholder>{item.quote}</Placeholder>
              </blockquote>
              <figcaption className="mt-8 border-t border-line-soft pt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-dim">
                <Placeholder>{item.attribution}</Placeholder>
                <span className="mt-2 block text-dim/70">
                  <Placeholder>{item.role}</Placeholder>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <CallToAction
        eyebrow="Become a client"
        title="Start with a site survey."
        body="Tell us where the site is and what the hours look like. We will walk it, then put a written deployment plan in front of you."
      />
      <RevealEngine />
    </>
  );
}
