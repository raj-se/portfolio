export const profile = {
  name: "Raj Sakariya",
  role: "Software Engineer",
  tagline: "Backend engineer building event-driven microservices for real-time learning platforms.",
  location: "Mumbai, India",
  email: "sakariyaraj890@gmail.com",
  phone: "+91 9167515953",
  linkedin: "https://www.linkedin.com/in/raj-sakariya-231031213",
  github: "https://github.com/raj-se",
  summary:
    "I design and ship backend systems for SaaS products — Node.js, TypeScript, Fastify, PostgreSQL and MongoDB on AWS. Over the last 3 years I've worked mostly at the boundary where services talk to each other: event buses, integrations, permissions, and the schema decisions that make an API fast or slow.",
};

export const stats = [
  { value: 3, suffix: "+", label: "years experience" },
  { value: 10, suffix: "+", label: "Total projects" },
  { value: 30, suffix: "%", label: "faster API response" },
  { value: 40, suffix: "%", label: "faster queries" },
];

export const nodeGraphServices = [
  { id: "node", label: "Node.js" },
  { id: "fastify", label: "Fastify" },
  { id: "postgres", label: "PostgreSQL" },
  { id: "mongo", label: "MongoDB" },
  { id: "aws", label: "AWS" },
  { id: "docker", label: "Docker" },
];

export const skillGroups = [
  {
    title: "Backend Languages",
    items: ["TypeScript", "JavaScript", "PHP", "Python", "Java"],
  },
  {
    title: "Backend & Frameworks",
    items: ["Node.js", "Fastify", "Express", "Next.js", "Zod"],
  },
  {
    title: "Frontend",
    items: ["React.js", "Next.js", "HTML5", "CSS3", "jQuery"],
  },
  {
    title: "Databases",
    items: ["PostgreSQL", "MongoDB", "MySQL"],
  },
  {
    title: "Cloud & DevOps",
    items: ["AWS Lambda", "EventBridge", "Docker"],
  },
  {
    title: "Architecture",
    items: ["Microservices", "REST APIs", "Event-Driven Design", "Serverless", "Multi-Tenant SaaS"],
  },
  {
    title: "Integrations",
    items: ["Microsoft Graph API", "Zoom API", "Moodle LMS API", "Twilio", "SendGrid"],
  },
  {
    title: "Tools & Practices",
    items: ["Git", "GitHub", "Postman", "CI/CD", "Performance Profiling", "ESLint", "Prettier"],
  },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  summary: string;
  points: string[];
};

export const experience: Experience[] = [
  {
    company: "E-Careers Pvt. Ltd.",
    role: "Software Engineer",
    period: "Apr 2025 — Present",
    summary:
      "Designed and delivered AvaLXP, a microservices-based learning platform, replacing a legacy PHP monolith.",
    points: [
      "Built full-stack features with React/Next.js on the frontend and Node.js/Fastify on AWS Lambda, backed by PostgreSQL and MongoDB.",
      "Implemented authentication, role-based access control, and permission management shared across every service.",
      "Reduced API response times by up to 30% through query optimization and schema-level indexing.",
      "Built event-driven communication on AWS EventBridge, powering notifications, gamification, badges, and student journey tracking.",
      "Improved service throughput by 25% while lowering resource usage through targeted performance tuning.",
      "Containerized 19+ services with Docker, structured for independent CI/CD-friendly deployments.",
      "Owned integrations with Zoom, Microsoft Graph, Moodle LMS, Twilio, and SendGrid.",
    ],
  },
  {
    company: "Catalyst Crew",
    role: "Backend Developer",
    period: "Mar 2024 — Apr 2025",
    summary:
      "Built an internal billing & e-commerce platform and the backend services enterprise workflows ran on.",
    points: [
      "Developed scalable backend services and REST APIs in Node.js and TypeScript for enterprise workflows.",
      "Designed modular backend components using clean architecture, increasing code reuse across internal apps.",
      "Built billing & e-commerce features: invoicing, supplier management, product catalog, order processing, sales reporting.",
      "Optimized PostgreSQL schemas and queries, cutting redundant database calls by 25%.",
      "Implemented JWT authentication and role-based access control across multiple internal user roles.",
      "Built an analytics dashboard surfacing revenue, recurring buyers, and top-customer discount candidates.",
    ],
  },
];

