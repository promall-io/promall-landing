# Powder → ProMall Landing v2 — Page Topology

Source: https://powder.framer.website/ captured at 1440×(17595) on 2026-07-27.
Full reference: `docs/design-references/_full-1440.png`. Per-section crops `01..14`.
Per-section DOM+computed-CSS dumps: `docs/research/dumps/<name>.json`.

## Global frame

| Property | Value |
|---|---|
| Body background | `#000` |
| Foreground (headings) | `#fff3f0` |
| Body text | `rgba(255,255,255,0.8)` |
| Dimmed text | `rgba(255,255,255,0.65)` |
| Hairline border | `rgba(255,255,255,0.1)` |
| Strong border | `rgba(255,255,255,0.25)` |
| Card surfaces | `#0f0f0fd9` · `#171717d9` · `#262626d9` · `#1f1f1ff2` |
| Accent (toggle on) | `#177275` (teal) |
| Accent (warm) | `#d39794` (dusty rose) |
| Content container | `max-width: 1080px`, centred |
| Section side padding | `0 24px` (About/Integrations `0 40px`) |
| Section vertical rhythm | container `padding-top: 180px`, inner `gap: 64px` (some 48px) |
| Smooth scroll | **Lenis** (`html.lenis lenis-autoToggle`) |
| Scroll snap | none |

### Type scale (Latin / Inter)

| Role | Size | Weight | Line-height | Tracking | Colour |
|---|---|---|---|---|---|
| H1 (hero) | 56px | 400 | 72.8px | -2.24px | `#fff3f0` |
| H2 (section) | 40px | 500 | 54px | -1.6px | `#fff` then `rgba(255,255,255,0.65)` on line 2 |
| Body | 16px | 400 | 24px | -0.16px | `rgba(255,255,255,0.8)` |
| Small | 14px | 400 | 21px | -0.28px | `rgba(255,255,255,0.65)` |
| Micro | 12px | 400 | 18px | -0.24px | `rgba(255,255,255,0.65)` |

**Persian override:** Estedad, `letter-spacing: 0` on all sizes (negative tracking breaks
Arabic-script joining). H1 drops to 48px, H2 to 36px — Persian glyphs have larger
apparent size at equal px.

### Button

`background: rgba(255,255,255,0.1)` · `border-radius: 768px` (pill) · `padding: 0 24px` ·
`height: 36px` · `backdrop-filter: blur(5px)`. Primary variant is solid
`#e8e6e3`-ish with dark text (hero "Get started").

### Eyebrow pill

Every section opens with a pill: dot + label, `background: #171717d9`, radius full,
`padding: 6px 14px`, 12–14px text at `rgba(255,255,255,0.65)`.

## Section order

| # | Name | Height | Interaction model | Notes |
|---|---|---|---|---|
| — | Announcement bar | 96 (fixed) | marquee | Fixed pill, infinite horizontal marquee |
| — | Nav | 48 (fixed) | static + mobile drawer | Logo left, centred links, CTA right; collapses to hamburger <1200px |
| 1 | Hero | 1314 | appear + parallax | Dusk gradient sky, 3 layered hill PNGs, headline, dual CTA, app mockup card overlapping hills |
| 2 | Intro | 1114 | scroll-reveal text | Centered lead + 2-up supporting paragraphs (the dimming and logo row were removed) |
| 3 | Features | 1329 | **click-driven tabs** | 4 tabs (Ask/Verify/Execute/Measure) + prev/next arrows over a mockup frame + caption |
| 4 | Why | 1204 | **drag/arrow carousel** | 3+ cards with isometric line-art SVG, prev/next + progress rail |
| 5 | About | 2630 | **sticky stacked cards** | 3 cards × 628px, `position: sticky; top: 120px` — cards stack as you scroll |
| 6 | Integrations | 1416 | static + orbit | Radial arc of 7 logo bubbles converging on a hub, 4-up feature row beneath |
| 7 | Changelog | 755 | static | Timeline rail with 4 dated entries |
| 8 | Numbers | 1607 | parallax | Two offset landscape stat cards (3.4×, 4.8M) with drifting cloud PNGs; 4-up metric row |
| 9 | Pricing | 1330 | **toggle (monthly/yearly)** | 3 plans, middle raised & lighter, teal toggle, check/cross feature rows |
| 10 | FAQ | 1274 | **category tabs + accordion** | Left category rail + "Got Questions?" card, right accordion list |
| 11 | ~~Testimonials~~ | — | — | Removed from the page; component, copy and avatars deleted |
| 12 | Blog | 1033 | static | 3 post cards, image + title + category · date |
| 13 | CTA | 910 | static | Left copy + trust badges, right app mockup, dunes PNG at bottom |
| 14 | Footer | 438 | static | Logo + 3 link columns, hairline, copyright + social icons |

## Layering

- Nav and announcement bar are `position: fixed`, above everything.
- Hero hills and CTA dunes are absolutely-positioned PNGs at the bottom of their section,
  above the section gradient, below the mockup card.
- About cards use `position: sticky` inside a tall section — the section's own height
  (2630px) is what produces the stacking scroll.
