import { experience } from "@/lib/data";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <section id="experience" className="py-24 md:py-28">
      <div className="max-w-content mx-auto px-6 md:px-8">
        <Reveal>
          <p className="eyebrow mb-4">03 · Professional experience</p>
          <h2 className="section-heading text-3xl md:text-[2.2rem] mb-14 max-w-xl">
            Where the work happened.
          </h2>
        </Reveal>

        <div className="relative">
        <Reveal className="absolute left-[7px] top-2 bottom-2 w-px hidden sm:block">
          <div className="timeline-line w-full h-full bg-border" />
          <span className="timeline-pulse" />
        </Reveal>

          <div className="flex flex-col gap-14">
            {experience.map((job, i) => (
              <Reveal key={job.company} delay={i * 100}>
                <div className="relative sm:pl-12">
                  <span className="hidden sm:flex absolute left-0 top-1.5 w-[15px] h-[15px] items-center justify-center">
                    {i === 0 && (
                      <span className="dot-ring absolute inset-0 rounded-full border border-signal" />
                    )}
                    <span className="w-[15px] h-[15px] rounded-full bg-surface border-2 border-signal" />
                  </span>

                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
                    <h3 className="section-heading text-xl md:text-2xl text-ink">{job.company}</h3>
                    <span className="font-mono text-xs text-muted">{job.period}</span>
                  </div>
                  <p className="text-signal text-sm font-medium mb-4">{job.role}</p>
                  <p className="text-muted leading-relaxed mb-5 max-w-2xl">{job.summary}</p>

                  <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
                    {job.points.map((point, j) => (
                      <li
                        key={point}
                        className="point-in text-sm text-muted leading-relaxed pl-4 relative"
                        style={{ animationDelay: `${200 + j * 70}ms` }}
                      >
                        <span className="absolute left-0 top-[0.55em] w-1.5 h-1.5 rounded-full bg-pulse" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}