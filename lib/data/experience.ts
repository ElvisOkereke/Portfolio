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
          "Lead development of SAiL, a distributed Next.js platform on Google Kubernetes Engine that gives 1,000+ TELUS sales team members and dealers real-time access to 200M+ small and mid-size business records in BigQuery through custom tools, LLMs and agentic workflows.",
          "Engineered a query-driven data sharding strategy for large, evolving datasets, improving Cloud Run query speed by 200%+ across high-traffic, data-intensive use cases.",
          "Own DevOps end to end: RBAC and SSO/OIDC auth, CI/CD, Apache Spark ETL pipelines, Terraform/Pulumi infrastructure as code, and logging and monitoring with GCP log sinks.",
          "Partnered with stakeholders and dealers to ship workflow and reporting features for Orbit, a Next.js app adopted by 330+ dealers for campaign monitoring, KPIs and order tracking.",
          "Designed a production MCP server for RAG knowledge retrieval across internal teams; cut LLM inference costs through context-window optimization, semantic chunking and response caching.",
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
          "Maintained large-scale distributed Java Spring and React/JavaScript microservices while building backend tools with REST APIs, Kafka pub/sub and Plotly data visualization.",
          "Delivered fault-tolerant, highly available data automation tools using SQL, REST APIs, and Selenium.",
        ],
      },
      {
        title: "Automation and Data Specialist",
        period: "Jan 2024 – Apr 2024",
        bullets: [
          "Developed a testing data dashboard on SQL Server that made test leads' statistical data analysis more efficient.",
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
