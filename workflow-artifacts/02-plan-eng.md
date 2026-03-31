# Plan-ENG — SuleClaw Agency Website
# Project: suleclaw-agency
# Created: 2026-03-31 18:10
# Previous: 01-plan-ceo.md
# Status: IN_PROGRESS

## Architecture

```
suleclaw-agency/          ← GitHub repo: suleclaw/suleclaw-agency
├── app/
│   ├── layout.tsx        ← Root layout: Geist Sans + Syne fonts, dark bg
│   ├── page.tsx          ← Home: imports all section components
│   ├── globals.css       ← CSS variables (design tokens), Tailwind base
│   └── contact/
│       └── page.tsx      ← Contact form page
├── components/
│   ├── ui/               ← shadcn components (button, card, badge, accordion)
│   ├── nav.tsx           ← Sticky nav, transparent → blur on scroll
│   ├── hero.tsx          ← Hero section, text animation, magnetic CTA
│   ├── how-it-works.tsx  ← 3-step grid with icons + staggered entrance
│   ├── currently-building.tsx ← Project cards with spotlight hover
│   ├── team.tsx          ← Team member cards grid
│   ├── how-we-work.tsx   ← Accordion showing gstack workflow stages
│   ├── about.tsx         ← About section with decorative grid
│   ├── footer.tsx        ← Minimal footer
│   └── contact-form.tsx  ← Contact form with server action
├── lib/
│   └── utils.ts          ← cn() helper from shadcn
├── actions/
│   └── contact.ts        ← Server action: send email via nodemailer
├── tailwind.config.ts    ← Extended with design tokens (colors, fonts)
├── next.config.ts
└── package.json
```

## Tech Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | Next.js 15 (App Router) | Static generation, server actions |
| Language | TypeScript (strict) | |
| Styling | Tailwind CSS | Design tokens via CSS vars + tailwind config |
| UI Primitives | shadcn/ui | button, card, badge, accordion |
| Motion | Aceternity UI | Magnetic (CTA), Spotlight (project cards), FadeIn |
| Icons | Lucide React | Consistent, tree-shakeable |
| Fonts | Geist Sans + Syne (Google Fonts) | Via next/font/google |
| Email | Nodemailer | Gmail SMTP, credentials from env vars |
| Deployment | Vercel | Static export possible |

## Design Tokens (from design spec)

```css
/* in globals.css */
--bg-base: #0A0A0B;
--bg-surface: #111113;
--bg-surface-hover: #18181B;
--accent-primary: #F59E0B;
--accent-hover: #D97706;
--text-primary: #FAFAFA;
--text-secondary: #A1A1AA;
--border-default: #27272A;
```

## Contact Form Server Action

```typescript
// actions/contact.ts
'use server'

export async function sendContactEmail(formData: FormData) {
  const name = formData.get('name')
  const email = formData.get('email')
  const projectType = formData.get('projectType')
  const message = formData.get('message')

  // Validate inputs
  if (!name || !email || !message) {
    return { error: 'Missing required fields' }
  }

  // Send via nodemailer using workspace email config
  // SMTP credentials from environment variables on Vercel
}
```

**Env vars needed on Vercel:**
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `CONTACT_EMAIL` (damiuxcodes@gmail.com)

## Component Inventory

| Component | Type | Notes |
|-----------|------|-------|
| `Nav` | client | Sticky, scroll detection for blur |
| `Hero` | client | Aceternity TextAnimate on headline, Magnetic button |
| `HowItWorks` | client | Staggered FadeIn on 3 cards |
| `CurrentlyBuilding` | client | Project cards with Aceternity Spotlight |
| `Team` | server (static) | Static grid, no interaction |
| `HowWeWork` | client | shadcn Accordion, 7 stages |
| `About` | server (static) | Static text + decorative CSS grid |
| `Footer` | server (static) | Static |
| `ContactForm` | client | Form with server action |

## Test Plan

### Pre-deploy validation (mandatory before PR)
```bash
pnpm run lint      # ESLint — must be 0 errors
pnpm run typecheck # tsc --noEmit — must be 0 errors
pnpm run build     # Next.js build — must succeed
```

### Manual QA checklist
- [ ] Nav: transparent at top, blurs on scroll
- [ ] Hero: headline animates word-by-word
- [ ] Hero CTA: magnetic pull effect works
- [ ] How It Works: 3 cards animate in on scroll
- [ ] Currently Building: spotlight follows cursor on card hover
- [ ] Project links: open in new tab
- [ ] Team: all 6 cards render (Damilola, Sule, Frontend Dev, Backend Dev, QA Agent, Architect)
- [ ] How We Work: accordion opens/closes correctly
- [ ] About: text readable, location shown
- [ ] Footer: GitHub link works
- [ ] Contact form: submits, shows success state, email received
- [ ] Mobile: all sections stack correctly
- [ ] No console errors

### Browser testing
- Chrome (primary)
- Mobile Safari
- Firefox (if available)

## File Build Order

1. `package.json` + install dependencies
2. `tailwind.config.ts` + `globals.css` (design tokens)
3. `app/layout.tsx` (fonts, base layout)
4. `lib/utils.ts` (cn helper)
5. `components/ui/` (shadcn init + components)
6. `components/nav.tsx`
7. `components/hero.tsx`
8. `components/how-it-works.tsx`
9. `components/currently-building.tsx`
10. `components/team.tsx`
11. `components/how-we-work.tsx`
12. `components/about.tsx`
13. `components/footer.tsx`
14. `app/page.tsx` (compose all sections)
15. `actions/contact.ts`
16. `components/contact-form.tsx`
17. `app/contact/page.tsx`
18. `.env.example` (with placeholder names)
19. Vercel deploy + env vars

## Key Implementation Notes

- **No credentials in code** — SMTP config from Vercel env vars only
- **Aceternity UI** → install via `npm install @aceternity/ui` + `motion` (Framer Motion)
- **shadcn/ui** → init first, then add components: `npx shadcn@latest add button card badge accordion`
- **prefers-reduced-motion** → disable animations for users who prefer it
- **Font loading** → use `next/font/google` to avoid CLS
- **Static generation** → all pages are static (no `dynamic = 'force-dynamic'` unless needed)

## Open Questions

None — all resolved in Plan-CEO.

---

## Output for Next Stage (BUILD)

Ready to build. Feature branch: `feat/initial-site-build`. Dev agent: `frontend-dev` for full build. Orchestrator (me) to verify git state, run code review, and create PR.
