# Think — SuleClaw Agency Website
# Project: suleclaw-agency
# Created: 2026-03-31 17:45
# Status: IN_PROGRESS

## What Problem Does This Solve?

SuleClaw Agency has no online presence. The agency builds AI agent teams for solo founders and small companies — but there's no site to demonstrate credibility, show the process, or capture leads. The site is the proof-of-work.

## Who's the User?

**Primary:** Solo founders and small company leads (1-10 people) who:
- Are overwhelmed by the scope of their work
- Are skeptical of agencies that overpromise
- Value transparency and seeing *how* work gets done
- Want to understand the process before committing

**Secondary:** Other engineers/founders evaluating the agency as a potential partner.

## What's the Simplest Version?

A single-page site (home) + contact form. All sections on one scroll. One secondary page for contact. No blog, no case studies, no CMS. The design is already fully specced — the build is the deliverable.

## What's the Hardest Part?

Not scope creep. The design doc is comprehensive and tempts us to add more. V1 must ship:
- Dark theme, premium feel
- All 8 sections on home
- Contact form that actually sends email
- Responsive (mobile, tablet, desktop)

Everything else is nice-to-have for V2.

## What Could Go Wrong?

1. **Scope creep** — temptation to add features not in the spec (animations, more pages, blog)
2. **Contact form backend** — email delivery fails silently, wastes the lead
3. **Aceternity UI complexity** — magnetic/spotlight effects could be fragile or cause hydration errors
4. **Credential leak** — SMTP credentials must never end up in git again
5. **Performance** — heavy animations tank load time
6. **Font loading** — Geist/Syne from Google Fonts could cause CLS

## What's the Measure of Success?

- Site deployed at suleclaw.vercel.app
- Contact form sends email to Dami (tested manually)
- All 8 sections render correctly on mobile, tablet, desktop
- Build passes: `pnpm run lint`, `pnpm run typecheck`, `pnpm run build` — all zero errors
- Page speed < 2s on Vercel (static generation)
- No credentials or secrets in git history

## Reframed Problem Statement

**Build a V1 agency website from the existing design spec — no additions, no compromises. Ship it fast, ship it clean.**

---

## Output for Next Stage (Plan-CEO)

The design is done. Scope is defined in `docs/suleclaw-agency/specs/2026-03-31-suleclaw-agency-design.md` and `docs/suleclaw-agency/design/2026-03-31-design-proposal.md`. The Plan-CEO stage should confirm scope and define what "done" looks like.
