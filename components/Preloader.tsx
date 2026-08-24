"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/data";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setDone(true);
      return;
    }

    document.body.style.overflow = "hidden";
    let raf = 0;
    const start = performance.now();
    const duration = 1300;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setDone(true);
          document.body.style.overflow = "";
        }, 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (done) return null;

  return (
    <div className={`preloader ${progress === 100 ? "preloader-exit" : ""}`}>
      <div className="preloader-content">
        <span className="font-mono text-xs text-muted mb-4 tracking-widest">
          booting {profile.name.toLowerCase().replace(" ", "-")}
        </span>
        <span className="font-display text-5xl text-ink">{progress}%</span>
        <div className="preloader-bar">
          <div className="preloader-bar-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}