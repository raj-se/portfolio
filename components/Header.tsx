"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/data";

const links = [
  { href: "#about", label: "about" },
  { href: "#skills", label: "stack" },
  { href: "#experience", label: "experience" },
  { href: "#projects", label: "projects" },
  { href: "#contact", label: "contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-void/85 backdrop-blur-md border-b border-border" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-content mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="font-mono text-sm text-ink flex items-center gap-2 shrink-0">
          <span className="w-2 h-2 rounded-full bg-signal shadow-[0_0_10px_rgba(79,209,197,0.8)]" />
          RS<span className="text-signal"></span>
        </a>

        <nav className="hidden md:flex items-center gap-8 font-mono text-sm">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`nav-link transition-colors ${
                active === l.href ? "is-active text-signal" : "text-muted hover:text-signal"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="hidden md:inline-flex btn-ghost text-xs !py-2 !px-3">
          {profile.email}
        </a>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          className="md:hidden text-ink w-9 h-9 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setOpen((o) => !o)}
        >
          <span
            className={`block w-5 h-px bg-current transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`}
          />
          <span
            className={`block w-5 h-px bg-current transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open && (
        <nav className="md:hidden bg-void border-t border-border px-6 py-4 flex flex-col gap-4 font-mono text-sm text-muted">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-signal" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}