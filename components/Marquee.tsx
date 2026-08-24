"use client";

import { marqueeItems } from "@/lib/data";
import { getTechIcon, getTechColor } from "@/lib/techIcons";

export default function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div className="marquee-wrap border-y border-border py-6 overflow-hidden">
      <div className="marquee-track flex items-center gap-10 w-max">
        {items.map((item, i) => {
          const Icon = getTechIcon(item);
          const color = getTechColor(item);
          return (
            <span
              key={i}
              className="marquee-item font-mono text-sm text-muted flex items-center gap-3 shrink-0"
              style={{ ["--tech-color" as string]: color ?? "var(--signal)" }}
            >
              <Icon className="marquee-icon" size={18} />
              {item}
              <span className="w-1.5 h-1.5 rounded-full bg-signal/60" />
            </span>
          );
        })}
      </div>
    </div>
  );
}