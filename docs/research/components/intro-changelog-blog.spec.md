# Intro + Changelog + Blog (three static sections)

Targets: `components/sections/Intro.tsx`, `Changelog.tsx`, `Blog.tsx`
References: `02-intro.png`, `07-changelog.png`, `12-blog.png`
Dumps: `docs/research/dumps/{intro,changelog,blog}.json`
Interaction model: **all three static** — reveal on scroll only. No client JS beyond `Reveal`.

---

## Intro (h ≈ 1114)

Left-aligned (start-aligned) column, **not** full width — text block starts at the container
start and runs to ~46% width. Everything inside `pw-container`, `padding-top: 180px`.

- `EyebrowPill` with `intro.eyebrow`.
- Lead paragraph: 22px / line-height 1.6 / `var(--pw-cream)`, max-width ~34ch, margin-top 28px.
- Then `intro.paragraphs[]`: same size, `color: var(--pw-text-faint)` (noticeably dimmer than
  the lead — this contrast is the whole point of the section), gap 28px between them.
- Logo row at the bottom, margin-top ~120px: 6 evenly-spaced placeholder marks at
  `opacity: 0.35`, height 24px, `filter: grayscale(1)`. Render them as simple inline SVG
  shapes you define locally in this file (abstract marks — do **not** invent real brand logos).
  Label the row with `intro.logosLabel` in a visually-hidden heading.
- Reveal each paragraph with a 0.08s stagger.

---

## Changelog (h ≈ 755)

- `SectionHeading` with `changelog.eyebrow` / `titleLead` / `titleTrail`, and an `ArrowLink`
  at the end of the header row carrying `changelog.linkLabel`.
- Below: a **horizontal timeline rail** — a `1px` line in `var(--pw-line)` spanning the
  container, with a 5px dot on the line above each column start.
- 4 equal columns (`grid-cols-4`, gap 24px) from `changelog.entries`:
  title 14px `var(--pw-cream)`, description 14px `var(--pw-text-dim)` clamped to 2 lines
  (`line-clamp-2`), date 14px `var(--pw-text-faint)` pushed to the bottom (`mt-auto`,
  columns are flex-col with a min-height ~130px).
- ≤810px: 2 columns. ≤390px: 1 column, rail becomes vertical at the start edge.

---

## Blog (h ≈ 1033)

- `SectionHeading` + `ArrowLink` with `blog.linkLabel`.
- 3 cards, `grid-cols-3`, gap 24px, from `blog.posts`.
- Card: `.pw-card`, `overflow: hidden`, `padding: 8px` around the image, image
  `aspect-ratio: 4/3`, `border-radius: 14px`, `object-fit: cover`, then a body with
  `padding: 20px 20px 24px`.
- Title: 20px / line-height 1.6 / `var(--pw-cream)`, clamped to 3 lines.
- Meta row: `blog.category` · `blog.date`, 14px `var(--pw-text-faint)`, separated by a
  middot with `gap: 8px`. Margin-top 16px.
- Whole card is a `next/link` to `post.href`. Hover: card background lifts to
  `var(--pw-surface-2)` and the image scales to `1.03` — transition `0.5s var(--pw-ease)`,
  `transform` only, `will-change` unset.
- Images: `next/image`, `sizes="(max-width: 810px) 100vw, 33vw"`, no `priority`.
- ≤810px: 1 column.

## Content keys
`sections.intro.*`, `sections.changelog.*`, `sections.blog.*`
