# About — sticky stacked cards ⚠️ the signature scroll effect

Target: `components/sections/About.tsx` (server — **no client JS needed, this is pure CSS**)
Reference: `docs/design-references/05-about-1.png`, `05-about-2.png`
Dump: `docs/research/dumps/about.json`
Interaction model: **SCROLL-DRIVEN via `position: sticky`.** Not a click carousel, not a
plain grid. Getting this wrong means a rewrite, so read this section twice.

## Verified mechanics from the live site

Three cards, each with computed `position: sticky; top: 120px; height: 628px`, inside a
section 2630px tall with `gap: 24px` and `padding-inline: 40px`.

As the page scrolls, card 1 pins 120px below the viewport top; card 2 scrolls up and covers
it; card 3 covers card 2. The section's own height is what creates the travel.

## Implementation

```
<section className="pw-section">
  <div className="pw-container flex flex-col gap-6 pt-[180px]">
    {cards.map((card, i) => (
      <div key={card.title} className="sticky top-[120px]" style={{ zIndex: i + 1 }}>
        <article className="h-[628px] ...">…</article>
      </div>
    ))}
  </div>
</section>
```

- `z-index` **must increase** with index so later cards paint over earlier ones.
- Each card needs an opaque background (`var(--pw-surface-solid)`, not a translucent
  surface) or you will see the pinned card bleeding through.
- Do **not** put `overflow: hidden` on any ancestor of the sticky elements — it kills sticky.
  `pw-container` and the section must not clip.
- No `transform` on ancestors either (it creates a containing block and breaks sticky).

## Card layout

`border-radius: 24px`, `background: var(--pw-surface-solid)`, `ring-1 ring-[var(--pw-line)]`,
`overflow: hidden`, height 628px, two columns `grid-cols-2`.

Alternating order — card index 0 and 2: **text at the start, image at the end**.
Card index 1: **image at the start, text at the end**. Use `order` on the two children (or
`direction`-safe grid placement), never `float` or `flex-row-reverse` with physical margins.

**Text column** — `padding: 40px`, flex-col, full height:
- `EyebrowPill`-style dot + `card.eyebrow` at 14px `var(--pw-text-dim)` at the top.
- Title: 24px / line-height 1.6 / `var(--pw-cream)`, margin-top 56px, max-width ~24ch.
- Description: 14px `var(--pw-text-dim)`, margin-top 16px, max-width ~34ch.
- Footnote pushed to the bottom (`mt-auto`): a small 14px row — a crosshair glyph (build a
  tiny local inline SVG: two short strokes crossing) then `card.footnote` at
  `var(--pw-text-dim)`.

**Image column** — the image fills the column edge-to-edge, `object-fit: cover`,
`next/image` with `fill` and `sizes="(max-width: 810px) 100vw, 540px"`. `alt` from `card.alt`.

## Header

Above the cards: `SectionHeading` with `about.eyebrow` / `titleLead` / `titleTrail` /
`description`, then the sticky stack starts.
Note the header must be **outside** the sticky wrapper.

## Responsive
- ≤810px: cards become a single column (image on top, `aspect-ratio: 16/10`; text below),
  height goes `auto` with `min-height: 0`, and sticky is **disabled** (`position: static`) —
  a stacking effect on a phone just hides content. Use `md:sticky` so it only applies from
  the breakpoint up.

## Content keys
`sections.about.*`, cards via `t.raw('cards') as AboutCard[]`
