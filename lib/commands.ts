import {
    Home, User, Layers, Briefcase, FolderGit2, Mail,
    Download, Copy, TerminalSquare, Linkedin, Github, Send,
  } from "lucide-react";
  import { profile } from "./data";
  
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
  };
  
  export const commands: Command[] = [
    { id: "nav-home", label: "Home", group: "Navigate", keywords: ["top", "hero"], icon: Home, action: { type: "scroll", target: "#top" } },
    { id: "nav-about", label: "About", group: "Navigate", keywords: ["bio", "summary"], icon: User, action: { type: "scroll", target: "#about" } },
    { id: "nav-skills", label: "Tech Stack", group: "Navigate", keywords: ["skills", "stack", "tools"], icon: Layers, action: { type: "scroll", target: "#skills" } },
    { id: "nav-experience", label: "Experience", group: "Navigate", keywords: ["work", "jobs", "career"], icon: Briefcase, action: { type: "scroll", target: "#experience" } },
    { id: "nav-projects", label: "Projects", group: "Navigate", keywords: ["work", "builds"], icon: FolderGit2, action: { type: "scroll", target: "#projects" } },
    { id: "nav-contact", label: "Contact", group: "Navigate", keywords: ["form", "message", "email"], icon: Mail, action: { type: "scroll", target: "#contact" } },
  
    { id: "act-resume", label: "Download resume", subtitle: "PDF", group: "Actions", keywords: ["cv", "pdf", "download"], icon: Download, action: { type: "download" } },
    { id: "act-copy-email", label: "Copy email address", subtitle: profile.email, group: "Actions", keywords: ["email", "mail", "copy"], icon: Copy, action: { type: "copy", value: profile.email } },
    { id: "act-terminal", label: "Open terminal", subtitle: "Interactive CLI", group: "Actions", keywords: ["cli", "console", "shell"], icon: TerminalSquare, action: { type: "terminal" } },
  
    { id: "con-linkedin", label: "Open LinkedIn", group: "Connect", keywords: ["linkedin", "social"], icon: Linkedin, action: { type: "link", href: profile.linkedin } },
    { id: "con-github", label: "Open GitHub", group: "Connect", keywords: ["github", "code", "repos"], icon: Github, action: { type: "link", href: profile.github } },
    { id: "con-email", label: `Email ${profile.name.split(" ")[0]}`, group: "Connect", keywords: ["mailto", "send", "email"], icon: Send, action: { type: "link", href: `mailto:${profile.email}` } },
  ];