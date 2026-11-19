import type { ReactNode } from "react";
import { TransitionLink } from "@/components/layout/PageTransition";

/** Shared masthead for inner pages: breadcrumb, oversized title, standfirst. */
export function PageHero({
  eyebrow,
  title,
  lead,
  leadClass = "",
  index,
  breadcrumb,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  /** Extra classes for the standfirst, e.g. text-justify. */
  leadClass?: string;
  index?: string;
  breadcrumb: { label: string; href: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-void pb-16 pt-40 md:pb-24 md:pt-52">
      <span className="grain-layer" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 grid-veil opacity-30" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[50vh] bg-[radial-gradient(60%_60%_at_15%_0%,rgba(200,164,92,0.08)_0%,transparent_70%)]"
        aria-hidden="true"
      />

      <div className="shell relative">
        <nav aria-label="Breadcrumb" data-reveal="up">
          <ol className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-dim">
            {breadcrumb.map((crumb, i) => (
              <li key={crumb.href} className="flex items-center gap-3">
                {i > 0 && <span className="text-line">/</span>}
                {i === breadcrumb.length - 1 ? (
                  <span aria-current="page" className="text-brass">
                    {crumb.label}
                  </span>
                ) : (
                  <TransitionLink href={crumb.href} className="transition-colors hover:text-bone">
                    {crumb.label}
                  </TransitionLink>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-12 flex items-center gap-4" data-reveal="up">
          {index && <span className="font-mono text-[11px] tracking-[0.2em] text-dim">{index}</span>}
          <span className="h-px w-8 bg-brass" />
          <span className="eyebrow">{eyebrow}</span>
        </div>

        <h1 data-split className="mt-8 max-w-5xl text-hero font-semibold text-bone">
          {title}
        </h1>

        {lead && (
          <p
            data-reveal="up"
            data-delay="0.08"
            className={`mt-10 max-w-2xl text-lead text-mist ${leadClass}`}
          >
            {lead}
          </p>
        )}

        {children}
      </div>
    </section>
  );
}
