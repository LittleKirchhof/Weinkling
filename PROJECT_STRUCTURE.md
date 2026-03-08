# PROJECT_STRUCTURE.md — Weinkling

> **Last updated:** March 2026  
> A living reference document describing the current architecture, structure, and conventions of the Weinkling website.

---

## 1. Project Overview

**Weinkling** is a premium marketing website for a home automation brand. It is a cinematic, scroll-driven single-brand site designed to communicate luxury, intelligence, and precision engineering.

### Framework & Tooling

| Tool | Version | Role |
|---|---|---|
| **Next.js** | 16.1.6 | Full-stack React framework (App Router) |
| **React** | 19.2.3 | UI rendering layer |
| **TypeScript** | ^5 | Type safety across all source files |
| **Tailwind CSS** | ^4 | Utility-first CSS (alongside global CSS tokens) |
| **GSAP** | ^3.14.2 | Animation engine (timelines, ScrollTrigger) |
| **@gsap/react** | ^2.1.2 | React-safe GSAP context integration |
| **PostCSS** | via `@tailwindcss/postcss` | CSS processing pipeline |

### Rendering & Routing

- Uses **Next.js App Router** (`src/app/` directory).
- Pages are **Server Components by default**; components requiring browser APIs or interactivity are explicitly marked `"use client"`.
- Routing is **file-system based** — each subfolder under `src/app/` with a `page.tsx` becomes a route.
- **No API routes** are currently implemented; the site is purely a static marketing frontend.
- The global layout (`src/app/layout.tsx`) wraps every page with HTML boilerplate, global metadata, and `globals.css`. **No shared navigation or footer is injected at the layout level** — each page imports `Navbar` and `Footer` independently.

---

## 2. Folder Structure

```
weinkling/
├── public/                         # Static files served at root
│   ├── hero_day.png                # Hero background — daytime (8.8 MB)
│   ├── hero_night.png              # Hero background — nighttime (8.3 MB)
│   └── *.svg                       # Next.js default SVG icons
│
├── src/
│   ├── app/                        # Next.js App Router (pages & layout)
│   │   ├── layout.tsx              # Root HTML shell + global metadata
│   │   ├── page.tsx                # Home page (/)
│   │   ├── globals.css             # Global CSS: tokens, resets, utilities
│   │   ├── favicon.ico
│   │   ├── about/
│   │   │   └── page.tsx            # About page (/about)
│   │   ├── contact/
│   │   │   └── page.tsx            # Contact page (/contact)
│   │   └── solutions/
│   │       └── page.tsx            # Solutions page (/solutions)
│   │
│   ├── components/                 # All reusable UI components
│   │   ├── hero/                   # Hero section (isolated module)
│   │   │   ├── HeroContainer.tsx   # Orchestrator: manages refs, calls timeline hook
│   │   │   ├── HeroVisual.tsx      # Renders day/night image layers
│   │   │   ├── HeroText.tsx        # Renders headline, subline, CTA, scroll hint
│   │   │   ├── hero.config.ts      # Static content config (text, image URLs)
│   │   │   └── hero.types.ts       # TypeScript interfaces for Hero
│   │   │
│   │   ├── layout/                 # Global layout chrome
│   │   │   ├── Navbar.tsx          # Fixed top navigation (transparent → frosted glass)
│   │   │   └── Footer.tsx          # Brand footer with nav columns
│   │   │
│   │   └── sections/              # Full-page scroll sections on the home page
│   │       ├── SceneOne.tsx        # "Ambient Intelligence" — image crossfade + feature list
│   │       ├── SceneTwo.tsx        # "Intuitive Control" — 4-panel product card grid
│   │       └── CTASection.tsx      # Full-width call-to-action with contact buttons
│   │
│   ├── animations/                 # Pure GSAP timeline builder functions (no JSX)
│   │   ├── heroTimeline.ts         # Entry + scroll-scrubbed day→night crossfade
│   │   ├── sceneTimelines.ts       # SceneOne reveal + SceneTwo panel sequence
│   │   └── scrollDefaults.ts      # Shared ScrollTrigger config, easing constants, duration tokens
│   │
│   ├── hooks/                      # React custom hooks
│   │   └── useScrollTimeline.ts    # Registers GSAP plugins, calls builder on mount, cleans up
│   │
│   ├── utils/                      # Pure utility functions
│   │   └── motionUtils.ts          # prefersReducedMotion, isMobileViewport, mapRange, stagger helpers
│   │
│   └── assets/                    # Source assets (currently empty — images served from public/ or Unsplash)
│       └── images/
│           └── hero/               # (reserved, currently empty)
│
├── next.config.ts                  # Next.js config: remote image domains, security headers
├── tsconfig.json                   # TypeScript config (path alias @/* → src/*)
├── postcss.config.mjs              # PostCSS config for Tailwind v4
├── eslint.config.mjs               # ESLint flat config
└── package.json                    # Dependencies & scripts
```

