import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import ThreeDShowcase from "@/components/sections/ThreeDShowcase";
import Skills from "@/components/sections/Skills";
import OtherProjects from "@/components/sections/OtherProjects";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <ThreeDShowcase />
      <Skills />
      <OtherProjects />
    </main>
  );
}
