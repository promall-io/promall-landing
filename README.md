# promall-landing-v2

ProMall's landing page, version 2 — the [Powder](https://powder.framer.website/) layout and
motion language rebuilt in Next.js, with ProMall's own Persian content and RTL as the
primary direction.

## Run

```bash
npm install          # .npmrc sets legacy-peer-deps (React 19 peer ranges)
npm run dev          # http://localhost:3000
npm run build        # gates on lint + types
npm run lint
```

## Architecture

- **Next.js 14 App Router**, React 19, Tailwind v4 (no config file — theme lives in
  `app/globals.css`), next-intl.
- **Server Components by default.** Only five islands ship JS: the nav drawer, the Features
  tabs, the Why and Testimonials carousels, the Pricing toggle, the FAQ accordion, and the
  Numbers cloud parallax. Every heading, paragraph and list renders on the server.
- **Content is the single source of truth** in `messages/fa.json` / `messages/en.json`,
  typed against `types/content.ts`. No user-facing string is hardcoded in a component.
  Client islands receive content as props so the message catalogue never reaches the browser.
- **RTL-first.** Logical CSS properties only (`ps-`/`pe-`, `ms-`/`me-`, `start-`/`end-`).
  `fa` is the default locale and the only indexed one.
- **Scroll reveals are pure CSS** (`animation-timeline: view()`), so content is never
  hidden behind JavaScript. Browsers without view-timeline support show the page fully
  rendered without the fade-up.

## Where things came from

`docs/research/` holds the reverse-engineering artifacts:

| File | What it is |
|---|---|
| `PAGE_TOPOLOGY.md` | Section inventory, type scale, tokens, layout metrics |
| `BEHAVIORS.md` | Every interaction, its trigger, and its exact transition |
| `ARCHITECTURE.md` | The contract each section was built against |
| `components/*.spec.md` | Per-section build specs |
| `dumps/*.json` | Per-section DOM + computed CSS captured at 1440px |

`docs/design-references/` has the original at 1440px and 390px, cropped per section.
`docs/qa/` has the same crops of this build for side-by-side comparison.

## Assets

`scripts/download-assets.mjs` re-fetches the source imagery. The three isometric
illustrations in `public/illustrations/` were extracted from inline SVG and had their
Framer token variables resolved to literal colours.
