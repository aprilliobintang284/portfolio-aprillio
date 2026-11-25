<div align="center">

<!-- Header Banner -->
<img src="https://capsule-render.vercel.app/api?type=rect&color=0:0D0D0C,100:141413&height=160&section=header&text=✦%20Aprillio%20Bintang&fontSize=42&fontColor=F1EEE8&fontAlignY=42&desc=QA%20Specialist%20%E2%80%A2%20Gaming%20Content%20Creator&descSize=16&descColor=2EA8E6&descAlignY=68&animation=fadeIn" width="100%" alt="Aprillio Bintang Portfolio Banner" />

<!-- Animated Subtitle -->
<a href="https://aprillio.pro">
  <img src="https://readme-typing-svg.demolab.com?font=Inter&weight=500&size=15&duration=3200&pause=1000&color=A5A19A&center=true&vCenter=true&width=620&lines=Modern+Editorial+Dark+Portfolio+built+with+Next.js+16;Quality+Assurance+Case+Studies+%26+Bug+Documentation;Honor+of+Kings+Content+Hub+%26+Live+Performance+Metrics" alt="Typing SVG" />
</a>

<br />

<!-- Primary CTA & Unified Dark Tech Badges -->
[![Live Portfolio](https://img.shields.io/badge/🌐_Visit_Portfolio-aprillio.pro-2EA8E6?style=for-the-badge&logoColor=white)](https://aprillio.pro)
[![Next.js](https://img.shields.io/badge/Next.js_16-141413?style=for-the-badge&logo=next.js&logoColor=F1EEE8)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-141413?style=for-the-badge&logo=typescript&logoColor=3178C6)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-141413?style=for-the-badge&logo=tailwind-css&logoColor=38B2AC)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion_12-141413?style=for-the-badge&logo=framer&logoColor=FF0055)](https://www.framer.com/motion)
[![CSS Modules](https://img.shields.io/badge/CSS_Modules-141413?style=for-the-badge&logo=css3&logoColor=2EA8E6)](https://nextjs.org/docs/app/building-your-application/styling/css-modules)

<br />

<!-- Quick Navigation -->
<sub>
  <a href="#-core-features">Core Features</a> •
  <a href="#-design-system">Design System</a> •
  <a href="#-architecture--security">Architecture</a> •
  <a href="#-project-structure">Project Structure</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-deployment">Deployment</a>
</sub>

</div>

<br />

---

## ✨ Core Features

<table>
  <tr>
    <td width="50%" valign="top">
      <h3>🧪 QA & Manual Testing (<code>/projects</code>)</h3>
      <ul>
        <li><b>Real-world Case Studies:</b> Comprehensive QA test documentation for web applications (e.g., <i>Tenar Event Platform</i>).</li>
        <li><b>Test Artifacts:</b> Test scenarios, positive/negative test matrix, and categorized bug reports (P1/P2/P3 severity).</li>
        <li><b>Interactive Evidence Lightbox:</b> Full-resolution preview of test runs, step-by-step reproduction steps, and system limitations.</li>
      </ul>
    </td>
    <td width="50%" valign="top">
      <h3>🎮 Esports & Creator Hub (<code>/creator</code>)</h3>
      <ul>
        <li><b>Content Media Hub:</b> Video highlights, tournament news, and gameplay clips centered around <i>Honor of Kings</i> (HOK) and competitive esports.</li>
        <li><b>Audience Metrics:</b> Engagement stats, follower growth, and cross-platform channels (TikTok, Instagram, YouTube).</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>⚡ Live Performance Modules</h3>
      <ul>
        <li><b>Duolingo Integration:</b> Real-time language learning streak, total XP, and active course progress fetched dynamically via custom API route.</li>
        <li><b>MonkeyType Dashboard:</b> Typing speed (WPM), accuracy, consistency, test counts, and interactive SVG performance curves.</li>
      </ul>
    </td>
    <td width="50%" valign="top">
      <h3>🧭 Navigation & Security</h3>
      <ul>
        <li><b>Precision Layout:</b> Fixed desktop sidebar with active-section tracking & responsive mobile slide-out drawer.</li>
        <li><b>Editorial 4-Column Footer:</b> Identity, navigation anchors, social brand icons, and smooth back-to-top control.</li>
        <li><b>Cloudflare Turnstile:</b> Bot verification protecting the contact form endpoint against spam and automated abuse.</li>
      </ul>
    </td>
  </tr>
</table>

---

## 🎨 Design System

Built around a **Natural Editorial Dark** philosophy with **Zero Distractions** — avoiding unnecessary neon glows, heavy glassmorphism, or artificial blur filters.

| Token | Role | Hex | Preview |
| :--- | :--- | :---: | :---: |
| **Background** | Warm near-black canvas | `#0D0D0C` | ![#0D0D0C](https://img.shields.io/badge/%20-0D0D0C?style=flat-square) |
| **Surface** | Elevated cards & containers | `#141413` | ![#141413](https://img.shields.io/badge/%20-141413?style=flat-square) |
| **Border** | Subtle neutral dividers | `#292824` | ![#292824](https://img.shields.io/badge/%20-292824?style=flat-square) |
| **Text Primary** | Editorial warm white | `#F1EEE8` | ![#F1EEE8](https://img.shields.io/badge/%20-F1EEE8?style=flat-square) |
| **Text Muted** | Secondary copy & labels | `#A5A19A` | ![#A5A19A](https://img.shields.io/badge/%20-A5A19A?style=flat-square) |
| **Text Subtle** | Captions & metadata | `#6F6C66` | ![#6F6C66](https://img.shields.io/badge/%20-6F6C66?style=flat-square) |
| **Accent** | Signature Aprillio Cyan | `#2EA8E6` | ![#2EA8E6](https://img.shields.io/badge/%20-2EA8E6?style=flat-square) |

---

## 🏗️ Architecture & Security

<details>
<summary><b>Click to expand Modular CSS & Security Architecture</b></summary>
<br />

- **Scoped CSS Modules:** Every page (`/`, `/projects`, `/creator`) and component (`Navbar`, `HeroBento`, `Lightbox`, `CustomCursor`, `ParallaxScene`) encapsulates its own styles, eliminating global namespace collisions and stylesheet bloat.
- **Single-Source Design Tokens (`globals.css`):** Centralized CSS custom properties (`:root`) defining elevation surfaces, neutral borders, typography scales, accessibility rules (`prefers-reduced-motion`), and core button primitives.
- **Protected Messaging Endpoint:** Integrated **Cloudflare Turnstile** bot verification to secure the contact form against automated spam without degrading user experience.

</details>

---

## 🗂️ Project Structure

```text
portfolio-aprillio/
├── app/
│   ├── api/
│   │   ├── duolingo/route.ts        # Duolingo API proxy (streak, XP, language courses)
│   │   ├── monkeytype/route.ts      # MonkeyType API proxy (WPM, accuracy, charts)
│   │   └── contact/route.ts         # Contact endpoint with Cloudflare Turnstile verification
│   ├── components/
│   │   ├── CustomCursor.tsx         # Subtle custom cursor
│   │   ├── CustomCursor.module.css  # Scoped styles for custom cursor
│   │   ├── HeroBento.tsx            # Bento-grid hero section
│   │   ├── Lightbox.tsx             # Interactive QA evidence lightbox
│   │   ├── Navbar.tsx               # Desktop sidebar rail & mobile slide-out drawer
│   │   ├── ParallaxScene.tsx        # Motion-aware parallax wrapper
│   │   └── Footer.tsx               # Editorial 4-column footer
│   ├── creator/
│   │   ├── page.tsx                 # Esports & HOK Content Creator Hub
│   │   └── creator.module.css
│   ├── projects/
│   │   ├── page.tsx                 # QA Case Studies & Bug Reports showcase
│   │   └── projects.module.css
│   ├── globals.css                  # Single-source design tokens & base styles
│   ├── layout.tsx                   # Root layout & metadata
│   └── page.tsx                     # Home page
├── public/                          # Static assets, icons & QA screenshots
├── next.config.ts                   # Next.js configuration
├── tsconfig.json                    # TypeScript configuration
└── package.json