### Folder Purpose Summary

| Folder | Purpose |
|---|---|
| `src/app/` | Pages, root layout, and global styles |
| `src/components/hero/` | Isolated hero section — components, config, and types |
| `src/components/layout/` | Site-wide chrome: `Navbar` and `Footer` |
| `src/components/sections/` | Home page scroll sections (`SceneOne`, `SceneTwo`, `CTASection`) |
| `src/animations/` | GSAP timeline builders — pure TypeScript, zero React dependency |
| `src/hooks/` | Custom React hooks (animation lifecycle management) |
| `src/utils/` | Shared utility functions (motion detection, math helpers) |
| `src/assets/` | Reserved for local static assets (presently empty) |
| `public/` | Static files: hero images and icons |

---

## 3. Page Structure

| Route | File | Notes |
|---|---|---|
| `/` | `src/app/page.tsx` | Home page — assembles `Navbar`, `HeroContainer`, `SceneOne`, `SceneTwo`, `CTASection`, `Footer` |
| `/about` | `src/app/about/page.tsx` | Server Component — hero banner, intro copy, brand values grid |
| `/solutions` | `src/app/solutions/page.tsx` | Server Component — hero banner, 4 alternating solution cards |
| `/contact` | `src/app/contact/page.tsx` | Client Component — split-layout contact info + enquiry form |

> **Note:** The navbar links also reference `/#projects` (a hash anchor on the home page that is not yet implemented as a dedicated section).

---

## 4. Layout System

There is **no shared layout component** that injects `Navbar` and `Footer` automatically. Instead:

- `src/app/layout.tsx` is the **root HTML shell** — it sets `<html lang="en">`, imports `globals.css`, and exports site-wide `<Metadata>`. It contains no navigation or footer.
- Every **page file** (`page.tsx`) independently imports and renders `<Navbar />` and `<Footer />` from `src/components/layout/`.

### Navbar Behaviour  
- Fixed, full-width, `z-50`.
- **Transparent** over the hero (`rgba(10,10,15,0)`) — transitions to a **frosted-glass** `rgba(10,10,15,0.85)` with `backdrop-filter: blur(20px)` once scrolled past 80px.
- Desktop: horizontal link list + "Get Started" CTA button.
- Mobile: hamburger icon (`≡`) opens a full-screen overlay menu.
- GSAP entry animation on mount (fade + slide down).

### Footer Behaviour
- Static, non-sticky.
- 5-column grid (brand statement + 3 navigation columns) on large screens; single column on mobile.
- Contains: brand tagline, social links, `Systems` / `Company` / `Connect` nav columns, and a copyright row.

---

## 5. Component Structure

### Hero Components (`src/components/hero/`)

