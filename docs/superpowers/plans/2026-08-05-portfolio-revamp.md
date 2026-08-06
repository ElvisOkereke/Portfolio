# Portfolio Revamp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing Next.js 13 Pages Router tutorial-based portfolio with a from-scratch Next.js 15 App Router single-page site that showcases Elvis Okereke's current ML/AI engineering work, per the approved design spec.

**Architecture:** A single scrolling page (`app/page.tsx`) assembled from independent section components (`components/sections/*`), each reading from typed local data files (`lib/data/*.ts`) instead of a CMS. The 3D BMW-parts showcase is isolated into its own client-only, lazily-mounted subtree so its ~600KB+ Three.js bundle never blocks initial page load. The contact form posts to a Next.js Route Handler (`app/api/contact/route.ts`) that sends mail via Resend.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript 5, Tailwind CSS 3.4, Framer Motion, React Three Fiber 9 + drei, react-hook-form, Resend, Vitest.

## Global Constraints

- Single long-scroll page, one URL — no additional routes except the API route (spec: Information Architecture).
- No CMS — all content in typed local files under `lib/data/` (spec: Tech Stack).
- Background `#0a0a0a`, accent `#f5a623`, light-gray/white text, monospace accents for labels/eyebrows, sans body font (spec: Visual Design System).
- The 3D showcase must: dynamically import with `ssr: false`, mount only when scrolled near-into-view via `IntersectionObserver`, use compressed GLTF models, show a static poster until mounted, and respect `prefers-reduced-motion` for auto-rotate (spec: 3D Showcase — Performance Requirements). This is a hard requirement.
- No phone number anywhere on the page (spec: Information Architecture, Contact).
- Experience section mirrors the resume exactly: TELUS, Canada Life (both stints, one card), Microsoft — no LVBT or Tutoring entries (spec: Experience).
- Exactly three flagship projects: AI-HQ, TennisAnalyzer, Auto-Subtitle-Translate-Extension, each with a "View case study" modal (spec: Flagship Projects).
- Verification is type-checking + a clean production build + manual in-browser review per section, not a full test suite — except the contact API route, which gets a targeted Vitest test (spec: Testing Approach).
- Remove dead code/deps: Sanity (`next-sanity`, `@sanity/image-url`, `@portabletext/react`), `react-tooltip`, `react-responsive-carousel`, `lamina`, `three-gltf-loader`, `@react-spring/three`, `react-spring`, `tailwind-scrollbar`, `pages/api/hello.ts` (spec: Non-Functional Cleanup).
- All images get correct intrinsic dimensions and real `alt` text; no `eslint-disable` workarounds for real bugs; proper `<head>` metadata including Open Graph (spec: Non-Functional Cleanup).
- Out of scope: custom domain, light-mode toggle, blog, resume redesign (spec: Out of Scope).

---

### Task 1: Remove legacy Pages Router app and scaffold Next.js 15 App Router

**Files:**
- Delete: `pages/index.tsx`, `pages/LVBTProducts.tsx`, `pages/_app.tsx`, `pages/_document.tsx`, `pages/api/hello.ts`, entire `pages/` directory once empty
- Delete: `components/hero.tsx`, `components/About.tsx`, `components/WorkExperience.tsx`, `components/Skills.tsx`, `components/Projects.tsx`, `components/Contact.tsx`, `components/banner.tsx`, entire `components/ExpCards/` directory, entire `components/SkillIcons/` directory (or equivalent icon-grid folder), `components/3dProducts/LVBTProductsCanvas.tsx`, `components/3dProducts/ThreeConDSSR.tsx` and any other files in `components/3dProducts/`
- Delete: `sanity.ts` (or `sanity/` config file) and the `/sanity` schema folder, if present, `typings.d.ts` if it only contains Sanity-derived types
- Delete: `public/pics/irelia-om.jpg` (3.5MB, unused after Hero/About rewrite), `public/models/Turbogarret.obj` (unused, not referenced by any product data)
- Modify: `package.json` — full dependency rewrite
- Modify: `.env.example` — replace Sanity vars with Resend vars
- Modify: `next.config.js` — replace with a clean Next 15 config
- Modify: `tsconfig.json` — bump target/module settings for Next 15
- Create: `app/layout.tsx` (minimal placeholder, filled in fully in Task 2)
- Create: `app/globals.css` (placeholder, filled in fully in Task 2)

**Interfaces:**
- Produces: a clean repository with no Pages Router files, no dead dependencies, and an empty `app/` directory ready for Task 2 to populate.

- [ ] **Step 1: Confirm no other files import anything under `pages/`, `components/` (old set), or `sanity.ts`**

Run: `grep -rn "from '@/pages\|from '\.\./pages\|from '@/sanity\|from '\.\./sanity" --include=*.tsx --include=*.ts .`
Expected: no output (nothing outside the files themselves references them).

- [ ] **Step 2: Delete the old Pages Router files and orphaned components**

```bash
rm -rf pages
rm -f components/hero.tsx components/About.tsx components/WorkExperience.tsx components/Skills.tsx components/Projects.tsx components/Contact.tsx components/banner.tsx
rm -rf components/ExpCards components/SkillIcons components/3dProducts
rm -f sanity.ts
rm -rf sanity
rm -f public/pics/irelia-om.jpg public/models/Turbogarret.obj
```

- [ ] **Step 3: Rewrite `package.json` with Next 15 / React 19 and pruned dependencies**

```json
{
  "name": "portfolio",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run"
  },
  "dependencies": {
    "@heroicons/react": "^2.1.5",
    "@react-three/drei": "^9.122.0",
    "@react-three/fiber": "^9.0.0",
    "@types/node": "^20.14.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@types/three": "^0.170.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "^15.0.0",
    "framer-motion": "^11.11.0",
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-hook-form": "^7.53.0",
    "react-simple-typewriter": "^5.0.1",
    "react-social-icons": "^6.18.0",
    "resend": "^4.0.0",
    "three": "^0.170.0",
    "typescript": "^5.6.0"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "vitest": "^2.1.0"
  }
}
```

- [ ] **Step 4: Install dependencies**

Run: `npm install`
Expected: install completes with no `npm error`. Peer-dependency warnings about `react-social-icons` or similar are acceptable; hard failures are not.

- [ ] **Step 5: Replace `.env.example`**

```
RESEND_API_KEY=
CONTACT_TO_EMAIL=
```

- [ ] **Step 6: Replace `next.config.js`**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
  },
};

module.exports = nextConfig;
```

- [ ] **Step 7: Replace `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 8: Scaffold minimal `app/` directory so `npm run dev` boots**

Create `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Create `app/layout.tsx`:

```tsx
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

Create `app/page.tsx`:

```tsx
export default function Home() {
  return <main className="min-h-screen" />;
}
```

- [ ] **Step 9: Verify the app boots**

