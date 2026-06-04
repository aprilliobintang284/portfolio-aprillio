<div align="center">

# ✦ Aprillio Bintang — Portfolio

**A premium, real-time personal portfolio built with Next.js 16, Framer Motion, and glassmorphism design.**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-aprillio.vercel.app-black?style=for-the-badge)](https://portfolio-aprillio.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-latest-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion)

</div>

---

## ✨ Features

- 🎨 **iOS-inspired Glassmorphism** — frosted glass cards with blur, shine, and depth
- ⚡ **Real-time Data** — live stats fetched from MonkeyType & Duolingo APIs
- 🖱️ **Custom Cursor** — lightweight CSS-only animated cursor
- 🌀 **Parallax Backgrounds** — smooth `requestAnimationFrame`-based floating shapes
- 📊 **Interactive SVG Charts** — hover-tooltip WPM line chart & accuracy bar chart
- 📱 **Fully Responsive** — optimized for desktop, tablet, and mobile
- 🌙 **Dark Mode First** — premium dark aesthetic with curated color palette
- 🔄 **Scroll Animations** — staggered entry animations via Framer Motion

---

## 🗂️ Project Structure

```
portfolio-aprillio/
├── app/
│   ├── api/
│   │   ├── duolingo/route.ts     # Duolingo proxy (streak, XP, courses)
│   │   └── monkeytype/route.ts   # MonkeyType proxy (WPM, accuracy, charts)
│   ├── components/
│   │   ├── Navbar.tsx            # Sticky glassmorphism navbar
│   │   ├── CustomCursor.tsx      # CSS-only custom cursor
│   │   └── ParallaxScene.tsx     # Animated background shapes
│   ├── globals.css               # Design system & component styles
│   ├── layout.tsx                # Root layout & metadata
│   └── page.tsx                  # Main portfolio page
├── .env.local                    # API keys (not committed)
└── next.config.ts
```

---

## 🚀 Quick Start

### 1. Clone the repo

```bash
git clone https://github.com/aprilliobintang455-boop/portfolio-aprillio.git
cd portfolio-aprillio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
MONKEYTYPE_APE_KEY=your_monkeytype_ape_key_here
```

> 🔑 Get your MonkeyType ApeKey from: **monkeytype.com → Settings → Ape Keys**

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Customization Guide

### Change personal info
Edit `app/page.tsx` — search for your name, bio, skills, and project entries.

### Change Duolingo username
Edit `app/api/duolingo/route.ts`:
```ts
const USERNAME = "YourDuolingoUsername";
```

### Change MonkeyType username
Edit `app/api/monkeytype/route.ts`:
```ts
const USERNAME = "YourMonkeyTypeUsername";
```

### Change color palette
All design tokens are in `app/globals.css` under the `:root` section.

### Add/edit sections
Each section in `page.tsx` is clearly labeled with a comment:
```tsx
{/* DUOLINGO PROGRESS */}
{/* TYPING PERFORMANCE — MonkeyType Dashboard */}
```

---

## 🌐 Deploy to Vercel

### One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/aprilliobintang455-boop/portfolio-aprillio)

### Manual deploy

1. Push your code to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Add environment variable in **Project Settings → Environment Variables**:
   ```
   MONKEYTYPE_APE_KEY = your_key_here
   ```
4. Deploy ✓

---

## 📡 API Routes

| Route | Description | Auth required |
|---|---|---|
| `GET /api/duolingo` | Streak, Total XP, active courses | No |
| `GET /api/monkeytype` | Personal bests, avg WPM, chart data | ApeKey for chart data |

Both routes include **retry logic**, **5-second timeout**, and **static fallback** so the UI never breaks even when APIs are down.

---

## 🧰 Tech Stack

| Technology | Usage |
|---|---|
| [Next.js 16](https://nextjs.org) | App router, API routes, ISR caching |
| [TypeScript](https://www.typescriptlang.org) | Type safety |
| [Framer Motion](https://www.framer.com/motion) | Scroll & entry animations |
| [Lucide React](https://lucide.dev) | Icons |
| Vanilla CSS | Glassmorphism design system |
| Pure SVG | Interactive charts (no chart library) |

---

## 📄 License

This project is open source under the [MIT License](LICENSE).
Feel free to fork, customize, and use it for your own portfolio! ⭐

---

<div align="center">

Made with ☕ by **Aprillio Bintang**

</div>
