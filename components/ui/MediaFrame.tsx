import Image from "next/image";
import type { Shot } from "@/lib/media";

type MediaFrameProps = {
  /** A shot from lib/media.ts — fills src, alt, label and note in one go. */
  shot?: Shot;
  /** Drop a real photograph in /public/media and pass its path here. */
  src?: string;
  alt?: string;
  /** What belongs in this frame, shown while no photograph is supplied. */
  label?: string;
  note?: string;
  figure?: string;
  ratio?: string;
  className?: string;
  /**
   * "cover" fills the frame and crops what will not fit; "contain" shows the
   * whole photograph and lets the frame's own surface show around it. Portraits
   * take contain — a face is not something to crop to a ratio.
   */
  fit?: "cover" | "contain";
  parallax?: number;
  priority?: boolean;
  sizes?: string;
};

/**
 * Every image on the site goes through this frame, so art direction stays
 * consistent whether or not BSM's own photography has been supplied yet.
 * With no `src` it renders a composed placeholder that states plainly what
 * photograph belongs there — never a stock image standing in for BSM's work.
 */
export function MediaFrame({
  shot,
  src: srcProp,
  alt: altProp,
  label: labelProp,
  note: noteProp,
  figure,
  ratio = "4 / 5",
  className = "",
  fit,
  parallax = 0.08,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: MediaFrameProps) {
  const src = srcProp ?? shot?.src;
  const alt = altProp ?? shot?.alt;
  const label = labelProp ?? shot?.label ?? "Image";
  const note = noteProp ?? shot?.brief;
  /* A shot that declares its own ratio is shown whole, never cropped. */
  const frameRatio = shot?.ratio ?? ratio;
  const objectFit = fit ?? (shot?.ratio ? "contain" : "cover");
  /* The parallax drift needs the image oversized, which crops ~10% off every
     edge — never acceptable for a photograph being shown whole. */
  const drifts = parallax > 0 && objectFit === "cover";

  return (
    <figure className={`group relative ${className}`} data-parallax-scope>
      <div
        /* Subtle brass keyline on every photograph — one hairline, no glow. */
        className="relative w-full overflow-hidden border-2 border-brass/55 bg-surface transition-colors duration-500 group-hover:border-brass/80"
        style={{ aspectRatio: frameRatio }}
      >
        {src ? (
          <div
            className={drifts ? "absolute inset-[-10%]" : "absolute inset-0"}
            data-parallax={drifts ? parallax : undefined}
          >
            <Image
              src={src}
              alt={alt ?? label}
              fill
              priority={priority}
              sizes={sizes}
              /* The optimiser defaults to 75, which visibly softens
                 photographs behind the brass frames. */
              quality={90}
              className={objectFit === "contain" ? "object-contain" : "object-cover"}
            />
          </div>
        ) : (
          <PlaceholderArt label={label} note={note} />
        )}
        <span className="ticks pointer-events-none absolute inset-0" aria-hidden="true" />
      </div>
      {figure && (
        <figcaption className="mt-3 flex items-baseline justify-between border-t border-line-soft pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
          <span>{figure}</span>
          <span className="text-dim/70">{label}</span>
        </figcaption>
      )}
    </figure>
  );
}

/** The composed empty state: grid, sweep line, and a plain-language brief. */
function PlaceholderArt({ label, note }: { label: string; note?: string }) {
  return (
    <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(120%_90%_at_50%_0%,#111925_0%,#070a10_60%,#04060a_100%)]">
      <svg
        className="absolute inset-0 h-full w-full text-line"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id={`g-${label.replace(/\W/g, "")}`} width="44" height="44" patternUnits="userSpaceOnUse">
            <path d="M44 0H0V44" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#g-${label.replace(/\W/g, "")})`} />
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="currentColor" strokeWidth="1" />
        <line x1="50%" y1="0" x2="50%" y2="100%" stroke="currentColor" strokeWidth="1" />
      </svg>
      <div className="relative z-10 max-w-[80%] text-center">
        <span className="inline-block border border-brass/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-brass">
          [Image]
        </span>
        <p className="mt-4 font-display text-sm uppercase tracking-[0.14em] text-bone/80">{label}</p>
        {note && <p className="mt-2 font-mono text-[10px] leading-relaxed tracking-[0.06em] text-dim">{note}</p>}
      </div>
    </div>
  );
}
