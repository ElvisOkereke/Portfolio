export type Metric = {
  value: string;
  label: string;
};

export type Screenshot = {
  src: string;
  caption: string;
  width: number;
  height: number;
};

export type CaseStudy = {
  problem: string;
  approach: string;
  architecture: string;
  results: string;
  /** Concrete engineering wins, shown as a bulleted list in the case study. */
  highlights?: string[];
  /** Honest scope: what exists today vs. what is on the roadmap. */
  scope?: {
    built: string[];
    planned: string[];
  };
};

export type FlagshipProject = {
  id: string;
  title: string;
  /** Short line shown above the title, e.g. "AI research engine". */
  kind: string;
  tagline: string;
  tags: string[];
  /** Headline numbers. Every one is measured and documented in the project repo. */
  metrics: Metric[];
  status: string;
  featured?: boolean;
  /** Card cover: a tight, readable crop of the app. */
  image?: string;
  /** "screen" frames a desktop screenshot in a window; "window" shows an app window as-is. */
  imageStyle?: "screen" | "window";
  /** Full-size screenshots shown in the case study, each opens in a lightbox. */
  gallery?: Screenshot[];
  /** Custom illustration rendered instead of a screenshot. */
  visual?: "subtitle-overlay";
  githubUrl?: string;
  liveUrl?: string;
  caseStudy: CaseStudy;
};

