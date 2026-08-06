export type ExperienceSubRole = {
  title: string;
  period: string;
  bullets: string[];
};

export type ExperienceEntry = {
  id: string;
  org: string;
  location: string;
  roles: ExperienceSubRole[];
};

export const experience: ExperienceEntry[] = [
  {
    id: "telus",
    org: "TELUS",
    location: "Canada",
    roles: [
      {
        title: "Software Developer L3",
        period: "Aug 2025 – Present",
        bullets: [
          "Lead development of SAiL, a Next.js suite hosted on GKE surfacing 200M+ SMB customer records and BigQuery insights in real time for internal teams and external dealers.",
          "Engineered a query-driven data sharding strategy for large, evolving datasets, achieving a 200%+ improvement in query speed across high-traffic apps.",
          "Own DevOps end-to-end across platforms: RBAC/SSO/OIDC auth, CI/CD pipelines, Apache Spark data pipelines, and infrastructure as code with Terraform, Pulumi, and Kong.",
          "Built Orbit, a Next.js app adopted by 330+ unique dealers for campaign monitoring, org KPIs, and order management.",
          "Designed and optimized a production Org Knowledge Base MCP server enabling RAG-based organizational knowledge retrieval, reducing LLM inference costs via context-window optimization, semantic chunking, and response caching.",
        ],
      },
    ],
  },
  {
    id: "canada-life",
    org: "Canada Life Inc.",
    location: "Toronto, Canada",
    roles: [
      {
        title: "Automation and Data Specialist II",
        period: "Jan 2025 – Apr 2025",
        bullets: [
          "Maintained large-scale distributed Java Spring and React/JavaScript microservices, building backend tools with REST APIs, Kafka pub/sub, and Plotly data visualization.",
          "Delivered fault-tolerant, highly available data automation tools using SQL, REST APIs, and Selenium.",
        ],
      },
      {
        title: "Automation and Data Specialist",
        period: "Jan 2024 – Apr 2024",
        bullets: [
          "Built a testing data dashboard that improved the efficiency of statistical data analysis for test leads, using SQL Server for storage and retrieval.",
          "Implemented a complete CI/CD pipeline with Kubernetes, Docker, and GitHub Actions, reducing deployment time and enabling more frequent releases.",
        ],
      },
    ],
  },
  {
    id: "microsoft",
    org: "Microsoft Corp.",
    location: "Toronto, Canada",
    roles: [
      {
        title: "Explore Intern",
        period: "May 2022 – Aug 2022",
        bullets: [
          "Built a cloud-native chatbot application using Azure AI services addressing 2 key business cases, improving customer service and earning 3 Azure certifications.",
        ],
      },
    ],
  },
];
