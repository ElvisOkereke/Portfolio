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
