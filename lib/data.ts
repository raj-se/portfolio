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
  name: "Rollcall",
  tag: "EdTech · Attendance Platform",
  description:
    "A QR-based attendance system for physical classes. Instructors project a rotating QR code; students scan it and pick their name from the roster, and attendance is only marked if they're inside the room's geofence and inside the session's time window.",
  metrics: [
    "Rotating QR codes (anti-screenshot)",
    "Geofenced, time-windowed check-ins",
    "Live attendance dashboard + CSV export",
  ],
  stack: [
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "PostgreSQL (Neon)",
    "Zod",
    "JWT (jose)",
    "SendGrid",
    "QR Code Generation",
  ],
  url: "https://attendigo.vercel.app",
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
  name: "PulseCheck",
  tag: "DevOps · Monitoring · Reliability",
  description:
    "A modern uptime and API monitoring platform that tracks endpoint health, response times, status codes, and availability in real time. Built to help teams detect outages early, monitor service reliability, manage authentication-protected endpoints, and receive actionable alerts before users are impacted.",
  metrics: [
    "Real-time uptime monitoring",
    "Response time & status code tracking",
    "Authentication-aware health checks",
  ],
  stack: [
    "Next.js",
    "TypeScript",
    "PostgreSQL",
    "Prisma",
    "Tailwind CSS",
    "Docker",
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
