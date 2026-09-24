"use client";

import { useUI } from "@/lib/ui-context";
import { useActiveSection } from "@/lib/hooks";
import { identity } from "@/lib/data";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "journey", label: "Journey" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const { mobileMenuOpen, setMobileMenuOpen, setPaletteOpen } = useUI();
  const active = useActiveSection(LINKS.map((l) => l.id));

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4" aria-label="Primary">
        <a href="#home" className="font-mono text-sm font-semibold tracking-wide text-foreground">
          {identity.brand}
          <span className="text-accent">.</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={active === link.id ? "page" : undefined}
                className={`rounded-md px-3 py-2 text-sm transition-colors ${
                  active === link.id
                    ? "text-accent"
                    : "text-foreground-secondary hover:text-foreground"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            onClick={() => setPaletteOpen(true)}
            className="flex items-center gap-2 rounded-md border border-border-strong px-3 py-1.5 text-xs text-foreground-secondary transition-colors hover:border-accent/60 hover:text-accent"
          >
            <span>Search</span>
            <kbd className="rounded border border-border-strong bg-background px-1.5 py-0.5 font-mono text-[10px]">
              Ctrl K
            </kbd>
          </button>
          <a
            href="#ai-agent"
            className="rounded-md bg-accent px-3 py-1.5 text-xs font-medium text-background transition-colors hover:bg-accent-secondary"
          >
            Ask AI
          </a>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle menu"
          className="flex h-9 w-9 items-center justify-center rounded-md border border-border-strong text-foreground lg:hidden"
        >
          <span aria-hidden="true">{mobileMenuOpen ? "✕" : "☰"}</span>
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t border-border px-6 py-4 lg:hidden">
          <ul className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block rounded-md px-3 py-2.5 text-sm ${
                    active === link.id ? "text-accent" : "text-foreground-secondary"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex gap-3 border-t border-border pt-3">
            <button
              onClick={() => {
                setPaletteOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex-1 rounded-md border border-border-strong px-3 py-2 text-sm text-foreground-secondary"
            >
              Search
            </button>
            <a
              href="#ai-agent"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 rounded-md bg-accent px-3 py-2 text-center text-sm font-medium text-background"
            >
              Ask AI
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
