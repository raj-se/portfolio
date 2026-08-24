"use client";

import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\\/[]{}—=+*^?#";

export function useScramble(text: string, delay = 250) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setDisplay(text);
      return;
    }

    let frame = 0;
    let raf = 0;
    const totalFrames = text.length * 3 + 20;

    const timeout = setTimeout(() => {
      const animate = () => {
        frame++;
        const revealCount = Math.floor((frame / totalFrames) * text.length);
        const next = text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < revealCount) return text[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");
        setDisplay(next);
        if (frame < totalFrames) {
          raf = requestAnimationFrame(animate);
        } else {
          setDisplay(text);
        }
      };
      raf = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [text, delay]);

  return display;
}