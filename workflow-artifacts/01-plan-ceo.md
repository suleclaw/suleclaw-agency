# Plan-CEO — SuleClaw Agency Website
# Project: suleclaw-agency
# Created: 2026-03-31 18:08
# Previous: 00-office-hours.md
# Status: COMPLETE

## Decisions Made

**V1 Scope — HOLD (no additions)**
- Home page: 8 sections (Nav, Hero, How It Works, Currently Building, Team, How We Work, About, Footer)
- Contact page: /contact with form
- Stack: Next.js 15 + Tailwind + shadcn/ui + Aceternity UI + Lucide + Nodemailer
- Repo: github.com/suleclaw/suleclaw-agency (new, public)
- Deploy: Vercel (suleclaw.vercel.app)

**Currently Building** → real links to algos-mastery.vercel.app and Local Notion (or GitHub if not deployed)

**Contact form** → Nodemailer via Gmail SMTP (existing config at workspace level). No Resend until domain is set up.

**GitHub org** → suleclaw

## What's Explicitly NOT in V1
- No blog
- No testimonials
- No case study pages
- No analytics beyond Vercel defaults
- No dark/light toggle
- No multi-language

## Success Metrics
- Site live at suleclaw.vercel.app
- Contact form sends email to damiuxcodes@gmail.com (tested)
- All sections render on mobile + desktop
- Build passes: lint 0 errors, typecheck 0 errors, build succeeds
- Zero credentials in git history

## Scope Decision Mode
**HOLD SCOPE** — ship exactly what's specced. No additions in V1.

---

## Output for Next Stage (Plan-ENG)

Stack confirmed, sections confirmed, contact backend confirmed. Proceed to Plan-ENG to define architecture, file structure, component inventory, and test plan.
