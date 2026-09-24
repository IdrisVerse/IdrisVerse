"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useUI } from "@/lib/ui-context";
import { social } from "@/lib/data";

type Command = {
  label: string;
  hint: string;
  action: () => void;
};

export function CommandPalette() {
  const { paletteOpen } = useUI();
  if (!paletteOpen) return null;
  return <CommandPaletteDialog />;
}

function CommandPaletteDialog() {
  const { setPaletteOpen, setTerminalOpen } = useUI();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Command[] = useMemo(
    () => [
      { label: "Home", hint: "Section", action: () => scrollTo("home") },
      { label: "About", hint: "Section", action: () => scrollTo("about") },
      { label: "Technical Journey", hint: "Section", action: () => scrollTo("journey") },
      { label: "Skills", hint: "Section", action: () => scrollTo("skills") },
      { label: "Projects", hint: "Section", action: () => scrollTo("projects") },
      { label: "Experience / Education", hint: "Section", action: () => scrollTo("education") },
      { label: "Contact", hint: "Section", action: () => scrollTo("contact") },
      { label: "Ask AI Agent", hint: "Section", action: () => scrollTo("ai-agent") },
      { label: "Open Terminal", hint: "Tool", action: () => setTerminalOpen(true) },
      { label: "GitHub", hint: "External ↗", action: () => window.open(social.github, "_blank") },
      { label: "LinkedIn", hint: "External ↗", action: () => window.open(social.linkedin, "_blank") },
    ],
    [setTerminalOpen]
  );

  const filtered = commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    requestAnimationFrame(() => inputRef.current?.focus());
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  function run(cmd: Command) {
    cmd.action();
    setPaletteOpen(false);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-background/70 px-4 pt-24 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onClick={() => setPaletteOpen(false)}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-xl border border-border-strong bg-background-secondary shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="text-accent" aria-hidden="true">
            &gt;
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Jump to a section or link…"
            className="w-full bg-transparent font-mono text-sm text-foreground placeholder:text-foreground-secondary/60 focus:outline-none"
            aria-label="Command search"
            onKeyDown={(e) => {
              if (e.key === "Enter" && filtered[0]) run(filtered[0]);
            }}
          />
          <kbd className="rounded border border-border-strong px-1.5 py-0.5 font-mono text-[10px] text-foreground-secondary">
            Esc
          </kbd>
        </div>
        <ul className="max-h-80 overflow-y-auto py-2" role="listbox">
          {filtered.length === 0 && (
            <li className="px-4 py-6 text-center text-sm text-foreground-secondary">No matches</li>
          )}
          {filtered.map((cmd) => (
            <li key={cmd.label}>
              <button
                onClick={() => run(cmd)}
                className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm text-foreground transition-colors hover:bg-accent/10 hover:text-accent"
              >
                <span>{cmd.label}</span>
                <span className="font-mono text-xs text-foreground-secondary">{cmd.hint}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
