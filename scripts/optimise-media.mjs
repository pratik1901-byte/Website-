/**
 * Media pipeline: assets-src/media  →  public/media
 *
 *   npm run media
 *
 * Masters (full-resolution photographs, logo artwork, anything BSM is sent)
 * live in assets-src/media and are never served. This script resizes each one
 * to a sensible web width and writes it into public/media, where the
 * dictionaries in lib/media point at it.
 *
 * Re-running is safe: a file is skipped when the output is already newer than
 * its master, so only what changed is rebuilt. Pass --force to redo everything.
 *
 * WebP for photographs — smaller than JPEG at the same quality, and supported
 * everywhere this site will be opened. PNG masters stay PNG, so logos keep
 * their transparency. Masters are never touched: re-run the script and a
 * different size or format comes out of the same original.
 */

import { readdir, mkdir, stat } from "node:fs/promises";
import { join, parse } from "node:path";
import sharp from "sharp";

const SRC = "assets-src/media";
const OUT = "public/media";
const MAX_WIDTH = 2000;
const QUALITY = 86;

const force = process.argv.includes("--force");

async function newer(a, b) {
  try {
    const [x, y] = await Promise.all([stat(a), stat(b)]);
    return x.mtimeMs > y.mtimeMs;
  } catch {
    return true;
  }
}

async function run() {
  let files;
  try {
    files = await readdir(SRC);
  } catch {
    console.log(`Nothing to do — ${SRC} does not exist yet.`);
    return;
  }

  await mkdir(OUT, { recursive: true });

  const images = files.filter((f) => /\.(jpe?g|png|webp|tiff?)$/i.test(f));
  if (images.length === 0) {
    console.log(`Nothing to do — no images in ${SRC}.`);
    return;
  }

  for (const file of images) {
    const { name, ext } = parse(file);
    const keepPng = /\.png$/i.test(ext);
    const from = join(SRC, file);
    const to = join(OUT, `${name}${keepPng ? ".png" : ".webp"}`);

    if (!force && !(await newer(from, to))) {
      console.log(`  skip   ${file}`);
      continue;
    }

    const pipeline = sharp(from)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true, kernel: "lanczos3" })
      .sharpen();

    const info = keepPng
      ? await pipeline.png({ compressionLevel: 9 }).toFile(to)
      : await pipeline.webp({ quality: QUALITY, effort: 5 }).toFile(to);

    console.log(
      `  write  ${to}  ${info.width}×${info.height}  ${Math.round(info.size / 1024)} KB`,
    );
  }

  console.log("\nDone. Point an entry in lib/media/photos.ts at the new file.");
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
