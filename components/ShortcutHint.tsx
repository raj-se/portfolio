"use client";

import { useGlobalShortcuts } from "@/lib/useGlobalShortcuts";

const OPTIONS: [string, string][] = [
  ["h", "home"], ["a", "about"], ["s", "stack"],
  ["e", "experience"], ["p", "projects"], ["c", "contact"],
];

export default function ShortcutHint() {
  const active = useGlobalShortcuts();
  if (!active) return null;

  return (
    <div className="shortcut-hint fixed top-20 left-1/2 -translate-x-1/2 z-[250]">
      <div className="card px-3 py-2 flex items-center gap-2.5 font-mono text-xs">
        <kbd className="cmdk-kbd">g</kbd>
        <span className="text-muted">then</span>
        {OPTIONS.map(([key, label]) => (
          <span key={key} className="flex items-center gap-1 text-muted">
            <kbd className="cmdk-kbd">{key}</kbd>
            <span className="hidden sm:inline">{label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}