Run: `npm run dev` (then stop it once confirmed) or `npm run build`
Expected: build succeeds with no errors about missing `pages/` or removed dependencies.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "chore: remove legacy Pages Router app, prune dead deps, scaffold Next 15 App Router"
```

---

### Task 2: Design system — theme, fonts, root layout metadata, Header, Footer

**Files:**
- Modify: `tailwind.config.js`
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Create: `components/layout/Header.tsx`
- Create: `components/layout/Footer.tsx`

**Interfaces:**
- Consumes: nothing from prior tasks beyond the scaffold from Task 1.
- Produces: Tailwind utility classes `bg-background`, `text-foreground`, `text-accent`, `border-accent`, `font-mono`, `font-sans`, plus component classes `.btn-primary`, `.btn-secondary`, `.section-eyebrow`, `.tag`, `.contact-input` — used by every later section task. `<Header />` and `<Footer />` are rendered once, in `app/layout.tsx`, wrapping every page section.

- [ ] **Step 1: Replace `tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        foreground: "#e5e5e5",
        accent: "#f5a623",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 2: Replace `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
}

@layer components {
  .btn-primary {
    @apply inline-block px-6 py-3 rounded-full border border-accent text-accent text-sm uppercase tracking-widest transition-colors hover:bg-accent hover:text-background;
  }
  .btn-secondary {
    @apply inline-block px-6 py-3 rounded-full border border-white/20 text-foreground/70 text-sm uppercase tracking-widest transition-colors hover:border-accent/60 hover:text-accent;
  }
  .section-eyebrow {
    @apply font-mono uppercase tracking-[0.3em] text-xs text-foreground/50;
  }
  .tag {
    @apply font-mono text-xs border border-accent/50 text-accent rounded px-2 py-0.5;
  }
  .contact-input {
    @apply w-full bg-white/5 border-b border-white/10 px-4 py-3 text-foreground placeholder-foreground/40 outline-none transition-colors focus:border-accent;
  }
}
```

- [ ] **Step 3: Create `components/layout/Header.tsx`**

```tsx
"use client";
import { SocialIcon } from "react-social-icons";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-5 py-4 max-w-7xl mx-auto w-full">
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-1"
      >
        <SocialIcon
          url="https://github.com/ElvisOkereke"
          style={{ height: 32, width: 32 }}
          fgColor="#e5e5e5"
          bgColor="transparent"
        />
        <SocialIcon
          url="https://www.linkedin.com/in/elvis-okereke-0b4ba8149/"
          style={{ height: 32, width: 32 }}
          fgColor="#e5e5e5"
          bgColor="transparent"
        />
      </motion.div>
      <motion.div
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Link
          href="#contact"
          className="text-sm uppercase tracking-widest text-foreground/70 hover:text-accent transition-colors"
        >
          Contact
        </Link>
      </motion.div>
    </header>
  );
}
```

- [ ] **Step 4: Create `components/layout/Footer.tsx`**

```tsx
import Link from "next/link";
import { ArrowUpIcon } from "@heroicons/react/24/solid";

export default function Footer() {
  return (
    <footer className="w-full py-8 flex items-center justify-center">
      <Link
        href="#hero"
        aria-label="Back to top"
        className="opacity-40 hover:opacity-100 transition-opacity"
      >
        <ArrowUpIcon className="h-6 w-6 text-accent" />
      </Link>
    </footer>
  );
}
```

- [ ] **Step 5: Replace `app/layout.tsx` with fonts, metadata, Header/Footer**

```tsx
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Elvis Okereke — AI Engineer",
  description:
    "AI/ML engineer building production RAG systems, LLM-powered apps, and applied ML tools. Full-stack, Toronto.",
  openGraph: {
    title: "Elvis Okereke — AI Engineer",
    description:
      "AI/ML engineer building production RAG systems, LLM-powered apps, and applied ML tools.",
    siteName: "Elvis Okereke",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="bg-background text-foreground font-sans antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 6: Verify in browser**

Run: `npm run dev`, open `http://localhost:3000`
Expected: near-black background, Header with GitHub/LinkedIn icons + Contact link visible at top, Footer arrow visible at bottom of the (currently empty) page, no console errors.

- [ ] **Step 7: Commit**

```bash
git add tailwind.config.js app/globals.css app/layout.tsx components/layout
git commit -m "feat: add design system theme, fonts, metadata, Header and Footer"
```

---

### Task 3: Typed content data layer

**Files:**
- Create: `lib/data/experience.ts`
- Create: `lib/data/skills.ts`
- Create: `lib/data/projects.ts`
- Create: `lib/data/otherProjects.ts`
- Create: `lib/data/threeDProducts.ts`

**Interfaces:**
- Produces:
  - `ExperienceSubRole { title: string; period: string; bullets: string[] }`, `ExperienceEntry { id: string; org: string; location: string; roles: ExperienceSubRole[] }`, `experience: ExperienceEntry[]` — consumed by Task 6.
  - `SkillCategory { category: string; items: string[] }`, `skills: SkillCategory[]` — consumed by Task 7.
  - `CaseStudy { problem: string; approach: string; architecture: string; results: string }`, `FlagshipProject { id: string; title: string; tagline: string; tags: string[]; image?: string; githubUrl?: string; liveUrl?: string; caseStudy: CaseStudy }`, `flagshipProjects: FlagshipProject[]` — consumed by Task 8.
  - `OtherProject { id: string; title: string; description: string; tags: string[]; githubUrl?: string }`, `otherProjects: OtherProject[]` — consumed by Task 9.
  - `ThreeDProduct { id: string; title: string; subtitle: string; modelPath: string; scale: number; initialRotation?: [number, number, number] }`, `threeDProducts: ThreeDProduct[]` — consumed by Tasks 10 and 11. `modelPath` values here name the **clean, space-free filenames** that Task 10 will produce (`/models/t3-to-2.5-vband.glb`, `/models/turbo.glb`, `/models/dssr.glb`, `/models/gauge-pod.glb`) — they do not need to exist on disk yet for this task's type-check to pass.

- [ ] **Step 1: Create `lib/data/experience.ts`**

```ts
export type ExperienceSubRole = {
  title: string;
  period: string;
  bullets: string[];
};

export type ExperienceEntry = {
  id: string;
  org: string;
  location: string;
  roles: ExperienceSubRole[];
};

export const experience: ExperienceEntry[] = [
  {
    id: "telus",
    org: "TELUS",
    location: "Canada",
    roles: [
      {
        title: "Software Developer L3",
        period: "Aug 2025 – Present",
        bullets: [
          "Lead development of SAiL, a Next.js suite hosted on GKE surfacing 200M+ SMB customer records and BigQuery insights in real time for internal teams and external dealers.",
          "Engineered a query-driven data sharding strategy for large, evolving datasets, achieving a 200%+ improvement in query speed across high-traffic apps.",
          "Own DevOps end-to-end across platforms: RBAC/SSO/OIDC auth, CI/CD pipelines, Apache Spark data pipelines, and infrastructure as code with Terraform, Pulumi, and Kong.",
          "Built Orbit, a Next.js app adopted by 330+ unique dealers for campaign monitoring, org KPIs, and order management.",
          "Designed and optimized a production Org Knowledge Base MCP server enabling RAG-based organizational knowledge retrieval, reducing LLM inference costs via context-window optimization, semantic chunking, and response caching.",
        ],
      },
    ],
  },
  {
    id: "canada-life",
    org: "Canada Life Inc.",
    location: "Toronto, Canada",
    roles: [
      {
        title: "Automation and Data Specialist II",
        period: "Jan 2025 – Apr 2025",
        bullets: [
          "Maintained large-scale distributed Java Spring and React/JavaScript microservices, building backend tools with REST APIs, Kafka pub/sub, and Plotly data visualization.",
          "Delivered fault-tolerant, highly available data automation tools using SQL, REST APIs, and Selenium.",
        ],
      },
      {
        title: "Automation and Data Specialist",
        period: "Jan 2024 – Apr 2024",
        bullets: [
          "Built a testing data dashboard that improved the efficiency of statistical data analysis for test leads, using SQL Server for storage and retrieval.",
          "Implemented a complete CI/CD pipeline with Kubernetes, Docker, and GitHub Actions, reducing deployment time and enabling more frequent releases.",
        ],
      },
    ],
  },
  {
    id: "microsoft",
    org: "Microsoft Corp.",
    location: "Toronto, Canada",
    roles: [
      {
        title: "Explore Intern",
        period: "May 2022 – Aug 2022",
        bullets: [
          "Built a cloud-native chatbot application using Azure AI services addressing 2 key business cases, improving customer service and earning 3 Azure certifications.",
        ],
      },
    ],
  },
];
```

