<div align="center">

# ✦ Aprillio Bintang — Portfolio

**QA Specialist & Gaming Content Creator**

A modern, high-performance personal portfolio built with **Next.js 16**, **TypeScript**, **Framer Motion**, and a custom natural editorial dark design system.

[![Website](https://img.shields.io/badge/🌐_Website-aprillio.pro-141413?style=for-the-badge&logoColor=white)](https://aprillio.pro)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![CSS Modules](https://img.shields.io/badge/CSS_Modules-Scoped-141413?style=for-the-badge&logo=css3&logoColor=1572B6)](https://nextjs.org/docs/app/building-your-application/styling/css-modules)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion)

</div>

---

## ✨ Overview & Key Features

### 🧪 Quality Assurance & Manual Testing Showcase (`/projects`)
- **Real-world Case Studies**: Comprehensive QA test documentation for web applications (e.g., *Tenar Event Platform*).
- **Test Artifacts**: Test scenarios, positive/negative test matrix, and categorized bug reports (P1/P2/P3 severity).
- **Interactive Evidence Lightbox**: Full-resolution preview of test runs, step-by-step reproduction steps, and system limitations.

### 🎮 Esports & Gaming Content Creation (`/creator`)
- **Content Media Hub**: Video highlights, tournament news, and gameplay clips centered around *Honor of Kings* (HOK) and competitive esports.
- **Audience Metrics**: Engagement stats, follower metrics, and cross-platform channels (TikTok, Instagram, YouTube).

### ⚡ Live Personal Performance Modules
- **Duolingo Integration**: Real-time language learning streak, total XP, and active course progress fetched dynamically via custom API route.
- **MonkeyType Performance Dashboard**: Typing speed (WPM), accuracy, consistency, test counts, and interactive SVG performance curves.

### 🎨 Natural Editorial Design System & Modular CSS Architecture
- **Scoped CSS Modules**: Every page (`/`, `/projects`, `/creator`) and component (`Navbar`, `HeroBento`, `Lightbox`, `CustomCursor`, `ParallaxScene`) encapsulates its own styles, eliminating global namespace collisions and stylesheet bloat.
- **Single-Source Design Tokens (`globals.css`)**: Centralized CSS custom properties (`:root`) defining elevation surfaces, neutral borders, typography scales, accessibility rules (`prefers-reduced-motion`), and core button primitives.
- **Curated Dark Palette**: Warm near-black background (`#0D0D0C`), surface elevation (`#141413`), subtle neutral borders (`#292824`), and refined typography (`#F1EEE8` / `#A5A19A` / `#6F6C66`).
- **Accent Rhythm**: Signature Aprillio cyan accent (`#2EA8E6`) used with restraint for interactive focus.
- **Zero Distractions**: No unnecessary neon glows, heavy glassmorphism, or artificial blur filters.

### 🧭 Precision Navigation & Layout
- **Desktop Sidebar / Rail**: Fixed desktop sidebar with active section tracking and smooth anchor navigation.
- **Mobile Drawer**: Responsive top bar with animated slide-out navigation menu.
- **Editorial 4-Column Footer**: Balanced closing statement featuring identity, navigation anchors, external social links with brand icons, and a smooth back-to-top control.

### 🔒 Secure Contact Form
- Integrated **Cloudflare Turnstile** bot verification to protect the messaging endpoint against spam and automated abuse.

---

## 🗂️ Project Structure

```
portfolio-aprillio/
├── app/
│   ├── api/
│   │   ├── duolingo/route.ts        # Duolingo API proxy (streak, XP, language courses)
│   │   └── monkeytype/route.ts      # MonkeyType API proxy (WPM, accuracy, charts)
│   ├── components/
│   │   ├── CustomCursor.tsx         # Subtle custom cursor
│   │   ├── CustomCursor.module.css  # Scoped styles for custom cursor
│   │   ├── HeroBento.tsx            # Two-column hero with blended workspace visual
│   │   ├── HeroBento.module.css     # Scoped styles for Hero Bento grid
│   │   ├── Lightbox.tsx             # Fullscreen modal image viewer for QA evidence
│   │   ├── Lightbox.module.css      # Scoped styles for Lightbox modal
│   │   ├── Navbar.tsx               # Sidebar (desktop) & drawer header (mobile)
│   │   ├── Navbar.module.css        # Scoped styles for Navbar & mobile drawer
│   │   ├── ParallaxScene.tsx        # Subtle background canvas elements
│   │   └── ParallaxScene.module.css # Scoped styles for parallax canvas
│   ├── creator/
│   │   ├── page.tsx                 # Creator Media & esports showcase page
│   │   └── page.module.css          # Scoped styles for creator showcase
│   ├── projects/
│   │   ├── page.tsx                 # QA Projects & test documentation page
│   │   └── page.module.css          # Scoped styles for QA documentation
│   ├── globals.css                  # Design tokens (:root), resets, background & shared utilities
│   ├── layout.tsx                   # Root layout, metadata & fonts
│   ├── page.tsx                     # Homepage (Hero, About, Exp, Edu, Personal, Contact, Footer)
│   └── page.module.css              # Scoped styles for homepage sections
├── public/
│   ├── images/
│   │   ├── creator/                 # Creator portfolio assets
│   │   ├── hero/                    # Workspace photography
│   │   ├── personal/                # Official Duolingo asset
│   │   └── projects/                # QA test evidence & case study captures
│   └── cert-*.pdf                   # Academic & professional certifications
├── .env.local                       # API keys (local development)
└── next.config.ts                   # Next.js configuration
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/aprilliobintang284/portfolio-aprillio.git
cd portfolio-aprillio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root directory:

```env
# MonkeyType ApeKey (Settings → Ape Keys on monkeytype.com)
MONKEYTYPE_APE_KEY=your_monkeytype_ape_key_here
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the portfolio.

---

## 📡 API Routes & Live Data

| Route | Method | Description | Cache / Fallback |
|---|---|---|---|
| `/api/duolingo` | `GET` | Fetches active streak, XP, and active languages | In-memory ISR cache + static fallback |
| `/api/monkeytype` | `GET` | Fetches all-time best WPM, accuracy, consistency, and typing charts | ApeKey auth + static fallback |

*Both routes include automatic error handling and static fallback data so the interface renders reliably even during network or API downtime.*

---

## 🧰 Tech Stack

| Domain | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org) (App Router) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org) |
| **Styling** | Scoped [CSS Modules](https://nextjs.org/docs/app/building-your-application/styling/css-modules) + [Tailwind CSS v4](https://tailwindcss.com) & Shared Design Tokens |
| **Motion** | [Framer Motion](https://www.framer.com/motion) |
| **Icons** | [Lucide React](https://lucide.dev) & Custom Brand SVGs |
| **Security** | [@marsidev/react-turnstile](https://github.com/marsidev/react-turnstile) (Cloudflare Turnstile) |
| **Deployment** | [Vercel](https://vercel.com) |

---

## 🌐 Deployment

The project is configured for continuous deployment with **Vercel**:

1. Push your repository to GitHub.
2. Import the project in the [Vercel Dashboard](https://vercel.com/new).
3. Add your `MONKEYTYPE_APE_KEY` in **Settings → Environment Variables**.
4. Deploy!

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

Crafted with care by **Aprillio Bintang Perdana** • 2026

</div>
