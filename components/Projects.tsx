"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { projects, Project } from "@/lib/data";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";
import ProjectModal from "./ProjectModal";

const PAGE_SIZE = 3;
const DESCRIPTION_LIMIT = 150;

export default function Projects() {
  const totalPages = Math.ceil(projects.length / PAGE_SIZE);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const pageProjects = projects.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  function goTo(nextPage: number) {
    if (nextPage === page || nextPage < 0 || nextPage >= totalPages) return;
    setDirection(nextPage > page ? "next" : "prev");
    setPage(nextPage);
  }

  return (
    <section id="projects" className="py-24 md:py-28">
      <div className="max-w-content mx-auto px-6 md:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-14">
            <div>
              <p className="eyebrow mb-4">04 · projects</p>
              <h2 className="section-heading text-3xl md:text-[2.2rem] max-w-xl">
                Systems worth pointing at.
              </h2>
            </div>
            {totalPages > 1 && (
              <p className="font-mono text-xs text-muted mb-1">
                page {page + 1} / {totalPages}
              </p>
            )}
          </div>
        </Reveal>

        <div className="projects-viewport">
          <div
            key={page}
            className={`grid md:grid-cols-3 gap-6 items-stretch ${
              direction === "next" ? "page-enter-next" : "page-enter-prev"
            }`}
          >
            {pageProjects.map((project, i) => {
              const isLong = project.description.length > DESCRIPTION_LIMIT;

              return (
                <Reveal key={project.name} delay={i * 90} className="h-full">
                  <TiltCard className="h-full">
                    <article className="card project-card p-6 h-full flex flex-col">
                      <p className="font-mono text-xs text-muted mb-3 line-clamp-1">{project.tag}</p>
                      <h3 className="section-heading text-xl text-ink mb-3 line-clamp-1">{project.name}</h3>

                      <p className="text-muted text-sm leading-relaxed line-clamp-3">{project.description}</p>
                      {isLong && (
                        <button
                          onClick={() => setActiveProject(project)}
                          className="read-more-btn text-signal font-mono text-xs mb-5 mt-1.5 self-start"
                        >
                          Read more →
                        </button>
                      )}
                      {!isLong && <div className="mb-5" />}

                      <div className="flex flex-col gap-1.5 mb-5">
                        {project.metrics.map((metric, j) => (
                          <div
                            key={metric}
                            className="metric-in flex items-center gap-2 text-xs text-signal font-mono"
                            style={{ animationDelay: `${150 + j * 90}ms` }}
                          >
                            <span className="w-1 h-1 rounded-full bg-signal" />
                            {metric}
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2 pt-4 border-t border-border mt-auto">
                        {project.stack.map((tech, j) => (
                          <span
                            key={tech}
                            className="chip chip-in !text-[0.7rem] !py-1"
                            style={{ animationDelay: `${350 + j * 60}ms` }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </article>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={() => goTo(page - 1)}
              disabled={page === 0}
              aria-label="Previous page"
              className="btn-ghost !p-2.5 disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft size={16} strokeWidth={2.2} />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to page ${i + 1}`}
                  className={`page-dot ${i === page ? "page-dot-active" : ""}`}
                />
              ))}
            </div>

            <button
              onClick={() => goTo(page + 1)}
              disabled={page === totalPages - 1}
              aria-label="Next page"
              className="btn-ghost !p-2.5 disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronRight size={16} strokeWidth={2.2} />
            </button>
          </div>
        )}
      </div>

      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </section>
  );
}