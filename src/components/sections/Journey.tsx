"use client";

import { useState } from "react";
import { journey } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Chip } from "@/components/ui/Chip";

export function Journey() {
  const [activeId, setActiveId] = useState(journey[0].id);
  const activeIndex = journey.findIndex((n) => n.id === activeId);
  const active = journey[activeIndex];

  return (
    <section id="journey" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        eyebrow="02 — Technical Journey"
        title="From model to business system"
        description="I don't only work with models — I'm moving toward building complete intelligent systems. Hover or select a stage to see how it connects."
      />

      <Reveal delay={0.1} className="mt-16">
        <div
          role="tablist"
          aria-label="Technical journey stages"
          className="relative flex flex-col gap-3 md:flex-row md:items-stretch md:gap-0"
        >
          {journey.map((node, i) => {
            const isActive = node.id === activeId;
            const isPast = i <= activeIndex;
            return (
              <div key={node.id} className="relative flex flex-1 items-center md:flex-col">
                {/* connector */}
                {i > 0 && (
                  <div
                    className="hidden md:block absolute top-6 right-1/2 h-px w-full -z-10"
                    style={{
                      background: isPast
                        ? "linear-gradient(to right, var(--color-accent), var(--color-accent))"
                        : "var(--color-border-strong)",
                    }}
                    aria-hidden="true"
                  />
                )}
                <button
                  role="tab"
                  aria-selected={isActive}
                  onMouseEnter={() => setActiveId(node.id)}
                  onFocus={() => setActiveId(node.id)}
                  onClick={() => setActiveId(node.id)}
                  className="group flex w-full flex-col items-start gap-2 rounded-lg p-3 text-left transition-colors md:items-center md:text-center"
                >
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border font-mono text-xs transition-all ${
                      isActive
                        ? "border-accent bg-accent/15 text-accent glow-ring"
                        : isPast
                          ? "border-accent-secondary/60 text-accent-secondary"
                          : "border-border-strong text-foreground-secondary"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span>
                    <span
                      className={`block text-sm font-semibold tracking-wide ${
                        isActive ? "text-accent" : "text-foreground"
                      }`}
                    >
                      {node.system}
                    </span>
                    <span className="block text-xs text-foreground-secondary">{node.technical}</span>
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        <div
          key={active.id}
          role="tabpanel"
          className="mt-10 rounded-xl border border-border bg-background-secondary p-6 sm:p-8"
        >
          <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">{active.technical}</p>
          <p className="mt-3 max-w-2xl text-foreground-secondary leading-relaxed">{active.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {active.relatedSkills.map((skill) => (
              <Chip key={skill} active>
                {skill}
              </Chip>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
