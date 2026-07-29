# Chrome — AnnouncementBar + Nav + Footer

Targets: `components/AnnouncementBar.tsx`, `components/Nav.tsx`, `components/Footer.tsx`
References: `docs/design-references/01-hero.png` (nav), `14-footer.png`
Dumps: `docs/research/dumps/{announcebar,nav,footer}.json`

## AnnouncementBar

A fixed pill floating in the hero, **not** a full-width bar. Height 96px block; the pill
itself is ~36px tall, centred horizontally, sits at roughly y=175 in the hero.

- Pill: `background: rgba(23,23,23,0.85)`, `border-radius: 999px`, `backdrop-filter: blur(8px)`,
  `ring-1 ring-[var(--pw-line)]`, height 36px, `padding-inline: 6px 6px 6px 18px`.
- Inside: an **infinite marquee** of the same text repeated, clipped to ~230px width, plus a
  circular 28px arrow button at the end.
- Marquee: CSS only — `animation: pw-marquee 18s linear infinite` on a track containing the
  text twice. The keyframe already exists in `globals.css`. Pause on hover.
- RTL: the marquee must travel in the reading direction. Under `dir="rtl"` translate to
  `+50%` instead of `-50%` (use a `[dir='rtl'] &` variant or a direction-aware class).

## Nav

**Does not change on scroll** — verified at scrollY 0/400/1200: transparent, no shadow, no
backdrop, no resize. `position: fixed; top: 0; inset-inline: 0; z-index: 50`, height 48px
block with content vertically centred, `padding-inline: 24px`, inner `pw-container`.

Layout at ≥1200px: brand mark at the start, links absolutely centred, CTA button at the end.
Below 1200px: brand + hamburger only; links move into a drawer.

- Brand: `ProMallMark` icon (28px) + the word mark from `nav.brand`.
- Links: 14px, `color: var(--pw-text-dim)`, `transition: color 0.4s var(--pw-ease)`,
  hover → `var(--pw-cream)`. Gap 40px.
- CTA: `.pw-button` at 36px height.
- Entry animation: `initial={{opacity:0,y:-36}} animate={{opacity:1,y:0}}` duration 1,
  ease `[0.44,0,0.56,1]`. Use `motion.header`, animate on mount (not whileInView).
- Mobile drawer: full-screen overlay, `backdrop-filter: blur(12px)`, links stacked at 20px.
  Close on link click and on Escape. Trap nothing fancy — but restore focus to the toggle.
- Include a visually-hidden skip link using `nav.skipToContent` pointing at `#main`.

## Footer

Height ~438px. Layout: brand mark at the start, then 3 link columns pushed to the end.
Hairline `1px solid var(--pw-line)` above the bottom row. Bottom row: copyright at the
start, 4 social icons at the end.

- Column titles: 14px `var(--pw-cream)`, weight 400. Links: 14px `var(--pw-text-dim)`,
  hover `var(--pw-cream)` on the 0.4s curve, gap 14px, first link of column 1 is highlighted
  (`var(--pw-cream)`).
- Social icons: `InstagramIcon`, `TelegramIcon`, `LinkedinIcon`, `XIcon` at 20px,
  `var(--pw-text-faint)` → `var(--pw-cream)` on hover. Wrap in a `<ul>` with
  `aria-label` from `footer.socialLabel`.
- Columns come from `footer.columns` (typed `FooterColumn[]`).
- Stack to a single column below 810px.

## Content keys
`announcement.*`, `nav.*`, `footer.*` — all from next-intl. Nav links are
`t.raw('links') as NavLink[]`.