- [ ] **Step 2: Create `lib/data/skills.ts`**

```ts
export type SkillCategory = {
  category: string;
  items: string[];
};

export const skills: SkillCategory[] = [
  {
    category: "Languages",
    items: ["Python", "TypeScript / JavaScript", "C#", "Java", "SQL", "C++", "Go", "Dart", "Rust", "C"],
  },
  {
    category: "Frameworks",
    items: ["Next.js", "React", "Vue", "ASP.NET Core", "FastAPI", "Flutter", "LangChain"],
  },
  {
    category: "AI & Cloud",
    items: ["OpenAI", "NVIDIA NIM", "RAG", "PyTorch", "Vertex AI Search", "AWS", "GCP", "Azure"],
  },
];
```

- [ ] **Step 3: Create `lib/data/projects.ts`**

```ts
export type CaseStudy = {
  problem: string;
  approach: string;
  architecture: string;
  results: string;
};

export type FlagshipProject = {
  id: string;
  title: string;
  tagline: string;
  tags: string[];
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  caseStudy: CaseStudy;
};

export const flagshipProjects: FlagshipProject[] = [
  {
    id: "ai-hq",
    title: "AI-HQ",
    tagline: "A full-stack AI chat platform with web search, image generation, and code execution.",
    tags: ["Next.js", "React Server Components", "Gemini", "NVIDIA NIM"],
    image: "/pics/aihq.png",
    githubUrl: "https://github.com/ElvisOkereke/AI-HQ",
    caseStudy: {
      problem:
        "Most self-hosted AI chat UIs are single-model and lose context between sessions, making them impractical as a daily driver.",
      approach:
        "Built on Next.js 15 with a React Server Component architecture so model responses stream directly from the server, routing between Google Gemini, NVIDIA NIM, and Hugging Face inference models depending on the task.",
      architecture:
        "Server Components handle chat orchestration and persistence; client components manage streaming UI state; auth and chat history persist per user across sessions.",
      results:
        "A daily-use chat platform supporting multi-turn conversations, image generation, and code generation across multiple model providers from one interface.",
    },
  },
  {
    id: "tennis-analyzer",
    title: "TennisAnalyzer",
    tagline: "An iOS app that gives LLM-based feedback on your tennis technique.",
    tags: ["Swift", "LLM", "CoreML"],
    githubUrl: "https://github.com/ElvisOkereke/TennisAnalyzer",
    caseStudy: {
      problem:
        "Amateur players rarely get structured, technical feedback on their swing without hiring a coach.",
      approach:
        "Built a native Swift app that records match play and feeds swing sequences to an LLM prompted on patterns from tracked matches at multiple skill levels.",
      architecture:
        "On-device capture and pre-processing, with model inference producing structured, technique-specific feedback (grip, follow-through, footwork) rather than generic commentary.",
      results:
        "A working iOS prototype that turns raw match footage into actionable, level-aware coaching feedback.",
    },
  },
  {
    id: "auto-subtitle-translate",
    title: "Auto Subtitle Translate",
    tagline: "A Chrome extension that generates and translates subtitles from audio in real time.",
    tags: ["TypeScript", "Chrome Extension", "Speech-to-Text", "Translation"],
    githubUrl: "https://github.com/ElvisOkereke/Auto_Subtitle_Translate_Extension",
    caseStudy: {
      problem:
        "Video content without subtitles, or in a foreign language, is inaccessible to a large chunk of viewers in real time.",
      approach:
        "Built a Chrome extension that captures page audio, transcribes it, and translates the transcription into the viewer's preferred language on the fly.",
      architecture:
        "The browser extension captures and streams audio to a transcription pipeline; translated captions render as an overlay synced to playback.",
      results:
        "Real-time, language-agnostic subtitles for any audio/video played in the browser, with no dependency on the source providing captions.",
    },
  },
];
```

- [ ] **Step 4: Create `lib/data/otherProjects.ts`**

```ts
export type OtherProject = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
};

export const otherProjects: OtherProject[] = [
  {
    id: "clips-gg",
    title: "Clips.gg",
    description: "A Rust + FFmpeg screen-recording and clipping app, similar to NVIDIA ShadowPlay.",
    tags: ["Rust", "FFmpeg"],
    githubUrl: "https://github.com/ElvisOkereke/Clips.gg",
  },
  {
    id: "lol-statcheck",
    title: "next15-LoL-StatCheck",
    description: "An OP.GG-style summoner lookup and stats web app.",
    tags: ["Next.js 15", "TypeScript"],
    githubUrl: "https://github.com/ElvisOkereke/next15-LoL-StatCheck",
  },
  {
    id: "lol-companion-tools",
    title: "League of Legends Companion Tools",
    description:
      "A family of companion apps and services for League of Legends and Teamfight Tactics, spanning Python, Go, and in-game overlays.",
    tags: ["Python", "Go"],
    githubUrl: "https://github.com/ElvisOkereke/LolCompanionApps",
  },
  {
    id: "datalogviewer2",
    title: "DataLogViewer2.0",
    description:
      "A cross-platform Flutter app that displays and classifies automotive sensor datalogs using a PyTorch Lightning LSTM.",
    tags: ["Flutter", "PyTorch"],
    githubUrl: "https://github.com/ElvisOkereke/flutter_logviewer",
  },
  {
    id: "capstone",
    title: "Minimizing Bias in LLMs",
    description:
      "Capstone project fine-tuning LLMs with LoRA and parameter-efficient techniques, reducing measured bias by 20%.",
    tags: ["Python", "PyTorch", "LoRA"],
    githubUrl: "https://github.com/ElvisOkereke/Capstone",
  },
];
```

- [ ] **Step 5: Create `lib/data/threeDProducts.ts`**

