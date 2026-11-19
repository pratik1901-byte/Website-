/**
 * Media registry.
 *
 * One import for every image on the site:
 *
 *   import { media, logo, gallery, clientLogos } from "@/lib/media";
 *
 * The files behind it are the dictionaries to edit:
 *
 *   types.ts         the shapes — Shot, GalleryItem
 *   photos.ts        every photograph, plus the BSM logo
 *   gallery.ts       which photographs appear on the gallery page
 *   client-logos.ts  one line per client, keyed by slug
 *
 * Nothing imports those files directly; components import this barrel, so a
 * dictionary can be split or renamed without touching a component.
 */

export type { Shot, GalleryItem } from "./types";
export { media, logo, type MediaKey } from "./photos";
export { gallery, galleryGroups } from "./gallery";
export { clientLogos, clientPhotos } from "./client-logos";
