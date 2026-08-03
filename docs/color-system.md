# ProMall Color System — Single Source of Truth

Source: Claude Design project `8b79dc67-0489-4900-a023-24791761f6b1`, `templates/color-system/ColorSystem.dc.html`.
Token values live in **`promall-ui/src/app/globals.css`**. That file is the only place a color value may be authored.

Three tiers: **raw ramp → surface/text layer → semantic role**. Single-class dark mode (`.dark`). No per-component color.

## 01 — Foundation: the brand ramp (private layer)

Never referenced directly from a component.

| Family | Tokens |
|---|---|
| Ink | `--ink-deep` `#11192a` · `--ink` `#1b263b` · `--ink-700` `#243349` · `--ink-600` `#2e3f59` |
| Slate & sky | `--slate` `#415a77` · `--slate-soft` `#778da9` · `--sky` `#aebbd0` · `--sky-soft` `#cdd6e2` |
| Champagne gold | `--gold-deep` `#c4b894` · `--gold` `#d9d0b8` · `--gold-tint` `#efe9da` · `--ice` `#e3e5e9` |
| Status | `--success` `#14935c` · `--warning` `#b7791f` · `--info` `#2f6ca2` · `--danger` `#c0392b` |

## 02 — Semantic roles: same token, two modes

| Role | Light `:root` | Dark `.dark` |
|---|---|---|
| background | `#f6f7f9` paper | `#11192a` ink-deep |
| card | `#ffffff` | `#18233a` |
| popover / raised | `#ffffff` | `#243349` |
| muted | `#eef0f4` | white @ 5% |
| secondary / chip | `#eceef2` | white @ 8% |
| foreground | `#1b263b` · 14.1:1 | `#f3f5f8` · 16.1:1 |
| muted-foreground | `#5c6b84` · 5.0:1 | `#9aa7bc` · 6.4:1 |
| primary / ring | `#415a77` · white 7.1:1 | `#d9d0b8` gold · ink 9.9:1 |
| brand / ring (dark) | — | `#aebbd0` · 9.1:1 |
| accent | `#d9d0b8` · ink 9.9:1 | gold, ink text |
| destructive | `#c0392b` · white 5.4:1 | `#e5736a` · **ink text** |
| border / input | ink @ 9% / 12% | white @ 10% / 14% |

The one deliberate asymmetry: `--primary` is slate blue in light and champagne gold in dark. That is correct — slate has no contrast on ink-deep, gold has none on paper. The primary CTA changes hue with the theme. Keep it; never hard-code either hex for a CTA.

## Token families — what each is for

- **A Raw ramp** — private. `--ink*` structure/text, `--slate*` light interactive blue (`--slate-soft` is decorative, 2.9:1), `--sky*` dark interactive blue, `--gold*` premium accent (always ink text), `--ice`/`--paper`/`--muted-ink` light neutrals.
- **B Surface** — elevation is lightness, not shadow. `--surface-page` (body only) · `--surface-card` (bounded blocks) · `--surface-raised` (floating layers) · `--surface-sunken` (zebra rows, code, disabled, skeletons) · `--surface-chip` (pills, tags, tab bars) · `--surface-inverse`/`-deep` (toast, tooltip, coach-mark — max one per view, pair with `--text-inverse`).
- **C Text** — exactly three greys. `--text-strong` (headings, prices, active nav) · `--text-body` (paragraphs, 11.2:1) · `--text-muted` (labels, captions, placeholders — 5.0:1 floor, never quieter) · `--text-inverse` · `--text-on-gold` (always ink) · `--text-brand` (links, ghost labels — not body copy).
- **D Semantic roles** — the layer product code touches. `--background`/`--foreground`, `--card`/`--card-foreground` (always paired), `--popover`/`--popover-foreground` (lighter than card in dark — that lightness IS the elevation cue), `--primary`/`--primary-foreground` (one per view), `--secondary`, `--muted`/`--muted-foreground` (also the standard hover fill), `--accent` (gold both themes — selected item, active tab, premium badge; never page-wide), `--destructive` (irreversible only), `--border`/`--input`/`--ring`.
- **E Status — three-part contract**: `base` = fill · `-ink` = text · `-soft` = background.
  `--success` paid/in-stock/published/approved · `--warning` recoverable and time-bound · `--info` neutral notice (no `-ink`; base passes 5.5:1 on white) · `--danger` failure state.
  Color is never the only signal — always pair with an icon or a word (~8% of Iranian men have a color-vision deficiency).