```ts
export type ThreeDProduct = {
  id: string;
  title: string;
  subtitle: string;
  modelPath: string;
  scale: number;
  initialRotation?: [number, number, number];
};

export const threeDProducts: ThreeDProduct[] = [
  {
    id: "vband-adapter",
    title: "Custom VBand Adapter",
    subtitle: "For M52 custom turbo kits — fits E36/E46/E38/E39 BMWs",
    modelPath: "/models/t3-to-2.5-vband.glb",
    scale: 0.08,
    initialRotation: [0, Math.PI / 2 + Math.PI / 4, 0],
  },
  {
    id: "turbo",
    title: "Turbo",
    subtitle: "Custom turbo build",
    modelPath: "/models/turbo.glb",
    scale: 0.1,
    initialRotation: [0, Math.PI / 2 + Math.PI / 4, 0],
  },
  {
    id: "dssr",
    title: "Dual Shear Shifter Linkage",
    subtitle: "E46 5-speed and 6-speed manual",
    modelPath: "/models/dssr.glb",
    scale: 0.15,
  },
  {
    id: "vent-gauge-pod",
    title: "Vent Gauge Pod",
    subtitle: "39mm/41mm gauges, E46 3 Series",
    modelPath: "/models/gauge-pod.glb",
    scale: 0.04,
    initialRotation: [0, -Math.PI / 2 - Math.PI / 4, 0],
  },
];
```

- [ ] **Step 6: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add lib/data
git commit -m "feat: add typed content data layer for experience, skills, projects, and 3D products"
```

---

### Task 4: Hero section

**Files:**
- Create: `components/sections/Hero.tsx`
- Modify: `app/page.tsx`
- Copy: `Elvis Okereke August 5th 26 RESUME.pdf` → `public/resume.pdf`

**Interfaces:**
- Consumes: `/pics/dp-min.jpg` (existing asset), `/resume.pdf` (this task's new asset).
- Produces: `<Hero />` with `id="hero"`, rendered first in `app/page.tsx` — the Footer's "back to top" link (Task 2) targets this id.

- [ ] **Step 1: Copy the resume PDF into `public/`**

Run: `cp "Elvis Okereke August 5th 26 RESUME.pdf" "public/resume.pdf"` (adjust source path to wherever the uploaded PDF currently lives on disk)
Expected: `public/resume.pdf` exists.

- [ ] **Step 2: Create `components/sections/Hero.tsx`**

```tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { Cursor, useTypewriter } from "react-simple-typewriter";

export default function Hero() {
  const [text] = useTypewriter({
    words: ["AI Engineer.", "Full-Stack Developer.", "Applied ML Builder."],
    loop: true,
    delaySpeed: 2000,
  });

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center text-center gap-8 px-6 relative overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
      />
      <Image
        src="/pics/dp-min.jpg"
        alt="Portrait of Elvis Okereke"
        width={320}
        height={320}
        priority
        className="relative rounded-full h-40 w-40 md:h-56 md:w-56 object-cover border border-white/10"
      />
      <div className="relative z-10 space-y-4">
        <h2 className="section-eyebrow">Elvis Okereke</h2>
        <h1 className="text-4xl md:text-6xl font-semibold min-h-[1.2em]">
          {text}
          <Cursor cursorColor="#f5a623" />
        </h1>
        <p className="max-w-xl mx-auto text-foreground/60">
          I build production ML/AI systems and the software around them — from RAG pipelines at
          scale to LLM-powered apps I ship myself.
        </p>
      </div>
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-4">
        <a href="/resume.pdf" download className="btn-primary">
          Download Resume
        </a>
        <Link href="#contact" className="btn-secondary">
          Contact Me
        </Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Wire into `app/page.tsx`**

```tsx
import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  );
}
```

- [ ] **Step 4: Verify in browser**

Run: `npm run dev`, open `http://localhost:3000`
Expected: full-height hero with portrait, cycling headline, working "Download Resume" (downloads `resume.pdf`) and "Contact Me" (scrolls to `#contact`, currently a no-op until Task 12 exists — acceptable at this stage) buttons.

- [ ] **Step 5: Commit**

```bash
git add components/sections/Hero.tsx app/page.tsx public/resume.pdf
git commit -m "feat: add Hero section with resume download"
```

---

### Task 5: About section

**Files:**
- Create: `components/sections/About.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `/pics/dp-min.jpg`.
- Produces: `<About />` with `id="about"`.

- [ ] **Step 1: Create `components/sections/About.tsx`**

```tsx
"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto px-6 py-24 grid gap-10 md:grid-cols-[240px_1fr] items-start"
    >
      <Image
        src="/pics/dp-min.jpg"
        alt="Elvis Okereke"
        width={480}
        height={480}
        className="rounded-lg object-cover w-full h-auto"
      />
      <div className="space-y-4">
        <h3 className="section-eyebrow">About</h3>
        <p className="text-foreground/80 leading-relaxed">
          I&apos;m a Computer Engineering graduate from Toronto Metropolitan University, currently
          building production ML/AI infrastructure as a Software Developer at TELUS — most recently
          a retrieval-augmented knowledge base that cut LLM inference costs through semantic
          chunking and response caching.
        </p>
        <p className="text-foreground/80 leading-relaxed">
          Outside of work I build my own ML-powered products end to end, from a Swift app that
          gives LLM-based feedback on tennis technique to a Chrome extension that generates and
          translates subtitles in real time. In school, I helped build fine-tuning pipelines that
          reduced measured bias in language models by 20% using LoRA and parameter-efficient
          fine-tuning.
        </p>
        <p className="text-foreground/80 leading-relaxed">
          I&apos;m based in Toronto and always happy to talk about anything ML, infra, or the
          occasional car project. Check out my code on{" "}
          <a
            href="https://github.com/ElvisOkereke"
            target="_blank"
            rel="noreferrer"
            className="text-accent underline"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </motion.section>
  );
}
```

- [ ] **Step 2: Wire into `app/page.tsx`**

```tsx
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
    </main>
  );
}
```

- [ ] **Step 3: Verify in browser**

Expected: About section renders below Hero with real paragraphs (no `<br/>` walls), a clickable GitHub link, fades in on scroll.

- [ ] **Step 4: Commit**

```bash
git add components/sections/About.tsx app/page.tsx
git commit -m "feat: add About section"
```

---

### Task 6: Experience section (vertical timeline)

**Files:**
- Create: `components/ui/ExperienceCard.tsx`
- Create: `components/sections/Experience.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `ExperienceEntry` from `lib/data/experience.ts` (Task 3).
- Produces: `<Experience />` with `id="experience"`. `ExperienceCard` takes a single prop `{ entry: ExperienceEntry }`.

- [ ] **Step 1: Create `components/ui/ExperienceCard.tsx`**

```tsx
import type { ExperienceEntry } from "@/lib/data/experience";

export default function ExperienceCard({ entry }: { entry: ExperienceEntry }) {
  return (
    <article className="relative pl-8 border-l border-white/10 pb-12 last:pb-0">
      <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
      <h4 className="text-xl font-semibold">{entry.org}</h4>
      <p className="text-sm text-foreground/50">{entry.location}</p>
      <div className="mt-4 space-y-6">
        {entry.roles.map((role) => (
          <div key={role.title + role.period}>
            <div className="flex flex-wrap items-baseline gap-x-3">
              <h5 className="font-medium text-foreground/90">{role.title}</h5>
              <span className="font-mono text-xs text-foreground/40 uppercase">{role.period}</span>
            </div>
            <ul className="mt-2 list-disc list-inside space-y-1 text-sm text-foreground/70">
              {role.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Create `components/sections/Experience.tsx`**

```tsx
"use client";
import { motion } from "framer-motion";
import { experience } from "@/lib/data/experience";
import ExperienceCard from "@/components/ui/ExperienceCard";

