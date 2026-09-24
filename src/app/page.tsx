import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Journey } from "@/components/sections/Journey";
import { Skills } from "@/components/sections/Skills";
import { TechConstellation } from "@/components/sections/TechConstellation";
import { Projects } from "@/components/sections/Projects";
import { OtherProjects } from "@/components/sections/OtherProjects";
import { AIAgent } from "@/components/sections/AIAgent";
import { CurrentFocus } from "@/components/sections/CurrentFocus";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Journey />
      <Skills />
      <TechConstellation />
      <Projects />
      <OtherProjects />
      <AIAgent />
      <CurrentFocus />
      <Education />
      <Contact />
    </>
  );
}
