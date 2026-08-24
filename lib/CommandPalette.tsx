"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, CornerDownLeft, ArrowUp, ArrowDown, Check } from "lucide-react";
import { commands, Command } from "@/lib/commands";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [highlightStyle, setHighlightStyle] = useState({ top: 0, height: 0, opacity: 0 });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => {
      const haystack = `${c.label} ${c.subtitle ?? ""} ${c.keywords.join(" ")}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [query]);

  const groups = useMemo(() => {
    const order: Command["group"][] = ["Navigate", "Actions", "Connect"];
    return order
      .map((g) => ({ group: g, items: filtered.filter((c) => c.group === g) }))
      .filter((g) => g.items.length > 0);
  }, [filtered]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);

    function onExternalOpen() {
      setOpen(true);
    }
    window.addEventListener("open-command-palette", onExternalOpen);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("open-command-palette", onExternalOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  useEffect(() => {
    const current = filtered[selected];
    if (!current) return;
    const el = itemRefs.current[current.id];
    if (el && listRef.current) {
      setHighlightStyle({ top: el.offsetTop, height: el.offsetHeight, opacity: 1 });
      el.scrollIntoView({ block: "nearest" });
    }
  }, [selected, filtered]);

  function runCommand(cmd: Command) {
    switch (cmd.action.type) {
      case "scroll":
        document.querySelector(cmd.action.target)?.scrollIntoView({ behavior: "smooth" });
        setOpen(false);
        break;
      case "link":
        window.open(cmd.action.href, cmd.action.href.startsWith("mailto:") ? "_self" : "_blank");
        setOpen(false);
        break;
      case "download": {
        const link = document.createElement("a");
        link.href = "/Raj_Sakariya_Resume.pdf";
        link.download = "";
        link.click();
        setOpen(false);
        break;
      }
      case "copy":
        navigator.clipboard.writeText(cmd.action.value).catch(() => {});
        setCopiedId(cmd.id);
        setTimeout(() => {
          setCopiedId(null);
          setOpen(false);
        }, 700);
        break;
      case "terminal":
        window.dispatchEvent(new Event("open-terminal"));
        setOpen(false);
        break;
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const cmd = filtered[selected];
      if (cmd) runCommand(cmd);
    }
  }

  if (!open) return null;

  return (
    <div className="cmdk-overlay" onClick={() => setOpen(false)}>
      <div className="cmdk-panel card" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border">
          <Search size={16} className="text-muted shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoComplete="off"
            placeholder="Search commands, sections, actions..."
            className="flex-1 bg-transparent font-mono text-sm text-ink outline-none placeholder:text-muted"
          />
          <kbd className="cmdk-kbd">esc</kbd>
        </div>

        <div ref={listRef} className="cmdk-list relative max-h-[360px] overflow-y-auto py-2">
          <div className="cmdk-highlight" style={highlightStyle} />

          {groups.length === 0 && (
            <p className="px-4 py-8 text-center text-sm text-muted font-mono">No matching commands.</p>
          )}

          {groups.map(({ group, items }) => (
            <div key={group} className="mb-1 last:mb-0">
              <p className="px-4 pt-2 pb-1 font-mono text-[0.65rem] tracking-widest text-muted uppercase">
                {group}
              </p>
              {items.map((cmd) => {
                const globalIndex = filtered.indexOf(cmd);
                const Icon = cmd.icon;
                const isCopied = copiedId === cmd.id;
                return (
                  <button
                    key={cmd.id}
                    ref={(el) => { itemRefs.current[cmd.id] = el; }}
                    onClick={() => runCommand(cmd)}
                    onMouseEnter={() => setSelected(globalIndex)}
                    className="cmdk-item relative z-10 flex items-center gap-3 w-full px-4 py-2.5 text-left"
                  >
                    <Icon size={15} className="text-signal shrink-0" strokeWidth={2} />
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm text-ink truncate">{cmd.label}</span>
                      {cmd.subtitle && (
                        <span className="block text-xs text-muted font-mono truncate">{cmd.subtitle}</span>
                      )}
                    </span>
                    {isCopied && (
                      <span className="flex items-center gap-1 text-xs font-mono text-signal shrink-0">
                        <Check size={12} /> copied
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="hidden sm:flex items-center gap-4 px-4 py-2.5 border-t border-border">
          <span className="flex items-center gap-1.5 font-mono text-[0.68rem] text-muted">
            <kbd className="cmdk-kbd"><ArrowUp size={10} /></kbd>
            <kbd className="cmdk-kbd"><ArrowDown size={10} /></kbd>
            navigate
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[0.68rem] text-muted">
            <kbd className="cmdk-kbd"><CornerDownLeft size={10} /></kbd>
            select
          </span>
        </div>
      </div>
    </div>
  );
}