export default function Experience() {
  return (
    <motion.section
      id="experience"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto px-6 py-24"
    >
      <h3 className="section-eyebrow mb-10">Experience</h3>
      {experience.map((entry) => (
        <ExperienceCard key={entry.id} entry={entry} />
      ))}
    </motion.section>
  );
}
```

- [ ] **Step 3: Wire into `app/page.tsx`**

```tsx
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Experience />
    </main>
  );
}
```

- [ ] **Step 4: Verify in browser**

Expected: three timeline entries (TELUS, Canada Life with two roles, Microsoft) connected by a vertical line with dot markers, no horizontal scroll/carousel anywhere.

- [ ] **Step 5: Commit**

```bash
git add components/ui/ExperienceCard.tsx components/sections/Experience.tsx app/page.tsx
git commit -m "feat: add Experience section as a vertical timeline"
```

---

### Task 7: Skills section

**Files:**
- Create: `components/sections/Skills.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `SkillCategory[]` from `lib/data/skills.ts` (Task 3).
- Produces: `<Skills />` with `id="skills"`.

- [ ] **Step 1: Create `components/sections/Skills.tsx`**

```tsx
import { skills } from "@/lib/data/skills";

export default function Skills() {
  return (
    <section id="skills" className="max-w-4xl mx-auto px-6 py-24">
      <h3 className="section-eyebrow mb-10">Skills</h3>
      <div className="grid gap-10 sm:grid-cols-3">
        {skills.map((group) => (
          <div key={group.category}>
            <h4 className="font-mono text-xs uppercase tracking-widest text-accent mb-4">
              {group.category}
            </h4>
            <ul className="space-y-2 text-foreground/80">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into `app/page.tsx`** (insert after Experience; final ordering with Projects/3D happens in Task 13, so placement relative to those two is not yet final)

```tsx
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Experience />
      <Skills />
    </main>
  );
}
```

- [ ] **Step 3: Verify in browser**

Expected: three columns (Languages, Frameworks, AI & Cloud) with no hover-for-proficiency affordance and no icon grid.

- [ ] **Step 4: Commit**

```bash
git add components/sections/Skills.tsx app/page.tsx
git commit -m "feat: add Skills section grouped by resume categories"
```

---

### Task 8: Flagship Projects with case-study modal

**Files:**
- Create: `components/ui/Tag.tsx`
- Create: `components/ui/Modal.tsx`
- Create: `components/ui/ProjectCard.tsx`
- Create: `components/sections/ProjectCaseStudyModal.tsx`
- Create: `components/sections/Projects.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `FlagshipProject[]` from `lib/data/projects.ts` (Task 3).
- Produces: `<Modal isOpen: boolean, onClose: () => void, children: React.ReactNode>`, reused by any future dialog. `<Tag>` takes `children: React.ReactNode`. `<ProjectCard project: FlagshipProject, onViewCaseStudy: (project: FlagshipProject) => void>`. `<Projects />` with `id="projects"`.

- [ ] **Step 1: Create `components/ui/Tag.tsx`**

```tsx
export default function Tag({ children }: { children: React.ReactNode }) {
  return <span className="tag">{children}</span>;
}
```

- [ ] **Step 2: Create `components/ui/Modal.tsx`**

```tsx
"use client";
import { useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-lg border border-white/10 bg-[#111] p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-foreground/50 hover:text-accent"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        {children}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create `components/ui/ProjectCard.tsx`**

```tsx
"use client";
import Image from "next/image";
import Tag from "@/components/ui/Tag";
import type { FlagshipProject } from "@/lib/data/projects";

type ProjectCardProps = {
  project: FlagshipProject;
  onViewCaseStudy: (project: FlagshipProject) => void;
};

export default function ProjectCard({ project, onViewCaseStudy }: ProjectCardProps) {
  return (
    <article className="border border-white/10 rounded-lg overflow-hidden bg-white/5 flex flex-col">
      <div className="relative h-48 bg-white/5 flex items-center justify-center">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            className="object-cover"
          />
        ) : (
          <span className="font-mono text-sm text-foreground/30">{project.title}</span>
        )}
      </div>
      <div className="p-6 flex flex-col gap-3 flex-1">
        <h4 className="text-lg font-semibold">{project.title}</h4>
        <p className="text-sm text-foreground/70 flex-1">{project.tagline}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => onViewCaseStudy(project)}
            className="text-accent text-sm font-mono hover:underline"
          >
            View case study →
          </button>
          <div className="flex gap-3 text-sm text-foreground/50">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="hover:text-accent">
                GitHub
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="hover:text-accent">
                Live
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
```

- [ ] **Step 4: Create `components/sections/ProjectCaseStudyModal.tsx`**

```tsx
import Modal from "@/components/ui/Modal";
import Tag from "@/components/ui/Tag";
import type { FlagshipProject } from "@/lib/data/projects";

type ProjectCaseStudyModalProps = {
  project: FlagshipProject | null;
  onClose: () => void;
};

export default function ProjectCaseStudyModal({ project, onClose }: ProjectCaseStudyModalProps) {
  return (
    <Modal isOpen={project !== null} onClose={onClose}>
      {project && (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-semibold">{project.title}</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>
          <div className="space-y-4 text-sm text-foreground/80 leading-relaxed">
            <p>
              <span className="text-accent font-mono">Problem — </span>
              {project.caseStudy.problem}
            </p>
            <p>
              <span className="text-accent font-mono">Approach — </span>
              {project.caseStudy.approach}
            </p>
            <p>
              <span className="text-accent font-mono">Architecture — </span>
              {project.caseStudy.architecture}
            </p>
            <p>
              <span className="text-accent font-mono">Results — </span>
              {project.caseStudy.results}
            </p>
          </div>
          <div className="flex gap-4 pt-2">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn-secondary">
                View Code
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn-primary">
                Live Demo
              </a>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}
```

- [ ] **Step 5: Create `components/sections/Projects.tsx`**

```tsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { flagshipProjects, type FlagshipProject } from "@/lib/data/projects";
import ProjectCard from "@/components/ui/ProjectCard";
import ProjectCaseStudyModal from "@/components/sections/ProjectCaseStudyModal";

export default function Projects() {
  const [activeProject, setActiveProject] = useState<FlagshipProject | null>(null);

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto px-6 py-24"
    >
      <h3 className="section-eyebrow mb-10">Projects</h3>
      <div className="grid gap-6 md:grid-cols-3">
        {flagshipProjects.map((project) => (
          <ProjectCard key={project.id} project={project} onViewCaseStudy={setActiveProject} />
        ))}
      </div>
      <ProjectCaseStudyModal project={activeProject} onClose={() => setActiveProject(null)} />
    </motion.section>
  );
}
```

- [ ] **Step 6: Wire into `app/page.tsx`**

```tsx
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
    </main>
  );
}
```

- [ ] **Step 7: Verify in browser**

Expected: three project cards (AI-HQ with a real screenshot, TennisAnalyzer and Auto Subtitle Translate with title placeholders since they have no `image`), clicking "View case study" opens a modal with problem/approach/architecture/results, `Escape` and backdrop click close it, page scroll position is unaffected by opening/closing.

- [ ] **Step 8: Commit**

```bash
git add components/ui/Tag.tsx components/ui/Modal.tsx components/ui/ProjectCard.tsx components/sections/ProjectCaseStudyModal.tsx components/sections/Projects.tsx app/page.tsx
git commit -m "feat: add flagship Projects section with case-study modal"
```

---

### Task 9: Other Projects section

**Files:**
- Create: `components/ui/OtherProjectCard.tsx`
- Create: `components/sections/OtherProjects.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `OtherProject[]` from `lib/data/otherProjects.ts` (Task 3).
- Produces: `<OtherProjects />` with `id="other-projects"`.

