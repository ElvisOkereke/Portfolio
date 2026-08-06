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
      <h3 className="section-eyebrow mb-10">Projects</h3>
      <div className="grid gap-6 md:grid-cols-3">
        {flagshipProjects.map((project) => (
          <ProjectCard key={project.id} project={project} onViewCaseStudy={setActiveProject} />
        ))}
      </div>
      <ProjectCaseStudyModal project={activeProject} onClose={() => setActiveProject(null)} />
    </motion.section>
  );
}
