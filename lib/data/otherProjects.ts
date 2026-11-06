export type OtherProject = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
};

export const otherProjects: OtherProject[] = [
  {
    id: "auto-subtitle-translate",
    title: "Auto Subtitle Translate",
    description:
      "A Chrome extension that transcribes tab audio locally with Whisper on WebGPU (WASM fallback) and shows translated live subtitles. No audio leaves the browser.",
    tags: ["TypeScript", "Chrome MV3", "Whisper", "WebGPU"],
    githubUrl: "https://github.com/ElvisOkereke/Auto_Subtitle_Translate_Extension",
  },
  {
    id: "swingtrader",
    title: "SwingTrader",
    description:
      "A swing-trading research backtester with no look-ahead (next-day-open fills), transaction costs everywhere and cost-matched buy-and-hold benchmarks. Strategies were fixed before testing, and the failures were reported honestly.",
    tags: ["Python", "Backtesting", "pandas"],
  },
  {
    id: "ai-hq",
    title: "AI-HQ",
    description: "A multi-model AI chat app built for Theo's T3 Chat Cloneathon.",
    tags: ["Next.js", "TypeScript", "LLMs"],
    githubUrl: "https://github.com/ElvisOkereke/AI-HQ",
  },
  {
    id: "tennis-analyzer",
    title: "TennisAnalyzer",
    description:
      "An iOS serve analyzer: SwiftUI + Apple Vision pose estimation with rule-based form feedback. Work in progress.",
    tags: ["Swift", "SwiftUI", "Vision"],
    githubUrl: "https://github.com/ElvisOkereke/TennisAnalyzer",
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
      "A family of companion apps for League of Legends and Teamfight Tactics, including a RAG matchup chatbot and in-game overlays.",
    tags: ["Python", "RAG"],
    githubUrl: "https://github.com/ElvisOkereke/LolCompanionApps",
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
