import { social } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden px-6 py-32">
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_50%_60%_at_50%_50%,black,transparent)] opacity-60" />
      <Reveal className="relative mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          HAVE A PROCESS
          <br />
          THAT SHOULD BE AUTOMATED?
        </h2>
        <p className="mt-4 text-foreground-secondary">Let&apos;s build it.</p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <LinkButton href={social.linkedin} target="_blank" rel="noopener noreferrer" variant="primary">
            Start a Conversation
          </LinkButton>
          <LinkButton href={social.linkedin} target="_blank" rel="noopener noreferrer" variant="secondary">
            LinkedIn
          </LinkButton>
        </div>
      </Reveal>
    </section>
  );
}
