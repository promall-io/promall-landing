# CLAUDE.md — promall-landing (Next.js 14 + React 19, Vercel)

Public marketing/landing site — own git repo (`promall-landing.git`), **not** the dashboard (that's `promall-ui`). App Router, next-intl (fa+en, RTL), Tailwind v4, animation-heavy (framer-motion + gsap + lenis). No backend/DB — server work lives in two `app/api` route handlers.

- DON'T comment — self-documenting via clear naming. Generated code ships to prod: type-safe, lint-clean.
- No fixed-port mandate (landing doesn't cross-wire like api/ui): `npm run dev` (Next default `:3000`). Rarely run locally in the umbrella workflow.

## Commands & Quality

- `npm run dev` | `build` | `start` | `lint` | `lint:fix` (`next lint`). No test script.
- **`.npmrc` has `legacy-peer-deps=true` — REQUIRED**; `npm install` fails without it (React 19 peer ranges).
- **Build gates on lint + types**: `next.config.mjs` sets `eslint.ignoreDuringBuilds:false` and `typescript.ignoreBuildErrors:false` — a lint warning or TS error **fails `next build`** (and the Vercel deploy). Run `lint` before pushing.

## Deploy

Vercel, **auto-deploys on push to `main`**. No `vercel.json`; config is `next.config.mjs`. Security headers set there (HSTS preload, `X-Frame-Options: DENY`, nosniff, referrer-policy); images restricted to avif/webp with one remote host (`trustseal.enamad.ir` — Iranian eNamad trust seal). `poweredByHeader:false`.

## i18n & Routing

- `i18n/config.ts` — `locales = ['en','fa']`, `defaultLocale = 'fa'`, `localeDirection` (fa = RTL). **Only `fa` is in `indexedLocales`** (SEO: en is not indexed).
- `middleware.ts` — next-intl, `localePrefix: 'as-needed'` (no `/fa` prefix on default), `localeDetection: false`. Matcher excludes `api`, `_next`, `_vercel`, files.
- Messages in `messages/{en,fa}.json`; request config `i18n/request.ts`.
- Pages under `app/[locale]/` (`case-study`, `demo`, `privacy`, `terms`). Server routes: `app/api/demo-request` (demo form intake → main API via `lib/api-config.ts` + `lib/demo-form.ts`), `app/api/track` (analytics).
- `lib/`: `api-config.ts`, `demo-form.ts`, `site.ts` (site metadata/constants), `smooth-scroll.ts` (lenis wiring).

## Styling & Copy

- Tailwind **v4** (`@import "tailwindcss"` in `app/globals.css`; PostCSS via `@tailwindcss/postcss`) — no `tailwind.config.js`. Theme = CSS variables in `:root`, a cinematic **dark** palette matching the dashboard's app theme: ink-blue surfaces (`--background:#080d17`, `--card:#18233a`), `--gold:#d9d0b8`, cream/sky text tokens. Style via these tokens — flat, no gradient/glossy "AI-template" look.
- **Persian brand is always «پرومال»** — never Latin "ProMall" in fa copy (domains/emails stay Latin).
- **fa copy is intentionally colloquial** — spoken/street tone. Do NOT formalize it. Exception: legal pages (`privacy`, `terms`) stay formal.
