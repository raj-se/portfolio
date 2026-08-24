"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { TerminalSquare, X, Maximize2, Minimize2 } from "lucide-react";
import { profile, skillGroups, experience, projects, education } from "@/lib/data";

type LineKind = "input" | "text" | "error" | "heading" | "success" | "kv" | "chips" | "loading";

type Line = {
  kind: LineKind;
  text?: string;
  label?: string;
  value?: string;
  items?: string[];
  color?: string;
  id?: number;
};

const PALETTE = ["#4FD1C5", "#F0A868", "#A78BFA", "#F472B6", "#60A5FA", "#34D399"];

const WELCOME: Line[] = [
  { kind: "heading", text: `${profile.name.toLowerCase().replace(" ", "-")}@portfolio`, color: PALETTE[0] },
  { kind: "text", text: "Type 'help' to see available commands." },
];

function getResponse(raw: string): Line[] {
  const cmd = raw.trim().toLowerCase();
  if (cmd === "") return [];

  const GREETINGS = ["hi", "hello", "hey", "yo", "sup", "hola", "howdy"];
  const GREETING_REPLIES = [
    "Hey there! 👋 Type 'help' to see what I can show you.",
    "Hello! Good to see you poking around. Try 'whoami' or 'projects'.",
    "Hey! Feel free to explore — 'skills' and 'experience' are good starting points.",
    "Yo! Type 'help' if you want the full command list.",
    ];

  if (GREETINGS.includes(cmd)) {
    const reply = GREETING_REPLIES[Math.floor(Math.random() * GREETING_REPLIES.length)];
    return [{ kind: "success", text: reply }];
  }

  if (cmd === "help") {
    const commands: [string, string][] = [
      ["hi / hello", "say hey"],
      ["whoami", "who I am"],
      ["about", "a short summary"],
      ["skills", "the tech stack"],
      ["experience", "where I've worked"],
      ["projects", "what I've built"],
      ["education", "where I studied"],
      ["contact", "how to reach me"],
      ["resume", "download my resume"],
      ["clear", "clear the terminal"],
      ["exit", "close this window"],
    ];
    return [
      { kind: "heading", text: "Available commands", color: PALETTE[0] },
      ...commands.map(([name, desc], i) => ({
        kind: "kv" as const,
        label: name,
        value: desc,
        color: PALETTE[i % PALETTE.length],
      })),
    ];
  }

  if (cmd === "whoami") {
    return [
      { kind: "heading", text: `${profile.name} — ${profile.role}`, color: PALETTE[0] },
      { kind: "kv", label: "location", value: profile.location, color: PALETTE[2] },
    ];
  }

  if (cmd === "about") {
    return [
      { kind: "heading", text: "About", color: PALETTE[1] },
      { kind: "text", text: profile.summary },
    ];
  }

  if (cmd === "skills") {
    return skillGroups.flatMap((g, i) => [
      { kind: "heading" as const, text: g.title, color: PALETTE[i % PALETTE.length] },
      { kind: "chips" as const, items: g.items, color: PALETTE[i % PALETTE.length] },
    ]);
  }

  if (cmd === "experience") {
    return experience.flatMap((job, i) => [
      { kind: "heading" as const, text: job.company, color: PALETTE[i % PALETTE.length] },
      { kind: "kv" as const, label: "role", value: job.role, color: PALETTE[2] },
      { kind: "kv" as const, label: "period", value: job.period, color: PALETTE[2] },
      { kind: "text" as const, text: job.summary },
    ]);
  }

  if (cmd === "projects") {
    return projects.flatMap((p, i) => [
      { kind: "heading" as const, text: p.name, color: PALETTE[i % PALETTE.length] },
      { kind: "kv" as const, label: "tag", value: p.tag, color: PALETTE[2] },
    ]);
  }

  if (cmd === "education") {
    return [
      { kind: "heading", text: education.degree, color: PALETTE[3] },
      { kind: "kv", label: "school", value: education.school, color: PALETTE[2] },
    ];
  }

  if (cmd === "contact") {
    return [
      { kind: "heading", text: "Contact", color: PALETTE[4] },
      { kind: "kv", label: "email", value: profile.email, color: PALETTE[0] },
      { kind: "kv", label: "phone", value: profile.phone, color: PALETTE[1] },
      { kind: "kv", label: "linkedin", value: profile.linkedin, color: PALETTE[2] },
      { kind: "kv", label: "github", value: profile.github, color: PALETTE[4] },
    ];
  }

  if (cmd === "resume") {
    if (typeof window !== "undefined") {
      const link = document.createElement("a");
      link.href = "/Raj_Sakariya_Resume.pdf";
      link.download = "";
      link.click();
    }
    return [{ kind: "success", text: "✓ downloading resume.pdf ..." }];
  }

  if (cmd.startsWith("sudo")) {
    return [{ kind: "error", text: "permission denied: you're not root here." }];
  }

  return [{ kind: "error", text: `command not found: ${raw}. type 'help' for a list of commands.` }];
}

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return idCounter;
}