| File | Responsibility |
|---|---|
| `HeroContainer.tsx` | Allocates all DOM refs; wires up `useScrollTimeline(buildHeroTimeline, refs)`; composes `HeroVisual` + `HeroText` |
| `HeroVisual.tsx` | Renders two absolutely-positioned layers: **day image** (visible first) and **night image** (starts at `opacity: 0`), plus an atmospheric gradient overlay and a vignette |
| `HeroText.tsx` | Renders the badge pill, headline lines (each as a separate `<span>` for per-line GSAP targeting), subline paragraph, CTA link, and animated scroll hint arrow |
| `hero.config.ts` | Single source of truth for all hero content (image URLs, headline array, subline text, CTA label/href) |
| `hero.types.ts` | TypeScript interfaces: `HeroImage`, `HeroConfig`, `HeroRefs` |

### Layout Components (`src/components/layout/`)

| File | Responsibility |
|---|---|
| `Navbar.tsx` | Fixed navigation — scroll-state detection, mobile menu toggle, GSAP entry animation |
| `Footer.tsx` | Brand footer — static navigation columns, copyright, social links |

### Section Components (`src/components/sections/`)

| File | Section Theme | Key Features |
|---|---|---|
| `SceneOne.tsx` | **Ambient Intelligence** | Dual-image stack with scroll-driven crossfade (desktop); animated feature list; animated number counter |
| `SceneTwo.tsx` | **Intuitive Control** | 4-card product panel grid; pinned sequential reveal on desktop; staggered reveal on mobile |
| `CTASection.tsx` | **Begin Your Project** | Gradient headline with clip-path text fill; two CTA buttons; trust indicators; ambient orb background |

---

## 6. Asset Management

### Static Assets (`public/`)

| File | Size | Usage |
|---|---|---|
| `hero_day.png` | 8.8 MB | Hero background — daytime scene (available locally, currently **not used** — Unsplash URLs are active) |
| `hero_night.png` | 8.3 MB | Hero background — nighttime scene (same as above) |
| `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` | Small | Next.js default scaffolding icons |

### Remote Images (Unsplash CDN)

All photography currently used in the site is served from `images.unsplash.com` via CDN URLs with `?w=` and `?q=` query parameters. This is explicitly allowed in `next.config.ts` via `remotePatterns`.

- **Hero section**: 2 Unsplash photos (living room — daytime & nighttime).
- **SceneOne**: 2 Unsplash photos (smart living room day/night).
- **SceneTwo panels**: 4 Unsplash photos (lighting, climate, security, media).
- **Solutions page**: 4 Unsplash photos (one per solution).

### Source Assets (`src/assets/images/hero/`)

Currently **empty**. This folder is reserved for local image files if the project migrates away from Unsplash CDN delivery.

---

## 7. Animation System

### Libraries Installed

| Library | Version | Role |
|---|---|---|
| `gsap` | ^3.14.2 | Core animation engine — timelines, tweens, easing |
| `gsap/ScrollTrigger` | (bundled with GSAP) | Scroll-linked pinning, scrubbing, and viewport entry triggers |
| `@gsap/react` | ^2.1.2 | Provides `gsap.context()` scoping for React safe cleanup |

### Architecture — Key Principle

> **GSAP is the single source of truth for all motion. Components contain zero animation logic.**

Animations are fully decoupled from React components using a three-layer pattern:

```
Component (declares refs + calls hook)
    └─► useScrollTimeline hook (registers GSAP, calls builder, handles cleanup)
            └─► Timeline builder function (pure TS — builds GSAP timelines against refs)
```

### Animation Files

#### `src/animations/scrollDefaults.ts`
Central configuration for every `ScrollTrigger` instance. Editing values here propagates automatically.

- `pinnedSectionDefaults` — base config for pinned, scrubbed sections.
- `fadeRevealDefaults` — base config for viewport-entry text reveals.
- `EASE_CINEMATIC = "power2.inOut"` — opacity crossfades.
- `EASE_TEXT = "power3.out"` — text entry animations.
- `DUR` — named duration scale: `xs (0.3s)` → `xl (2.4s)`.
- `SCRUB_SMOOTH = 1.2` — global scroll lag/friction.

