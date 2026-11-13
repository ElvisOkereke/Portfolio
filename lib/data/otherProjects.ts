export type OtherProject = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
};

export const otherProjects: OtherProject[] = [
  {
    id: "swingtrader",
    title: "SwingTrader",
    description:
      "A swing-trading research backtester with no look-ahead (next-day-open fills), transaction costs everywhere and cost-matched buy-and-hold benchmarks. Strategies were fixed before testing, and the failures were reported honestly.",
    tags: ["Python", "Backtesting", "pandas"],
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
