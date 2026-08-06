"use client";
import Image from "next/image";
import Tag from "@/components/ui/Tag";
import type { FlagshipProject } from "@/lib/data/projects";

type ProjectCardProps = {
  project: FlagshipProject;
  onViewCaseStudy: (project: FlagshipProject) => void;
};

export default function ProjectCard({ project, onViewCaseStudy }: ProjectCardProps) {
  return (
    <article className="border border-white/10 rounded-lg overflow-hidden bg-white/5 flex flex-col">
      <div className="relative h-48 bg-white/5 flex items-center justify-center">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            className="object-cover"
          />
        ) : (
          <span className="font-mono text-sm text-foreground/30">{project.title}</span>
        )}
      </div>
      <div className="p-6 flex flex-col gap-3 flex-1">
        <h4 className="text-lg font-semibold">{project.title}</h4>
        <p className="text-sm text-foreground/70 flex-1">{project.tagline}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => onViewCaseStudy(project)}
            className="text-accent text-sm font-mono hover:underline"
          >
            View case study →
          </button>
          <div className="flex gap-3 text-sm text-foreground/50">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="hover:text-accent">
                GitHub
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="hover:text-accent">
                Live
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
