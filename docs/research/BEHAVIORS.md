# Behaviour Bible — Powder

Captured via live probe (`powder-behaviors.json`, since consumed). Every builder must
honour these; they are what make the page feel alive rather than a screenshot.

## Global

### Smooth scroll — Lenis
`document.documentElement` carries `class="lenis lenis-autoToggle"`. Native
`scroll-behavior` stays `auto`; Lenis drives the scroll. Install `lenis` and mount it once
at the root. Without it the page feels noticeably "cheaper" — this is the single most
recognisable global behaviour.

### Appear animations — 30 elements
Framer's appear system. Two variants observed:

**Tween (most elements)**
```
initial: { opacity: 0.001, y: 36 }
animate: { opacity: 1, y: 0 }
transition: { type: 'tween', duration: 1, ease: [0.44, 0, 0.56, 1], delay: 0 }
```

**Spring (small UI chrome — nav, pills)**
```
initial: { opacity: 0.001, y: 0 }
animate: { opacity: 1 }
transition: { type: 'spring', duration: 0.5, bounce: 0 }
```

The nav specifically enters with `y: -36 → 0` over `duration: 1`, same easing.

Implement with framer-motion `whileInView` + `viewport={{ once: true, margin: '-10%' }}`.
Stagger siblings by ~0.08s where a section reveals a row of cards.

### Link / interactive transitions
`transition: color 0.4s cubic-bezier(0.44, 0, 0.56, 1)` on nav links and footer links.
Buttons transition `background-color` on the same curve.

### No scroll-snap
`scroll-snap-type` is `none` everywhere. Do **not** add snap points.

## Per-section

### Nav
Does **not** change on scroll — verified at scrollY 0, 400 and 1200: identical
background (transparent), no shadow, no backdrop-filter, no size change. It is simply
`position: fixed; top: 0`. Resist the urge to add a floating/shrinking header.

### Hero
Layered hill PNGs (`hill-back`, `hill-mid`, `hill-front`) pinned to the bottom of the
section, each `object-fit: cover`, ~914px wide at 1440. They sit above the sky gradient.
The app mockup card overlaps the hills and is clipped by the section.

### Features — click-driven tabs
4 labels (Ask / Verify / Execute / Measure) sit above a single mockup frame. Clicking a
label swaps the mockup image and the caption below. Prev/next circular arrow buttons at
the bottom-left and bottom-right step through the same 4 states. Cross-fade on swap.
**Interaction model: click. Not scroll.**

### Why — carousel
Horizontal card track, 3 cards visible at 1440 with the 3rd bleeding off the right edge.
Prev/next circular buttons bottom-left/right with a thin progress rail between them; the
filled portion of the rail reflects scroll position within the track.

### About — sticky stacked cards ⚠️ most important behaviour
Three cards, each `position: sticky; top: 120px; height: 628px`, inside a 2630px-tall
section. As you scroll, each card pins at 120px from the top while the next card scrolls
up over it. Layout alternates: card 1 text-left/image-right, card 2 image-left/text-right,
card 3 text-left/image-right.
**Do not build this as a plain stacked grid — the sticky pin is the effect.**

### Numbers — parallax clouds
Cloud PNGs drift across the two stat cards at a different rate than the page scroll.
Implement with a `useScroll` + `useTransform` y-offset on the cloud layer.

### Pricing — billing toggle
Teal (`#177275`) pill toggle on the Basic and Pro cards, labelled "Yearly". Toggling
switches the displayed price. Starter has no toggle (it's free). The middle card is
visually raised: lighter surface, taller, and sits above the others.

### FAQ — category tabs + accordion
Left rail: 3 categories (General / AI & Capabilities / Integrations & Security). The
active one gets a filled pill background. Clicking swaps the accordion list on the right.
Accordion rows expand on click with a chevron rotate.

### Testimonials — carousel
One testimonial at a time inside a large card: company logo top-left, quote bottom-left,
portrait right. Prev/next circular buttons and 5 dots track position.

### Responsive
Breakpoints observed: the nav collapses to a hamburger below ~1200px. Below ~810px the
multi-column sections stack to a single column and the container padding tightens.
Targets: **1440 / 810 / 390**.