- [ ] **Step 1: Create `components/ui/OtherProjectCard.tsx`**

```tsx
import Tag from "@/components/ui/Tag";
import type { OtherProject } from "@/lib/data/otherProjects";

export default function OtherProjectCard({ project }: { project: OtherProject }) {
  return (
    <a
      href={project.githubUrl}
      target="_blank"
      rel="noreferrer"
      className="block border border-white/10 rounded-lg p-5 hover:border-accent/50 transition-colors"
    >
      <h5 className="font-medium">{project.title}</h5>
      <p className="text-sm text-foreground/60 mt-1">{project.description}</p>
      <div className="flex flex-wrap gap-2 mt-3">
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </a>
  );
}
```

- [ ] **Step 2: Create `components/sections/OtherProjects.tsx`**

```tsx
import { otherProjects } from "@/lib/data/otherProjects";
import OtherProjectCard from "@/components/ui/OtherProjectCard";

export default function OtherProjects() {
  return (
    <section id="other-projects" className="max-w-6xl mx-auto px-6 py-24">
      <h3 className="section-eyebrow mb-10">Other Projects</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {otherProjects.map((project) => (
          <OtherProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Wire into `app/page.tsx`**

```tsx
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import OtherProjects from "@/components/sections/OtherProjects";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <OtherProjects />
    </main>
  );
}
```

- [ ] **Step 4: Verify in browser**

Expected: a grid of five lightweight cards (Clips.gg, next15-LoL-StatCheck, LoL Companion Tools, DataLogViewer2.0, capstone bias project), each linking out to GitHub, no case-study depth.

- [ ] **Step 5: Commit**

```bash
git add components/ui/OtherProjectCard.tsx components/sections/OtherProjects.tsx app/page.tsx
git commit -m "feat: add Other Projects section"
```

---

### Task 10: 3D model asset prep — compression and clean filenames

**Files:**
- Modify (rename + compress in place): `public/models/T3 to 2.5 VBand v2.glb` → `public/models/t3-to-2.5-vband.glb`
- Modify (rename + compress in place): `public/models/turbo.glb` → `public/models/turbo.glb` (compressed, same name)
- Modify (rename + compress in place): `public/models/DSSRfix.glb` → `public/models/dssr.glb`
- Modify (rename + compress in place): `public/models/GaugePod.glb` → `public/models/gauge-pod.glb`

**Interfaces:**
- Produces: four compressed `.glb` files at the exact paths referenced by `threeDProducts` in `lib/data/threeDProducts.ts` (Task 3) — `/models/t3-to-2.5-vband.glb`, `/models/turbo.glb`, `/models/dssr.glb`, `/models/gauge-pod.glb`. Consumed by Task 11.

- [ ] **Step 1: Install `gltf-transform` CLI as a one-off dev tool**

Run: `npm install --no-save @gltf-transform/cli`
Expected: install completes.

- [ ] **Step 2: Compress and rename each model with Draco compression**

```bash
npx gltf-transform draco "public/models/T3 to 2.5 VBand v2.glb" "public/models/t3-to-2.5-vband.glb"
npx gltf-transform draco "public/models/turbo.glb" "public/models/turbo.glb.tmp" && mv "public/models/turbo.glb.tmp" "public/models/turbo.glb"
npx gltf-transform draco "public/models/DSSRfix.glb" "public/models/dssr.glb"
npx gltf-transform draco "public/models/GaugePod.glb" "public/models/gauge-pod.glb"
```

Expected: each command prints a before/after size summary with the output smaller than the input.

- [ ] **Step 3: Remove the old, now-renamed source files that are no longer needed**

```bash
rm -f "public/models/T3 to 2.5 VBand v2.glb" "public/models/DSSRfix.glb" "public/models/GaugePod.glb"
```

(`turbo.glb` keeps its name, so nothing extra to remove for it.)

- [ ] **Step 4: Verify final asset set**

Run: `ls -la public/models/`
Expected: exactly four files — `t3-to-2.5-vband.glb`, `turbo.glb`, `dssr.glb`, `gauge-pod.glb` — with a combined size smaller than the original 8.3MB total.

- [ ] **Step 5: Commit**

```bash
git add public/models
git commit -m "chore: compress and rename 3D model assets for the showcase"
```

---

### Task 11: 3D Interactive Showcase (lazy-loaded, IntersectionObserver-gated)

**Files:**
- Create: `components/sections/ThreeDShowcaseCanvas.tsx`
- Create: `components/sections/ThreeDShowcase.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `ThreeDProduct[]` from `lib/data/threeDProducts.ts` (Task 3), the compressed models from Task 10, `/pics/garageback.jpg` (existing asset, used as the poster fallback image — confirm it exists; if not, substitute any existing wide photo under `public/pics/`).
- Produces: `<ThreeDShowcase />` with `id="engineering"`, default-exported `ThreeDShowcaseCanvas` (only ever imported via `next/dynamic`, never directly, so it is excluded from the initial JS bundle).

- [ ] **Step 1: Create `components/sections/ThreeDShowcaseCanvas.tsx`**

```tsx
"use client";
import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, useGLTF } from "@react-three/drei";
import { threeDProducts } from "@/lib/data/threeDProducts";

function Model({ modelPath, scale }: { modelPath: string; scale: number }) {
  const { scene } = useGLTF(modelPath);
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  return <primitive object={clonedScene} scale={scale} />;
}

const RADIUS = 3;
const positioned = threeDProducts.map((product, index) => {
  const angle = (index / threeDProducts.length) * Math.PI * 2;
  const x = RADIUS * Math.sin(angle);
  const z = RADIUS * Math.cos(angle);
  const rotation = product.initialRotation ?? ([0, Math.atan2(-x, -z), 0] as [number, number, number]);
  return { ...product, position: [x, 0, z] as [number, number, number], rotation };
});

function Scene() {
  const controlsRef = useRef<any>(null);
  const prefersReducedMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  useFrame(() => {
    if (prefersReducedMotion) return;
    if (controlsRef.current && !controlsRef.current.dragging) {
      const angle = 0.001;
      const target = controlsRef.current.target;
      const rotatedX = target.x * Math.cos(angle) - target.z * Math.sin(angle);
      const rotatedZ = target.x * Math.sin(angle) + target.z * Math.cos(angle);
      target.set(rotatedX, target.y, rotatedZ);
      controlsRef.current.update();
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 10]} intensity={0.6} />
      <directionalLight position={[-10, 10, -10]} intensity={0.4} />
      {positioned.map((product) => (
        <group key={product.id} position={product.position} rotation={product.rotation}>
          <Model modelPath={product.modelPath} scale={product.scale} />
        </group>
      ))}
      <OrbitControls ref={controlsRef} enablePan={false} maxPolarAngle={Math.PI / 1.8} />
    </>
  );
}

export default function ThreeDShowcaseCanvas() {
  return (
    <Canvas camera={{ position: [0, RADIUS * 1.5, RADIUS * 2.5], fov: 50 }}>
      <color attach="background" args={["#0a0a0a"]} />
      <Suspense
        fallback={
          <Html center className="font-mono text-sm text-foreground/50">
            Loading models…
          </Html>
        }
      >
        <Scene />
      </Suspense>
    </Canvas>
  );
}
```

