# Portfolio Revamp — Design

**Date:** 2026-08-05
**Status:** Approved for planning

## Context

The existing portfolio (`Portfolio` repo) is a Next.js 13 (Pages Router) site built from the well-known "JS Mastery / Sonny Sangha" Next.js + Tailwind + Sanity portfolio tutorial, essentially unmodified in structure. An audit found:

**Content problems:**
- Showcases outdated work (Microsoft internship, older projects) while omitting recent, more relevant work: the current TELUS Software Developer L3 role (RAG/MCP server work, distributed GKE apps, 330+ dealer adoption), Canada Life automation work, and self-directed ML/AI projects (TennisAnalyzer, AI-HQ, Auto-Subtitle-Translate-Extension) — all absent from the live site despite being on GitHub/resume.
- About section is a wall of `<br/>`-separated text with a non-clickable raw GitHub URL.
- No resume download.
- Personal phone number hardcoded in plaintext on the page (scrapeable).
- Hero typewriter mixes "Entrepreneur" / "carLover" into professional messaging without a clear frame.

**UX problems:**
- Full-`h-screen` snap-scroll sections fight content overflow and mobile scroll physics.
- Horizontal-scroll carousels for Experience and Projects nested inside vertical snap-scroll — a documented "scroll trap" pattern.
- Projects section shows only an image + 3 bullets; no case-study depth, no tech-stack tags, no live/repo link distinction.
- Contact form uses a `mailto:` hack (`window.location.href = 'mailto:...'`) instead of actually sending anything — silently fails without a configured local mail client.
- The 3D car-parts showcase (Three.js/React Three Fiber BMW turbo/shifter/gauge-pod models) is a real technical differentiator but lives on an orphan page (`/LVBTProducts`) not linked from navigation.

**Engineering problems:**
- Next.js 13.2 / React 18.2 / TS 4.9 — three years stale relative to current tooling.
- Sanity CMS fully wired (`sanity.ts`, `/sanity` schema folder, `next-sanity`, `@sanity/image-url`, `@portabletext/react`) but never actually used — dead code and dependencies.
- `react-tooltip` and `react-responsive-carousel` installed but never imported.
- Default Next.js starter file `pages/api/hello.ts` still present, untouched.
- `/* eslint-disable react/jsx-key */` in `Projects.tsx` suppressing a real missing-`key` bug instead of fixing it.
- Images loaded with mismatched intrinsic dimensions (e.g. `height=3024 width=4032` rendered at ~320px).
- Near-universal `alt=""` on content images.
- No meta description / Open Graph tags — shared links render with no preview.

## Goal

Rebuild the portfolio to position Elvis as an ML/AI engineer with real production experience, for an audience of technical recruiters/hiring managers doing a fast skim (60-90 seconds) with room to go deeper on specific projects. Tone: professional-first with personality accents, not a resume-as-website clone of a tutorial template.

## Tech Stack

- **Framework:** Next.js 15, App Router, TypeScript
- **Styling:** Tailwind CSS
- **3D:** React Three Fiber + drei (carried over from current site, reused for the BMW parts showcase)
- **Motion:** Framer Motion for scroll/reveal animation
- **Content storage:** No CMS. Content lives in typed local data files (e.g. `lib/data/projects.ts`, `lib/data/experience.ts`, `lib/data/skills.ts`). Sanity is fully removed — it was wired in but never used, and portfolio content changes infrequently enough that editing typed data files directly is simpler than maintaining a CMS.
- **Contact form backend:** Next.js API route (`app/api/contact/route.ts`) posting via Resend (free tier: 3,000 emails/month, no credit card required) rather than a third-party form service, to keep the site self-contained without external branding.
- **Deployment:** Vercel, same domain as today (no custom domain in this pass).

## Information Architecture

Single long-scroll page (one URL), in this order:

