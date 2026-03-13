# jobs.israelis.nl — Site Documentation

## Overview

A Hebrew-language (RTL) landing page and resource hub for Israeli job seekers relocating to the Netherlands. Created by Alon, who has spent 8+ years helping Israelis integrate professionally in the Dutch job market.

**Live URL:** https://jobs.israelis.nl
**Staging URL:** https://jobs-staging-x4ws.onrender.com/
**Git repo:** https://github.com/alon-lgtm2/jobs.git (branch: `staging`)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.1.6 + React 19.2.3 + TypeScript 5 |
| Styling | Inline CSS custom properties (no Tailwind in production HTML) |
| Fonts | Heebo (body) + Frank Ruhl Libre (headings) — Google Fonts |
| Deployment | Render (Node 20, `render.yaml`) |
| Form Backend | Formspree (ID: `xzdjglaz`) |
| Messaging | WhatsApp deep links (+31644295691) |
| Lead Capture | Google Identity Services (GSI) + Web3Forms |

---

## Architecture

The site is **static**. A single `index.html` file (~1500+ lines) is served via a Next.js API route handler (`src/app/route.ts`) with `force-static` caching. There is no database, authentication, or server-side logic. All HTML, CSS, and JavaScript are inline in `index.html`.

```
jobs-repo/
├── index.html               # Main page (all HTML/CSS/JS inline)
├── src/app/
│   ├── layout.tsx            # Root layout (fonts, metadata, RTL)
│   ├── route.ts              # GET handler serving index.html
│   └── globals.css           # Tailwind imports + design tokens
├── public/                   # Static SVG assets
├── package.json              # Dependencies
├── next.config.ts            # Next.js config (empty)
├── postcss.config.mjs        # Tailwind PostCSS plugin
├── render.yaml               # Render deployment config
├── SITE-DOCUMENTATION.md     # This file
└── tsconfig.json             # TypeScript config
```

---

## Page Sections

The site is a single page with anchor-based navigation. Sections in order:

| # | Section | ID | Description |
|---|---------|-----|-------------|
| 1 | Hero | `#hero` | Main headline, CTA button, quick nav links |
| 2 | Why | `#why` | Alon's personal story and motivation |
| 3 | How-To | `#how` | Detailed 3-step guide + tip/note boxes |
| 4 | Prompts & Links | `#useful-links` | Hub containing all sub-resources (see below) |
| 4a | — How It Works | *(no anchor)* | Mini 3-card visual steps grid |
| 4b | — AI Resume Prompt | `#prompt-section` | Full AI coaching prompt with copy button |
| 4c | — ATS Check | `#ats` | ATS explanation + Jobscan link |
| 4d | — Want More? | `#more` | WhatsApp CTA card — nested inside #useful-links |
| 5 | Services | `#services` | 3 coaching package tiers with Google Sign-In CTAs |
| 6 | Blog | `#blog` | 16 article cards (external links) |
| 7 | Contact | `#contact` | Contact form + WhatsApp/Facebook/israelis.nl links |
| 8 | Footer | — | Community links + copyright |

---

## Section Details

### Sticky Nav
- Frosted-glass bar (`backdrop-filter: blur(18px)`) fixed at top
- Logo: `israelis.nl jobs` (links to `#hero`)
- Links: פרומפטים | איך משתמשים | ליווי אישי | מאמרים | צרו קשר
- Pill CTA: "התחילו עכשיו" → `#prompt-section`
- Mobile: hamburger toggle, animated open/close via `toggleNav()` / `closeNav()`

### Hero (`#hero`)
- Badge: "🇮🇱 → 🇳🇱 מוצאים עבודה בהולנד"
- H1: "שדרגו את קורות החיים שלכם בעזרת AI"
- Quick nav: לינקים ופרומפטים | ליווי אישי | מאמרים | צרו קשר
- Primary CTA scrolls to `#prompt-section`

### Why (`#why`)
- First-person narrative from Alon
- Right-bordered story box (terracotta accent)

### How-To (`#how`)
- 3 numbered steps (copy → open AI chat → paste & follow)
- Tip box: use voice input for more natural results
- Note box: use paid/advanced AI models for better quality

