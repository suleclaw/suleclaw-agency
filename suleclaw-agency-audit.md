# SuleClaw Agency — Full Audit Report

**Date:** 2026-04-08
**Auditor:** Frontend Dev Subagent
**Live Site:** https://suleclaw-agency.vercel.app
**Repo:** github.com/suleclaw/suleclaw-agency
**Commit audited:** `HEAD` on `feat/agency-audit` branch

---

## Executive Summary

SuleClaw Agency is a well-crafted marketing site that successfully communicates a compelling value proposition — AI agent teams for solo founders. The Industrial Noir aesthetic is executed with strong conviction: dark backgrounds, amber accent (#F59E0B), expressive typography (Syne headings, Instrument Sans body), and rich atmospheric effects (grain overlays, radial glows, grid patterns). The four-theme switcher is a standout differentiator.

**Overall verdict: Production-ready with targeted improvements.**

---

## Design Quality Scores (1–10)

| Dimension       | Score | Notes |
|----------------|-------|-------|
| Visual Design   | **8.5** | Strong Industrial Noir identity. Atmospheric effects (glows, grain, grid) are well-executed. Type scale is good. |
| UX              | **7.5** | Good scroll experience, hover states, accordion. Minor friction in nav anchor links and CTA placement. |
| Performance     | **7.5** | Fast build (static). framer-motion can be heavy — see issues below. No Lighthouse data collected during this audit. |
| Content         | **8.0** | Clear, direct copy with personality. No lorem ipsum. Dami's story is compelling. Social proof section is thin. |
| Mobile/Responsive | **7.5** | Mobile menu works, horizontal scroll on projects section is functional. Some spacing/typography could tighten on small screens. |
| Accessibility    | **7.0** | Missing ARIA labels on several interactive elements. Keyboard navigation is mostly okay but not fully tested. |
| **Overall**      | **7.8** | |

---

## Current State Assessment

### ✅ What's Working

1. **Industrial Noir aesthetic is cohesive and distinctive.** Dark theme with amber (#F59E0B) accent is consistently applied across all tokens. The "atmosphere glow" and "noise overlay" effects add real depth — not AI-slop.

2. **Four-theme switcher is a genuine differentiator.** Paper & Ink (editorial serif), Terminal (phosphor green mono), and Neon Midnight (cyan + pink) are all thoughtful, well-executed themes with matching fonts and shadow profiles.

3. **Typography hierarchy is strong.** `font-headline` (Syne) for headings, `font-body` (Instrument Sans) for body, `font-mono` (JetBrains Mono) for labels — clear, purposeful contrast.

4. **Motion design is sophisticated.** Staggered word animations on hero headline, magnetic buttons, ambient rotating geometric shapes, spotlight hover on project cards, scroll-triggered FadeIn components. All respect `prefers-reduced-motion`.

5. **CSS token system is robust.** Full theme token coverage for `--bg-base`, `--accent`, `--border-default`, `--text-primary`, etc. Both shadcn/ui and custom SuleClaw tokens are defined. No flash of unstyled content.

6. **Contact form works end-to-end.** Server action with Nodemailer, HTML email template, proper validation (required fields, email regex), graceful dev-mode fallback (returns success without SMTP).

7. **Build is clean.** `pnpm run build` passes. `pnpm run typecheck` passes. `pnpm run lint` passes with zero warnings.

8. **`currently-building` projects section** — horizontal snap-scroll with real live projects (AI VR, BuildWare, WQC, SuleClaw Agency). Good social proof.

9. **`how-we-work` accordion** — 7-stage workflow explained clearly (THINK → PLAN-CEO → PLAN-ENG → BUILD → REVIEW → QA → SHIP). Human-in-the-loop at step 5 is a strong credibility signal.

### ⚠️ What's Not Working / Needs Improvement

1. **`noisy-overlay` is always rendered in DOM** even when themes don't need it. It applies a fixed-position SVG over the entire viewport — potential scroll/jank issue on mobile.
   - **File:** `app/globals.css` lines ~194–210

2. **Nav anchor links don't have smooth scroll offset.** When clicking `#how-we-work`, the sticky nav (h-16 = 64px) covers the section header.
   - **File:** `components/nav.tsx`

3. **`scroll-behavior: smooth` is set on `html`** but no CSS `scroll-margin-top` is applied to sections, so anchored sections get hidden under the sticky nav.
   - **File:** `app/globals.css` line ~159

4. **`section-divider` uses a `::before` pseudo-element** for the diamond marker, but it's positioned absolutely — on mobile viewports it can overflow or look misaligned.
   - **File:** `app/globals.css` lines ~244–257

5. **Horizontal scroll section (`currently-building`)** uses a fixed `w-[360px]` card width — on very small phones (<375px) this can cause horizontal overflow.
   - **File:** `components/currently-building.tsx` line ~140: `w-[360px]`

6. **`scanlines` class is applied to `<body>`** unconditionally — only relevant for Terminal theme but present always. Adds a full-viewport overlay.
   - **File:** `app/layout.tsx` line ~75: `className="min-h-full flex flex-col antialiased scanlines"`

7. **`font-syne`, `font-playfair`, `font-orbitron` are loaded even if unused** in the current theme. Only `font-instrument-sans` and `font-jetbrains-mono` are used in Industrial Noir (default).
   - **File:** `app/layout.tsx` — all 5 fonts are loaded regardless of active theme

8. **`framer-motion` bundle is large** — importing from `motion/react`, `framer-motion`, `framer-motion` (dual import) across components. No lazy loading of animation-heavy components.
   - **Files:** `hero.tsx`, `team.tsx`, `how-it-works.tsx`, `how-we-work.tsx`, `contact-form.tsx`, `what-we-build.tsx`, `about.tsx`, `currently-building.tsx`, `theme-switcher.tsx`, `nav.tsx`, `spotlight.tsx`, `card-stack.tsx`, `magnetic.tsx`, `fade-in.tsx`

9. **Card stack auto-rotation every 5 seconds** — `CardStack` cycles cards with no pause-on-hover, no pause-on-reduced-motion, and no user control. The interval continues even when tab is not visible.
   - **File:** `components/ui/card-stack.tsx` lines ~28–33

10. **`@base-ui/react` accordion component** has `**:data-[slot=accordion-trigger-icon]` CSS selectors in its implementation — these are overly broad and could conflict with custom styles.
    - **File:** `components/ui/accordion.tsx` line ~39

11. **No favicon set** — the site uses `app/favicon.ico` but it's not visible in the components/metadata.
    - **File:** `app/layout.tsx` — no custom favicon `<link>` in metadata

12. **No Open Graph / social sharing metadata** beyond basic title and description.
    - **File:** `app/layout.tsx` — no `openGraph` or `twitter` metadata fields

13. **No `robots.txt` or `sitemap.xml`** — important for SEO discovery.

14. **No 404 page** — `/nonexistent` falls through to the default Next.js not-found.

15. **`CONTACT_EMAIL` env var is required but not documented** — the contact form silently returns success in dev without SMTP configured, but in production without `CONTACT_EMAIL` it returns an error.
    - **File:** `actions/contact.ts` line ~28

16. **`CardStack` component only renders 280px tall** — on mobile it may be too small to read team member descriptions.
    - **File:** `components/ui/card-stack.tsx` line ~54: `className="relative h-[280px] w-full max-w-sm mx-auto"`

17. **No loading skeleton or Suspense boundary** for any async components.

18. **Missing `aria-label` on icon-only buttons** in nav hamburger, theme switcher (has one), scroll indicator.
    - **File:** `components/nav.tsx` — hamburger has `aria-label` ✅ but the scroll indicator does not

---

## Quick Wins (Low-Effort, High-Impact)

### 1. Add `scroll-margin-top` to all anchor sections — 5 min
Sticky nav (64px) hides section headers when using anchor links.

```css
/* app/globals.css — add to @layer base */
section[id] {
  scroll-margin-top: 5rem;
}
```

### 2. Conditionally render `scanlines` class only for Terminal theme — 5 min
Currently applied unconditionally to `<body>`.

```tsx
// app/layout.tsx
// Instead of className="... scanlines"
// Apply conditionally based on theme
```

### 3. Lazy-load the `CardStack` component with `next/dynamic` — 10 min
It's heavy and below the fold. Use `dynamic(() => import('@/components/ui/card-stack'), { ssr: false })`.

### 4. Add `openGraph` and `twitter` metadata — 10 min
Critical for social sharing. Add to `app/layout.tsx`:
```ts
openGraph: {
  title: "SuleClaw Agency — AI Agent Teams for Founders",
  description: "...",
  url: "https://suleclaw-agency.vercel.app",
  siteName: "SuleClaw Agency",
  type: "website",
},
twitter: {
  card: "summary_large_image",
  title: "...",
  description: "...",
}
```

### 5. Replace `framer-motion` dual-imports with single import — 15 min
Several files import from both `motion/react` and `framer-motion`. Consolidate to one source.
- `card-stack.tsx`: `import { motion } from "motion/react"` ← correct
- `hero.tsx`: `import { motion, useReducedMotion, type Variants } from "framer-motion"` ← duplicates

---

## Next Sprint Items (Prioritized Backlog)

### P0 — Production Polish

1. **Add `robots.txt` and `sitemap.xml`** via `next-sitemap` or manual `app/robots.ts` / `app/sitemap.ts`
   - Impact: SEO discovery, crawlability
   - Effort: ~1 hr

2. **Implement 404 page** — `app/not-found.tsx` with matching Industrial Noir aesthetic
   - Impact: User experience on broken links
   - Effort: ~30 min

3. **Optimize font loading** — use `next/font` with `display: swap` and load only fonts for active theme (or all with preload)
   - Impact: Reduce CLS, faster first paint
   - Effort: ~1 hr

4. **Add `aria-label` to all icon-only buttons** and audit keyboard navigation with `focus-visible` styles
   - Impact: Accessibility compliance (WCAG 2.1 AA)
   - Effort: ~2 hr

### P1 — Performance

5. **Code-split animation-heavy components** with `next/dynamic` — `CardStack`, `Spotlight`, `Magnetic`, `FadeIn`
   - Impact: Reduce initial bundle size
   - Effort: ~2 hr

6. **Replace dual `framer-motion` imports** with single `motion/react` import throughout
   - Impact: Smaller bundle
   - Effort: ~1 hr (find/replace)

7. **Add `loading.tsx` Suspense skeleton** for above-the-fold content
   - Impact: Perceived performance
   - Effort: ~1 hr

8. **Run Lighthouse CI** and collect baseline scores (Performance, Accessibility, SEO, Best Practices)
   - Impact: Measurable improvement tracking
   - Effort: ~2 hr setup

### P2 — Growth & Credibility

9. **Add testimonials/social proof section** — currently the only social proof is the team cards and live projects. A "What founders say" section would significantly boost conversion.
   - Impact: Conversion rate
   - Effort: ~3 hr (including content collection)

10. **Add case study or results section** — "How much faster with agent teams?" with concrete metrics (e.g., "Built X in Y days")
    - Impact: Conversion rate, credibility
    - Effort: ~2 hr

11. **Add pricing page** — currently no pricing information. Even a rough "starting from" guide would help qualified leads self-qualify.
    - Impact: Lead quality
    - Effort: ~4 hr

12. **Add blog/insights section** — SEO + thought leadership. Even 2–3 posts on "how we use AI agents" would help search visibility.
    - Impact: SEO, organic traffic
    - Effort: ~8 hr

### P3 — Technical Debt

13. **Migrate `@base-ui/react` accordion to native `<details>/<summary>`** or pure CSS accordion to remove a dependency
    - Impact: Reduce dependency count
    - Effort: ~2 hr

14. **Remove unused `shadcn` components** — check `components/ui/` for unused exports
    - Impact: Bundle size
    - Effort: ~1 hr audit

15. **Add environment variable documentation** — `CONTACT_EMAIL`, `SMTP_*` vars need to be documented in a `.env.example`
    - Impact: Developer experience, deploy safety
    - Effort: 10 min

---

## File-Level Issues with Line References

| File | Line | Issue |
|------|------|-------|
| `app/layout.tsx` | ~69 | `scanlines` class on `<body>` applied unconditionally |
| `app/layout.tsx` | ~45–67 | All 5 Google Fonts loaded regardless of active theme |
| `app/globals.css` | ~194–210 | `noise-overlay` fixed-position SVG over full viewport always rendered |
| `app/globals.css` | ~159 | `scroll-behavior: smooth` on `html` but no `scroll-margin-top` on sections |
| `app/globals.css` | ~244–257 | `section-divider` diamond marker uses absolute positioning, potential mobile overflow |
| `components/nav.tsx` | ~1 | No `scroll-margin-top` compensation for sticky nav |
| `components/ui/card-stack.tsx` | ~28–33 | `setInterval` with no visibility API pause, no hover pause |
| `components/ui/card-stack.tsx` | ~54 | Fixed `h-[280px]` height, too small on mobile |
| `components/hero.tsx` | ~3 | Imports from `framer-motion` (not `motion/react`) — dual import |
| `components/team.tsx` | ~3 | Imports from `framer-motion` (not `motion/react`) |
| `components/how-it-works.tsx` | ~2 | Imports from `framer-motion` (not `motion/react`) |
| `components/how-we-work.tsx` | ~2 | Imports from `framer-motion` (not `motion/react`) |
| `components/what-we-build.tsx` | ~2 | Imports from `framer-motion` (not `motion/react`) |
| `components/about.tsx` | ~2 | Imports from `framer-motion` (not `motion/react`) |
| `components/currently-building.tsx` | ~2 | Imports from `framer-motion` (not `motion/react`) |
| `components/theme-switcher.tsx` | — | No issues found — well implemented |
| `components/contact-nav.tsx` | — | No issues found |
| `actions/contact.ts` | ~28 | Missing `CONTACT_EMAIL` env var documentation |
| `app/layout.tsx` | metadata | No `openGraph`, `twitter`, or `icons` metadata |
| `app/layout.tsx` | — | No custom favicon `<link>` |
| `next.config.ts` | — | Empty config — no image optimization settings, no redirects |

---

## Validation Results

| Check | Result |
|-------|--------|
| `pnpm run build` | ✅ Pass |
| `pnpm run typecheck` | ✅ Pass |
| `pnpm run lint` | ✅ Pass (0 warnings) |
| Static pages generated | ✅ `/` and `/contact` |
| Theme switching | ✅ All 4 themes work |
| Contact form server action | ✅ Works end-to-end |
| Mobile viewport | ✅ Renders at 375px |

---

*End of audit. Branch `feat/agency-audit` is clean — no code changes made, review only.*
