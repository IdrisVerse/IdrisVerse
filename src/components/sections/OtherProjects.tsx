import { otherProjects } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function OtherProjects() {
  return (
    <section id="other-projects" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading eyebrow="04.1 — More AI / ML Work" title="Other projects" />

      <div className="mt-14 grid gap-5 sm:grid-cols-2">
        {otherProjects.map((project, i) => (
          <Reveal key={project.name} delay={i * 0.06}>
            <div className="h-full rounded-xl border border-border bg-background-secondary p-6 transition-colors hover:border-accent/40">
              <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">{project.category}</p>
              <h3 className="mt-2 text-lg font-semibold text-foreground">{project.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">{project.description}</p>
              {project.sourceUrl && (
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm text-accent transition-colors hover:text-accent-secondary"
                >
                  View Source →
                </a>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