### Prompts & Links (`#useful-links`)
The main resource hub. Contains four sub-sections in this order:

**How It Works (mini steps)**
- 3-card horizontal grid (`hiw-grid` / `hiw-card`)
- Step 1: העתיקו את הפרומפט
- Step 2: ענו על השאלות
- Step 3: קבלו CV מוכן

**AI Resume Prompt (`#prompt-section`)**
- Scrollable container (max-height 420px)
- Dark brown header bar with "העתק פרומפט" button
- 10-step AI coaching prompt:
  1. Welcome & input options
  2. Professional story discovery
  3. Title + tagline
  4. Elevator pitch (100 seconds)
  5. Core expertise
  6. Achievements per role
  7. Career path coherence
  8. Honesty check
  9. Design & ATS compatibility
  10. Final resume assembly + score

**ATS Check (`#ats`)**
- Card explaining Applicant Tracking Systems
- External link to Jobscan (free tool)

**Want More? (`#more`)**
- Gradient card (brown → terracotta), nested inside `#useful-links`
- WhatsApp CTA with pre-filled Hebrew message

### Services (`#services`)
Three coaching packages, each with a Google Sign-In CTA:

| Package | Emoji | Highlight |
|---------|-------|-----------|
| מפשילים שרוולים (Rolling Up Sleeves) | 🛠️ | DIY toolkit, webinar, app access |
| צוללים למים (Diving In) | 🤿 | **Featured** — 1:1 coaching, resume rewrite, 30-day support |
| מוצאים עבודה! (Finding Work!) | 🚀 | Full 3-month coaching, unlimited calls |

Each card has a GSI (Google Sign-In) button. On sign-in, the user's name/email and chosen package are submitted to Web3Forms. See [Google Sign-In Integration](#google-sign-in-integration) below.

### Blog (`#blog`)
- 16 article cards in responsive grid
- Topics: job search strategy, ageism, salary negotiation, freelancers/DBA, financial planning, referrals, 30% ruling, military service in CVs, networking, motivation, relocation, visa/residency
- Links to Facebook group posts and LinkedIn articles

### Contact (`#contact`)
- Two-column layout (info + form)
- Contact links: WhatsApp, Facebook group, israelis.nl
- Formspree-powered form (name, email, message)
- Success state shown after submission

---

## Design System — Warm Editorial

The site uses a **Warm Editorial** aesthetic: cream/terracotta/brown palette, Frank Ruhl Libre serif headings, generous whitespace.

### Colors (CSS Variables)
```css
--white:    #FFFFFF
--gray-bg:  #F0EAE0       /* Sand background */
--brand:    #3D2B1F       /* Brown (remapped from navy) */
--blue:     #C4604A       /* Terracotta (remapped from blue) */
--blue-lt:  #FFF0E8       /* Peach (remapped from light blue) */
--wa:       #25D366       /* WhatsApp green */
--wa-dark:  #1da851
--text:     #3D2B1F
--muted:    #6B5344
--border:   rgba(61,43,31,0.12)
--radius:   16px
--max:      800px         /* Container max-width */
--cream:    #FAF6F0       /* Page background */
--sand:     #F0EAE0       /* Alternate section bg */
--terra:    #C4604A       /* Terracotta — primary accent */
--terra-lt: #E8A090
--terra-bg: rgba(196,96,74,0.06)
--peach:    #FFF0E8
--brown:    #3D2B1F       /* Primary dark */
--brown-mid:#6B5344
--brown-lt: #A08878
--line:     rgba(61,43,31,0.1)
```

> **Note:** The legacy variable names (`--brand`, `--blue`, `--blue-lt`) are kept as-is because inline `style=""` attributes throughout the HTML body reference them. They are remapped to warm equivalents in `:root`.

### Typography
- **Headings (h1/h2/h3):** Frank Ruhl Libre (serif), weights 300–900
- **Body:** Heebo (Hebrew-optimized sans-serif), weights 300–800
- **Direction:** RTL (`<html lang="he" dir="rtl">`)