#### `src/animations/heroTimeline.ts` (`buildHeroTimeline`)
Two-phase animation for the hero section:

1. **Entry animation** — on page load: badge fades in, headline lines stagger up (with skew), subline fades in, CTA fades in, scroll hint bounces in a loop.
2. **Scroll-driven crossfade** — pinned `+=180%` scroll: day image zooms + overlay darkens → night image fades in → day image fades out → text fades out mid-scroll.
3. **Reduced-motion fallback** — skips all animations, instantly reveals text.
4. **Mobile path** — simplified (no pinned crossfade).

#### `src/animations/sceneTimelines.ts` (`buildSceneOneTimeline`, `buildSceneTwoTimeline`)
- **SceneOne**: viewport-entry reveal (label → headline → body → feature list items). Desktop-only pinned image crossfade (ImageA → ImageB). Animated number counter from 0 → 240.
- **SceneTwo**: section header reveal. Desktop: pinned panel sequence (panels cycle in/out with `x` + opacity). Mobile: staggered `y` + `opacity` reveal.

#### `src/hooks/useScrollTimeline.ts`
Generic hook consumed by `HeroContainer`, `SceneOne`, and `SceneTwo`:
1. Registers `ScrollTrigger` plugin.
2. Defers builder invocation with `requestAnimationFrame` (allows DOM to settle).
3. Calls `ScrollTrigger.refresh()` after build.
4. Returns a cleanup function that reverts the GSAP context on unmount.

#### `src/utils/motionUtils.ts`
Pure, side-effect-free helpers:
- `prefersReducedMotion()` — reads `prefers-reduced-motion` media query.
- `isMobileViewport()` — `window.innerWidth < 768`.
- `isTabletViewport()` — `768px – 1023px`.
- `clamp(value, min, max)`
- `mapRange(value, inMin, inMax, outMin, outMax)`
- `fromBelow(y)`, `fromAbove(y)`, `fromFade()` — GSAP `TweenVars` presets.
- `staggerReveal(parent, childSelector, stagger)` — staggered children animation helper.
- `safeQueryAll(root, selector)` — null-safe `querySelectorAll`.

---

## 8. Hero Section Implementation

### Location
`src/components/hero/` — a fully isolated module.

### Structure

```
HeroContainer (section#hero, height: 100vh)
├── HeroVisual (aria-hidden, absolute inset)
│   ├── div[ref=dayLayer]   → <img> daytime scene (eager, fetchPriority="high")
│   ├── div[ref=nightLayer] → <img> nighttime scene (lazy, opacity: 0)
│   ├── div[ref=overlay]    → gradient darkening overlay
│   └── div                 → radial vignette edge
└── HeroText (relative z-10, centred column)
    ├── span[ref=badge]          → "Home Automation Systems" pill
    ├── h1
    │   └── span[ref=headlineLines[i]]  × 3 lines → "Your Home," / "Intelligently" / "Alive."
    ├── p[ref=subline]           → Descriptive subtext
    ├── Link[ref=cta]            → "Explore Systems" → /solutions
    └── div[ref=scrollHint]      → "Scroll to begin" + bouncing arrow SVG
```

### Content Configuration
All text and image URLs are managed in `hero.config.ts`:
- `dayImage.src` — Unsplash URL of a sunny modern living room.
- `nightImage.src` — Unsplash URL of a warm, dimly lit living room.
- `headline` — Array of strings: `["Your Home,", "Intelligently", "Alive."]`.
- `subline` — One-sentence brand statement.
- `ctaLabel / ctaHref` — `"Explore Systems"` → `/solutions`.

### Animation Trigger
`HeroContainer` calls `useScrollTimeline(buildHeroTimeline, refs)`. The hero section is **pinned for 180% of viewport height** of scroll travel, during which the day → night image crossfade is scrubbed.

---

## 9. Dependencies

### Production Dependencies

