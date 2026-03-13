# jobs.israelis.nl

Landing page and AI-powered resume tool for Israeli job seekers relocating to the Netherlands.

**Live site:** [jobs.israelis.nl](https://jobs.israelis.nl)

## What This Is

A Hebrew-language (RTL) landing page that offers:

- **Free AI resume prompt** - A 670+ line structured coaching prompt for Claude/ChatGPT/Gemini that walks users through rewriting their resume step-by-step
- **Coaching packages** - Three tiers of paid job search coaching services
- **Blog** - 16 articles covering job search strategy, relocation, taxes, networking, and more
- **Contact form** - Integrated with [Formspree](https://formspree.io) for email delivery

## Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Framework   | Next.js 16, React 19, TypeScript 5  |
| Styling     | Tailwind CSS 4, custom CSS variables |
| Fonts       | Heebo (sans), Frank Ruhl Libre (display) via Google Fonts |
| Deployment  | Render (Node 20)                    |
| Forms       | Formspree                           |
| CTAs        | WhatsApp deep links                 |

## Project Structure

```
jobs-repo/
├── src/app/
│   ├── layout.tsx        # Root layout, metadata, fonts, RTL config
│   ├── route.ts          # Serves index.html as static response
│   ├── globals.css       # Theme variables, animations, utilities
│   └── favicon.ico
├── index.html            # Main landing page (~1,400 lines of HTML/CSS/JS)
├── design-preview.html   # Design variant mockups (4 options)
├── public/               # Static assets (SVGs)
├── render.yaml           # Render deployment config
├── package.json
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
└── eslint.config.mjs
```

## Architecture

The site is **primarily static**. The Next.js app serves a pre-built `index.html` file through an API route handler (`src/app/route.ts`) with `force-static` caching. There is no database, no authentication, and no server-side logic beyond serving the HTML.

### Page Sections

| #  | Section         | Description                                      |
|----|-----------------|--------------------------------------------------|
| 1  | Hero            | Headline, CTA to prompt section, quick nav links |
| 2  | Why             | Personal story from Alon (motivation)            |
| 3  | How-To          | 3-step process for using the AI prompt           |
| 4  | Prompt          | The full AI coaching prompt with copy button      |
| 5  | ATS             | Resume compatibility info, Jobscan link          |
| 6  | More            | Upsell card for personal coaching via WhatsApp   |
| 7  | Services        | 3 coaching packages with pricing                 |
| 8  | Blog            | 16 article cards linking to external resources   |
| 9  | Contact         | Info + Formspree contact form                    |

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
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## Deployment

Deployed on **Render** via `render.yaml`:

- **Service:** `jobs-staging` (web, Node runtime)
- **Build:** `npm install && npm run build`
- **Start:** `npm start`
- **Node version:** 20

## Design System

### Colors

| Token         | Value     | Usage                |
|---------------|-----------|----------------------|
| Brand navy    | `#1a3a5c` | Primary brand color  |
| CTA blue      | `#2563EB` | Buttons, links       |
| WhatsApp      | `#25D366` | WhatsApp CTAs        |
| Background    | `#FFFFFF` | Page background      |
| Surface       | `#F8F9FA` | Card backgrounds     |
| Text          | `#1a1a1a` | Body text            |
| Text muted    | `#6b7280` | Secondary text       |

### Typography

- **Sans-serif:** Heebo (body text, UI)
- **Display:** Frank Ruhl Libre (headings)
- **Direction:** RTL (Hebrew)
- **Base size:** 16px, headings scale with `clamp()`

### Animations

Defined in `globals.css`: `fadeInUp`, `fadeIn`, `slideInLeft`, `slideInRight`, `float`, `pulse-soft`, `marquee` with stagger delays (100-800ms).

## External Integrations

| Service     | Purpose                | Config                    |
|-------------|------------------------|---------------------------|
| Formspree   | Contact form backend   | Form ID: `xzdjglaz`       |
| WhatsApp    | CTA messaging          | Pre-filled deep links     |
| Google Forms| Service inquiry forms  | Placeholder links         |
| Jobscan     | ATS compatibility tool | External link             |
| Facebook    | Blog article sources   | External links            |

## License

Private.
