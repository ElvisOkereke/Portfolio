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
    items: ["Next.js", "React", "Fastify", "Tauri", "ASP.NET Core", "FastAPI", "Flutter", "Playwright"],
  },
  {
    category: "AI & Cloud",
    items: ["LLM pipelines & evals", "RAG", "MCP", "PyTorch", "Vertex AI Search", "GCP / GKE", "BigQuery", "AWS", "Azure"],
  },
  {
    category: "DevOps & Data",
    items: ["Kubernetes", "Docker", "Terraform", "Pulumi", "Kong", "GitHub Actions", "Apache Spark", "SQL"],
  },
];
