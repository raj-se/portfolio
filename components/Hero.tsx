"use client";

import { ArrowRight, FileDown } from "lucide-react";
import { profile, stats } from "@/lib/data";
import NodeGraph from "./NodeGraph";
import Reveal from "./Reveal";
import CountUp from "./CountUp";
import Magnetic from "./Magnetic";
import { createRipple } from "@/lib/ripple";
import Parallax from "./Parallax";
import { useScramble } from "@/lib/useScramble";

export default function Hero() {
  const scrambledName = useScramble(profile.name, 200);
  return (
    <section id="top" className="relative pt-24 pb-20 md:pt-28 md:pb-28 overflow-hidden">
      <div className="max-w-content mx-auto px-6 md:px-8 grid md:grid-cols-[1fr_1.25fr] gap-14 items-center">
        <Reveal>
        <p className="eyebrow mb-5">
          Software Engineer<span className="blink-caret text-signal">_</span>
        </p>
        <h1 className="section-heading text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] mb-6">
          {scrambledName}
          <br />
          <span className="shimmer-text">builds the systems</span> behind the screen.
        </h1>
          <p className="text-muted text-base md:text-lg leading-relaxed max-w-lg mb-9">
            {profile.tagline} Currently at E-Careers, shipping AvaLXP — a learning
            platform built on microservices, PostgreSQL, MongoDB and AWS.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-12">
            <Magnetic>
              <a href="/Raj_Sakariya_Resume.pdf" download className="btn-primary" onClick={createRipple}>
                <FileDown size={16} strokeWidth={2.2} />
                Download resume
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="btn-ghost" onClick={createRipple}>
                Get in touch
                <ArrowRight size={16} strokeWidth={2.2} />
              </a>
            </Magnetic>
          </div>

          <dl className="grid grid-cols-4 gap-4 max-w-lg">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-xl md:text-2xl text-ink font-semibold">
                    <CountUp value={s.value} suffix={s.suffix} />
                  </dd>
                  <dd className="font-mono text-[0.68rem] text-muted leading-tight mt-1">{s.label}</dd>
                </div>
              ))}
            </dl>
        </Reveal>

        <Reveal delay={150}>
          <Parallax speed={0.08}>
            <NodeGraph />
          </Parallax>
        </Reveal>
      </div>
    </section>
  );
}
