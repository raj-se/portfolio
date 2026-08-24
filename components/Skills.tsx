import { skillGroups } from "@/lib/data";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";
import ContainerScroll from "./ContainerScroll";

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-28">
      <div className="max-w-content mx-auto px-6 md:px-8">
        <ContainerScroll
          titleComponent={
            <Reveal>
              <p className="eyebrow mb-4">02 · Tech Stack</p>
              <h2 className="section-heading text-3xl md:text-[2.2rem] max-w-xl">
                The tools that turn requirements into running services.
              </h2>
            </Reveal>
          }
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {skillGroups.map((group, i) => (
              <Reveal key={group.title} delay={i * 60}>
                <TiltCard>
                  <div className="card p-5 h-full">
                    <p className="font-mono text-xs text-signal mb-4 flex items-center">
                      <span className="group-dot" />
                      {group.title}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item, j) => (
                        <span
                          key={item}
                          className="chip chip-in"
                          style={{ animationDelay: `${120 + j * 60}ms` }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </ContainerScroll>
      </div>
    </section>
  );
}