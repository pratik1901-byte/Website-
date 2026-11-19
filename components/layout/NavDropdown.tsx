"use client";

import { services, offices } from "@/lib/site";
import { TransitionLink } from "./PageTransition";

export type NavMenuItem = {
  index: string;
  label: string;
  href: string;
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
  })),
  "/branch": offices.map((office) => ({
    index: office.index,
    label: office.name,
    href: `/branch#${office.id}`,
  })),
};

/**
 * The desktop dropdown panel.
 *
 * It stays in the DOM and is hidden with `visibility`, which keeps its links
 * out of the tab order while closed and lets the open and close transitions
 * run — mounting and unmounting would make the panel flicker as the pointer
 * crosses the gap between the label and the panel.
 */
export function NavDropdown({
  id,
  items,
  open,
  columns = 1,
  onNavigate,
}: {
  id: string;
  items: NavMenuItem[];
  open: boolean;
  columns?: 1 | 2;
  onNavigate?: () => void;
}) {
  return (
    <div
      id={id}
      /* The padding is the bridge: the pointer crosses it without leaving the
         nav item, so the panel does not close underneath the cursor. */
      className={`absolute left-1/2 top-full z-20 -translate-x-1/2 pt-4 transition-[opacity,transform,visibility] duration-200 ease-out ${
        open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
      }`}
    >
      <div className="border border-line border-t-2 border-t-brass bg-ink/95 backdrop-blur-md">
        <ul
          className={`grid gap-px bg-line ${
            columns === 2 ? "w-[min(92vw,46rem)] sm:grid-cols-2" : "w-[min(92vw,24rem)]"
          }`}
        >
          {items.map((item) => (
            <li key={item.href} className="bg-ink">
              <TransitionLink
                href={item.href}
                onNavigate={onNavigate}
                className="group flex h-full items-baseline gap-3 px-5 py-3.5 transition-colors duration-300 hover:bg-brass/10"
              >
                <span className="font-mono text-[11px] tracking-[0.18em] text-brass">
                  {item.index}
                </span>
                <span className="font-mono text-[12px] uppercase leading-snug tracking-[0.1em] text-white transition-colors duration-300 group-hover:text-brass">
                  {item.label}
                </span>
              </TransitionLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
