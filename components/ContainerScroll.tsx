"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

export default function ContainerScroll({
  titleComponent,
  children,
}: {
  titleComponent: ReactNode;
  children: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState(20);
  const [scale, setScale] = useState(0.9);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setRotate(0);
      setScale(1);
      return;
    }

    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      const start = vh;
      const end = vh * 0.2;
      const raw = (start - rect.top) / (start - end);
      const progress = Math.min(Math.max(raw, 0), 1);

      setRotate(20 - 20 * progress);
      setScale(0.9 + 0.1 * progress);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative flex flex-col items-center">
      {titleComponent}
      <div className="w-full mt-10" style={{ perspective: "1400px" }}>
        <div
          style={{
            transform: `rotateX(${rotate}deg) scale(${scale})`,
            transformOrigin: "top center",
            transition: "transform 80ms linear",
            willChange: "transform",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}