- **F Borders, focus, selection** — `--border-subtle` (decorative, ~1.3:1 — may never be the only thing defining a control) · `--border-strong` · `--input-border` · `--ring`/`--shadow-ring` (7.1:1 light, 9.1:1 dark — this is what carries focus contrast) · `--selection-bg` (set once globally).
- **G Brand aliases `--brand-*`** — legacy naming for landing components. Must resolve to families B/C/E; never a new value. Keep `--brand-*` status in lock-step with family E.
- **H Sidebar — solid system** — `--sidebar`, `--sidebar-foreground`, `--sidebar-primary*`, `--sidebar-accent*`, `--sidebar-border`, `--sidebar-ring`.
- **I Sidebar — glass system** — `--sidebar-glass-*`, `--sidebar-text/-muted/-active`, `--sidebar-item-hover/-active-bg`. Pick ONE system per app; never mix across the two — they have opposite text polarity.
- **J Glass** — landing surfaces only. `--glass-*`, `--blur-glass`, `--glass-saturate`. Never in app/dashboard; those stay flat.
- **K Desktop shell** — `--desktop-*`. The backdrop gradient is the only sanctioned gradient in the product.
- **L Data visualisation** — `--chart-1 … --chart-5`, assigned in order, already mode-aware. Five is the ceiling. A series with status meaning uses the status token instead, consistently across every chart.
- **M Channel tokens `--*-rgb`** — space-separated channels for `rgb(var(--x) / 12%)`. Never for text.
- **N Asset & effect** — `--logo-filter` (one logo asset, flipped in dark), `--canvas-fill-white`, `--svg-blur-start/-end` (read in JS), `--confetti-*` (celebration moment only, never UI chrome).
- **O Shadow & radius** — `--shadow-soft/-card/-float/-ink` in that order; already re-tuned for dark. `--radius` (20px) + `xs/sm/md/lg/xl/2xl/3xl/full`. Buttons are `--radius-full` pills, cards and inputs `--radius-md`.
- **P Off-limits** — `--tw-*` (Tailwind internals) and `--color-red-50 …` (Tailwind's stock 192-color palette). Shipped, but NOT ProMall colors.

## The 34 rules — constraints, not suggestions

Apply to every screen, both themes.

### Source of truth
1. Never write a hex, `rgb()`, or `hsl()` in product code. Only semantic tokens: `bg-background`, `bg-card`, `bg-muted`, `bg-primary`, `text-foreground`, `text-muted-foreground`, `border-border`, `ring-ring`, etc.
2. Never hard-code a raw ramp token (`--ink`, `--slate`, `--gold`) for UI color. Those are the palette's private layer. Use the role that aliases them.
3. Dark mode is `class="dark"` on a root ancestor. Never build a second set of styles for it, and never use a `dark:` utility to patch a color the token should already be handling — if you need one, the token is wrong.

### Surfaces (elevation reads by lightness, not by shadow)
4. Page = `bg-background`. Content block = `bg-card`. Overlay/dropdown/popover/tooltip/dialog = `bg-popover`. Inset wells, table stripes, disabled fields, skeletons = `bg-muted`. Chips/pills = `bg-secondary`.
5. Never stack card-on-card at the same value. Go up one level (card → popover) or separate with `border-border` instead of nesting fills.
6. App and dashboard surfaces are FLAT. Gradients, glass and blur are reserved for the landing components.

### Text
7. Body and headings = `text-foreground`. Secondary/help/caption/placeholder = `text-muted-foreground`. There is no third grey — do not invent one with opacity.
8. Never lower text opacity to make it quieter. Opacity below 100% on text breaks the measured contrast. Use the muted token.
9. Text on a colored fill always uses that fill's foreground token: `bg-primary`→`text-primary-foreground`, `bg-accent`→`text-accent-foreground`, `bg-destructive`→`text-destructive-foreground`, `bg-secondary`→`text-secondary-foreground`. Never assume white.

### Brand blue and gold
10. Primary action = default. It is slate in light and gold in dark by design; do not "fix" that or pin it to one hue.
11. Gold is an ACCENT: pill fills, active-nav indicator, premium badges, dividers, icon backgrounds. Gold is NEVER text or an icon on a light background (1.4:1) and never carries white text (1.5:1). Gold fill always takes ink text.
12. Max one gold element per view. If two things are gold, neither reads as special.

### Status
13. Meaning is fixed: success = paid/in-stock/approved. warning = expiring, low stock, needs attention. danger/destructive = failed, cancelled, irreversible. info = neutral system notice. Never use a status color decoratively.
14. Status TEXT uses the `-ink` variant (`--success-ink`, `--warning-ink`, `--danger-ink`). Status FILL uses the base. Status BACKGROUND uses the `-soft` variant. Do not mix these up: base-as-text fails AA on white.
15. Prefer the shared status/badge variants over hand-rolled colored spans — the variants already pair the three.
16. Color is never the only signal. Pair every status color with an icon or a word.

### Borders, focus, state
17. `border-border` for structural separation; `border-input` for form field edges. Both are intentionally faint — do not rely on them alone to define a control's hit area; give the control a fill or padding too.
18. Every interactive element keeps a visible focus ring (`ring-ring`). Never remove outlines. The ring — not the border — carries accessible focus contrast in both themes.
19. Hover = one step of surface change (`bg-muted` / `bg-accent`), not a hue change. Selected = `bg-accent` or the gold indicator. Disabled = `opacity-50` on the whole control, not a lighter custom color.

### Charts and data
20. Use `--chart-1..5` in order, never arbitrary colors. They are already mode-aware. If a series carries status meaning, use the status token instead and keep it consistent across every chart in the app.

### Sidebar — pick one system
21. There are two: the SOLID set (`--sidebar`, `--sidebar-foreground`, `--sidebar-accent`…) and the GLASS set (`--sidebar-glass-bg`, `--sidebar-text`, `--sidebar-item-active-bg`…). Choose one for the whole app and never mix tokens across the two — they have opposite text polarity.

### Glass, gradients, desktop shell
22. `--glass-*` is landing-page only (HeroGlass, FloatingNav, MacMenuBar, ChatMini). App and dashboard surfaces are flat: no blur, no glass, no gradient fills.
23. The only sanctioned gradient in the product is `--desktop-bg-gradient-start/mid/end` behind the app-window frame. Do not add gradients anywhere else.
24. Text over glass must hit 4.5:1 against the LIGHTEST pixel that can appear behind it. If it can't, add a solid scrim — do not lower the blur and hope.

### Shadow, radius, motion
25. Elevation comes from `--shadow-soft / -card / -float / -ink`, in that order. Never hand-write a `box-shadow`; the tokens are already re-tuned for dark mode.
26. Radius comes from `--radius-*` only. Buttons are `--radius-full` pills, cards and inputs `--radius-md`. No bare pixel radii.
27. Color transitions use `--dur-fast` + `--ease-out`. Theme switching does not animate.

### Alpha, canvas, assets
28. Need a brand color at partial opacity? Use `rgb(var(--primary-rgb) / 12%)` — never a hand-mixed translucent hex, and never opacity on the element (that fades its text too).
29. For `<canvas>` and inline SVG, read `--canvas-fill-white` and `--svg-blur-start/-end` in JS so generated graphics follow the theme.
30. One logo asset only; `--logo-filter` inverts it in dark mode.
31. `--confetti-*` is deliberately off-brand and exists for the celebration moment only. It never appears in UI chrome.

### Never touch
32. `--tw-*` (Tailwind internals) and `--color-red-50 …` (Tailwind's stock 192-color palette) are shipped but are NOT ProMall colors. Reading either is the fastest way to make a screen look off-brand.

### Floor
33. Body text ≥ 4.5:1, large text and UI boundaries ≥ 3:1, in BOTH themes, measured with the WCAG 2.2 formula. If a pairing you want fails, change the pairing — not the token.
34. Dark mode gets extra headroom: the WCAG 2 formula overstates contrast when both colors are dark, so treat 4.5:1 as the absolute floor there and aim for 7:1 on body copy.

## Standards basis

WCAG 2.2 is the normative gate (4.5:1 body, 3:1 large text and non-text UI boundaries). APCA is advisory only — use it to sanity-check, never as the pass/fail gate. The one APCA insight adopted as a house rule: dark mode needs more contrast than the WCAG 2 ratio suggests, because that formula overstates contrast when both colors are dark (rule 34).