1. **Hero** — name, title ("AI Engineer — Full-Stack & Applied ML"), a short rotating tagline (professional-first; drop "carLover"/"Entrepreneur" framing), CTAs for Resume download and Contact. Includes a small ambient 3D element (see "3D Showcase" section — the hero-adjacent element is part of the same lazy-loaded 3D system, not a second independent 3D scene).
2. **About** — rewritten as real paragraphs, no `<br/>` walls, clickable GitHub link. Capstone bias-mitigation work gets a brief mention here rather than being a headline project.
3. **Experience** — mirrors the resume exactly:
   - Software Developer L3, TELUS (Aug 2025–present)
   - Automation and Data Specialist II + Automation and Data Specialist, Canada Life (Jan 2024–Apr 2025) — likely merged into one card with two bullet groups for the two stints
   - Explore Intern, Microsoft (May 2022–Aug 2022)
   - No LVBT (car-parts business) or Tutoring cards — those aren't on the resume and are dropped for narrative consistency.
   - Cards replace the old horizontal-scroll-trap carousel with a vertical timeline or responsive grid (exact pattern decided during implementation; will confirm with a quick visual check if it's ambiguous once real content is in place).
4. **Flagship Projects** — exactly three: **AI-HQ**, **TennisAnalyzer**, **Auto-Subtitle-Translate-Extension**. Each rendered as a card (demo media, 1-2 line pitch, tech tags, links) with a "View case study" action that opens a modal/lightbox containing the full write-up (problem, approach, architecture, results) and a media carousel. Modal closes back to the same scroll position.
5. **3D Interactive Showcase** — BMW car-parts models (turbo, DSSR shifter linkage, vent gauge pod), presented as a distinct section (e.g. "I also design and build physical things") rather than an orphan page. See performance requirements below.
6. **Skills** — recategorized to match the resume's grouping: Languages, Frameworks, AI & Cloud. Replaces the ungrouped icon grid and removes the non-functional "hover for proficiency" affordance.
7. **Other Projects** — lightweight grid, no case-study depth, just title/one-liner/tags/links:
   - Clips.gg (Rust + FFmpeg screen recording/clips app)
   - next15-LoL-StatCheck
   - League of Legends companion tools, bundled as a single entry (LolCompanionApps, golangTFTsite, tftMatchHistory)
   - DataLogViewer2.0 (Flutter)
   - SWE Capstone Project — Minimizing Bias in LLMs (downgraded from flagship to here)
8. **Contact** — email address + contact form (see backend above). No phone number displayed anywhere on the page (resume PDF is the only place the phone number appears).

## Visual Design System

- **Direction:** "Technical Minimal"
- **Background:** near-black (`#0a0a0a`)
- **Text:** light gray / white
- **Accent color:** warm amber (`#f5a623`) — used for links, CTAs, tags, and highlights; a continuity thread from the current site's brand color
- **Typography:** monospace accents for labels/eyebrow text (e.g. section headers, tags), clean sans body font for readability
- **Motion:** restrained — scroll-reveal via Framer Motion, no gratuitous animation

## 3D Showcase — Performance Requirements

This is a hard requirement, not a nice-to-have, per explicit direction: the 3D piece must never lag or block the rest of the page.

- Dynamically imported via `next/dynamic` with `ssr: false` — the Three.js/R3F bundle is not part of the initial page load.
- Canvas only mounts when the section scrolls near-into-view, gated by `IntersectionObserver` (not eagerly on page load).
- GLTF models compressed (Draco or meshopt) to reduce transfer size relative to the current uncompressed `.glb` files.
- A static poster image is shown as a placeholder in the section until the Canvas has mounted, so there's no layout jank or blank space.
- Idle auto-rotate behavior respects `prefers-reduced-motion`.

## Content Assets

- **Resume:** the provided PDF (`Elvis Okereke August 5th 26 RESUME.pdf`) is used as-is for a "Download Resume" button — no redesign/reformatting in this pass.
- **Project media:** screenshots/demo captures needed for AI-HQ, TennisAnalyzer, and the subtitle extension case studies (to be sourced/created during implementation).

## Non-Functional Cleanup

Carried over from the audit, to be fixed as part of the rewrite (not deferred):

- Remove Sanity entirely (`sanity.ts`, `/sanity` folder, `next-sanity`, `@sanity/image-url`, `@portabletext/react` deps).
- Remove unused deps: `react-tooltip`, `react-responsive-carousel`, `react-simple-typewriter` (if not reused), `lamina` (if not reused).
- Remove leftover default-starter scaffolding (`pages/api/hello.ts` or equivalent).
- All images use correct intrinsic dimensions and real, descriptive `alt` text.
- No `eslint-disable` workarounds for real bugs (e.g. missing `key` props) — fix root cause.
- Add proper `<head>` metadata: title, description, Open Graph tags, so shared links render previews correctly.

## Testing Approach

No existing test suite to preserve. Given this is a visually-driven marketing/portfolio site rather than an app with complex business logic, verification will be: type-checking, a clean production build, and manual in-browser review at implementation milestones (per section) rather than a full component/E2E test suite. This can be revisited if a specific area (e.g. the contact form API route) warrants a targeted test.

## Out of Scope (this pass)

- Custom domain (staying on current Vercel domain)
- Light-mode toggle (dark only)
- Blog/writing section
- Resume redesign (shipping the provided PDF as-is)
