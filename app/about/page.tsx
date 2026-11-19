import type { Metadata } from "next";
import { site } from "@/lib/site";
import {
  legacy,
  legacyMarks,
  leadershipIntro,
  leaders,
  commitment,
  brandStatement,
  type LeaderProfile,
} from "@/lib/about";
import { media } from "@/lib/media";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionLabel } from "@/components/ui/Section";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Marked } from "@/components/ui/Marked";
import RevealEngine from "@/components/layout/RevealEngine";

export const metadata: Metadata = {
  title: "About BSM Security Agency — Legacy, Leadership and Commitment",
  description:
    "BSM Security Agency: a legacy built on decades of industry experience as a DGR-sponsored agency, the leadership behind it, and our commitment to disciplined, professionally supervised security services.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About BSM Security Agency",
    description: "Our legacy and experience, our leadership and management, and our commitment.",
    url: `${site.url}/about`,
  },
};

/**
 * Body copy on this page is justified. Hyphenation is deliberately off:
 * broken words (pro-fessional, independ-ent) read as cheap in a column this
 * wide, and the measure is generous enough to justify cleanly without it.
 */
const prose = "text-justify";

/** One frame per leader, in profile order. */
const leaderShots = {
  "dattatray-b-naik": media.leaderPrincipalPartner,
  "bhupinder-singh-malhi": media.leaderTrainingPartner,
  "bhagyashree-dattatray-naik": media.leaderAdminPartner,
} as const;

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      {/* 01 — Our Legacy & Experience */}
      <PageHero
        eyebrow="About Us"
        index="01"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
        ]}
        title={
          <>
            Our Legacy &amp; <span className="accent-serif text-brass">Experience</span>
          </>
        }
      >
        {/* Two columns of equal width and equal type, tops aligned: the
            opening paragraph on the left, the rest of the account on the
            right. The measure stays around 60 characters, which justifies
            without opening gaps. */}
        {/* A single centred editorial column. No scroll-reveal here — this
            block is above the fold, and a reveal whose ScrollTrigger has not
            fired would leave it invisible. */}
        <div className="mx-auto mt-16 w-full max-w-[1150px] space-y-8">
          {legacy.paragraphs.map((paragraph, i) => (
            <p key={i} className={`text-[1.0625rem] leading-[1.75] text-mist ${prose}`}>
              <Marked text={paragraph} marks={legacyMarks} />
            </p>
          ))}
        </div>
      </PageHero>

      {/* 02 — Our Leadership & Management */}
      <Section id="leadership" label={leadershipIntro.heading} className="bg-ink">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel index="02">Leadership</SectionLabel>
            <h2 data-split className="mt-8 text-display font-semibold text-bone">
              {leadershipIntro.heading}
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p data-reveal="up" className={`text-lead leading-relaxed text-mist ${prose}`}>
              {leadershipIntro.body}
            </p>
          </div>
        </div>

        <div className="mt-20 space-y-16 md:space-y-20">
          {leaders.map((leader) => (
            <LeaderBlock key={leader.id} leader={leader} />
          ))}
        </div>
      </Section>

      {/* 03 — Our Commitment */}
      <Section id="commitment" label={commitment.heading}>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel index="03">Commitment</SectionLabel>
            <h2 data-split className="mt-8 text-display font-semibold text-bone">
              {commitment.heading}
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="space-y-7 border-l border-brass/50 pl-7">
              {commitment.paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  data-reveal="up"
                  data-delay={(i * 0.06).toFixed(2)}
                  className={`text-lead leading-relaxed text-mist ${prose}`}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* 04 — Closing brand statement */}
      <section
        aria-label="BSM Security Agency"
        className="relative overflow-hidden border-t border-line bg-ink py-28 md:py-36 lg:py-44"
      >
        <span
          className="section-divider pointer-events-none absolute inset-x-0 top-0"
          aria-hidden="true"
        />
        <span className="grain-layer" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_100%,rgba(200,164,92,0.10)_0%,transparent_70%)]"
          aria-hidden="true"
        />

        <div className="shell relative text-center">
          <p
            data-reveal="up"
            className="font-display text-display font-semibold tracking-[-0.02em] text-bone"
          >
            {brandStatement.name}
          </p>
          <span
            className="mx-auto mt-8 block h-px w-24 bg-brass"
            data-reveal="fade"
            aria-hidden="true"
          />
          <p
            data-reveal="up"
            data-delay="0.08"
            className="accent-serif mx-auto mt-8 max-w-3xl text-title text-brass"
          >
            {brandStatement.line}
          </p>
        </div>
      </section>

      <RevealEngine />
    </>
  );
}

