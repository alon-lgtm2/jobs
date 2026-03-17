# jobs.israelis.nl — Site Documentation

## Overview

A Hebrew-language (RTL) platform for Israeli job seekers relocating to the Netherlands. Offers free AI resume tools, a blog with practical articles, and paid coaching services. Created by Alon, 8+ years helping Israelis integrate professionally in the Dutch job market.

**Live URL:** https://jobs.israelis.nl
**Staging URL:** https://jobs-staging-x4ws.onrender.com/
**Git repo:** https://github.com/alon-lgtm2/jobs.git (branch: `staging`)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.1.6 + React 19.2.3 + TypeScript 5 |
| Styling | Tailwind CSS 4 (globals.css) + inline CSS in HTML files |
| Fonts | Heebo (body + headings) — Google Fonts, weights 300–800 |
| Deployment | Render (Node 20, `render.yaml`) |
| Contact Form | Formspree (ID: `xzdjglaz`) |
| Lead Capture | Google Identity Services (GSI) + Web3Forms |
| Messaging | WhatsApp deep links (+31644295691) |

---

## Architecture

The site is **static-first**. Pre-built HTML files are served through Next.js API route handlers with `force-static` caching. There is no database, no auth, and no server-side logic beyond serving HTML.

### How routing works

Every page follows the same pattern — a `route.ts` file reads an HTML file from the project root and returns it:

```typescript
// Example: src/app/blog/ageism-in-tech/route.ts
import fs from "fs";
import path from "path";

export const dynamic = "force-static";

export function GET() {
  const filePath = path.join(process.cwd(), "blog/ageism-in-tech.html");
  const html = fs.readFileSync(filePath, "utf-8");
  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
```

### Two styling layers

1. **`globals.css`** — Tailwind v4 theme variables, animations, and utilities. Used by `layout.tsx` as the Next.js wrapper.
2. **Inline `<style>` in each HTML file** — Each HTML page has its own `:root` variables and complete CSS. The HTML files are self-contained and do not depend on Tailwind classes.

