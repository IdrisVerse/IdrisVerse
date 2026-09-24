"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useUI } from "@/lib/ui-context";
import { terminalCommands } from "@/lib/data";

type Line = { type: "input" | "output"; text: string };

const COMMAND_LIST = ["help", "whoami", "about", "skills", "projects", "contact", "clear"];

const WELCOME: Line[] = [
  { type: "output", text: "IdrisVerse terminal — type `help` to see available commands." },
];

function runCommand(cmd: string): Line[] {
  const trimmed = cmd.trim().toLowerCase();
  if (trimmed === "help") {
    return [{ type: "output", text: `Available commands: ${COMMAND_LIST.join(", ")}` }];
  }
  if (trimmed === "clear") return [];
  if (trimmed in terminalCommands) {
    return terminalCommands[trimmed].map((text) => ({ type: "output", text }));
  }
  if (trimmed === "") return [];
  return [{ type: "output", text: `command not found: ${trimmed} — try 'help'` }];
}

export function Terminal() {
  const { terminalOpen, setTerminalOpen } = useUI();
  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalOpen) {
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [terminalOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [lines]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const cmd = input;
    setInput("");
    if (cmd.trim().toLowerCase() === "clear") {
      setLines([]);
      return;
    }
    setLines((prev) => [...prev, { type: "input", text: cmd }, ...runCommand(cmd)]);
  }

  return (
    <>
      <button
        onClick={() => setTerminalOpen(true)}
        aria-label="Open terminal"
        className="fixed bottom-5 right-5 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-border-strong bg-background-secondary font-mono text-accent shadow-lg transition-colors hover:border-accent/60"
      >
        &gt;_
      </button>

      {terminalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-background/70 p-4 backdrop-blur-sm sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-label="Interactive terminal"
          onClick={() => setTerminalOpen(false)}
        >
          <div
            className="flex h-[70vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-border-strong bg-background shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <p className="font-mono text-xs text-foreground-secondary">mohamed@idrisverse:~</p>
              <button
                onClick={() => setTerminalOpen(false)}
                aria-label="Close terminal"
                className="text-foreground-secondary hover:text-accent"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3 font-mono text-sm">
              {lines.map((line, i) => (
                <p
                  key={i}
                  className={line.type === "input" ? "text-foreground" : "whitespace-pre-line text-foreground-secondary"}
                >
                  {line.type === "input" && <span className="text-accent">$ </span>}
                  {line.text}
                </p>
              ))}
              <div ref={bottomRef} />
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-border px-4 py-3">
              <span className="font-mono text-accent" aria-hidden="true">
                $
              </span>
              <label htmlFor="terminal-input" className="sr-only">
                Terminal command
              </label>
              <input
                id="terminal-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent font-mono text-sm text-foreground focus:outline-none"
                autoComplete="off"
                spellCheck={false}
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
}
