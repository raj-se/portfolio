"use client";

import { useRef, MouseEvent, ReactNode, CSSProperties } from "react";

export default function TiltCard({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateX = (0.5 - py) * 8;
    const rotateY = (px - 0.5) * 8;
    el.style.setProperty("--tiltX", `${rotateX}deg`);
    el.style.setProperty("--tiltY", `${rotateY}deg`);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    el.classList.add("is-tilting");
  }

  function handleMouseLeave() {
    ref.current?.classList.remove("is-tilting");
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`spotlight transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}