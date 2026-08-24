"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { TerminalSquare, X, Minus } from "lucide-react";
import { profile, skillGroups, experience, projects, education } from "@/lib/data";

type Line = { type: "input" | "output" | "error"; text: string };

const WELCOME: Line[] = [
  { type: "output", text: `${profile.name.toLowerCase().replace(" ", "-")}@portfolio:~$ welcome.` },
  { type: "output", text: "Type 'help' to see available commands." },
];

function getResponse(raw: string): Line[] {
  const cmd = raw.trim().toLowerCase();

  if (cmd === "" ) return [];

  if (cmd === "help") {
    return [
      { type: "output", text: "Available commands:" },
      { type: "output", text: "  whoami       — who I am" },
      { type: "output", text: "  about        — a short summary" },
      { type: "output", text: "  skills       — the tech stack" },
      { type: "output", text: "  experience   — where I've worked" },
      { type: "output", text: "  projects     — what I've built" },
      { type: "output", text: "  education    — where I studied" },
      { type: "output", text: "  contact      — how to reach me" },
      { type: "output", text: "  resume       — download my resume" },
      { type: "output", text: "  clear        — clear the terminal" },
      { type: "output", text: "  exit         — close this window" },
    ];
  }

  if (cmd === "whoami") {
    return [
      { type: "output", text: `${profile.name} — ${profile.role}` },
      { type: "output", text: `based in ${profile.location}` },
    ];
  }

  if (cmd === "about") {
    return [{ type: "output", text: profile.summary }];
  }

  if (cmd === "skills") {
    return skillGroups.flatMap((g) => [
      { type: "output" as const, text: `${g.title}:` },
      { type: "output" as const, text: `  ${g.items.join(", ")}` },
    ]);
  }

  if (cmd === "experience") {
    return experience.flatMap((job) => [
      { type: "output" as const, text: `${job.company} — ${job.role} (${job.period})` },
      { type: "output" as const, text: `  ${job.summary}` },
    ]);
  }

  if (cmd === "projects") {
    return projects.flatMap((p) => [
      { type: "output" as const, text: `${p.name} — ${p.tag}` },
    ]);
  }

  if (cmd === "education") {
    return [
      { type: "output", text: education.degree },
      { type: "output", text: education.school },
    ];
  }

  if (cmd === "contact") {
    return [
      { type: "output", text: `email: ${profile.email}` },
      { type: "output", text: `phone: ${profile.phone}` },
      { type: "output", text: `linkedin: ${profile.linkedin}` },
      { type: "output", text: `github: ${profile.github}` },
    ];
  }

  if (cmd === "resume") {
    if (typeof window !== "undefined") {
      const link = document.createElement("a");
      link.href = "/Raj_Sakariya_Resume.pdf";
      link.download = "";
      link.click();
    }
    return [{ type: "output", text: "downloading resume.pdf ..." }];
  }

  if (cmd.startsWith("sudo")) {
    return [{ type: "error", text: "permission denied: you're not root here." }];
  }

  return [{ type: "error", text: `command not found: ${raw}. type 'help' for a list of commands.` }];
}

export default function Terminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [lines]);

  function runCommand(raw: string) {
    const promptLine: Line = { type: "input", text: raw };

    if (raw.trim().toLowerCase() === "clear") {
      setLines([]);
      return;
    }
    if (raw.trim().toLowerCase() === "exit") {
      setLines((prev) => [...prev, promptLine, { type: "output", text: "closing session..." }]);
      setTimeout(() => setOpen(false), 400);
      return;
    }

    const response = getResponse(raw);
    setLines((prev) => [...prev, promptLine, ...response]);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      if (input.trim() !== "") {
        runCommand(input);
        setHistory((h) => [...h, input]);
      }
      setInput("");
      setHistoryIndex(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open terminal"
        title="Open terminal"
        className={`terminal-fab fixed bottom-6 left-6 z-40 w-11 h-11 flex items-center justify-center rounded-full bg-surface border border-border transition-all duration-300 ${
          open ? "opacity-0 pointer-events-none scale-90" : "opacity-100"
        }`}
      >
        <TerminalSquare size={17} className="text-signal" strokeWidth={2} />
      </button>

      {open && (
        <div className="terminal-window fixed bottom-6 left-6 z-40 w-[92vw] max-w-[440px]">
          <div className="terminal-panel card overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-elevated/60">
              <div className="flex items-center gap-2 font-mono text-xs text-muted">
                <TerminalSquare size={13} className="text-signal" />
                {profile.name.toLowerCase().replace(" ", "-")}@portfolio
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Minimize"
                  className="text-muted hover:text-ink transition-colors"
                >
                  <Minus size={14} />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close terminal"
                  className="text-muted hover:text-pulse transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            <div ref={bodyRef} className="terminal-body font-mono text-xs px-4 py-3 h-64 overflow-y-auto">
              {lines.map((line, i) => (
                <div
                  key={i}
                  className={`terminal-line whitespace-pre-wrap leading-relaxed ${
                    line.type === "input"
                      ? "text-ink"
                      : line.type === "error"
                      ? "text-pulse"
                      : "text-muted"
                  }`}
                >
                  {line.type === "input" ? (
                    <span>
                      <span className="text-signal">$ </span>
                      {line.text}
                    </span>
                  ) : (
                    line.text
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 px-4 py-2.5 border-t border-border">
              <span className="font-mono text-xs text-signal">$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                autoComplete="off"
                className="terminal-input flex-1 bg-transparent font-mono text-xs text-ink outline-none"
                placeholder="type a command..."
              />
              <span className="terminal-caret" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}