Both layers currently use the same blue/navy professional palette (see [Design System](#design-system) below).

---

## File Structure

```
jobs-repo/
├── index.html                  # Homepage (~1,081 lines, self-contained HTML/CSS/JS)
├── blog.html                   # Blog index page
├── blog/                       # Blog post HTML files (16 articles)
│   ├── ageism-in-tech.html
│   ├── cv-strategy.html
│   ├── dba-law-freelancers.html
│   ├── financial-planning.html
│   ├── fintech-networking.html
│   ├── job-market-stats.html
│   ├── job-search-strategy.html
│   ├── military-service-cv.html
│   ├── motivation-ant-cricket.html
│   ├── referrals.html
│   ├── rejection-to-opportunity.html
│   ├── relocation-tips.html
│   ├── salary-negotiation.html
│   ├── seder-map.html
│   ├── thirty-percent-ruling.html
│   └── visa-permanent-residency.html
├── prompts.html                # Prompts index page
├── prompts/                    # Prompt tool HTML files
│   └── cv-upgrade.html         # AI CV coaching prompt (~34KB)
├── src/
│   └── app/
│       ├── layout.tsx           # Root layout (Heebo font, metadata, RTL)
│       ├── globals.css          # Tailwind v4 theme + animations
│       ├── route.ts             # GET → serves index.html
│       ├── favicon.ico
│       ├── blog/
│       │   ├── route.ts                     # GET → serves blog.html
│       │   ├── ageism-in-tech/route.ts      # GET → serves blog/ageism-in-tech.html
│       │   ├── cv-strategy/route.ts
│       │   ├── dba-law-freelancers/route.ts
│       │   ├── financial-planning/route.ts
│       │   ├── fintech-networking/route.ts
│       │   ├── job-market-stats/route.ts
│       │   ├── job-search-strategy/route.ts
│       │   ├── military-service-cv/route.ts
│       │   ├── motivation-ant-cricket/route.ts
│       │   ├── referrals/route.ts
│       │   ├── rejection-to-opportunity/route.ts
│       │   ├── relocation-tips/route.ts
│       │   ├── salary-negotiation/route.ts
│       │   ├── seder-map/route.ts
│       │   ├── thirty-percent-ruling/route.ts
│       │   └── visa-permanent-residency/route.ts
│       └── prompts/
│           ├── route.ts                     # GET → serves prompts.html
│           └── cv-upgrade/route.ts          # GET → serves prompts/cv-upgrade.html
├── public/                     # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── .claude/
│   └── launch.json             # Dev server config (port 3000)
├── package.json
├── package-lock.json
├── next.config.ts              # Empty (default Next.js config)
├── tsconfig.json               # Strict, ES2017, path alias @/* → ./src/*
├── postcss.config.mjs          # Tailwind v4 PostCSS plugin
├── eslint.config.mjs           # Flat config, next/core-web-vitals + TS
├── render.yaml                 # Render deployment config
├── design-preview.html         # Design variant mockups (reference only)
└── SITE-DOCUMENTATION.md       # This file
```

---

## Pages & Routes

| URL | Route file | Serves | Description |
|-----|-----------|--------|-------------|
| `/` | `src/app/route.ts` | `index.html` | Homepage — hero, services, blog preview, contact |
| `/blog` | `src/app/blog/route.ts` | `blog.html` | Blog index with all article cards |
| `/blog/[slug]` | `src/app/blog/[slug]/route.ts` | `blog/[slug].html` | Individual blog post |
| `/prompts` | `src/app/prompts/route.ts` | `prompts.html` | Prompt tools library |
| `/prompts/cv-upgrade` | `src/app/prompts/cv-upgrade/route.ts` | `prompts/cv-upgrade.html` | AI CV coaching prompt tool |

---

## Homepage Sections (`index.html`)

| # | Section | Anchor | Description |
|---|---------|--------|-------------|
| 1 | Sticky Nav | — | Frosted-glass bar, hamburger on mobile (<640px) |
| 2 | Hero | `#hero` | Headline, CTA → prompt section, quick nav links |
| 3 | Why | `#why` | Alon's personal story |
| 4 | How-To | `#how` | 3-step guide for using the AI prompt |
| 5 | Prompts & Links | `#useful-links` | Resource hub (sub-sections below) |
| 5a | — How It Works | — | 3-card mini steps grid |
| 5b | — AI Resume Prompt | `#prompt-section` | Full 10-step AI prompt with copy button |
| 5c | — ATS Check | `#ats` | ATS explainer + Jobscan link |
| 5d | — Want More? | `#more` | WhatsApp CTA card |
| 6 | Services | `#services` | 3 coaching tiers with Google Sign-In CTAs |
| 7 | Blog | `#blog` | 16 article cards |
| 8 | Contact | `#contact` | Contact form + WhatsApp/Facebook/israelis.nl |
| 9 | Footer | — | Community links + auto-updating copyright year |

---

## Design System

### Color Palette (CSS Variables)

The HTML files define their own `:root` variables. Current palette is **blue/navy professional**:

```css
:root {
  --white:    #FFFFFF;
  --gray-bg:  #F8F9FA;           /* Surface / alternate section bg */
  --brand:    #1a3a5c;           /* Navy — primary dark */
  --blue:     #2563EB;           /* Primary accent / CTA */
  --blue-lt:  #EFF6FF;           /* Light blue background */
  --wa:       #25D366;           /* WhatsApp green */
  --wa-dark:  #1da851;
  --text:     #1a1a1a;           /* Body text */
  --muted:    #6b7280;           /* Secondary text */
  --border:   #E5E7EB;
  --radius:   12px;
  --max:      800px;             /* Container max-width */
  --cream:    #FFFFFF;           /* Page background */
  --sand:     #F8F9FA;
  --terra:    #2563EB;           /* Accent (aliased to blue) */
  --terra-lt: #93bbfd;
  --terra-bg: rgba(37,99,235,0.06);
  --peach:    #EFF6FF;
  --brown:    #1a3a5c;           /* Aliased to brand navy */
  --brown-mid:#6b7280;
  --brown-lt: #9ca3af;
  --line:     #E5E7EB;
}
```

> **Note on variable naming:** Legacy names like `--terra`, `--brown`, `--peach` exist from a prior "warm editorial" design iteration. They are currently aliased to the blue palette values. If redesigning, update these variables in every HTML file's `<style>` block — they are NOT centralized.

### globals.css Variables (Tailwind layer)

```css
:root {
  --background: #FFFFFF;
  --foreground: #1a1a1a;
  --blue-deep:  #1a3a5c;
  --blue-mid:   #2563EB;
  --blue-light: #EFF6FF;
  --cream:      #F8F9FA;
  --cream-dark: #E5E7EB;
  --slate:      #6b7280;
  --slate-light:#9ca3af;
}
```

### Typography

- **Font:** Heebo (Hebrew-optimized sans-serif), weights 300–800
- **Direction:** RTL (`<html lang="he" dir="rtl">`)
- **H1:** `clamp(1.9rem, 5vw, 2.6rem)`, weight 800, color `--brand`
- **H2:** `clamp(1.4rem, 4vw, 1.8rem)`, weight 700, color `--brand`
- **H3:** `1.1rem`, weight 700
- **Body:** 16px base, line-height 1.7

### Responsive Breakpoints

| Breakpoint | What changes |
|------------|-------------|
| `max-width: 768px` | Blog grid → single column, mobile nav hamburger activates |
| `max-width: 640px` | Sticky nav hamburger, reduced padding |
| `max-width: 600px` | Full-width buttons, smaller prompt text, stacked grids |

### Animations (globals.css)

| Name | Duration | Use |
|------|----------|-----|
| `fadeInUp` | 0.8s ease-out | Section entrance |
| `fadeIn` | 0.6s ease-out | General fade |
| `slideInLeft` / `slideInRight` | 0.8s ease-out | Directional entrance |
| `float` | 6s infinite | Decorative floating elements |
| `pulse-soft` | opacity 0.6→1 | Subtle pulsing |
| `marquee` | 30s linear infinite | Scrolling ticker |

Stagger delays: `.delay-100` through `.delay-800` (100ms increments).

---

## JavaScript Features (index.html)

| Feature | Function(s) | Description |
|---------|------------|-------------|
| Copy Prompt | `copyPrompt()`, `showCopied()` | Copies AI prompt via `navigator.clipboard` with `execCommand` fallback |
| Contact Form | `handleFormSubmit()` | Posts to Formspree, shows success/error states |
| Mobile Nav | `toggleNav()`, `closeNav()` | Hamburger menu with outside-click listener |
| Dynamic Year | Inline | Footer copyright year auto-updates |
| Google Sign-In | `loadGsi()`, `setPkg()`, `onGsiCredential()` | See [GSI Integration](#google-sign-in-integration) |

---

## Google Sign-In Integration

Each service card has a Google Sign-In button that captures the visitor's name/email and sends a lead to Alon via Web3Forms.

### Flow

1. `loadGsi()` lazily loads the GSI script on first call
2. `setPkg(name)` stores which package was clicked in `window._pkg`
3. `google.accounts.id.initialize()` registers `onGsiCredential` as callback
4. Three pill-shaped Hebrew-locale buttons render into `#gsi-btn-0/1/2`
5. On sign-in, JWT is decoded for `name`/`email`, posted to Web3Forms, per-card success shown

### Credentials (in index.html)

```
GSI_CLIENT_ID = '225623142977-oqtmjp8lr7kt3n2b53ftl37801391021.apps.googleusercontent.com'
WEB3FORMS_KEY = '4fbcbbf1-0fe6-4f59-986d-618f42b0df80'
```

- **GSI_CLIENT_ID** — [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials → OAuth 2.0 Client ID. Add domain as authorized JavaScript origin.
- **WEB3FORMS_KEY** — [web3forms.com](https://web3forms.com/). Leads arrive in Alon's inbox.

### HTML Structure Per Card

```html
<div class="gsi-wrapper" onclick="setPkg('חבילה X')">
  <p class="gsi-label">הכניסה מאפשרת לאלון ליצור איתך קשר</p>
  <div id="gsi-btn-N" class="gsi-btn-container"></div>
  <div class="gsi-success" id="gsi-ok-N">✅ תודה! אלון יחזור אליך בקרוב.</div>
</div>
```

---

## External Integrations

| Service | Purpose | Config |
|---------|---------|--------|
| Formspree | Contact form backend | Form ID: `xzdjglaz` |
| WhatsApp | Direct messaging CTA | +31644295691, pre-filled Hebrew messages |
| Web3Forms | Lead capture from GSI | Access key: `4fbcbbf1-0fe6-4f59-986d-618f42b0df80` |
| Google Identity Services | Sign-in on service cards | Client ID: `225623142977-...` |
| Jobscan | ATS resume checking | External link to https://www.jobscan.co/ |
| Facebook Group | Community | Group ID: `1550032319015043` |
| israelis.nl | Parent site | https://israelis.nl |

---

## SEO & Metadata

### index.html (in `<head>`)

```
Title: עבודה בהולנד לישראלים | israelis.nl jobs
Description: הפלטפורמה של הישראלים בהולנד לחיפוש עבודה. כלי AI חינמיים, מאמרים מעשיים וליווי אישי מנוסה.
OG Title/Description: same as above
OG Type: website
Language: he (Hebrew), Direction: RTL
```

### layout.tsx (Next.js metadata — used for non-HTML routes)

```
Title: מוצאים עבודה בהולנד | jobs.israelis.nl
Description: המרכז לישראלים שמחפשים עבודה בהולנד. משרות, משאבים, קהילה — הכל במקום אחד.
Keywords: עבודה בהולנד, ישראלים בהולנד, משרות הולנד, עבודה באמסטרדם, קריירה בהולנד
OG: locale he_IL, type website, url https://jobs.israelis.nl
```

---

## How To: Add a New Blog Post

1. **Create the HTML file:** `blog/my-new-post.html`
   - Copy structure from an existing post (e.g., `blog/cv-strategy.html`)
   - Include full inline CSS (each post is self-contained)
   - Keep nav links consistent with other pages

2. **Create the route handler:** `src/app/blog/my-new-post/route.ts`
   ```typescript
   import fs from "fs";
   import path from "path";

   export const dynamic = "force-static";

   export function GET() {
     const filePath = path.join(process.cwd(), "blog/my-new-post.html");
     const html = fs.readFileSync(filePath, "utf-8");
     return new Response(html, {
       headers: { "Content-Type": "text/html; charset=utf-8" },
     });
   }
   ```

3. **Add a card to `blog.html`** — Add the article card to the blog grid.

4. **Optionally update `index.html`** — Add a preview card in the `#blog` section if desired.

## How To: Add a New Prompt Tool

Same pattern as blog posts:

1. Create `prompts/my-tool.html`
2. Create `src/app/prompts/my-tool/route.ts` pointing to that HTML file
3. Add a card to `prompts.html`

## How To: Change the Design / Color Scheme

Because each HTML file has its own inline `<style>` with `:root` variables, a design change requires updating:

1. **Every HTML file's `:root` block** — `index.html`, `blog.html`, all `blog/*.html`, `prompts.html`, all `prompts/*.html`
2. **`globals.css`** — The Tailwind theme variables (for the Next.js layout wrapper)

The variable names in HTML files (e.g., `--brand`, `--blue`, `--terra`) are used throughout inline `style=""` attributes, so renaming them would also require updating all references in the HTML body.

> **Scaling tip:** If the number of pages grows significantly, consider extracting the shared CSS into a single stylesheet served from `public/` to avoid maintaining duplicate `:root` blocks across 20+ files.

---

## Development

### Prerequisites

- Node.js 20+
- npm

### Setup

```bash
git clone https://github.com/alon-lgtm2/jobs.git
cd jobs
npm install
```

### Run locally

```bash
npm run dev          # Next.js dev server on http://localhost:3000
npx serve . -p 4000 -s   # Static file server (for testing HTML directly)
```

### Build & deploy

```bash
npm run build        # Production build
npm start            # Start production server
npm run lint         # ESLint check
```

### Configuration

| File | Purpose |
|------|---------|
| `next.config.ts` | Next.js config (currently empty/default) |
| `tsconfig.json` | TypeScript strict mode, ES2017 target, `@/*` path alias |
| `postcss.config.mjs` | Tailwind v4 PostCSS plugin |
| `eslint.config.mjs` | Flat config — next/core-web-vitals + TypeScript |
| `render.yaml` | Render deployment — `jobs-staging`, Node 20 |
| `.claude/launch.json` | Claude Code dev server config (port 3000) |

---

## Deployment (Render)

Configured in `render.yaml`:

- **Service name:** `jobs-staging`
- **Type:** Web service, Node.js runtime
- **Branch:** `staging`
- **Build:** `npm install && npm run build`
- **Start:** `npm start`
- **Node version:** 20
- **Staging URL:** https://jobs-staging-x4ws.onrender.com/

---

## Known Considerations for Scaling

1. **Duplicated CSS** — Each HTML file is self-contained with its own `<style>` block. A shared stylesheet would reduce maintenance as pages grow.
2. **Legacy variable names** — `--terra`, `--brown`, `--peach` are aliases from a prior design. Consider cleaning up if doing a redesign.
3. **No templating** — Blog/prompt pages are hand-authored HTML. A markdown → HTML pipeline or CMS integration would help if content volume grows significantly.
4. **No dynamic routes** — Each blog post requires both an HTML file and a route handler. A catch-all `[slug]/route.ts` could reduce boilerplate.
5. **Inline JavaScript** — All JS is in `index.html`. Extracting to `public/` would improve cacheability and separation of concerns.
6. **Analytics** — Umami Cloud analytics is installed on all pages via `<script defer src="https://cloud.umami.is/script.js" data-website-id="fe4e09f5-6b61-4820-8704-716ef86776b6"></script>`.
7. **No sitemap or robots.txt** — Adding these would improve SEO discoverability.