export type Project = {
  name: string;
  tag: string;
  description: string;
  metrics: string[];
  stack: string[];
  url?: string;
};

export const projects: Project[] = [
  {
    name: "CodeLens",
    tag: "AI · Developer Platform",
    description:
      "An AI-powered code review platform that connects to GitHub repositories, analyzes pull requests for bugs, security issues, performance problems, missing tests, and breaking changes, then generates actionable reviews with code-level suggestions and confidence scores.",
    metrics: [
      "Automated PR analysis",
      "Repository-aware AI reviews",
      "GitHub webhook driven",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Fastify",
      "PostgreSQL",
      "Redis",
      "GitHub API",
      "LLM API",
      "Docker",
    ],
  },
  {
    name: "ScanScore",
    tag: "AI · Career Platform",
    description:
      "An AI-powered ATS resume analyzer that compares resumes against job descriptions, generates compatibility scores, identifies keyword gaps and formatting risks, and provides actionable suggestions. It also surfaces live job openings ranked by resume fit.",
    metrics: [
      "AI-powered ATS scoring",
      "Resume & JD keyword analysis",
      "Live jobs ranked by fit",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Gemini API",
      "Adzuna API",
      "Zod",
      "PDF/DOCX Parsing",
    ],
    url: "https://scan-score.vercel.app",
  },  
  {
    name: "LedgerX",
    tag: "FinTech · Distributed Systems",
    description:
      "A financial ledger and wallet platform built around double-entry accounting, immutable transactions, idempotent payment processing, transfers, refunds, reconciliation, and webhook handling. Designed to preserve financial consistency under retries and concurrent transactions.",
    metrics: [
      "Double-entry accounting",
      "Idempotent transaction processing",
      "Immutable financial records",
    ],
    stack: [
      "TypeScript",
      "Fastify",
      "PostgreSQL",
      "Redis",
      "AWS EventBridge",
      "Docker",
    ],
  },
  {
    name: "Pulse",
    tag: "Infrastructure · Observability",
    description:
      "A lightweight observability platform for monitoring distributed Node.js services through request metrics, latency percentiles, error rates, throughput, service health, and distributed traces, with configurable alerts for abnormal service behavior.",
    metrics: [
      "P50/P95/P99 latency tracking",
      "Distributed request tracing",
      "Real-time service health",
    ],
    stack: [
      "Node.js",
      "TypeScript",
      "Fastify",
      "PostgreSQL",
      "Redis",
      "WebSockets",
      "Docker",
      "AWS",
    ],
  },
  {
    name: "AskBase",
    tag: "AI · Enterprise Knowledge",
    description:
      "A permission-aware AI knowledge platform that turns company documents into a searchable knowledge base. Documents are parsed, chunked, embedded, and retrieved to generate grounded answers with source citations while respecting organization and document-level access controls.",
    metrics: [
      "RAG with source citations",
      "Document-level permissions",
      "Automated document ingestion",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "Vector Database",
      "LLM API",
      "Docker",
    ],
  },
  {
    name: "Shipyard",
    tag: "Developer Platform · API Infrastructure",
    description:
      "A developer platform for managing production APIs with API keys, environments, authentication, rate limiting, request logging, usage analytics, webhooks, API versioning, and configurable access controls through a centralized gateway.",
    metrics: [
      "API key & environment isolation",
      "Configurable rate limiting",
      "Real-time API usage analytics",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Fastify",
      "PostgreSQL",
      "Redis",
      "Docker",
      "AWS",
    ],
  },
];

export const education = {
  degree: "B.Tech in Information Technology (Honours in Data Science)",
  school: "K J Somaiya Institute of Technology, Mumbai",
};

export const marqueeItems = [
  "Node.js",
  "TypeScript",
  "Fastify",
  "PostgreSQL",
  "MongoDB",
  "AWS Lambda",
  "EventBridge",
  "Docker",
  "React",
  "Next.js",
  "REST APIs",
  "Microservices",
];
