"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { Project } from "@/lib/data";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleClose() {
    setClosing(true);
    setTimeout(onClose, 240);
  }

  return (
    <div
      className={`modal-overlay ${closing ? "modal-overlay-exit" : ""}`}
      onClick={handleClose}
    >
      <div
        className={`modal-content card p-6 md:p-10 ${closing ? "modal-content-exit" : ""}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          onClick={handleClose}
          aria-label="Close"
          className="modal-close-btn absolute top-4 right-4 text-muted hover:text-signal transition-colors"
        >
          <X size={20} />
        </button>

        <p className="modal-line font-mono text-xs text-muted mb-3" style={{ animationDelay: "80ms" }}>
          {project.tag}
        </p>
        <h3
          id="modal-title"
          className="modal-line section-heading text-2xl md:text-3xl text-ink mb-5 pr-8"
          style={{ animationDelay: "140ms" }}
        >
          {project.name}
        </h3>
        <p
          className="modal-line text-muted text-base leading-relaxed mb-7"
          style={{ animationDelay: "200ms" }}
        >
          {project.description}
        </p>

        <div className="flex flex-col gap-1.5 mb-7">
          {project.metrics.map((metric, i) => (
            <div
              key={metric}
              className="modal-line flex items-center gap-2 text-sm text-signal font-mono"
              style={{ animationDelay: `${260 + i * 80}ms` }}
            >
              <span className="w-1 h-1 rounded-full bg-signal" />
              {metric}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 pt-5 border-t border-border">
          {project.stack.map((tech, i) => (
            <span
              key={tech}
              className="chip chip-in !text-[0.72rem]"
              style={{ animationDelay: `${260 + project.metrics.length * 80 + i * 55}ms` }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}