import { education, certifications } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Education() {
  return (
    <section id="education" className="mx-auto max-w-5xl px-6 py-28">
      <SectionHeading eyebrow="06 — Education & Programs" title="Foundations" />

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-xl border border-border bg-background-secondary p-6 sm:p-8">
            <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">Education</p>
            <h3 className="mt-3 text-xl font-semibold text-foreground">{education.school}</h3>
            <p className="mt-1 text-foreground-secondary">{education.faculty}</p>
            <p className="mt-1 text-sm text-foreground-secondary">{education.track}</p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="h-full rounded-xl border border-border bg-background-secondary p-6 sm:p-8">
            <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">Certifications & Programs</p>
            <ul className="mt-3 space-y-2.5">
              {certifications.map((cert) => (
                <li key={cert} className="flex items-start gap-2 text-foreground-secondary">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
