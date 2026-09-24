import { identity, social } from "@/lib/data";

const LINKS = [
  { label: "GitHub", href: social.github },
  { label: "LinkedIn", href: social.linkedin },
  { label: "Instagram", href: social.instagram },
  { label: "TikTok", href: social.tiktok },
  { label: "Facebook", href: social.facebook },
];

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <p className="font-mono text-xs text-foreground-secondary">
          {identity.brand} — {identity.name} · {identity.role}
        </p>

        <nav aria-label="Social links" className="flex flex-wrap justify-center gap-2">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border-strong px-3 py-1 text-xs text-foreground-secondary transition-colors hover:border-accent/60 hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
