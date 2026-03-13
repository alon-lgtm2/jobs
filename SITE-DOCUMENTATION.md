# jobs.israelis.nl — Site Documentation

## Overview

A Hebrew-language (RTL) landing page and resource hub for Israeli job seekers relocating to the Netherlands. Created by Alon, who has spent 8+ years helping Israelis integrate professionally in the Dutch job market.

**Live URL:** https://jobs.israelis.nl

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.1.6 + React 19.2.3 + TypeScript 5 |
| Styling | Tailwind CSS 4 + CSS custom properties |
| Fonts | Heebo (body, Google Fonts) |
| Deployment | Render (Node 20, `render.yaml`) |
| Form Backend | Formspree (ID: `xzdjglaz`) |
| Messaging | WhatsApp deep links (+31644295691) |

---

## Architecture

The site is **static**. A single `index.html` file (~1400 lines) is served via a Next.js API route handler (`src/app/route.ts`) with `force-static` caching. There is no database, authentication, or server-side logic.

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
└── tsconfig.json             # TypeScript config
```

---

## Page Sections

The site is a single page with anchor-based navigation. Sections in order:

| # | Section | ID | Description |
|---|---------|-----|-------------|
| 1 | Hero | `#hero` | Main headline, CTA button, quick nav links |
| 2 | Why | `#why` | Alon's personal story and motivation |
| 3 | How-To | `#how` | 3-step guide for using the AI prompt |
| 4 | Useful Links & Prompts | `#useful-links` | Contains both the AI prompt and ATS tools |
| 4a | — AI Resume Prompt | `#prompt-section` | 670+ line AI coaching prompt with copy button |
| 4b | — ATS Check | `#ats` | ATS explanation + Jobscan link |
| 5 | Want More? | `#more` | Upsell to personal coaching via WhatsApp |
| 6 | Services | `#services` | 3 coaching package tiers |
| 7 | Blog | `#blog` | 16 article cards (external links) |
| 8 | Contact | `#contact` | Contact form + WhatsApp/Facebook/israelis.nl links |
| 9 | Footer | — | Community links + copyright |

---

## Section Details

### Hero (`#hero`)
- Badge: "🇮🇱 → 🇳🇱 מוצאים עבודה בהולנד"
- H1: "שדרגו את קורות החיים שלכם בעזרת AI"
- Quick nav: לינקים ופרומפטים | ליווי אישי | מאמרים | צרו קשר
- Primary CTA scrolls to `#prompt-section`

### Why (`#why`)
- First-person narrative from Alon
- Left-bordered story box styling

### How-To (`#how`)
- 3 numbered steps (copy → open AI chat → paste & follow)
- Tip box: use voice input for more natural results
- Note box: use paid/advanced AI models for better quality

### Useful Links & Prompts (`#useful-links`)
Contains two sub-sections:

**AI Resume Prompt (`#prompt-section`)**
- Scrollable container (max-height 420px)
- Dark header bar with "Copy Prompt" button
- 670+ line prompt covering 10 guided steps:
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

### Want More? (`#more`)
- Gradient card (navy → blue)
- WhatsApp CTA with pre-filled Hebrew message

### Services (`#services`)
Three coaching packages:

| Package | Emoji | Highlight |
|---------|-------|-----------|
| מפשילים שרוולים (Rolling Up Sleeves) | 🛠️ | DIY toolkit, webinar, app access |
| צוללים למים (Diving In) | 🤿 | **Featured** — 1:1 coaching, resume rewrite, 30-day support |
| מוצאים עבודה! (Finding Work!) | 🚀 | Full 3-month coaching, unlimited calls |

All CTAs link to Google Forms (placeholder URLs).

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

## Design System

### Colors (CSS Variables)
```css
--white:    #FFFFFF
--gray-bg:  #F8F9FA
--brand:    #1a3a5c    /* Primary navy */
--blue:     #2563EB    /* Accent blue */
--blue-lt:  #EFF6FF    /* Light blue bg */
--wa:       #25D366    /* WhatsApp green */
--text:     #1a1a1a
--muted:    #6b7280
--border:   #E5E7EB
--radius:   12px
--max:      800px      /* Container max-width */
```

### Typography
- **Body:** Heebo (Hebrew-optimized sans-serif), weights 300–800
- **Direction:** RTL (`<html lang="he" dir="rtl">`)

### Responsive Breakpoints
- `max-width: 700px` — contact grid stacks, blog grid becomes single column
- `max-width: 600px` — reduced padding, full-width buttons, smaller prompt text

---

## JavaScript Features

1. **Copy-to-Clipboard** — `copyPrompt()` uses `navigator.clipboard` with `execCommand` fallback
2. **Contact Form** — `handleFormSubmit()` posts to Formspree, shows success/error states
3. **Dynamic Year** — Footer copyright year auto-updates

---

## External Integrations

| Service | Purpose | ID/URL |
|---------|---------|--------|
| Formspree | Contact form backend | Form ID: `xzdjglaz` |
| WhatsApp | Direct messaging CTA | +31644295691 |
| Jobscan | ATS resume checking | https://www.jobscan.co/ |
| Google Forms | Package inquiry forms | Placeholder URLs |
| Facebook Group | Community | Group ID: `1550032319015043` |
| israelis.nl | Parent site | https://israelis.nl |

---

## Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment

Deployed on **Render** via `render.yaml`:
- Service: `jobs-staging` (web)
- Runtime: Node 20
- Build: `npm install && npm run build`
- Start: `npm start`

---

## SEO & Metadata

- `<title>`: שדרגו את קורות החיים שלכם | israelis.nl
- `<meta description>`: פרומפט חכם ומונחה AI לבניית קורות חיים מקצועיים - חינם. מותאם לשוק העבודה בהולנד.
- Open Graph: title, description, type (website)
- Language: `he` (Hebrew), direction: RTL
