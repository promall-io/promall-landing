# CLAUDE.md — promall-landing (Next.js 15 + React 19, Vercel)

Public marketing site — own git repo (`promall-landing.git`), **not** the dashboard (that's `promall-ui`). App Router, next-intl (fa+en, RTL), Tailwind v4, framer-motion + lenis. No DB — server work lives in two `app/api` route handlers that proxy to `promall-api`.

- DON'T comment — self-documenting via clear naming. Generated code ships to prod: type-safe, lint-clean.
- No fixed-port mandate: `npm run dev` (Next default `:3000`); this codebase is usually run on `-p 4531`.

## Commands & Quality

- `npm run dev` | `build` | `start` | `lint` | `lint:fix`. No test script.
- **`.npmrc` has `legacy-peer-deps=true` — REQUIRED** (React 19 peer ranges); `npm install` fails without it.
- **Build gates on lint + types**: `next.config.mjs` sets `eslint.ignoreDuringBuilds:false` and `typescript.ignoreBuildErrors:false` — a lint warning or TS error **fails `next build`** and the Vercel deploy.

## Deploy

Vercel, **auto-deploys on push to `main`**. No `vercel.json`. Security headers in `next.config.mjs`; images restricted to avif/webp with one remote host (`trustseal.enamad.ir`).

## Backend wiring (do not break)

Every conversion path ends at `promall-api`. Both route handlers read `PROMALL_API_URL` (default `https://api.promall.io`) via `lib/api-config.ts` — never `process.env` inline.

- `app/api/demo-request` → `POST {API}/demo-requests` (public, throttled 5/60s). Normalizes with `lib/demo-form.ts` (Persian/Arabic digits, `+98`/`0098` prefixes, `@handle` and full IG URLs) and returns 422 without calling upstream when either field is invalid. `source` is `landing` / `landing-en`.
- `app/api/track` → `POST {API}/web-analytics/events`, fired by `components/PageviewTracker.tsx` (production only, `sendBeacon` with a `fetch` fallback). Forwards client IP/UA/country headers only when `WEB_ANALYTICS_PROXY_SECRET` is set. Always answers 204 — analytics must never surface an error to a visitor.
- All primary CTAs (nav, hero, pricing plans, closing CTA, footer) point at `/demo` via `localeHref(locale, DEMO_PATH)` from `lib/routes.ts`. **Use that helper for any `/`-prefixed link** — `localePrefix: 'as-needed'` means a bare `/demo` sends `en` visitors to the fa page.

## i18n & Routing

- `i18n/config.ts` — `locales = ['en','fa']`, `defaultLocale = 'fa'`, fa = RTL. **Only `fa` is in `indexedLocales`.**
- `middleware.ts` — next-intl, `localePrefix: 'as-needed'`, `localeDetection: false`; matcher excludes `api`, `_next`, `_vercel`, files.
- **`app/[locale]/layout.tsx` passes `messages={{}}` to `NextIntlClientProvider`** — client components CANNOT call `useTranslations()`. Resolve strings in the server component and pass them down as props (see `Features` → `FeaturesTabs`, `InstagramDemo` → `InstagramThread`).
- Pages: `/`, `/blog`, `/blog/[slug]`, `/demo`, `/privacy`, `/terms`, `/case-study`. Only `/`, `/blog` and the articles are indexable; the sitemap lists exactly those, for `fa` only.
- **Blog content lives in `content/blog.{fa,en}.ts`** as typed `Article[]` (`types/blog.ts`), read through `lib/blog.ts` — not in `messages/*.json`. Adding an article to `content/blog.fa.ts` automatically adds it to the sitemap, the `/blog` index, the homepage Blog section and the JSON-LD `ItemList`. Both locales must expose the same slugs.
- SEO helpers live in `lib/site.ts` (`absoluteUrl`, `languageAlternates` — hreflang covers `indexedLocales` only) and `components/StructuredData.tsx` / `components/blog/BlogStructuredData.tsx`.

## Styling

- Tailwind **v4** (`@import "tailwindcss"`), no `tailwind.config.js`. Theme = CSS variables in `app/globals.css`: `--pw-*` (Powder-derived layout/palette: ink-blue surfaces, `--pw-gold`, cream/sky text), plus `--pw-success` / `--pw-danger`.
- `pw-*` utility classes MUST live in `@layer components` or Tailwind's cascade wins over them.
- Flat, token-driven surfaces — no gradient/glossy "AI-template" look. **Sanctioned exception:** the `--ig-*` tokens (Instagram gradient bubble + story ring) are real Instagram values and are scoped to the DM mockup only.
- Scroll reveals are CSS-driven (`.pw-reveal` + `IntersectionObserver` in `components/Reveal.tsx`), not framer-motion.

## Copy

- **Persian brand is always «پرومال»** — never Latin "ProMall" in fa copy (domains/emails stay Latin).
- **fa copy is intentionally colloquial** — spoken/street tone. Do NOT formalize it. Exception: `privacy` and `terms` stay formal.
