# Intro + Changelog + Blog (three static sections)

Targets: `components/sections/Intro.tsx`, `Changelog.tsx`, `Blog.tsx`
References: `02-intro.png`, `07-changelog.png`, `12-blog.png`
Dumps: `docs/research/dumps/{intro,changelog,blog}.json`
Interaction model: **all three static** — reveal on scroll only. No client JS beyond `Reveal`.

---

## Intro (h ≈ 1114)

Centered column inside `pw-container`, `padding-top: 180px`, `text-align: center`.

- `EyebrowPill` with `intro.eyebrow`.
- Lead: the section `h2` (`pw-h2`), `max-width: 28ch`, `text-wrap: balance`, margin-top 36px.
- Then `intro.paragraphs[]` as a 2-column grid (1 column ≤720px), margin-top 64px,
  `max-width: 820px`: 16px / line-height 1.9 / `var(--pw-text)`, each under a `var(--pw-line)`
  hairline (`border-top`, `padding-top: 28px`).
- No logo row and no scroll-linked dimming — the earlier placeholder marks and the
  `opacity: 0.25` inactive-paragraph effect were both removed as unreadable filler.
- Reveal each block with a 0.08s stagger.

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
