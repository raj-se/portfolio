"use client";

import { nodeGraphServices } from "@/lib/data";

const HUB = { x: 400, y: 250 };
const RADIUS = 178;

function nodePosition(index: number, total: number) {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  return {
    x: HUB.x + RADIUS * Math.cos(angle),
    y: HUB.y + RADIUS * Math.sin(angle),
  };
}

export default function NodeGraph() {
  const nodes = nodeGraphServices.map((svc, i) => ({
    ...svc,
    ...nodePosition(i, nodeGraphServices.length),
  }));

  return (
    <svg
      viewBox="0 0 800 500"
      className="w-full h-auto max-w-none"
      role="img"
      aria-label="Diagram of core technologies connected around an event-driven core"
    >
      {/* connecting lines */}
      {nodes.map((n) => (
        <line
          key={`line-${n.id}`}
          x1={HUB.x}
          y1={HUB.y}
          x2={n.x}
          y2={n.y}
          stroke="var(--border-soft)"
          strokeWidth={1.5}
        />
      ))}

      {/* traveling event pulses */}
      {nodes.map((n, i) => (
        <circle
          key={`pulse-${n.id}`}
          r={4}
          fill={i % 2 === 0 ? "var(--signal)" : "var(--pulse)"}
          className="graph-pulse"
          style={{
            offsetPath: `path('M${HUB.x},${HUB.y} L${n.x},${n.y}')`,
            offsetRotate: "0deg",
            animation: `travelDot 3.2s ${i % 2 === 0 ? "linear" : "linear reverse"} infinite`,
            animationDelay: `${i * 0.45}s`,
            filter: "drop-shadow(0 0 4px currentColor)",
          }}
        />
      ))}

      {/* hub pulse rings */}
      <circle cx={HUB.x} cy={HUB.y} r={26} fill="none" stroke="var(--signal)" strokeWidth={1.5} className="hub-ring" />
      <circle cx={HUB.x} cy={HUB.y} r={26} fill="var(--bg-elevated)" stroke="var(--signal)" strokeWidth={1.5} />
      <text
        x={HUB.x}
        y={HUB.y + 4}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="9"
        fill="var(--signal)"
      >
        bus
      </text>

      {/* service nodes */}
      {nodes.map((n) => (
        <g key={n.id}>
          <circle cx={n.x} cy={n.y} r={7} fill="var(--bg-elevated)" stroke="var(--border-soft)" strokeWidth={1.5} />
          <circle cx={n.x} cy={n.y} r={2.4} fill="var(--muted)" />
          <text
            x={n.x}
            y={n.y + (n.y > HUB.y ? 22 : -16)}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="11"
            fill="var(--muted)"
          >
            {n.label}
          </text>
        </g>
      ))}

      <style>{`
        @keyframes travelDot {
          0% { offset-distance: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        .graph-pulse { offset-distance: 0%; }
        @media (prefers-reduced-motion: reduce) {
          .graph-pulse { display: none; }
        }
      `}</style>
    </svg>
  );
}