export default function Terminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>(() => WELCOME.map((l) => ({ ...l, id: nextId() })));
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [busy, setBusy] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [lines]);

  function runCommand(raw: string) {
    const inputLine: Line = { kind: "input", text: raw, id: nextId() };
    const cmd = raw.trim().toLowerCase();

    if (cmd === "clear") {
      setLines([]);
      return;
    }

    setLines((prev) => [...prev, inputLine]);

    if (cmd === "exit") {
      setBusy(true);
      setTimeout(() => {
        setLines((prev) => [...prev, { kind: "success", text: "closing session...", id: nextId() }]);
        setBusy(false);
        setTimeout(() => setOpen(false), 350);
      }, 380);
      return;
    }

    setBusy(true);
    const delay = 260 + Math.random() * 260;
    setTimeout(() => {
      const response = getResponse(raw).map((l) => ({ ...l, id: nextId() }));
      setLines((prev) => [...prev, ...response]);
      setBusy(false);
    }, delay);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (busy) return;
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

  function renderLine(line: Line) {
    if (line.kind === "input") {
      return (
        <div key={line.id} className="term-msg term-msg-input">
          <span className="term-prompt">❯</span>
          <span className="term-input-pill">{line.text}</span>
        </div>
      );
    }
    if (line.kind === "heading") {
      return (
        <div key={line.id} className="term-msg">
          <div className="term-heading" style={{ color: line.color, borderColor: `${line.color}40` }}>
            <span className="term-heading-dot" style={{ background: line.color }} />
            {line.text}
          </div>
        </div>
      );
    }
    if (line.kind === "kv") {
      return (
        <div key={line.id} className="term-msg term-kv">
          <span className="font-mono text-xs" style={{ color: line.color }}>
            {line.label}
          </span>
          <span className="font-mono text-xs text-muted">→</span>
          <span className="font-mono text-xs text-ink">{line.value}</span>
        </div>
      );
    }
    if (line.kind === "chips") {
      return (
        <div key={line.id} className="term-msg flex flex-wrap gap-1.5 pl-4 pb-1">
          {line.items?.map((item) => (
            <span
              key={item}
              className="term-chip font-mono text-[0.68rem]"
              style={{
                color: line.color,
                borderColor: `${line.color}55`,
                background: `${line.color}14`,
              }}
            >
              {item}
            </span>
          ))}
        </div>
      );
    }
    if (line.kind === "success") {
      return (
        <div key={line.id} className="term-msg font-mono text-xs leading-relaxed" style={{ color: "#34D399" }}>
          {line.text}
        </div>
      );
    }
    if (line.kind === "error") {
      return (
        <div key={line.id} className="term-msg term-msg-error font-mono text-xs leading-relaxed">
          ✕ {line.text}
        </div>
      );
    }
    return (
      <div key={line.id} className="term-msg font-mono text-xs leading-relaxed text-muted pl-4">
        {line.text}
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open terminal"
        title="Open terminal"
        className={`terminal-fab fixed bottom-6 right-6 z-40 w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${
            open ? "opacity-0 pointer-events-none scale-90" : "opacity-100"
        }`}
        >
        <TerminalSquare size={18} className="text-void" strokeWidth={2.3} />
      </button>

      {open && (
        <div
        className={`terminal-window fixed bottom-6 right-6 z-40 transition-all duration-300 ${
          expanded
            ? "w-[92vw] max-w-[560px] md:w-[42vw] md:max-w-[620px] min-w-[320px]"
            : "w-[92vw] max-w-[460px]"
        }`}
      >
          <div
            className={`terminal-panel card overflow-hidden flex flex-col ${
                expanded ? "h-[75vh] max-h-[calc(100vh-6rem)] min-h-[420px]" : ""
            }`}
            >
          <div className="relative z-10 flex items-center justify-between px-4 py-3 border-b border-border bg-elevated/60 shrink-0">
              <div className="flex items-center gap-2.5">
                <TerminalSquare size={13} style={{ color: "#4FD1C5" }} />
                <span className="font-mono text-xs text-muted">
                  {profile.name.toLowerCase().replace(" ", "-")}@portfolio
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={() => setExpanded((e) => !e)}
                    aria-label={expanded ? "Collapse terminal" : "Expand terminal"}
                    className="relative z-10 text-muted hover:text-signal transition-colors cursor-pointer"
                >
                    {expanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                </button>
                <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close terminal"
                    className="relative z-10 text-muted hover:text-pulse transition-colors cursor-pointer"
                >
                    <X size={15} />
                </button>
                </div>
            </div>

            <div ref={bodyRef} className={`terminal-body px-4 py-3.5 overflow-y-auto ${expanded ? "flex-1" : "h-72"}`}>
              {lines.map((line) => renderLine(line))}
              {busy && (
                <div className="term-msg flex items-center gap-1.5 pl-1 py-1">
                  <span className="term-dot" />
                  <span className="term-dot" />
                  <span className="term-dot" />
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 px-4 py-3 border-t border-border">
              <span className="font-mono text-xs" style={{ color: "#4FD1C5" }}>
                ❯
              </span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                autoComplete="off"
                disabled={busy}
                className="terminal-input flex-1 bg-transparent font-mono text-xs text-ink outline-none disabled:opacity-50"
                placeholder={busy ? "..." : "type a command..."}
              />
              <span className="terminal-caret" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
