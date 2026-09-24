import { featuredProjects } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-28">
      <SectionHeading
        eyebrow="04 — Featured Projects"
        title="Systems, not just models"
        description="Two systems built end to end — from raw input to an automated outcome."
      />

      <div className="mt-14 space-y-10">
        {featuredProjects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.1}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
