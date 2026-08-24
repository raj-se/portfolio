"use client";

import { useEffect, useRef, useState } from "react";
import { NAV_SHORTCUT_MAP } from "./commands";

export function useGlobalShortcuts() {
  const [hint, setHint] = useState(false);
  const pendingRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    function reset() {
      pendingRef.current = false;
      setHint(false);
    }

    function onKeyDown(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (!pendingRef.current && e.key.toLowerCase() === "g") {
        pendingRef.current = true;
        setHint(true);
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(reset, 1300);
        return;
      }

      if (pendingRef.current) {
        const target = NAV_SHORTCUT_MAP[e.key.toLowerCase()];
        if (target) {
          document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
        }
        clearTimeout(timeoutRef.current);
        reset();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return hint;
}