- [ ] **Step 2: Create `components/sections/ThreeDShowcase.tsx`**

```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

const ThreeDShowcaseCanvas = dynamic(() => import("./ThreeDShowcaseCanvas"), {
  ssr: false,
  loading: () => <PosterFallback />,
});

function PosterFallback() {
  return (
    <div className="relative h-[420px] w-full flex items-center justify-center bg-white/5 rounded-lg overflow-hidden">
      <Image
        src="/pics/garageback.jpg"
        alt="Preview of interactive 3D BMW parts showcase"
        fill
        className="object-cover opacity-40"
      />
      <span className="relative font-mono text-sm text-foreground/70">
        Loading interactive models…
      </span>
    </div>
  );
}

export default function ThreeDShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldMount(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="engineering" className="max-w-6xl mx-auto px-6 py-24">
      <h3 className="section-eyebrow mb-2">Also — I design and build physical things</h3>
      <p className="text-foreground/60 mb-8 max-w-2xl">
        A few BMW performance parts I&apos;ve designed and 3D printed for my own car, rendered here
        as interactive models. Drag to rotate, scroll to zoom.
      </p>
      <div ref={containerRef} className="h-[420px] w-full rounded-lg overflow-hidden">
        {shouldMount ? <ThreeDShowcaseCanvas /> : <PosterFallback />}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Wire into `app/page.tsx`, positioned after Projects per the approved IA**

```tsx
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import ThreeDShowcase from "@/components/sections/ThreeDShowcase";
import Skills from "@/components/sections/Skills";
import OtherProjects from "@/components/sections/OtherProjects";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <ThreeDShowcase />
      <Skills />
      <OtherProjects />
    </main>
  );
}
```

- [ ] **Step 4: Verify lazy-loading behavior in the browser**

Run: `npm run dev`, open DevTools → Network tab, reload the page, do not scroll
Expected: no `three`/`@react-three` chunk requests fire until scrolling the "Also — I design and build physical things" section within ~200px of the viewport; the poster image is visible until then. Once mounted, drag rotates the camera, scroll zooms, and the four parts idle-auto-rotate around the group unless `prefers-reduced-motion` is enabled in the OS (verify by toggling it in DevTools' Rendering tab → "Emulate CSS media feature prefers-reduced-motion").

- [ ] **Step 5: Commit**

```bash
git add components/sections/ThreeDShowcaseCanvas.tsx components/sections/ThreeDShowcase.tsx app/page.tsx
git commit -m "feat: add lazy-loaded 3D Interactive Showcase section"
```

---

### Task 12: Contact section, API route, and Resend integration

**Files:**
- Create: `components/sections/Contact.tsx`
- Create: `app/api/contact/route.ts`
- Create: `vitest.config.ts`
- Create: `tests/api/contact.test.ts`
- Modify: `app/page.tsx`
- Modify: `.env.local` (developer-provided, not committed)

**Interfaces:**
- Produces: `POST(request: Request): Promise<Response>` and `validateContactPayload(payload: Partial<ContactPayload>): string | null` exported from `app/api/contact/route.ts`, where `ContactPayload = { name: string; email: string; subject: string; message: string }`. `<Contact />` with `id="contact"`, posts JSON matching `ContactPayload` to `/api/contact`.

- [ ] **Step 1: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "node",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
});
```

- [ ] **Step 2: Write the failing test — `tests/api/contact.test.ts`**

```ts
import { describe, expect, it, vi, beforeEach } from "vitest";

const sendMock = vi.fn();

vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: { send: sendMock },
  })),
}));

import { POST, validateContactPayload } from "@/app/api/contact/route";

describe("validateContactPayload", () => {
  it("rejects a missing name", () => {
    expect(
      validateContactPayload({ email: "a@b.com", subject: "hi", message: "hi" })
    ).toMatch(/name/i);
  });

  it("rejects an invalid email", () => {
    expect(
      validateContactPayload({ name: "A", email: "not-an-email", subject: "hi", message: "hi" })
    ).toMatch(/email/i);
  });

  it("accepts a valid payload", () => {
    expect(
      validateContactPayload({ name: "A", email: "a@b.com", subject: "hi", message: "hi" })
    ).toBeNull();
  });
});

describe("POST /api/contact", () => {
  beforeEach(() => {
    sendMock.mockReset();
    process.env.CONTACT_TO_EMAIL = "elvisokereke.eo@gmail.com";
    process.env.RESEND_API_KEY = "test-key";
  });

  it("returns 400 for an invalid payload", async () => {
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify({ name: "", email: "", subject: "", message: "" }),
    });
    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it("sends an email and returns success for a valid payload", async () => {
    sendMock.mockResolvedValue({ data: { id: "123" }, error: null });
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify({ name: "A", email: "a@b.com", subject: "Hi", message: "Hello" }),
    });
    const response = await POST(request);
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body).toEqual({ success: true });
    expect(sendMock).toHaveBeenCalledTimes(1);
  });
});
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `npx vitest run tests/api/contact.test.ts`
Expected: FAIL — `app/api/contact/route.ts` does not exist yet.

- [ ] **Step 4: Create `app/api/contact/route.ts`**

```ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function validateContactPayload(payload: Partial<ContactPayload>): string | null {
  if (!payload.name?.trim()) return "Name is required.";
  if (!payload.email || !EMAIL_REGEX.test(payload.email)) return "A valid email is required.";
  if (!payload.subject?.trim()) return "Subject is required.";
  if (!payload.message?.trim()) return "Message is required.";
  return null;
}

