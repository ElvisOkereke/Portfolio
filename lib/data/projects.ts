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
    id: "pitchlab",
    title: "PitchLab",
    tagline:
      "An AI research pipeline that finds small-business ideas from real demand on the web and turns the best into evidence-backed business cases.",
    tags: ["TypeScript", "LLM pipelines", "Evals", "Next.js"],
    githubUrl: "https://github.com/ElvisOkereke/PitchLab",
    caseStudy: {
      problem:
        "LLMs will happily invent market sizes, competitors and sources. I wanted a steady supply of startup ideas I could actually trust enough to pitch, and an honest way to kill the weak ones.",
      approach:
        "A multi-stage pipeline harvests real complaints and demand signals, generates and dedupes ideas, screens them, and writes full business cases. Every claim is checked against the page it cites, borderline claims go to an LLM judge, and all numbers are computed by code from stated inputs.",
      architecture:
        "A TypeScript monorepo: a core pipeline package, a crash-safe multi-worker job queue, per-stage model routing with cost tracking, hardened web fetching, a research library, and a private dashboard. A scorecard compares idea quality against a frozen baseline so changes are measured, not guessed.",
      results:
        "End-to-end runs produce sourced, cost-tracked business cases plus a validation pack and landing page for testing with real buyers. 1,300+ tests. In active development.",
    },
  },
  {
    id: "datalogviewer",
    title: "DataLogViewer",
    tagline:
      "A fast, private car datalog viewer in the browser. I use it to tune my own car.",
    tags: ["TypeScript", "React", "Web Workers", "uPlot"],
    image: "/pics/datalogviewer.png",
    githubUrl: "https://github.com/ElvisOkereke/datalogviewer",
    liveUrl: "https://elvisokereke.github.io/datalogviewer/",
    caseStudy: {
      problem:
        "Tuning logs are huge, messy CSV exports, and most viewers are slow desktop apps or upload your data to a server.",
      approach:
        "Everything runs client-side. Parsing happens in a Web Worker and hands columns back as transferable typed arrays, so the UI never blocks. Charts downsample in a way that keeps every spike visible, and a small formula language adds calculated channels like smooth([MAP], 5).",
      architecture:
        "Vite + React 19 + Zustand, uPlot for synced time-series charts, lazy-loaded Plotly for scatter, and a forgiving CSV parser for delimiters, decimal commas, unit rows and preambles. Vitest + Playwright, with CI and deploys via GitHub Actions.",
      results:
        "A 1,000,000-row log loads in about two seconds and zooms smoothly. 400+ tests, live on GitHub Pages, no server and no account.",
    },
  },
  {
    id: "jobhunter",
    title: "JobHunter",
    tagline:
      "My self-hosted job-search engine: finds roles, tailors my resume without letting the AI make things up, and prepares applications for my approval.",
    tags: ["TypeScript", "Fastify", "React", "Playwright", "SQLite"],
    caseStudy: {
      problem:
        "AI resume tools embellish. They invent titles, dates and skills, which is the fastest way to fail an interview. Job boards are also scattered across dozens of applicant tracking systems.",
      approach:
        "Fact-locked tailoring: the model can only reference confirmed profile records by ID, so it can't touch employers, titles, dates or degrees, and a validator rejects anything else. A pairwise LLM-judge quality gate keeps my original resume unless the tailored one measurably scores higher.",
      architecture:
        "Discovery adapters for Greenhouse, Lever, Ashby, SmartRecruiters, Workable and Workday feed a dedupe and matching pipeline with feed-health monitoring. A Playwright apply engine prepares each application for my approval. SSRF-safe fetching, encrypted key vault, budget caps.",
      results:
        "I use it for my own job search. 800+ tests. In active development; private repo, demo on request.",
    },
  },
  {
    id: "clips-gg",
    title: "Clips.gg",
    tagline:
      "A lightweight Windows game-clip recorder written in Rust. I use it to clip my own gameplay.",
    tags: ["Rust", "Tauri", "WASAPI", "FFmpeg"],
    githubUrl: "https://github.com/ElvisOkereke/Clips.gg",
    caseStudy: {
      problem:
        "Existing clip tools are heavy, vendor-locked, or bad at capturing game and mic audio together.",
      approach:
        "A Tauri app drives a separate native recorder process, so capture survives UI hiccups. Desktop capture goes through FFmpeg (ddagrab with NVENC/x264), and system and mic audio are captured and mixed natively in Rust over WASAPI.",
      architecture:
        "Rust (Tauri 2, Win32/COM via the windows crate, tokio, rusqlite) with a React + TypeScript UI for the clip library: thumbnails, search, tags and trimming. Ships as MSI/NSIS installers.",
      results:
        "A working recorder and clip library I use day to day. Next up: a true rolling instant-replay buffer.",
    },
  },
];
