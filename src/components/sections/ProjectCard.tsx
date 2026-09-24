"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { FeaturedProject } from "@/lib/data";
import { Chip } from "@/components/ui/Chip";
import { useReducedMotion } from "@/lib/hooks";
import { PipelineDiagram } from "./PipelineDiagram";

const caseStudySections: {
  key: keyof FeaturedProject["caseStudy"];
  label: string;
}[] = [
  { key: "problem", label: "The Problem" },
  { key: "approach", label: "The Approach" },
  { key: "intelligence", label: "The Intelligence" },
  { key: "automation", label: "The Automation" },
  { key: "system", label: "The System" },
  { key: "result", label: "The Result" },
];

export function ProjectCard({ project }: { project: FeaturedProject }) {
  const [expanded, setExpanded] = useState(false);
  const prefersReduced = useReducedMotion();
  const panelId = useId();

  return (
    <div className="rounded-2xl border border-border bg-background-secondary p-6 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-2xl font-semibold text-foreground">{project.name}</h3>
          <p className="mt-2 max-w-xl text-foreground-secondary leading-relaxed">{project.summary}</p>
        </div>
        {project.sourceUrl ? (
          <a
            href={project.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-lg border border-border-strong px-4 py-2 text-sm text-foreground-secondary transition-colors hover:border-accent/60 hover:text-accent"
          >
            View Source
          </a>
        ) : (
          <span className="shrink-0 rounded-lg border border-border px-4 py-2 text-sm text-foreground-secondary">
            Private Repository
          </span>
        )}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <Chip key={tech}>{tech}</Chip>
        ))}
      </div>

      <div className="mt-8">
        <p className="font-mono text-xs tracking-[0.2em] text-foreground-secondary uppercase">System</p>
        <div className="mt-3">
          <PipelineDiagram steps={project.system} />
        </div>
      </div>

      <ul className="mt-8 grid gap-2 sm:grid-cols-2">
        {project.capabilities.map((cap) => (
          <li key={cap} className="flex items-start gap-2 text-sm text-foreground-secondary">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
            {cap}
          </li>
        ))}
      </ul>

      <button
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        aria-controls={panelId}
        className="mt-8 flex items-center gap-2 font-mono text-sm text-accent transition-colors hover:text-accent-secondary"
      >
        <span>{expanded ? "Hide Case Study" : "Read Full Case Study"}</span>
        <span className={`transition-transform ${expanded ? "rotate-180" : ""}`} aria-hidden="true">
          ▾
        </span>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id={panelId}
            key="case-study"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-6 space-y-6 border-t border-border pt-6">
              {caseStudySections.map(({ key, label }) => {
                const value = project.caseStudy[key];
                return (
                  <div key={key}>
                    <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">{label}</p>
                    {key === "system" ? (
                      <div className="mt-3">
                        <PipelineDiagram steps={value as string[]} />
                      </div>
                    ) : key === "intelligence" ? (
                      <ul className="mt-2 space-y-1.5">
                        {(value as string[]).map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-foreground-secondary">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-secondary" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">{value as string}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