export const flagshipProjects: FlagshipProject[] = [
  {
    id: "pitchlab",
    title: "PitchLab",
    kind: "AI research engine · LLM pipelines & evals",
    featured: true,
    tagline:
      "Finds small-software business ideas in real demand on the web, then turns the best into evidence-backed business cases. Every cited claim is re-checked against its source, and every pipeline change is scored against frozen baselines.",
    tags: ["TypeScript", "Next.js", "Postgres + pgvector", "Claude / GPT / Gemini", "Evals"],
    metrics: [
      { value: "12", label: "stage LLM pipeline" },
      { value: "2,500+", label: "automated tests" },
      { value: "0.72", label: "held-out ranking accuracy (LLM judge: 0.47)" },
    ],
    status: "Active development",
    image: "/pics/projects/pitchlab-cover.webp",
    imageStyle: "screen",
    gallery: [
      { src: "/pics/projects/pitchlab-evidence.webp", caption: "Evidence tab: every signal and claim carries a verbatim quote, re-checked against the fetched source page.", width: 2160, height: 864 },
      { src: "/pics/projects/pitchlab-case.webp", caption: "A generated business case: buyer, problem and the honest weaknesses, with the pipeline run that produced it.", width: 2160, height: 1350 },
      { src: "/pics/projects/pitchlab-leaderboard.webp", caption: "Leaderboard: AI scores per criterion next to my own scores, used to calibrate the judge.", width: 2160, height: 1350 },
      { src: "/pics/projects/pitchlab-library.webp", caption: "Research library: 1,300+ entries from missions and keyless feeds (Wikipedia pageviews, Hacker News trends).", width: 2160, height: 1350 },
      { src: "/pics/projects/pitchlab-board.webp", caption: "Board: cases move from New to Validating, Pilot, Live or Killed. My decisions become labelled eval data.", width: 2160, height: 1350 },
    ],
    githubUrl: "https://github.com/ElvisOkereke/PitchLab",
    caseStudy: {
      problem:
        "LLMs will happily invent market sizes, competitors and sources. I wanted a steady supply of startup ideas I could trust enough to pitch, and an honest, measurable way to kill the weak ones.",
      approach:
        "The pipeline runs harvest → sketch → archive → tournament → evolve → ideate → dedupe → screen → gate → case → verify → score. It sketches about 90 ideas wide, drops near-duplicates by embedding similarity, ranks the survivors, improves the best against real competitors, and only then writes full business cases. Every claim is checked against the page it cites, and every number is computed by code from sourced inputs.",
      architecture:
        "A TypeScript monorepo: a core pipeline package, a crash-safe multi-worker job queue on Postgres SKIP LOCKED, per-stage model routing across Claude, GPT and Gemini with per-call cost and latency logging, Zod-validated outputs with self-correcting retries, hardened web fetching, a research library with pgvector dedupe, and a private Next.js dashboard. The dashboard never calls a model; it only queues work for the worker.",
      results:
        "End-to-end runs produce sourced, cost-tracked business cases plus a validation pack (prospects, outreach drafts, landing page) for testing with real buyers. A benchmark scorecard compares every run to frozen baselines, so a prompt or model change is measured, not guessed.",
      highlights: [
        "Hallucination controls: every cited page is re-fetched. A claim passes on a verbatim quote (at least 6 words and 30 characters, found in the fetched text) or a confidence-banded LLM judge. An unreachable page is not treated as an unsupported claim.",
        "Calibrated the LLM judge against my own kept-vs-killed decisions on held-out pairs, with order-swapped double judging. The pairwise tournament judge scored at chance (0.41–0.49) across 4 prompt and model variants, so I replaced it with a reviewer score that hit 0.72 on the same 79 pairs. Elo now only breaks ties.",
        "Elo tournament with a judge from a different model family than the writer, to avoid self-preference bias, capped at 300 judge calls. The idea engine targets $8 or less per run.",
        "Embedding archive: drops a sketch at cosine ≥ 0.85 to earlier ideas, and ≥ 0.75 to ideas already killed, so the engine stops re-proposing dead ends.",
        "Research library fed by free, keyless sources (Federal Register, Wikipedia pageviews, World Bank, Hacker News) plus robots-aware web collection, SSRF-safe fetching, prompt-injection fencing and a privacy scrub.",
      ],
    },
  },
  {
    id: "auto-subtitle-translator",
    title: "Auto Subtitle Translator",
    kind: "On-device AI · Chrome extension",
    tagline:
      "Translates video live. On-device OCR reads subtitles burned into the picture, on-device Whisper transcribes speech, and Claude replaces a fast DeepL draft with a translation that knows what you are watching.",
    tags: ["TypeScript", "ONNX Runtime Web", "WebGPU", "Whisper", "Claude", "Playwright"],
    metrics: [
      { value: "0.20 s", label: "subtitle → English (p50)" },
      { value: "2.3%", label: "OCR error rate (Tesseract: 17.4%)" },
      { value: "0.93", label: "judged translation quality (DeepL: 0.50)" },
    ],
    status: "Active development",
    visual: "subtitle-overlay",
    githubUrl: "https://github.com/ElvisOkereke/Auto_Subtitle_Translate_Extension",
    caseStudy: {
      problem:
        "Huge amounts of video, like Korean League of Legends streams, Spanish football or anime, have subtitles burned into the picture in a language you can't read. Browser translators can't see pixels, and generic machine translation mangles names and jargon.",
      approach:
        "Draw a box around the subtitles. The extension samples frames, detects changes, runs OCR locally and overlays English on the original line. On YouTube it reads ahead: it taps the player's media stream, decodes buffered video with WebCodecs, and translates lines about 28 s before they appear. Translation is \"fast then best\": DeepL shows instantly, then Claude swaps in a version that knows the video's title and channel and keeps names consistent through a learned glossary.",
      architecture:
        "Chrome MV3: PaddleOCR PP-OCRv5 on ONNX Runtime Web (WebGPU with a wasm fallback) in a worker inside an isolated extension-origin iframe; tab capture → voice activity detection → Whisper in an offscreen document; a browser-independent translation engine layer. An optional hosted tier (Hono, node:sqlite, Stripe, email-code accounts, per-plan budgets and rate limits) runs as a Docker container on Google Cloud.",
      results:
        "29 of 29 test lines shown in time, 0.48 s including a real DeepL round trip, and 29 of 29 translated before they appeared with read-ahead. Claude beat DeepL in blind comparisons on LaLiga, anime and K-drama subtitles, at about $3.40 per hour of video.",
      highlights: [
        "Benchmarked OCR engines on 76 labelled crops: PaddleOCR with a box-relative size filter reached 2.3% character error and 0 false positives on 18 gameplay frames, against Tesseract's 17.4% and 17/18. 22 ms per crop on WebGPU.",
        "Cut the speech model download from 971 MB to 209 MB and made inference 5× faster (1.93 s → 0.38 s per clip) using a fp32 encoder and a q4 decoder, with no accuracy loss on the test clips.",
        "Translation benchmark on real subtitle lines: Claude with neighbouring-line context 89%, DeepL 46–65%, local open models ≤ 15%. Neighbouring context was the single biggest quality gain.",
        "Cut cold-start latency from 11.5 s to 2.9 s with separate request lanes, unbatched urgent lines and a bounded wait for the topic summary.",
        "Everything is verified by machines: 400+ tests, and Playwright drives real Chrome with the extension loaded, real tab audio, real OCR on video frames, real YouTube, and an LLM judge that grades the translations.",
      ],
    },
  },
  {
    id: "cliplite",
    title: "ClipLite",
    kind: "Systems programming · Rust on Windows",
    tagline:
      "A lightweight instant-replay game recorder in Rust and Tauri with GPU-encoded capture, being rebuilt in public into an on-device AI highlight engine. A hardware-in-the-loop test rig measures every claim.",
    tags: ["Rust", "Tauri 2", "DXGI / D3D11", "FFmpeg + NVENC", "WASAPI"],
    metrics: [
      { value: "28×", label: "faster saves (21.2 s → <1 s)" },
      { value: "−2.5%", label: "avg fps cost of replay buffer" },
      { value: "2 h", label: "soak test, flat memory" },
    ],
    status: "Rebuilding in public · Phase 1",
    image: "/pics/projects/cliplite-cover.webp",
    imageStyle: "window",
    gallery: [
      { src: "/pics/projects/cliplite-record.webp", caption: "Record tab: 60 fps capture, native WASAPI mic + system audio mix, auto-detected NVENC encoder and a 3-minute instant-replay buffer.", width: 616, height: 735 },
      { src: "/pics/projects/cliplite-settings.webp", caption: "Settings: output and replay folders with filename tokens, encoder selection, a bounded replay buffer and global hotkeys.", width: 616, height: 735 },
    ],
    githubUrl: "https://github.com/ElvisOkereke/ClipLite",
    caseStudy: {
      problem:
        "Clip tools are heavy, vendor-locked or flaky in fullscreen games. Bugs in a screen recorder only show up with a real GPU, a real game and real input, so you can't trust unit tests alone.",
      approach:
        "Capture and encoding run in a separate native process (FFmpeg DXGI Desktop Duplication into NVENC, AMF or QSV with a CPU fallback, and system plus mic audio mixed natively over WASAPI), so WebView2's GPU context can't compete with frame capture. Before a big refactor I built a test rig to drive the app from outside and capture \"before\" data.",
      architecture:
        "A Cargo workspace: a Tauri app with a React UI, a cliplite-core crate (IPC protocol, FFmpeg builder, audio, telemetry) and a recorder crate whose dependency graph guarantees it can never link WebView2. Typed newline-JSON IPC with correlation ids traces each action from hotkey → UI → recorder → FFmpeg → saved clip.",
      results:
        "The rig found and root-caused a 21 s save stall (an undrained FFmpeg stderr pipe), now 0.29–0.71 s. It also split the \"fails in fullscreen\" reports into two proven causes: UIPI blocking hotkeys for elevated games (1/60 vs 60/60) and DXGI_ERROR_ACCESS_LOST ending capture.",
      highlights: [
        "Hardware-in-the-loop kit: a D3D11 fake game (windowed, borderless, true exclusive fullscreen), a hotkey matrix that covers elevated games through a UAC helper over a SID-restricted named pipe, and clip validation with ffprobe, blackdetect and freezedetect.",
        "Soak and benchmark modes: memory slope by least squares over hours, game frame times (average, 1% low, p99) with scenarios interleaved, and CPU/RAM measured across the whole process tree.",
        "Job Object isolation, so an aborted run can never leave capture running or a display stuck in fullscreen.",
        "Characterization tests pinned behaviour before the refactor: 26 FFmpeg command snapshots and golden IPC wire-format tests. 78 tests, Windows CI with zero warnings, and a pinned, checksum-verified FFmpeg.",
      ],
      scope: {
        built: [
          "Recorder, instant replay, clip library, global hotkeys and tray mode",
          "Two-process architecture, Cargo workspace, structured cross-process telemetry",
          "Hardware-in-the-loop rig, baseline benchmarks, the 28× save fix",
        ],
        planned: [
          "Fullscreen capture and elevated-game hotkey fixes, plus a ring-buffer replay rewrite",
          "On-device transcription, auto-titles and meaning-based clip search",
          "Live highlight detection with quantized ONNX models and CI accuracy gates",
          "Auto-cut 9:16 Shorts with captions",
        ],
      },
    },
  },
  {
    id: "datalogviewer",
    title: "DataLogViewer",
    kind: "Performance engineering · Web",
    tagline:
      "A fast, private ECU datalog viewer for car tuners that runs entirely in the browser. I use it to tune my own car.",
    tags: ["TypeScript", "React", "Web Workers", "uPlot", "Playwright"],
    metrics: [
      { value: "~2 s", label: "to open a 1M-row log" },
      { value: "400+", label: "unit + E2E tests" },
      { value: "0", label: "servers, uploads or accounts" },
    ],
    status: "Live",
    image: "/pics/projects/datalogviewer-cover.webp",
    imageStyle: "screen",
    gallery: [
      { src: "/pics/projects/datalogviewer-chart.webp", caption: "Synced time-series charts over a demo engine run: RPM, MAP and AFR with a shared cursor and overview scrubber.", width: 2880, height: 1800 },
      { src: "/pics/projects/datalogviewer-table.webp", caption: "Table view of the same log, with units parsed from the export.", width: 2880, height: 1800 },
    ],
    githubUrl: "https://github.com/ElvisOkereke/datalogviewer",
    liveUrl: "https://elvisokereke.github.io/datalogviewer/",
    caseStudy: {
      problem:
        "Tuning logs are huge, messy CSV exports, and most viewers are slow desktop apps or upload your data to a server.",
      approach:
        "Everything runs client-side. Parsing happens in a Web Worker and hands columns back as transferable typed arrays, so the UI never blocks. Charts decimate by min/max per pixel, so knock and lean spikes stay visible at any zoom. A small formula language adds calculated channels like [AFR]/14.7 or smooth([MAP], 5).",
      architecture:
        "Vite + React 19 + Zustand, uPlot for synced time-series charts, lazy-loaded Plotly for scatter, and a forgiving parser that auto-detects delimiters, decimal commas, preambles, unit rows and column types. Vitest + Playwright, with CI and deploys through GitHub Actions.",
      results:
        "A 1,000,000-row log loads in about two seconds and zooms smoothly. Live on GitHub Pages, with no server and no account.",
      highlights: [
        "Zero-copy transfer of columnar typed arrays from the parsing worker.",
        "Min/max-per-pixel decimation keeps every spike visible while drawing only what the screen can show.",
        "Formula language: tokenizer, recursive-descent parser and vectorized evaluator.",
      ],
    },
  },
  {
    id: "jobhunter",
    title: "JobHunter",
    kind: "Agentic automation · Full-stack",
    tagline:
      "My self-hosted job-search autopilot: finds roles, tailors my resume, prepares applications for my approval, tracks replies and plans interview prep.",
    tags: ["TypeScript", "Fastify", "React", "Playwright", "SQLite"],
    metrics: [
      { value: "6", label: "ATS feeds integrated" },
      { value: "800+", label: "automated tests" },
      { value: "100%", label: "of applications approved by me first" },
    ],
    status: "Private repo · demo on request",
    image: "/pics/projects/jobhunter-cover.webp",
    imageStyle: "screen",
    gallery: [
      { src: "/pics/projects/jobhunter-sources.webp", caption: "Source health and per-ATS application form fillers (Greenhouse, Lever, Ashby, SmartRecruiters, Workable, Workday).", width: 2160, height: 1350 },
      { src: "/pics/projects/jobhunter-prep.webp", caption: "Adaptive interview prep: rubric-scored drills with readiness shown as a band, not a single number.", width: 2160, height: 1350 },
      { src: "/pics/projects/jobhunter-tailor.webp", caption: "Resume tailoring: the model can only reference confirmed profile records by ID.", width: 2160, height: 1350 },
    ],
    caseStudy: {
      problem:
        "AI resume tools embellish. They invent titles, dates and skills, which is the fastest way to fail an interview. Job boards are also scattered across dozens of applicant tracking systems.",
      approach:
        "Fact-locked tailoring: the model can only reference confirmed profile records by ID, so it can't touch employers, titles, dates or degrees, and a validator rejects anything else. A pairwise LLM-judge gate keeps my original resume unless the tailored one scores higher.",
      architecture:
        "Discovery adapters for Greenhouse, Lever, Ashby, SmartRecruiters, Workable and Workday feed a dedupe and matching pipeline behind a feed-health state machine with per-host pacing and backoff. A Playwright apply engine with per-ATS form fillers prepares each application for approval. IMAP tracking turns employer replies into status updates. SSRF-safe fetching, an encrypted key vault and budget caps.",
      results:
        "I use it for my own job search. It ships as an installable PWA with push notifications, a weekly digest and an adaptive interview-prep engine.",
      highlights: [
        "Approve-first safety: it never submits twice and blocks any form field it didn't plan to fill.",
        "The same role from different sources is deduplicated before matching.",
        "Interview-prep plans adapt to your own practice results.",
      ],
    },
  },
];
