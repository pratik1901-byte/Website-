# assets-src

Master files. **Nothing in here is served** — it is not part of the build.

Put the originals here as they arrive from BSM: full-resolution photographs,
logo artwork, scans. Then run

```bash
npm run media
```

which resizes everything in `assets-src/media/` into `public/media/`, where the
dictionaries in [`lib/media`](../lib/media) point at it.

Keeping masters separate means an image can be re-cut later — a different crop,
a different size — without having gone through a lossy export first.

| | |
| --- | --- |
| `assets-src/media/` | photograph masters in, any size |
| `assets-src/clients/` | client logo masters (sized by hand, not by the script) |
| `public/media/` | web-ready files out, max 2000px wide |
| `lib/media/photos.ts` | the dictionary that names them |
