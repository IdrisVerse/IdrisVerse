"use client";

import { useMemo } from "react";
import { useReducedMotion } from "@/lib/hooks";

// Deterministic PRNG (mulberry32) so server and client render identical
// output — using Math.random() here would cause a hydration mismatch.
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Node = { x: number; y: number; r: number };
type Edge = { a: number; b: number };

function buildField(count: number, seed: number) {
  const rand = mulberry32(seed);
  const nodes: Node[] = Array.from({ length: count }, () => ({
    x: rand() * 100,
    y: rand() * 100,
    r: 1.4 + rand() * 1.6,
  }));

  const edges: Edge[] = [];
  const maxDist = 22;
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDist) edges.push({ a: i, b: j });
    }
  }
  return { nodes, edges };
}

/**
 * Minimal, static neural-network-like backdrop for the hero section.
 * Deterministic layout (no randomness at runtime), very subtle motion,
 * fully disabled under prefers-reduced-motion.
 */
export function NodeField({ className = "" }: { className?: string }) {
  const prefersReduced = useReducedMotion();
  const { nodes, edges } = useMemo(() => buildField(34, 1337), []);

  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="var(--color-accent)" strokeWidth="0.12" opacity="0.18">
        {edges.map((e, i) => (
          <line
            key={i}
            x1={nodes[e.a].x}
            y1={nodes[e.a].y}
            x2={nodes[e.b].x}
            y2={nodes[e.b].y}
            className={prefersReduced ? undefined : "animate-[pulse_6s_ease-in-out_infinite]"}
            style={prefersReduced ? undefined : { animationDelay: `${(i % 12) * 0.4}s` }}
          />
        ))}
      </g>
      <g fill="var(--color-accent)">
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={n.r * 0.28}
            opacity="0.55"
            className={prefersReduced ? undefined : "animate-[pulse_5s_ease-in-out_infinite]"}
            style={prefersReduced ? undefined : { animationDelay: `${(i % 10) * 0.5}s` }}
          />
        ))}
      </g>
    </svg>
  );
}
