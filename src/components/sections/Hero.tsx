"use client";

import { motion } from "framer-motion";
import { identity, rotatingWords } from "@/lib/data";
import { TypingRotator } from "@/components/ui/TypingRotator";
import { NodeField } from "@/components/ui/NodeField";
import { LinkButton } from "@/components/ui/Button";
import { useReducedMotion } from "@/lib/hooks";

export function Hero() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent)]" />
      <NodeField className="absolute inset-0 h-full w-full opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/0 via-background/40 to-background" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReduced ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex max-w-3xl flex-col items-center"
      >
        <p className="font-mono text-xs tracking-[0.3em] text-foreground-secondary uppercase">
          {identity.brand}
        </p>

        <h1 className="mt-5 text-5xl font-semibold tracking-tight text-foreground sm:text-7xl">
          {identity.name.toUpperCase()}
        </h1>

        <p className="mt-4 text-lg font-medium tracking-wide text-foreground sm:text-xl">
          AI ENGINEER
          <span className="mx-2 text-foreground-secondary">·</span>
          BUILDING INTELLIGENT SYSTEMS
        </p>

        <div className="mt-6 h-7 font-mono text-base sm:text-lg">
          <TypingRotator words={rotatingWords} />
        </div>

        <p className="mt-6 max-w-xl text-balance text-foreground-secondary leading-relaxed">
          {identity.tagline}
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <LinkButton href="#projects" variant="primary">
            Explore My Work
          </LinkButton>
          <LinkButton href="#ai-agent" variant="secondary">
            Ask My AI Agent
          </LinkButton>
        </div>
      </motion.div>
    </section>
  );
}
