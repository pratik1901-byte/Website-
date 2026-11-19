"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger, SplitText, prefersReducedMotion } from "@/lib/gsap";

/**
 * One declarative motion engine for the whole site. Sections opt in with data
 * attributes instead of each one shipping its own effect:
 *
 *   data-split                 headline, revealed line by line from a mask
 *   data-reveal="up|fade|scale" element rises / fades / settles into place
 *   data-stagger               container whose [data-stagger-item] children cascade
 *   data-parallax="0.15"       drifts against the scroll at the given strength
 *   data-counter               hairline rule that draws itself across
 *
 * Everything is created inside a gsap.context scoped to the document and
 * reverted when the page unmounts, so no ScrollTrigger outlives its DOM.
 *
 * IMPORTANT: this is rendered by each page, not by the root layout. GSAP
 * writes inline transform/opacity/clip-path onto the nodes it animates, and a
 * layout-level effect runs before the page subtree has hydrated — which meant
 * React found styles it never rendered and threw the whole tree away. Mounting
 * the engine inside the page guarantees its effect runs after that page has
 * hydrated.
 */
export default function RevealEngine() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    let cleanup: (() => void) | null = null;

    // Let the new route paint before measuring anything.
    const raf = requestAnimationFrame(() => {
      const ctx = gsap.context(() => {
        const splits: SplitText[] = [];

        /**
         * Anything already on screen when the page opens plays straight away,
         * with no ScrollTrigger attached.
         *
         * A trigger is a promise that something will happen later, and on a
         * freshly opened route — especially one reached through the curtain
         * transition, where the scroll position is still being restored — the
         * first screen's triggers could be measured against a scroll position
         * they never see again. The element then sat in its pre-animation
         * state until the visitor scrolled, which is what left a frame showing
         * nothing but its own surface. Below the fold, triggers behave.
         */
        const onScreen = (el: Element) => {
          const rect = el.getBoundingClientRect();
          return rect.top < window.innerHeight && rect.bottom > 0;
        };

        /* ---- Headlines: masked, line-by-line ------------------------------ */
        gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
          const split = SplitText.create(el, {
            type: "lines",
            mask: "lines",
            linesClass: "split-line",
            autoSplit: true,
            onSplit(self) {
              return gsap.from(self.lines, {
                yPercent: 115,
                duration: 1.15,
                ease: "expo.out",
                stagger: 0.085,
                scrollTrigger: onScreen(el)
                  ? undefined
                  : { trigger: el, start: "top 88%", once: true },
              });
            },
          });
          splits.push(split);
          gsap.set(el, { opacity: 1 });
        });

        /* ---- Generic reveals ---------------------------------------------- */
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          const mode = el.dataset.reveal || "up";
          const delay = parseFloat(el.dataset.delay || "0");
          gsap.to(el, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: mode === "scale" ? 1.6 : 1.1,
            delay,
            ease: "expo.out",
            // Releasing the layer afterwards keeps long pages cheap to scroll.
            onComplete: () => gsap.set(el, { willChange: "auto" }),
            scrollTrigger: onScreen(el)
              ? undefined
              : { trigger: el, start: "top 90%", once: true },
          });
        });

        /* ---- Staggered groups --------------------------------------------- */
        gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
          const items = group.querySelectorAll<HTMLElement>("[data-stagger-item]");
          if (!items.length) return;
          gsap.fromTo(
            items,
            { opacity: 0, y: 34 },
            {
              opacity: 1,
              y: 0,
              duration: 1.05,
              ease: "expo.out",
              stagger: 0.09,
              scrollTrigger: onScreen(group)
                ? undefined
                : { trigger: group, start: "top 85%", once: true },
            },
          );
        });

        /* ---- Hairline rules that draw themselves -------------------------- */
        gsap.utils.toArray<HTMLElement>("[data-rule]").forEach((el) => {
          gsap.fromTo(
            el,
            { scaleX: 0, transformOrigin: "left center" },
            {
              scaleX: 1,
              duration: 1.5,
              ease: "expo.inOut",
              scrollTrigger: onScreen(el)
                ? undefined
                : { trigger: el, start: "top 95%", once: true },
            },
          );
        });

        /* ---- Parallax ------------------------------------------------------ */
        const mm = gsap.matchMedia();
        mm.add("(min-width: 1024px)", () => {
          gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
            const strength = parseFloat(el.dataset.parallax || "0.12");
            gsap.fromTo(
              el,
              { yPercent: -strength * 100 },
              {
                yPercent: strength * 100,
                ease: "none",
                scrollTrigger: {
                  trigger: el.closest("[data-parallax-scope]") || el,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.4,
                },
              },
            );
          });
        });

        return () => {
          splits.forEach((s) => s.revert());
          mm.revert();
        };
      });

      /* Measure once now, and again after webfonts land — type metrics move
         the triggers that belong to content further down the page. */
      ScrollTrigger.refresh();
      if (document.fonts?.ready) {
        document.fonts.ready.then(() => ScrollTrigger.refresh());
      }

      cleanup = () => ctx.revert();
    });

    return () => {
      cancelAnimationFrame(raf);
      cleanup?.();
    };
  }, []);

  return null;
}
