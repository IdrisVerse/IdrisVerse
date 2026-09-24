export function PipelineDiagram({ steps }: { steps: string[] }) {
  return (
    <div
      className="flex flex-col items-stretch gap-0 sm:flex-row sm:items-center sm:gap-0"
      role="list"
      aria-label="System pipeline"
    >
      {steps.map((step, i) => (
        <div key={step} className="flex flex-1 flex-col items-center sm:flex-row">
          <div
            role="listitem"
            className="w-full rounded-lg border border-border-strong bg-background px-4 py-3 text-center font-mono text-xs tracking-wide text-foreground sm:text-[11px]"
          >
            {step}
          </div>
          {i < steps.length - 1 && (
            <div className="flex h-6 items-center justify-center sm:h-auto sm:w-6" aria-hidden="true">
              <span className="text-accent sm:hidden">↓</span>
              <span className="hidden text-accent sm:inline">→</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
