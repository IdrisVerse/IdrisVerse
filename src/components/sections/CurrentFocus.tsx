import { currentFocus } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

export function CurrentFocus() {
  return (
    <section aria-label="Currently exploring" className="mx-auto max-w-4xl px-6 py-16">
      <Reveal>
        <div className="rounded-xl border border-border bg-background-secondary px-6 py-6 sm:px-8">
          <p className="flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-accent uppercase">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Currently Exploring
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {currentFocus.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border-strong px-3 py-1 text-sm text-foreground-secondary"
              >
                {item}
              </span>
            ))}
          </div>
          <p className="mt-4 text-xs text-foreground-secondary">
            Active exploration and learning — not completed certifications.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
