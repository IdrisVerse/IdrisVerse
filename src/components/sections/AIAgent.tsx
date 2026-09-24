"use client";

import { useRef, useState, type FormEvent } from "react";
import { askAgent, isLiveAgentConnected } from "@/lib/ai-agent";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

type Message = { role: "agent" | "user"; text: string };

const SUGGESTIONS = ["Who is Mohamed?", "Tell me about Cipher Courier", "What's his ML background?", "How do I contact him?"];

const INTRO: Message = {
  role: "agent",
  text: "Hi, I'm a scoped demo agent for this portfolio. Ask about Mohamed's background, skills, or projects.",
};

export function AIAgent() {
  const [messages, setMessages] = useState<Message[]>([INTRO]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || pending) return;
    setMessages((m) => [...m, { role: "user", text: trimmed }]);
    setInput("");
    setPending(true);
    const reply = await askAgent(trimmed);
    setMessages((m) => [...m, { role: "agent", text: reply }]);
    setPending(false);
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    void send(input);
  }

  return (
    <section id="ai-agent" className="mx-auto max-w-4xl px-6 py-28">
      <SectionHeading
        eyebrow="05 — Ask My AI Agent"
        title="Talk to a scoped demo agent"
        description={
          isLiveAgentConnected
            ? "Connected to a live backend."
            : "Running on a local, rule-based responder grounded only in this site's content — a real LLM/RAG backend can be dropped in behind the same interface."
        }
      />

      <Reveal delay={0.1} className="mt-12">
        <div className="rounded-2xl border border-border-strong bg-background-secondary overflow-hidden">
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-accent/70" aria-hidden="true" />
            <p className="font-mono text-xs text-foreground-secondary">agent@idrisverse — ask-ai</p>
          </div>

          <div
            ref={listRef}
            role="log"
            aria-live="polite"
            className="h-80 space-y-4 overflow-y-auto px-4 py-5 sm:h-96"
          >
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <p
                  className={`max-w-[85%] whitespace-pre-line rounded-lg px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-accent text-background"
                      : "border border-border font-mono text-foreground-secondary"
                  }`}
                >
                  {m.role === "agent" && <span className="mr-2 text-accent">$</span>}
                  {m.text}
                </p>
              </div>
            ))}
            {pending && (
              <p className="font-mono text-sm text-foreground-secondary">
                <span className="mr-2 text-accent">$</span>thinking…
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-2 border-t border-border px-4 py-3">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => void send(s)}
                disabled={pending}
                className="rounded-full border border-border-strong px-3 py-1 text-xs text-foreground-secondary transition-colors hover:border-accent/60 hover:text-accent disabled:opacity-50"
              >
                {s}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-border p-3">
            <label htmlFor="agent-input" className="sr-only">
              Ask the AI agent a question
            </label>
            <input
              id="agent-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Mohamed's projects, skills, or background…"
              className="flex-1 bg-transparent px-2 py-2 font-mono text-sm text-foreground placeholder:text-foreground-secondary/60 focus:outline-none"
              disabled={pending}
            />
            <button
              type="submit"
              disabled={pending || !input.trim()}
              className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-accent-secondary disabled:opacity-40"
            >
              Send
            </button>
          </form>
        </div>
      </Reveal>
    </section>
  );
}
