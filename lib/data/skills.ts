export type SkillCategory = {
  category: string;
  items: string[];
};

export const skills: SkillCategory[] = [
  {
    category: "Languages",
    items: ["Python", "TypeScript / JavaScript", "SQL", "Java", "C#", "C++", "Go", "Rust", "HTML / CSS"],
  },
  {
    category: "Frameworks",
    items: ["React", "Next.js", "Node.js / Fastify", "FastAPI", "LangChain", "ASP.NET Core", "Tauri", "Flutter", "Playwright"],
  },
  {
    category: "AI & ML",
    items: [
      "OpenAI / Claude / Gemini APIs",
      "LLM pipelines & evals",
      "RAG & MCP",
      "pgvector & embeddings",
      "ONNX Runtime / WebGPU",
      "Whisper & on-device OCR",
      "PyTorch & LoRA",
    ],
  },
  {
    category: "Cloud & Data",
    items: ["GCP / GKE / Cloud Run", "AWS", "Azure", "Kubernetes", "Docker", "Terraform & Pulumi", "PostgreSQL", "BigQuery", "Kafka", "Apache Spark", "GitHub Actions"],
  },
];
