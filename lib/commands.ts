import {
  Home, User, Layers, Briefcase, FolderGit2, Mail,
  Download, Copy, TerminalSquare, Linkedin, Github, Send,
} from "lucide-react";
import { profile, skillGroups, experience, projects } from "./data";

export type CommandAction =
  | { type: "scroll"; target: string }
  | { type: "link"; href: string }
  | { type: "download" }
  | { type: "copy"; value: string }
  | { type: "terminal" };

export type Command = {
  id: string;
  label: string;
  subtitle?: string;
  group: "Navigate" | "Actions" | "Connect";
  keywords: string[];
  icon: typeof Home;
  action: CommandAction;
  shortcut?: string[];
  previewLines?: string[];
};

export const commands: Command[] = [
  {
    id: "nav-home", label: "Home", group: "Navigate", keywords: ["top", "hero"], icon: Home,
    action: { type: "scroll", target: "#top" }, shortcut: ["g", "h"],
    previewLines: [profile.tagline],
  },
  {
    id: "nav-about", label: "About", group: "Navigate", keywords: ["bio", "summary"], icon: User,
    action: { type: "scroll", target: "#about" }, shortcut: ["g", "a"],
    previewLines: [profile.summary],
  },
  {
    id: "nav-skills", label: "Tech Stack", group: "Navigate", keywords: ["skills", "stack", "tools"], icon: Layers,
    action: { type: "scroll", target: "#skills" }, shortcut: ["g", "s"],
    previewLines: skillGroups.map((g) => `${g.title}: ${g.items.slice(0, 3).join(", ")}${g.items.length > 3 ? "…" : ""}`),
  },
  {
    id: "nav-experience", label: "Experience", group: "Navigate", keywords: ["work", "jobs", "career"], icon: Briefcase,
    action: { type: "scroll", target: "#experience" }, shortcut: ["g", "e"],
    previewLines: experience.map((job) => `${job.company} — ${job.role} (${job.period})`),
  },
  {
    id: "nav-projects", label: "Projects", group: "Navigate", keywords: ["work", "builds"], icon: FolderGit2,
    action: { type: "scroll", target: "#projects" }, shortcut: ["g", "p"],
    previewLines: projects.map((p) => p.name),
  },
  {
    id: "nav-contact", label: "Contact", group: "Navigate", keywords: ["form", "message", "email"], icon: Mail,
    action: { type: "scroll", target: "#contact" }, shortcut: ["g", "c"],
    previewLines: [profile.email, profile.phone, profile.location],
  },

  {
    id: "act-resume", label: "Download resume", subtitle: "PDF", group: "Actions",
    keywords: ["cv", "pdf", "download"], icon: Download, action: { type: "download" },
    previewLines: ["Downloads Raj_Sakariya_Resume.pdf directly."],
  },
  {
    id: "act-copy-email", label: "Copy email address", subtitle: profile.email, group: "Actions",
    keywords: ["email", "mail", "copy"], icon: Copy, action: { type: "copy", value: profile.email },
    previewLines: ["Copies the address to your clipboard."],
  },
  {
    id: "act-terminal", label: "Open terminal", subtitle: "Interactive CLI", group: "Actions",
    keywords: ["cli", "console", "shell"], icon: TerminalSquare, action: { type: "terminal" },
    previewLines: ["Launches the interactive command-line widget.", "Try 'skills', 'projects', or 'whoami' inside it."],
  },

  {
    id: "con-linkedin", label: "Open LinkedIn", group: "Connect", keywords: ["linkedin", "social"],
    icon: Linkedin, action: { type: "link", href: profile.linkedin },
    previewLines: ["Opens LinkedIn in a new tab."],
  },
  {
    id: "con-github", label: "Open GitHub", group: "Connect", keywords: ["github", "code", "repos"],
    icon: Github, action: { type: "link", href: profile.github },
    previewLines: ["Opens GitHub in a new tab."],
  },
  {
    id: "con-email", label: `Email ${profile.name.split(" ")[0]}`, group: "Connect",
    keywords: ["mailto", "send", "email"], icon: Send, action: { type: "link", href: `mailto:${profile.email}` },
    previewLines: [`Opens your mail client addressed to ${profile.email}.`],
  },
];

export const NAV_SHORTCUT_MAP: Record<string, string> = {
  h: "#top",
  a: "#about",
  s: "#skills",
  e: "#experience",
  p: "#projects",
  c: "#contact",
};

const RECENT_KEY = "rs-cmdk-recent";

export function getRecentIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function pushRecentId(id: string) {
  if (typeof window === "undefined") return;
  const current = getRecentIds().filter((x) => x !== id);
  const next = [id, ...current].slice(0, 4);
  localStorage.setItem(RECENT_KEY, JSON.stringify(next));
}
