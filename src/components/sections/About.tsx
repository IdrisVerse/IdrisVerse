import { identity } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-4xl px-6 py-28">
      <SectionHeading eyebrow="01 — About" title="Who's behind this" />
      <div className="mt-8 space-y-5">
        {identity.about.map((paragraph, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <p className="text-lg leading-relaxed text-foreground-secondary">{paragraph}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
