import { profile, education } from "@/lib/data";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="py-24 md:py-28">
      <div className="max-w-content mx-auto px-6 md:px-8 grid md:grid-cols-[0.9fr_1.1fr] gap-12 md:gap-16">
        <Reveal>
          <p className="eyebrow mb-4">01 · about</p>
          <h2 className="section-heading text-3xl md:text-[2.2rem] leading-tight mb-5">
            Three years of production
            <br />
            backend work, mostly on
            <br />
            <span className="text-signal">the parts users never see.</span>
          </h2>
          <span className="grow-bar block max-w-[140px]" />
        </Reveal>

        <div>
          <Reveal delay={120}>
            <p className="text-muted text-base md:text-[1.05rem] leading-relaxed mb-6">{profile.summary}</p>
          </Reveal>

          <Reveal delay={240}>
            <p className="text-muted text-base md:text-[1.05rem] leading-relaxed mb-10">
              I care about the boring things that make a platform trustworthy: indexes that keep queries fast at
              scale, permissions that fail closed, and integrations that don't silently drop an event. Most of my
              recent work has been migrating a legacy PHP monolith into a set of independent, event-driven
              services — the kind of project where the architecture decisions matter as much as the code.
            </p>
          </Reveal>

          <Reveal delay={360}>
            <div className="card p-5 md:p-6">
              <p className="font-mono text-xs text-muted mb-1 flex items-center gap-2">
                <span className="live-dot" />
                education
              </p>
              <p className="text-ink font-medium">{education.degree}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}