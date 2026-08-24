import { Linkedin, Github, Mail } from "lucide-react";
import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="max-w-content mx-auto px-6 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {profile.name}
        </p>

        <div className="flex items-center gap-4">
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-muted hover:text-signal transition-colors">
            <Linkedin size={16} />
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="text-muted hover:text-signal transition-colors">
            <Github size={16} />
          </a>
          <a href={`mailto:${profile.email}`} className="text-muted hover:text-signal transition-colors">
            <Mail size={16} />
          </a>
        </div>

        <p className="font-mono text-xs text-muted">building things · shipping code</p>
      </div>
    </footer>
  );
}