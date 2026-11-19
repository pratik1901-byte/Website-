"use client";

import { ArrowRight } from "lucide-react";
import { services, offices } from "@/lib/site";
import { TransitionLink } from "./PageTransition";

export type NavMenuItem = {
  index: string;
  label: string;
  href: string;
  /** Carries the brass treatment the services page gives this entry. */
  highlight?: boolean;
};

/**
 * Submenus, derived from the same data the pages are built from — the ten
 * service categories and the two offices. Nothing is listed twice: add a
 * service in lib/site.ts and it appears here, in its own order, pointing at
 * the section id that page already renders.
 */
export const navMenus: Record<string, NavMenuItem[]> = {
  "/services": services.map((service) => ({
    index: service.index,
    label: service.title,
    href: `/services#${service.slug}`,
    highlight: service.highlight,
  })),
  "/branch": offices.map((office) => ({
    index: office.index,
    label: office.name,
    href: `/branch#${office.id}`,
  })),
};

/** The standfirst that opens each menu. */
export const navMenuIntros: Record<
  string,
  { label: string; heading: string; body: string; linkLabel: string }
> = {
  "/services": {
    label: "Services",
    heading: "Explore our security solutions.",
    body: "Professional security services for organisations, establishments and diverse operational environments.",
    linkLabel: "View all services",
  },
  "/branch": {
    label: "Our Offices",
    heading: "Two offices. One standard of supervision.",
    body: "Find our Head Office and Goa Branch Office details.",
    linkLabel: "Explore our offices",
  },
};

/**
 * The desktop mega menu.
 *
 * It spans the header's own measure and sits directly beneath it, so it reads
 * as the header opening rather than as a panel floating over the page. It
 * stays in the DOM and hides with `visibility`, which keeps its links out of
 * the tab order while closed and lets the transitions run — mounting on hover
 * is what makes a menu flicker as the pointer reaches it.
 */
export function MegaMenu({
  id,
  href,
  items,
  open,
  onNavigate,
  onMouseEnter,
  onMouseLeave,
}: {
  id: string;
  /** The parent route, e.g. /services. */
  href: string;
  items: NavMenuItem[];
  open: boolean;
  onNavigate?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  const intro = navMenuIntros[href];
  /* Ten entries earn two columns; two would look stranded across the width. */
  const wide = items.length > 4;

  return (
    <div
      id={id}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`absolute inset-x-0 top-full hidden transition-[opacity,transform,visibility] duration-200 ease-out lg:block ${
        open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
      }`}
    >
      <div className="border-b border-line bg-ink/95 backdrop-blur-md">
        <div className="shell grid gap-12 py-12 lg:grid-cols-12 lg:gap-14">
          {/* Introduction */}
          <div className="flex flex-col lg:col-span-4 lg:border-r lg:border-line lg:pr-12">
            <span className="eyebrow">{intro.label}</span>
            <p className="mt-6 font-display text-2xl font-semibold leading-snug tracking-[-0.02em] text-bone">
              {intro.heading}
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-mist">{intro.body}</p>
            <TransitionLink
              href={href}
              onNavigate={onNavigate}
              className="group mt-auto inline-flex items-center gap-2 pt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-brass"
            >
              {intro.linkLabel}
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </TransitionLink>
          </div>

          {/* The entries */}
          <ul
            className={`lg:col-span-8 ${
              wide
                ? /* Column by column: 01-05 down the left, 06-10 down the
                     right, the same way the services page lists them. */
                  "grid gap-x-14 sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-5"
                : "max-w-2xl"
            }`}
          >
            {items.map((item) => (
              <li key={item.href}>
                <TransitionLink
                  href={item.href}
                  onNavigate={onNavigate}
                  className={`group flex items-baseline gap-5 border-b border-line py-4 transition-colors duration-300 hover:border-brass/60 ${
                    wide ? "" : "py-6"
                  }`}
                >
                  <span
                    className={`font-mono text-[11px] tracking-[0.18em] transition-colors duration-300 ${
                      item.highlight ? "text-brass" : "text-brass/60 group-hover:text-brass"
                    }`}
                  >
                    {item.index}
                  </span>
                  <span
                    className={`flex-1 font-display font-semibold leading-snug tracking-[-0.01em] transition-colors duration-300 group-hover:text-brass ${
                      wide ? "text-[15px] uppercase" : "text-xl"
                    } ${item.highlight ? "text-brass" : "text-white"}`}
                  >
                    {item.label}
                  </span>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 -translate-x-1 self-center text-brass opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </TransitionLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
