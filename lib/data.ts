export const profile = {
  name: "Raj Sakariya",
  role: "Software Engineer",
  tagline: "Backend engineer building event-driven microservices for real-time learning platforms.",
  location: "Mumbai, India",
  email: "sakariyaraj890@gmail.com",
  phone: "+91 9167515953",
  linkedin: "https://www.linkedin.com/in/raj-sakariya-231031213",
  github: "https://github.com/raj9167",
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
};

export const projects: Project[] = [
  {
    name: "AvaLXP",
    tag: "Production · E-Careers",
    description:
      "A modular, multi-tenant learning platform rebuilt from a legacy PHP monolith into 19+ independent microservices — learner, coach, admin, course, session, and notification domains, wired together with an event bus. A modular, multi-tenant learning platform rebuilt from a legacy PHP monolith into 19+ independent microservices — learner, coach, admin, course, session, and notification domains, wired together with an event bus. A modular, multi-tenant learning platform rebuilt from a legacy PHP monolith into 19+ independent microservices — learner, coach, admin, course, session, and notification domains, wired together with an event bus. A modular, multi-tenant learning platform rebuilt from a legacy PHP monolith into 19+ independent microservices — learner, coach, admin, course, session, and notification domains, wired together with an event bus. A modular, multi-tenant learning platform rebuilt from a legacy PHP monolith into 19+ independent microservices — learner, coach, admin, course, session, and notification domains, wired together with an event bus. ",
    metrics: ["19+ microservices", "30% faster API responses", "25% higher throughput"],
    stack: ["Node.js", "Fastify", "PostgreSQL", "MongoDB", "AWS Lambda", "EventBridge", "Next.js"],
  },
  {
    name: "Billing & E-Commerce Platform",
    tag: "Internal · Catalyst Crew",
    description:
      "An internal platform covering invoicing, supplier management, product catalog, and order processing, plus an analytics dashboard for revenue and top-customer reporting.",
    metrics: ["25% fewer redundant DB calls", "RBAC across multiple roles"],
    stack: ["Node.js", "TypeScript", "PostgreSQL", "Docker", "JWT"],
  },
  {
    name: "Communication Log Service",
    tag: "AvaLXP notification domain",
    description:
      "A paginated communication log across email, SMS, and WhatsApp channels, replacing a slow aggregation query with parallel targeted lookups backed by a compound index.",
    metrics: ["Removed query timeouts", "Per-channel pagination"],
    stack: ["Fastify", "MongoDB"],
  },
  {
    name: "Badge & Gamification Engine",
    tag: "AvaLXP badge domain",
    description:
      "A tiered badge and achievement system with transactional badge assignment/removal, cross-table existence checks, and Zod-validated tier configuration for cohort and programme-level rewards.",
    metrics: ["Zero orphaned badge records", "Shared across 3 domains"],
    stack: ["Fastify", "PostgreSQL", "Zod"],
  },
  {
    name: "Student Journey Tracker",
    tag: "AvaLXP learner domain",
    description:
      "Tracks a learner's progress through cohorts and programmes, enriching journey data with add-on status and LMS titles in parallel, backed by conditional JSONB metadata merges.",
    metrics: ["Parallelized enrichment lookups", "Type-safe status narrowing"],
    stack: ["Node.js", "PostgreSQL", "TypeScript"],
  },
  {
    name: "Session & Calendar Sync",
    tag: "AvaLXP session domain",
    description:
      "Schedules and syncs live coaching sessions across Zoom and Microsoft Graph, keeping calendar invites, reminders, and communication logs consistent across external providers.",
    metrics: ["Two external providers synced", "Automated reminder emails"],
    stack: ["Node.js", "Zoom API", "Microsoft Graph API", "SendGrid"],
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