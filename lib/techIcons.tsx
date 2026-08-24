import {
    SiTypescript, SiJavascript, SiPhp, SiPython,
    SiNodedotjs, SiFastify, SiExpress, SiNextdotjs,
    SiReact, SiHtml5, SiCss, SiJquery,
    SiPostgresql, SiMongodb, SiMysql,
    SiDocker,
    SiGit, SiGithub, SiPostman, SiEslint, SiPrettier,
    SiZoom,
  } from "react-icons/si";
  import { Code2, Boxes, Braces } from "lucide-react";
  import type { IconType } from "react-icons";
  
  const techIcons: Record<string, { icon: IconType; color?: string }> = {
    "TypeScript": { icon: SiTypescript, color: "#3178C6" },
    "JavaScript": { icon: SiJavascript, color: "#F7DF1E" },
    "PHP": { icon: SiPhp, color: "#777BB4" },
    "Python": { icon: SiPython, color: "#3776AB" },
    "Node.js": { icon: SiNodedotjs, color: "#5FA04E" },
    "Fastify": { icon: SiFastify },
    "Express": { icon: SiExpress },
    "Next.js": { icon: SiNextdotjs },
    "React": { icon: SiReact, color: "#61DAFB" },
    "React.js": { icon: SiReact, color: "#61DAFB" },
    "HTML5": { icon: SiHtml5, color: "#E34F26" },
    "CSS3": { icon: SiCss, color: "#1572B6" },
    "jQuery": { icon: SiJquery, color: "#0769AD" },
    "PostgreSQL": { icon: SiPostgresql, color: "#4169E1" },
    "MongoDB": { icon: SiMongodb, color: "#47A248" },
    "MySQL": { icon: SiMysql, color: "#4479A1" },
    "Docker": { icon: SiDocker, color: "#2496ED" },
    "Git": { icon: SiGit, color: "#F05032" },
    "GitHub": { icon: SiGithub },
    "Postman": { icon: SiPostman, color: "#FF6C37" },
    "ESLint": { icon: SiEslint, color: "#4B32C3" },
    "Prettier": { icon: SiPrettier, color: "#F7B93E" },
    "Zoom API": { icon: SiZoom, color: "#2D8CFF" },
    "REST APIs": { icon: Braces },
    "Microservices": { icon: Boxes },
  };
  
  export function getTechIcon(name: string): IconType {
    return techIcons[name]?.icon ?? (Code2 as unknown as IconType);
  }
  export function getTechColor(name: string): string | undefined {
    return techIcons[name]?.color;
  }