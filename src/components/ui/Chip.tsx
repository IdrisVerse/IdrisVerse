export function Chip({ children, active = false }: { children: React.ReactNode; active?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-mono transition-colors ${
        active
          ? "border-accent/60 bg-accent/10 text-accent"
          : "border-border-strong bg-background-secondary text-foreground-secondary"
      }`}
    >
      {children}
    </span>
  );
}