| Package | Version | Purpose |
|---|---|---|
| `next` | 16.1.6 | App Router framework, SSR/SSG, image optimization |
| `react` | 19.2.3 | UI rendering |
| `react-dom` | 19.2.3 | DOM renderer |
| `gsap` | ^3.14.2 | Animation engine + ScrollTrigger plugin |
| `@gsap/react` | ^2.1.2 | GSAP context management for React |

### Development Dependencies

| Package | Version | Purpose |
|---|---|---|
| `tailwindcss` | ^4 | Utility CSS classes |
| `@tailwindcss/postcss` | ^4 | PostCSS integration for Tailwind v4 |
| `typescript` | ^5 | Type checking |
| `@types/react` | ^19 | React type definitions |
| `@types/react-dom` | ^19 | ReactDOM type definitions |
| `@types/node` | ^20 | Node.js type definitions |
| `eslint` | ^9 | Linting |
| `eslint-config-next` | 16.1.6 | Next.js-specific ESLint rules |

---

## 10. Development Notes

### Scripts

```bash
npm run dev     # Start local dev server (Next.js)
npm run build   # Production build
npm run start   # Serve production build
npm run lint    # Run ESLint
```

### Path Alias
`@/*` resolves to `src/*` (configured in `tsconfig.json`). Use `@/components/...`, `@/animations/...` etc. throughout.

### Design Tokens (`src/app/globals.css`)
All colours, fonts, spacing, and easing values are defined as **CSS custom properties on `:root`**. Do not hardcode raw values — always reference tokens:

| Token Category | Key Examples |
|---|---|
| **Colours** | `--clr-void` (#0a0a0f), `--clr-deep` (#111118), `--clr-surface` (#1a1a24), `--clr-mist` (#f5f4f0), `--clr-accent` (#8cb4b8), `--clr-gold` (#c8a96e) |
| **Text colours** | `--clr-text-primary`, `--clr-text-secondary`, `--clr-text-muted` |
| **Typography** | `--font-serif` (Cormorant Garamond), `--font-sans` (DM Sans) |
| **Spacing** | `--space-xs` to `--space-2xl` (0.5rem → 12rem) |
| **Easing** | `--ease-silk`, `--ease-spring`, `--ease-expose` |

### Notable CSS Utilities

- `.section-container` — max-width 1400px, centered, responsive padding.
- `.gsap-reveal` — sets `opacity: 0; will-change: opacity, transform` for elements controlled by GSAP.
- `.noise-overlay` — SVG-based grain texture using a fractional noise filter (mix-blend-mode: overlay).
- `.pin-spacer` — disables pointer events on GSAP pin spacers (prevents scroll blocking).
- Custom scrollbar — 2px wide, accent colour thumb.

### Scroll Behaviour
`html { scroll-behavior: auto }` — native smooth scrolling is intentionally **disabled** because GSAP ScrollTrigger manages all scroll-linked behaviour.

### Images
- `public/hero_day.png` and `public/hero_night.png` exist locally (~8MB each) but **are not currently used**. The active `hero.config.ts` points to Unsplash CDN URLs.
- If the project moves to self-hosted images, update `hero.config.ts` to point to `/hero_day.png` and `/hero_night.png`, and remove the Unsplash `remotePatterns` entry from `next.config.ts`.

### `"use client"` Boundary
All components that use React hooks (`useRef`, `useEffect`, `useState`) or GSAP (which requires browser APIs) must be marked `"use client"`. Currently affected files:
- `HeroContainer.tsx`, `HeroVisual.tsx`, `HeroText.tsx`
- `Navbar.tsx`, `Footer.tsx`
- `SceneOne.tsx`, `SceneTwo.tsx`, `CTASection.tsx`
- `contact/page.tsx` (form with event handlers)
- `hooks/useScrollTimeline.ts`

### Planned but Not Yet Implemented
- `/#projects` scroll anchor on the homepage (referenced in Navbar links but the section does not exist yet).
- Local asset pipeline — `src/assets/images/hero/` directory is empty.
- No API routes, CMS integration, or form submission backend.
