"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { Logo } from "@/components/ui/Logo";
import { headerOffset, jumpToTop, scrollToTarget } from "./SmoothScroll";

type TransitionContextValue = { navigate: (href: string) => void };

const TransitionContext = createContext<TransitionContextValue>({
  navigate: () => {},
});

const PANELS = 5;

/**
 * Curtain page transition. Panels sweep up to cover the viewport, the route is
 * pushed behind them, then they lift off the new page. Falls back to an
 * ordinary instant navigation when motion is reduced.
 */
export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const overlay = useRef<HTMLDivElement>(null);
  const covered = useRef(false);
  const busy = useRef(false);
  const [mounted, setMounted] = useState(false);

  /* Mount gate: the curtain is portalled into document.body, which does not
     exist during the static render. */
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const panels = useCallback(
    () => overlay.current?.querySelectorAll<HTMLElement>(".curtain-panel") ?? [],
    [],
  );

  const navigate = useCallback(
    (href: string) => {
      if (busy.current) return;

      // Same page: never drop the curtain, just move to the anchor. Without
      // this a link like /contact#enquiry clicked from /contact would cover
      // the screen and never uncover, because the pathname never changes.
      const [rawPath, hash] = href.split("#");
      /* The build adds a trailing slash to every route, so "/services" and
         "/services/" are the same page; compare them without it. */
      const trim = (path: string) => path.replace(/\/+$/, "") || "/";
      const targetPath = trim(rawPath || pathname);
      if (targetPath === trim(pathname)) {
        if (hash) {
          scrollToTarget(`#${hash}`, { offset: -headerOffset() });
          window.history.replaceState(null, "", `#${hash}`);
        } else {
          jumpToTop();
        }
        return;
      }

      if (prefersReducedMotion() || !overlay.current) {
        router.push(href);
        return;
      }

      busy.current = true;
      covered.current = true;
      const el = overlay.current;
      gsap.set(el, { pointerEvents: "auto" });
      gsap
        .timeline({ onComplete: () => router.push(href) })
        .set(panels(), { transformOrigin: "bottom center", scaleY: 0 })
        .to(panels(), {
          scaleY: 1,
          duration: 0.62,
          ease: "power3.inOut",
          stagger: 0.055,
        })
        .to(
          el.querySelector(".curtain-mark"),
          { opacity: 1, y: 0, duration: 0.45, ease: "expo.out" },
          "-=0.28",
        );
    },
    [panels, pathname, router],
  );

  // Lift the curtain once the new route has rendered.
  useEffect(() => {
    if (!covered.current || !overlay.current) return;
    const el = overlay.current;

    // Honour a hash in the destination rather than always landing at the top.
    // This has to go through Lenis: a native scrollIntoView leaves Lenis
    // holding its old target and it drags the page straight back, which is
    // how every anchored link used to end up at the first section.
    const hash = window.location.hash;
    const anchor = hash ? document.querySelector(hash) : null;
    let settle = 0;
    if (anchor) {
      const land = () => scrollToTarget(hash, { offset: -headerOffset(), immediate: true });
      land();
      // Images and webfonts change section heights after the first paint, so
      // correct the landing once the page has settled.
      settle = window.setTimeout(land, 320);
    } else {
      jumpToTop();
    }

    const tl = gsap.timeline({
      onComplete: () => {
        covered.current = false;
        busy.current = false;
        gsap.set(el, { pointerEvents: "none" });
      },
    });
    tl.to(el.querySelector(".curtain-mark"), {
      opacity: 0,
      duration: 0.25,
      ease: "power2.out",
    })
      .set(panels(), { transformOrigin: "top center" })
      .to(panels(), {
        scaleY: 0,
        duration: 0.7,
        ease: "power3.inOut",
        stagger: 0.05,
      })
      .fromTo(
        "main",
        { opacity: 0.4, y: 18 },
        { opacity: 1, y: 0, duration: 0.8, ease: "expo.out" },
        "-=0.5",
      );
    return () => {
      tl.kill();
      if (settle) window.clearTimeout(settle);
    };
  }, [pathname, panels]);

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      {mounted && (
        <div
          ref={overlay}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[120] flex"
        >
          {Array.from({ length: PANELS }).map((_, i) => (
            <div
              key={i}
              className="curtain-panel h-full flex-1 scale-y-0 border-r border-white/5 bg-ink last:border-r-0"
            />
          ))}
          <span className="curtain-mark pointer-events-none absolute inset-0 flex translate-y-3 flex-col items-center justify-center gap-6 opacity-0">
            <Logo size={260} imgClassName="w-[22vw] max-w-[150px] md:w-[9vw]" />
            <span className="font-display text-[13vw] font-semibold leading-none tracking-[-0.04em] text-[#d7dbe1] md:text-[7vw]">
              BSM
            </span>
          </span>
        </div>
      )}
    </TransitionContext.Provider>
  );
}

export function useTransitionNav() {
  return useContext(TransitionContext);
}

type TransitionLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  onNavigate?: () => void;
} & Omit<React.ComponentProps<typeof Link>, "href" | "onClick">;

/** A Link that plays the curtain first, and stays a real anchor for the browser. */
export function TransitionLink({
  href,
  children,
  className,
  onNavigate,
  ...rest
}: TransitionLinkProps) {
  const { navigate } = useTransitionNav();
  const external = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

  if (external) {
    return (
      <a href={href} className={className} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      onClick={(e) => {
        // Preserve modified clicks so people can still open pages in new tabs.
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        onNavigate?.();
        navigate(href);
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}