/**
 * One leadership profile: photograph on the left, text on the right, the same
 * way down the page so the three read as a set. The frame carries the site's
 * brass keyline and falls back to the composed placeholder until BSM supplies
 * a photograph — no stock or generated portraits.
 */
function LeaderBlock({ leader }: { leader: LeaderProfile }) {
  const shot = leaderShots[leader.id as keyof typeof leaderShots];

  return (
    <article
      id={leader.id}
      className="grid gap-10 border-t border-line pt-14 lg:grid-cols-12 lg:gap-12"
    >
      <div className="lg:col-span-4">
        {/* Portraits are shown whole and held still: contain rather than
            cover, and no parallax, so the frame and the face never move
            against each other while the page scrolls. */}
        <MediaFrame
          shot={shot}
          figure={`${leader.index} / Leadership`}
          ratio="4 / 5"
          fit="contain"
          parallax={0}
          sizes="(max-width: 1024px) 100vw, 30vw"
        />
      </div>

      <div className="lg:col-span-7 lg:col-start-6">
        <span className="font-mono text-[11px] tracking-[0.2em] text-brass">{leader.index}</span>
        <h3
          data-reveal="up"
          className="mt-5 font-display text-title font-semibold tracking-[-0.02em] text-bone"
        >
          {leader.name}
        </h3>
        {/* The designation sits on its own brass underline. */}
        <div data-reveal="up" data-delay="0.04" className="mt-5">
          <p className="inline-block border-b-2 border-brass pb-2 font-mono text-[13px] font-semibold uppercase tracking-[0.16em] text-bone/90">
            {leader.designation}
          </p>
        </div>

        {leader.paragraphs.length > 0 && (
          <div className="mt-9 space-y-6">
            {leader.paragraphs.map((paragraph, i) => (
              <p
                key={i}
                data-reveal="up"
                className={`text-[1.0625rem] leading-relaxed text-mist ${prose}`}
              >
                <Marked text={paragraph} marks={leader.marks} />
              </p>
            ))}
          </div>
        )}

        {leader.listIntro && (
          <p data-reveal="up" className={`mt-8 text-[1.0625rem] leading-relaxed text-mist ${prose}`}>
            {leader.listIntro}
          </p>
        )}

      </div>

      {/* The focus areas run the full width of the block — under the
          photograph and across the text column — as two rows of four. */}
      {leader.list && (
        <ul
          className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:col-span-12 lg:grid-cols-4"
          data-stagger
        >
          {leader.list.map((item) => (
            <li
              key={item}
              data-stagger-item
              className="flex items-baseline gap-3 bg-ink px-6 py-6"
            >
              <span className="mt-2 h-1 w-1 shrink-0 bg-brass" aria-hidden="true" />
              <span className="text-[0.95rem] leading-relaxed text-mist">{item}</span>
            </li>
          ))}
        </ul>
      )}

      {leader.closing && (
        <p
          data-reveal="up"
          className={`text-[1.0625rem] leading-relaxed text-mist lg:col-span-12 ${prose}`}
        >
          {leader.closing}
        </p>
      )}
    </article>
  );
}
