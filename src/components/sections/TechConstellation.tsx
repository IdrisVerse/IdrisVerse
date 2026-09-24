"use client";

import { useState } from "react";
import { constellationNodes } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const CENTER = { x: 100, y: 60 };
const RADIUS_X = 82;
const RADIUS_Y = 46;

function nodePosition(index: number, total: number) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  // Rounded to 2dp: raw Math.cos/sin output can differ in its last bit
  // between server (Node) and client (browser) V8 builds, which is enough
  // to fail React's hydration match on these SVG coordinates.
  return {
    x: Math.round((CENTER.x + RADIUS_X * Math.cos(angle)) * 100) / 100,
    y: Math.round((CENTER.y + RADIUS_Y * Math.sin(angle)) * 100) / 100,
  };
}

export function TechConstellation() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="tech-constellation" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        eyebrow="03.1 — Tech Stack"
        title="Constellation"
        description="Hover a node to see how it connects back to the core."
      />

      <Reveal delay={0.1} className="mt-14">
        {/* Interactive grid — small screens, where a dense SVG graph gets cramped */}
        <div className="grid grid-cols-2 gap-3 sm:hidden">
          <div className="col-span-2 rounded-lg border border-accent/50 bg-accent/10 px-4 py-3 text-center font-mono text-sm text-accent">
            AI ENGINEER
          </div>
          {constellationNodes.map((tech) => (
            <div
              key={tech}
              className="rounded-lg border border-border bg-background-secondary px-3 py-3 text-center text-sm text-foreground-secondary"
            >
              {tech}
            </div>
          ))}
        </div>

        {/* SVG constellation — sm and up */}
        <div className="hidden sm:block">
          <svg
            viewBox="0 0 200 120"
            className="w-full"
            role="img"
            aria-label="Tech stack constellation centered on AI Engineer"
          >
            <g stroke="var(--color-border-strong)" strokeWidth="0.4">
              {constellationNodes.map((_, i) => {
                const pos = nodePosition(i, constellationNodes.length);
                const isHovered = hovered === i;
                return (
                  <line
                    key={i}
                    x1={CENTER.x}
                    y1={CENTER.y}
                    x2={pos.x}
                    y2={pos.y}
                    stroke={isHovered ? "var(--color-accent)" : undefined}
                    strokeWidth={isHovered ? 0.8 : 0.4}
                    opacity={hovered === null || isHovered ? 1 : 0.25}
                    style={{ transition: "opacity 200ms, stroke-width 200ms" }}
                  />
                );
              })}
            </g>

            <g>
              <circle cx={CENTER.x} cy={CENTER.y} r="14" fill="var(--color-background-secondary)" stroke="var(--color-accent)" strokeWidth="0.6" />
              <text
                x={CENTER.x}
                y={CENTER.y + 1.5}
                textAnchor="middle"
                className="font-mono"
                fontSize="4.2"
                fill="var(--color-accent)"
              >
                AI ENGINEER
              </text>
            </g>

            {constellationNodes.map((tech, i) => {
              const pos = nodePosition(i, constellationNodes.length);
              const isHovered = hovered === i;
              return (
                <g
                  key={tech}
                  tabIndex={0}
                  role="button"
                  aria-label={tech}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(i)}
                  onBlur={() => setHovered(null)}
                  style={{ cursor: "pointer", outline: "none" }}
                >
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isHovered ? 11 : 9.5}
                    fill={isHovered ? "rgba(57,255,136,0.18)" : "var(--color-background-secondary)"}
                    stroke={isHovered ? "var(--color-accent)" : "var(--color-border-strong)"}
                    strokeWidth={isHovered ? 0.7 : 0.4}
                    style={{ transition: "all 200ms" }}
                  />
                  <text
                    x={pos.x}
                    y={pos.y + 1.3}
                    textAnchor="middle"
                    className="font-mono"
                    fontSize="3.6"
                    fill={isHovered ? "var(--color-accent)" : "var(--color-foreground-secondary)"}
                    style={{ transition: "fill 200ms" }}
                  >
                    {tech}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </Reveal>
    </section>
  );
}
