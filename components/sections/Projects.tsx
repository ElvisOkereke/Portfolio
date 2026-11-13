"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { flagshipProjects, type FlagshipProject } from "@/lib/data/projects";
import ProjectCard from "@/components/ui/ProjectCard";
import ProjectCaseStudyModal from "@/components/sections/ProjectCaseStudyModal";

export default function Projects() {
  const [activeProject, setActiveProject] = useState<FlagshipProject | null>(null);

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto px-6 py-24"
    >
      <h3 className="section-eyebrow mb-4">Projects</h3>
      <p className="max-w-2xl text-foreground/60 mb-10">
        Things I build on my own time and actually use. Every number below is measured and
        reproducible from the project&apos;s repo.
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        {flagshipProjects.map((project) => (
          <ProjectCard key={project.id} project={project} onViewCaseStudy={setActiveProject} />
        ))}
      </div>
      <ProjectCaseStudyModal project={activeProject} onClose={() => setActiveProject(null)} />
    </motion.section>
  );
}
