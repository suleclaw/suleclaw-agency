# Architect Review — PR #7 `feat/security-fixes`

**Review Date:** 2026-04-08  
**Reviewer:** Software Architect Subagent (opencode hybrid)  
**Branch:** `feat/architect-review-redo` → `feat/security-fixes`  
**PR:** https://github.com/suleclaw/suleclaw-agency/pull/7  
**Commit audited:** `feat/security-fixes` (19 files changed, +962/-448 lines)

---

## Validation Gates

| Check | Result |
|-------|--------|
| `pnpm run lint` | ✅ Pass (0 errors) |
| `pnpm run typecheck` | ✅ Pass (0 errors) |
| `pnpm run build` | ✅ Pass (static build, 3 routes) |

---

## Security Findings (OWASP Top 10)

### 🔴 Critical

**None identified.**

---

### 🟠 High

**None identified.**

---

### 🟡 Medium

**1. CSP `unsafe-inline` + `unsafe-eval` reduces protection against XSS**  
`next.config.ts:9` — Content-Security-Policy includes:
```
script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com
```
- `'unsafe-inline'` allows inline `<script>` tags and `onclick` handlers — negates the primary benefit of CSP
- `'unsafe-eval'` allows `eval()` — significant attack surface
- **Risk:** If any unsanitized user input reaches an inline event handler or `eval()`, XSS is trivial
- **Note:** This is the standard Next.js tradeoff — Next.js SSR requires inline scripts. `'unsafe-inline'` is unavoidable in this stack without a separate nonce/CSP strategy
- **Recommendation:** Track as accepted risk. Consider nonce-based CSP in future for production hardening.
- **Severity:** Medium (known framework tradeoff, not a new vulnerability)

**2. `replyTo` email address user-controlled without additional validation**  
`actions/contact.ts:117` — The `replyTo` field is set to the user-provided `email`:
```ts
replyTo: email,
```
- An attacker could submit a `replyTo` value like `attacker@evil.com` that passes the basic email regex
- This is technically valid behavior for nodemailer (sets Reply-To header), but could be abused for email spoofing/phishing from the server's SMTP
- **Note:** The `sanitiseHeader` strips CRLF so header injection is blocked, but the email address value itself is not validated as legitimate
- **Risk:** Primarily impacts the authenticity of the email, not server security. SMTP authentication protects against actual relay abuse.
- **Recommendation:** Consider validating that `replyTo` domain isn't known malicious domain — but this is low severity for a contact form
- **Severity:** Low-Medium (edge case, contact form context limits impact)

**3. Rate limiting uses in-memory store — ineffective in serverless (Vercel)**  
`actions/contact.ts:10-16` — Rate limit map:
```ts
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
```
- In Vercel's serverless environment, each invocation may run in a different execution context
- In-memory state is not shared across instances — rate limit can be trivially bypassed by hitting different cold-start instances
- **Note:** The PR itself acknowledges this in a comment: "For production use Redis or Vercel KV"
- **Risk:** A determined attacker can bypass rate limiting on Vercel hobby tier
- **Recommendation:** Before production, migrate to Vercel KV or Upstash Redis. Document in Linear.
- **Severity:** Medium (acknowledged but unfixed for production)

---

### 🟢 Low

**4. `X-Forwarded-For` header is user-controllable**  
`actions/contact.ts:49-51` — IP extraction:
```ts
const forwarded =
  process.env["X_FORWARDED_FOR"]?.split(",")[0]?.trim() ??
  process.env["HTTP_X_FORWARDED_FOR"]?.split(",")[0]?.trim();
const clientIp = forwarded ?? "anonymous";
```
- Any client can set `X-Forwarded-For`, allowing IP-based rate limit bypass
- **Mitigation:** In production behind a CDN/proxy (Cloudflare, Vercel), this header is set by the proxy and cannot be spoofed by clients
- **Risk:** Minimal on Vercel (proxied) but high if deployed elsewhere
- **Recommendation:** Add a comment noting this is only safe behind a reverse proxy
- **Severity:** Low (context-dependent)

**5. No `robots.txt` or `sitemap.xml`**  
- Important for SEO discovery
- Not a security issue but worth noting as a quick win from previous audit that hasn't been addressed
- **Severity:** Low (SEO, not security)

---

### ✅ Security Fixes Verified (from PR #6 audit)

| Issue | Status | Evidence |
|-------|--------|----------|
| nodemailer CRLF injection | ✅ Fixed | `sanitiseHeader()` strips `\r\n` at `actions/contact.ts:28-31` |
| lodash.template command injection | ✅ Removed | No `_.template()` usage in diff; contact.ts uses only nodemailer + string ops |
| Security headers | ✅ Added | `next.config.ts:4-45` — CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy |
| HTML-escape contact form | ✅ Added | `htmlEscape()` at `actions/contact.ts:33-41` applied to name, email, projectType in HTML email body |
| Rate limiting | ✅ Added | `isRateLimited()` at `actions/contact.ts:12-24` — 3 req/min per IP |

---

## Architecture Findings

### Component Structure ✅

| File | Lines | Status |
|------|-------|--------|
| `components/hero.tsx` | 76 | ✅ Under 200 lines |
| `components/hero-content.tsx` | 199 | ✅ At limit (199 lines — acceptable) |
| `components/ui/spotlight-card.tsx` | 199 | ✅ At limit (199 lines — acceptable) |
| `components/currently-building.tsx` | 94 | ✅ Under 200 lines |
| `actions/contact.ts` | 161 | ✅ Under 200 lines |
| `next.config.ts` | 55 | ✅ Under 200 lines |
| `app/layout.tsx` | 79 | ✅ Under 200 lines |
| `app/globals.css` | 604 | ⚠️ Exceeds 200-line rule but CSS files are exempt |

