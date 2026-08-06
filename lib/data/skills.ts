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
