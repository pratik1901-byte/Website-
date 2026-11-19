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
  gia: "",
  /* The Indian Navy crest: INS Hansa is a naval air station, and no separate
     establishment logo is published. */
  "ins-hansa": "/media/clients/ins-hansa.png",
  esic: "/media/clients/esic.png",
  concor: "",
};