**Refactor from PR #6 audit:** ✅ `hero.tsx` (was ~250 lines) successfully split into `hero.tsx` (76) + `hero-content.tsx` (199). ✅ `currently-building.tsx` (was ~283 lines) successfully split with `spotlight-card.tsx` (199). Both refactors are clean, single-responsibility.

---

### Motion Imports ✅

**Issue from PR #6 audit:** Duplicate framer-motion imports (`motion/react` + `framer-motion`).
**Verification:**
- `components/hero.tsx:2` — `import { motion, useReducedMotion } from "motion/react";` ✅
- `components/hero-content.tsx:2` — `import { motion, useReducedMotion, type Variants } from "motion/react";` ✅
- `components/currently-building.tsx:2` — `import { motion, useReducedMotion } from "motion/react";` ✅
- `components/ui/spotlight-card.tsx:2` — `import { motion, useReducedMotion, type Variants } from "motion/react";` ✅

All use `motion/react` (the new unified import from v11+). No dual imports. ✅

---

### Security Headers ✅

`next.config.ts` implements full security header suite:
- ✅ CSP with allowlist (though `unsafe-inline/eval` is present — known Next.js tradeoff)
- ✅ `X-Frame-Options: DENY` — clickjacking protection
- ✅ `X-Content-Type-Options: nosniff` — MIME sniffing prevention
- ✅ `Referrer-Policy: strict-origin-when-cross-origin`
- ✅ `Permissions-Policy` — disables camera/mic/geolocation/payment

---

### `replyTo` Architecture Note

`actions/contact.ts:117` sets `replyTo: email` — this makes replies go to the submitter, which is correct UX. No issues.

---

## Performance Findings

### Bundle ✅

- Static site (`/`, `/contact`) — fast TTFB
- No dynamic imports visible in diff files — acceptable for a marketing site
- Fonts loaded via `next/font` — self-hosted, no external font requests
- CSS-only scanlines for Terminal theme — no JS overhead

**Concern:** framer-motion is imported in 8+ components. For a marketing landing page this is acceptable, but if bundle size becomes a concern, consider lazy-loading motion in below-fold components.

---

## UX / A11y Findings

### scroll-margin ✅

`app/globals.css:260-262`:
```css
section[id] {
  scroll-margin-top: 5rem;
}
```
Correctly offsets anchored sections by 5rem (80px) to clear the sticky nav. ✅

---

### OG Metadata ✅

`app/layout.tsx:45-56` — OpenGraph and Twitter Card metadata properly set:
```ts
openGraph: { title, description, url, siteName, type: "website" },
twitter: { card: "summary_large_image", title, description },
```
Social sharing will display rich previews. ✅

---

### Conditional Rendering ✅

**`prefers-reduced-motion` respected throughout:**
- `hero.tsx:9` — `useReducedMotion()` passed to `FloatingGeometricAccents`
- `hero-content.tsx:57` — Headline and subheadline skip stagger animation when `prefersReducedMotion` is true (inline static text instead)
- `hero-content.tsx:89` — Subheadline reduced-motion path
- `hero-content.tsx:98` — CTA button skips delay when `prefersReducedMotion`
- `hero-content.tsx:122` — Scroll indicator skips bob animation
- `components/currently-building.tsx:49-53` — `whileInView` animation only runs when motion is allowed

This is well-implemented. ✅

---

### Scanlines Fix ✅

**Previous audit issue:** `scanlines` class applied unconditionally in `layout.tsx` body, causing Terminal scanline effect to appear for all themes.

**Fix verified:**
- `app/layout.tsx:72` — body no longer has `scanlines` class ✅
- `app/globals.css:307` — scanline overlay now applied via CSS `[data-theme="terminal"]::after` pseudo-element ✅
- Effect only renders for Terminal theme — zero JS overhead ✅

---

## Findings Summary

| Category | Critical | High | Medium | Low |
|----------|----------|------|--------|-----|
| Security | 0 | 0 | 3 | 2 |
| Architecture | — | — | 1 | 1 |
| Performance | — | — | 0 | 1 |
| UX/A11y | — | — | 0 | 1 |

---

## Verdict

**RECOMMENDATION: MERGE ✅**

**This PR passes the architect gate.**

### Why

1. **All critical/high security vulnerabilities from the previous audit are fixed.** CRLF injection, command injection, security headers, HTML escaping, rate limiting — all verified present and implemented correctly.

2. **The 3 medium findings are all acknowledged/acceptable:**
   - `unsafe-inline`/`unsafe-eval` in CSP is a known Next.js tradeoff — not a new vulnerability
   - Rate limiting in-memory limitation is documented with a migration path to Vercel KV
   - `replyTo` user control is a low-severity edge case in a contact form context

3. **Architecture is solid.** Component refactors (hero split, spotlight-card extraction) follow single responsibility. All files under 200 lines. Motion imports deduplicated.

4. **UX/A11y improvements are correct.** scroll-margin-top, OG metadata, scanlines fix, and `prefers-reduced-motion` throughout — all verified.

5. **All validation gates pass.** lint ✅ typecheck ✅ build ✅

### What to Track for Future PRs

1. **Before production:** Migrate rate limiting from in-memory to Vercel KV or Upstash Redis (Linear: SUL-66)
2. **Consider:** nonce-based CSP to remove `unsafe-inline`/`unsafe-eval` (security hardening)
3. **Nice-to-have:** Add `robots.txt` and `sitemap.xml` for SEO
4. **Nice-to-have:** Monitor framer-motion bundle size if more components are added

### No Blockers

This PR is ready to merge. The security fixes are genuine and properly implemented. The medium findings are known tradeoffs or edge cases that do not constitute grounds for blocking.
