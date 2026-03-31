# Code Review — `feat/creative-redesign`

**Repo:** `/root/.openclaw/workspace/suleclaw-agency`
**Branch:** `feat/creative-redesign`
**Reviewer:** code-review-js
**Date:** 2026-03-31

---

## Quality Gate Results

| Check | Status |
|---|---|
| `pnpm run lint` | ✅ Pass |
| `pnpm run typecheck` | ✅ Pass |
| `pnpm run build` | ✅ Pass |

---

## Security

| Check | Result |
|---|---|
| Hardcoded credentials | ✅ None found — SMTP credentials read from `process.env` in `actions/contact.ts` |
| `console.log` in source code | ✅ None found |
| Server-side `console.error` in `actions/contact.ts` | ✅ Acceptable — server action error logging, appropriate pattern |
| XSS in contact form | ✅ Safe — `message.replace(/</g, "&lt;").replace(/>/g, "&gt;")` applied in email HTML |

---

## Visual Effects — Build Quality

| Component | File | Status | Notes |
|---|---|---|---|
| `Magnetic` | `components/ui/magnetic.tsx` | ✅ | Spring physics (stiffness:150, damping:15, mass:0.1), `prefers-reduced-motion` respected — returns static div |
| `Spotlight` | `components/ui/spotlight.tsx` | ✅ | Radial gradient follows cursor, `prefers-reduced-motion` respected |
| `FadeIn` / `FadeInStagger` | `components/ui/fade-in.tsx` | ✅ | `useReducedMotion` used throughout, instant visible fallback |
| `TextAnimate` | `components/ui/text-animate.tsx` | ✅ | `prefers-reduced-motion` returns static `<span>` |
| Hero | `components/hero.tsx` | ✅ | Custom stagger animation, `prefers-reducedMotion` respected — static inline text when enabled |
| Atmosphere glows | `components/hero.tsx` | ✅ | CSS `radial-gradient` amber glows, no JS required |
| Floating geometric accents | `components/hero.tsx` | ✅ | Framer Motion `animate`, `prefers-reduced-motion` respected |
| Scroll indicator | `components/hero.tsx` | ✅ | `prefers-reduced-motion` respected — no animation when disabled |
| Contact form | `components/contact-form.tsx` | ✅ | `useActionState` with `sendContactEmail` server action, success/error states |

---

## `prefers-reduced-motion` Support

All animation components use `useReducedMotion()` from `framer-motion`:

| Component | Strategy |
|---|---|
| `Magnetic` | Returns plain `<div>` instead of `motion.div` |
| `Spotlight` | Skips spotlight div render, still renders children |
| `FadeIn` / `FadeInStagger` | Instant opacity:1, no translate |
| `TextAnimate` | Returns static `<span>` with text |
| Hero word animation | Returns static inline text |
| Hero scroll indicator | No `animate` prop passed |
| CSS animations (globals.css) | `@media (prefers-reduced-motion: reduce)` disables `.animate-fade-in-up`, `.animate-fade-in-scale`, `.animate-slide-in-left`, `.animate-float`, `.gradient-text` |

---

## Fonts — ❌ ISSUE FOUND

**Missing `Syne` font load in `app/layout.tsx`.**

The `globals.css` defines:
```css
--font-heading: var(--font-syne);
.font-headline {
  font-family: var(--font-syne), system-ui, sans-serif;
}
.deco-number {
  font-family: var(--font-syne), system-ui, sans-serif;
}
```

But `app/layout.tsx` only loads:
- `Instrument_Sans` → `--font-instrument-sans`
- `JetBrains_Mono` → `--font-jetbrains-mono`

The `Syne` font is **never loaded**, so all `.font-headline` and `.deco-number` elements fall back to `system-ui, sans-serif` instead of the intended Syne display font.

**Fix:** Add to `app/layout.tsx`:
```ts
import { Syne } from "next/font/google";
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});
```
And include `${syne.variable}` in the `html` `className`.

---

## Contact Form

- Server action: `actions/contact.ts` — validates inputs, sanitizes message for HTML email, uses nodemailer
- Client form: `components/contact-form.tsx` — `useActionState`, success/error states, disabled state during submission
- Environment variables checked at runtime — graceful fallback (returns `{success: true}`) when SMTP is unconfigured
- XSS protection: `message.replace(/</g, "&lt;").replace(/>/g, "&gt;")` before inserting into HTML email body

---

## Contact Page

- `app/contact/page.tsx` — new route, imports `ContactForm`, clean layout

---

## Minor Notes

### Workspace lockfile warning (non-blocking)
```
We detected multiple lockfiles and selected the directory of /root/.openclaw/workspace/package-lock.json as the root directory.
```
Build still succeeds. Next.js 16 Turbopack warning about dual lockfiles. Can be silenced by setting `turbopack.root` in `next.config.ts`.

### New pages/routes
| Route | Status |
|---|---|
| `/` | ✅ Static, prerendered |
| `/contact` | ✅ Static, prerendered |

### Badge component unused
`components/ui/badge.tsx` is defined but not imported anywhere. Not a bug — just dead code. Can be removed or used.

---

## Issues Found

1. **[BUG — Missing Syne font]** `app/layout.tsx` does not load the `Syne` font, but `globals.css` references `var(--font-syne)` for `.font-headline` and `.deco-number`. Headlines will render with `system-ui` fallback instead of Syne.

---

## Auto-Fixes Applied

**None.** The Syne font issue requires a code change to `app/layout.tsx`.

---

## Quality Gate: ⚠️ FAIL (1 issue)

Build passes but **Syne font is missing** — `.font-headline` elements will render with incorrect font. This is a functional bug, not cosmetic. The font needs to be loaded in the layout before merging.