export async function POST(request: Request) {
  const payload = (await request.json()) as Partial<ContactPayload>;
  const validationError = validateContactPayload(payload);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: process.env.CONTACT_TO_EMAIL!,
    replyTo: payload.email,
    subject: `[Portfolio] ${payload.subject}`,
    text: `From: ${payload.name} <${payload.email}>\n\n${payload.message}`,
  });

  if (error) {
    return NextResponse.json({ error: "Failed to send message." }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `npx vitest run tests/api/contact.test.ts`
Expected: PASS, all 5 assertions green.

- [ ] **Step 6: Create `components/sections/Contact.tsx`**

```tsx
"use client";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/solid";

type ContactFormInputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const { register, handleSubmit, reset } = useForm<ContactFormInputs>();
  const [status, setStatus] = useState<SubmitState>("idle");

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="max-w-2xl mx-auto px-6 py-24 text-center">
      <h3 className="section-eyebrow mb-4">Contact</h3>
      <h4 className="text-3xl font-semibold mb-8">
        Open to ML/AI roles — <span className="text-accent">let&apos;s talk</span>
      </h4>
      <div className="flex flex-col items-center gap-3 mb-10 text-foreground/70">
        <div className="flex items-center gap-2">
          <EnvelopeIcon className="h-5 w-5 text-accent" />
          <span>elvisokereke.eo@gmail.com</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPinIcon className="h-5 w-5 text-accent" />
          <span>Toronto, Canada</span>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 text-left">
        <div className="grid gap-3 sm:grid-cols-2">
          <input {...register("name", { required: true })} placeholder="Name" className="contact-input" />
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Email"
            className="contact-input"
          />
        </div>
        <input {...register("subject", { required: true })} placeholder="Subject" className="contact-input" />
        <textarea
          {...register("message", { required: true })}
          placeholder="Message"
          rows={5}
          className="contact-input"
        />
        <button type="submit" disabled={status === "submitting"} className="btn-primary w-full text-center">
          {status === "submitting" ? "Sending…" : "Send Message"}
        </button>
        {status === "success" && <p className="text-sm text-accent">Thanks — I&apos;ll get back to you soon.</p>}
        {status === "error" && (
          <p className="text-sm text-red-400">Something went wrong — email me directly instead.</p>
        )}
      </form>
    </section>
  );
}
```

- [ ] **Step 7: Add the `test` script check and wire Contact into `app/page.tsx`**

```tsx
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import ThreeDShowcase from "@/components/sections/ThreeDShowcase";
import Skills from "@/components/sections/Skills";
import OtherProjects from "@/components/sections/OtherProjects";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <ThreeDShowcase />
      <Skills />
      <OtherProjects />
      <Contact />
    </main>
  );
}
```

- [ ] **Step 8: Set up a real Resend account for manual verification**

Sign up at resend.com (free tier, no credit card), create an API key, and set in `.env.local` (not committed):

```
RESEND_API_KEY=re_your_real_key
CONTACT_TO_EMAIL=elvisokereke.eo@gmail.com
```

- [ ] **Step 9: Manually verify end-to-end send**

Run: `npm run dev`, fill out the contact form in the browser, submit
Expected: success message appears, and an email arrives at `CONTACT_TO_EMAIL` from `onboarding@resend.dev` with the submitted content (Resend's sandbox sender works without a verified custom domain, per the spec's "leave domain alone for now" decision).

- [ ] **Step 10: Commit**

```bash
git add components/sections/Contact.tsx app/api/contact/route.ts vitest.config.ts tests/api/contact.test.ts app/page.tsx
git commit -m "feat: add Contact section with Resend-backed API route and tests"
```

---

### Task 13: Final page assembly and end-to-end navigation check

**Files:**
- Modify: `app/page.tsx` (confirm final order only — no new sections)

**Interfaces:**
- Consumes: every section component from Tasks 4–12.
- Produces: the final `app/page.tsx` matching the approved Information Architecture order exactly: Hero, About, Experience, Flagship Projects, 3D Showcase, Skills, Other Projects, Contact.

- [ ] **Step 1: Confirm `app/page.tsx` matches the final order**

```tsx
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import ThreeDShowcase from "@/components/sections/ThreeDShowcase";
import Skills from "@/components/sections/Skills";
import OtherProjects from "@/components/sections/OtherProjects";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <ThreeDShowcase />
      <Skills />
      <OtherProjects />
      <Contact />
    </main>
  );
}
```

(This should already be true after Task 12's Step 7 — this task is the checkpoint that verifies nothing drifted.)

- [ ] **Step 2: Click through every header/footer navigation link**

Run: `npm run dev`
Expected: Header's "Contact" link scrolls to the Contact section; Footer's "back to top" arrow scrolls to Hero; smooth-scroll behavior (from `app/globals.css`'s `html { scroll-behavior: smooth }`) is active throughout.

- [ ] **Step 3: Full-page visual scroll-through at desktop and mobile widths**

Run: `npm run dev`, use DevTools device toolbar to check at 375px, 768px, and 1440px widths
Expected: no horizontal scrollbars, no overlapping text, no section fighting for full-viewport height (the old `h-screen` snap-scroll problem is gone since every section now uses natural content height + padding).

- [ ] **Step 4: Commit** (only if Step 1 required a fix; otherwise skip — nothing to commit)

```bash
git add app/page.tsx
git commit -m "chore: confirm final section order matches approved information architecture"
```

---

### Task 14: Full-site QA pass — accessibility, metadata, responsiveness

**Files:**
- Modify: any `alt` text, image dimension, or metadata gaps found during this pass (exact files depend on findings)

**Interfaces:**
- Consumes: the fully assembled site from Task 13.
- Produces: no new components — this task is a verification-and-fix pass against the spec's Non-Functional Cleanup requirements.

- [ ] **Step 1: Audit every `<Image>` for real `alt` text and correct intrinsic `width`/`height` (or `fill` with a sized parent)**

Run: `grep -rn "alt=\"\"\|alt={''}\|<Image" components app | grep -i image`
Expected: every `<Image>` usage has non-empty, descriptive `alt` text (already true for all components written in Tasks 4–11 — this step is the verification, not new writing). Fix any gap found.

- [ ] **Step 2: Verify Open Graph metadata renders**

Run: `npm run build && npm run start`, then fetch the page source: `curl -s http://localhost:3000 | grep -i "og:"`
Expected: `og:title`, `og:description`, `og:type` tags present in the rendered HTML `<head>`.

- [ ] **Step 3: Confirm no phone number appears anywhere on the rendered page**

Run: `grep -rn "\+1\|\+437\|phone" components app | grep -vi "placeholder\|@heroicons"`
Expected: no output referencing a personal phone number — Contact section only shows email and city (per Task 12).

- [ ] **Step 4: Confirm no `eslint-disable` comments remain**

Run: `grep -rn "eslint-disable" components app lib`
Expected: no output.

- [ ] **Step 5: Run lint**

Run: `npm run lint`
Expected: no errors (warnings acceptable if pre-existing from `eslint-config-next` defaults, but no `no-unused-vars` or `react/jsx-key` warnings — every list render in Tasks 3–12 uses stable `key` props already).

- [ ] **Step 6: Commit any fixes found**

```bash
git add -A
git commit -m "fix: accessibility, metadata, and lint cleanup from QA pass"
```

(If Steps 1–5 found nothing to fix, skip this commit.)

---

### Task 15: Final production build verification

**Files:**
- None (verification-only task)

**Interfaces:**
- Consumes: the complete site from Tasks 1–14.
- Produces: a confirmed-clean production build artifact, ready for deployment to Vercel.

- [ ] **Step 1: Full type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 2: Full test suite**

Run: `npm test`
Expected: all tests pass (the contact API route tests from Task 12).

- [ ] **Step 3: Production build**

Run: `npm run build`
Expected: build completes successfully with no errors; note the reported First Load JS for `/` — the 3D showcase bundle (`three`, `@react-three/fiber`, `@react-three/drei`) should NOT appear in this number since it's dynamically imported with `ssr: false` (it will appear as a separate on-demand chunk instead).

- [ ] **Step 4: Smoke-test the production build locally**

Run: `npm run start`, open `http://localhost:3000`
Expected: identical behavior to `npm run dev` — all sections render, modal opens/closes, 3D showcase lazy-loads on scroll, contact form submits successfully.

- [ ] **Step 5: Confirm `RESEND_API_KEY` and `CONTACT_TO_EMAIL` are set in the Vercel project's environment variables before deploying**

This is a manual dashboard step on vercel.com — no code change. Both variables must be present in the Production environment or the contact form will 500 in production.

- [ ] **Step 6: Final commit (if any last-mile fixes were needed) and confirm working tree is clean**

Run: `git status`
Expected: clean working tree, all prior task commits present in `git log`.
