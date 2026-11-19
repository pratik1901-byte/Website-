import type { ClientSlug } from "@/lib/site";

/* --------------------------------------------------------------------------
   Client logos
   --------------------------------------------------------------------------
   One line per client, keyed by the client's slug in lib/site.ts.

   To add a logo, set its value to either
     • a file you dropped in /public/media/clients  →  "/media/clients/gsl.png"
     • or a full URL on the organisation's own site →  "https://…/logo.png"

   To remove one, set it back to "". An empty value renders the neutral
   [Logo] frame — the card layout is identical either way, so adding and
   removing artwork never moves anything on the page.

   A logo is the organisation's property: only put one here that BSM is
   permitted to display. Nothing is filled in with a substitute or lookalike.
   -------------------------------------------------------------------------- */

export const clientLogos: Record<ClientSlug, string> = {
  /* Each file below was taken from that organisation's own website and is
     stored unmodified apart from trimming and resizing. */
  hpcl: "/media/clients/hpcl.png",
  gsl: "/media/clients/gsl.png",
  "csir-nio": "/media/clients/csir-nio.webp",
  aai: "/media/clients/aai.png",
  iocl: "/media/clients/iocl.png",
  bpcl: "/media/clients/bpcl.png",
  /* No logo is published for the airport; BSM supplied a photograph of the
     terminal instead. */
  gia: "/media/clients/gia.webp",
  /* The Indian Navy crest: INS Hansa is a naval air station, and no separate
     establishment logo is published. */
  "ins-hansa": "/media/clients/ins-hansa.png",
  esic: "/media/clients/esic.png",
  concor: "/media/clients/concor.webp",
};

/**
 * Entries that are a photograph rather than a logo.
 *
 * A logo is printed on a white plate with a margin around it, the way a mark
 * belongs on stationery. A photograph fills the frame edge to edge instead —
 * inset in white it reads as a small picture of something, rather than as the
 * subject of the card.
 */
export const clientPhotos: readonly ClientSlug[] = ["gia"];
