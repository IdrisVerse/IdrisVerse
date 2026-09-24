"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/hooks";

const TYPE_SPEED = 55;
const DELETE_SPEED = 30;
const HOLD_MS = 1400;

export function TypingRotator({ words }: { words: string[] }) {
  const prefersReduced = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("typing");

  useEffect(() => {
    if (prefersReduced) return;

    const current = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), TYPE_SPEED);
      } else {
        timeout = setTimeout(() => setPhase("holding"), HOLD_MS);
      }
    } else if (phase === "holding") {
      timeout = setTimeout(() => setPhase("deleting"), HOLD_MS);
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), DELETE_SPEED);
      } else {
        timeout = setTimeout(() => {
          setWordIndex((i) => (i + 1) % words.length);
          setPhase("typing");
        }, DELETE_SPEED);
      }
    }

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, phase, wordIndex, prefersReduced]);

  const displayed = prefersReduced ? words[0] : text;

  return (
    <span className="inline-flex items-baseline text-accent">
      <span aria-live="polite">{displayed}</span>
      {!prefersReduced && (
        <span className="ml-0.5 h-[0.9em] w-[2px] translate-y-[1px] bg-accent animate-blink" aria-hidden="true" />
      )}
    </span>
  );
}
