"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const RADIUS = 18;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function BackToTop() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(pct);
      setVisible(scrollTop > 480);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const offset = CIRCUMFERENCE - progress * CIRCUMFERENCE;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-40 w-11 h-11 flex items-center justify-center rounded-full bg-surface border border-border transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <svg className="absolute inset-0 -rotate-90" width="44" height="44">
        <circle cx="22" cy="22" r={RADIUS} fill="none" stroke="var(--border-soft)" strokeWidth="2" />
        <circle
          cx="22"
          cy="22"
          r={RADIUS}
          fill="none"
          stroke="var(--signal)"
          strokeWidth="2"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 120ms ease-out" }}
        />
      </svg>
      <ArrowUp size={16} className="text-ink" strokeWidth={2.2} />
    </button>
  );
}