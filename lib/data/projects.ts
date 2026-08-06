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