### Responsive Breakpoints
- `max-width: 700px` — contact grid stacks, blog grid becomes single column
- `max-width: 640px` — mobile nav hamburger activates
- `max-width: 600px` — reduced padding, full-width buttons, smaller prompt text, `hiw-grid` becomes single column

---

## JavaScript Features

1. **Copy-to-Clipboard** — `copyPrompt()` uses `navigator.clipboard` with `execCommand` fallback; shows "הועתק!" state via `showCopied()`
2. **Contact Form** — `handleFormSubmit()` posts to Formspree, shows success/error states
3. **Dynamic Year** — Footer copyright year auto-updates
4. **Nav Toggle** — `toggleNav()` / `closeNav()` for mobile hamburger; outside-click listener closes menu
5. **Google Sign-In** — `loadGsi()` lazy-loads GSI script; `setPkg()` tracks which package was clicked; `onGsiCredential()` decodes JWT and submits lead to Web3Forms

---

## Google Sign-In Integration

Each service package card has a Google Sign-In button that captures the visitor's name and email and sends a lead notification to Alon via Web3Forms.

### How it works
1. `loadGsi()` lazily appends the GSI script on first call
2. `setPkg(name)` is called via `onclick` on the `.gsi-wrapper` div — stores which package was selected in `window._pkg`
3. `google.accounts.id.initialize()` registers `onGsiCredential` as the callback
4. Three pill-shaped Hebrew-locale buttons are rendered via `renderButton()` into `#gsi-btn-0/1/2`
5. On sign-in, `onGsiCredential` decodes the JWT to extract `name` and `email`, posts to Web3Forms, and shows a per-card success state

### Configuration (⚠️ requires real values)
```js
var GSI_CLIENT_ID = 'YOUR_CLIENT_ID.apps.googleusercontent.com';
var WEB3FORMS_KEY = 'YOUR_WEB3FORMS_KEY';
```

- **GSI_CLIENT_ID** — create at [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials → OAuth 2.0 Client ID (Web application). Add your domain as an authorized JavaScript origin.
- **WEB3FORMS_KEY** — get free at [web3forms.com](https://web3forms.com/). Leads arrive in Alon's inbox.

### HTML structure per card
```html
<div class="gsi-wrapper" onclick="setPkg('חבילה X')">
  <p class="gsi-label">הכניסה מאפשרת לאלון ליצור איתך קשר</p>
  <div id="gsi-btn-N" class="gsi-btn-container"></div>
  <div class="gsi-success" id="gsi-ok-N">✅ תודה! אלון יחזור אליך בקרוב.</div>
</div>
```

---

## External Integrations

| Service | Purpose | ID/URL |
|---------|---------|--------|
| Formspree | Contact form backend | Form ID: `xzdjglaz` |
| WhatsApp | Direct messaging CTA | +31644295691 |
| Jobscan | ATS resume checking | https://www.jobscan.co/ |
| Web3Forms | Lead capture from GSI sign-in | Access key: replace placeholder |
| Google Identity Services | Sign-in buttons on service cards | Client ID: replace placeholder |
| Facebook Group | Community | Group ID: `1550032319015043` |
| israelis.nl | Parent site | https://israelis.nl |

---

## Development

```bash
# Install dependencies
npm install

# Local preview (static file server, no build needed)
# Uses .claude/launch.json — start via Claude Code preview
npx serve . -p 4000 -s

# Run Next.js dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment

Deployed on **Render** via `render.yaml`:
- Service: `jobs-staging` (web)
- Branch: `staging`
- Runtime: Node 20
- Build: `npm install && npm run build`
- Start: `npm start`
- Staging URL: https://jobs-staging-x4ws.onrender.com/

---

## SEO & Metadata

- `<title>`: שדרגו את קורות החיים שלכם | israelis.nl
- `<meta description>`: פרומפט חכם ומונחה AI לבניית קורות חיים מקצועיים - חינם. מותאם לשוק העבודה בהולנד.
- Open Graph: title, description, type (website)
- Language: `he` (Hebrew), direction: RTL
