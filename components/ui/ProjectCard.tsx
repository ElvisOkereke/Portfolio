"use client";
import Tag from "@/components/ui/Tag";
import ProjectVisual from "@/components/ui/ProjectVisual";
import type { FlagshipProject } from "@/lib/data/projects";

type ProjectCardProps = {
  project: FlagshipProject;
  onViewCaseStudy: (project: FlagshipProject) => void;
};

function Metrics({ project, large }: { project: FlagshipProject; large?: boolean }) {
  return (
    <dl className="grid grid-cols-3 gap-3 border-y border-white/10 py-4">
      {project.metrics.map((m) => (
        <div key={m.label} className="min-w-0">
          <dt className="sr-only">{m.label}</dt>
          <dd
            className={`font-mono font-semibold text-accent leading-tight ${
              large ? "text-xl md:text-3xl" : "text-base sm:text-lg md:text-xl"
            }`}
          >
            {m.value}
          </dd>
          <dd className="mt-1 text-[11px] leading-snug text-foreground/50">{m.label}</dd>
        </div>
      ))}
    </dl>
  );
}

function Links({ project, onViewCaseStudy }: ProjectCardProps) {
  return (
    <div className="flex items-center justify-between pt-1">
      <button
        onClick={() => onViewCaseStudy(project)}
        className="text-accent text-sm font-mono hover:underline"
      >
        Read the case study →
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
  );
}

function Status({ status }: { status: string }) {
  const live = status.toLowerCase().startsWith("live");
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-foreground/60">
      <span className={`h-1.5 w-1.5 rounded-full ${live ? "bg-emerald-400" : "bg-accent"}`} />
      {status}
    </span>
  );
}

export default function ProjectCard({ project, onViewCaseStudy }: ProjectCardProps) {
  const featured = project.featured;
  return (
    <article
      className={`group border border-white/10 rounded-xl overflow-hidden bg-white/[0.03] flex transition-colors hover:border-accent/40 ${
        featured ? "flex-col md:col-span-2 md:flex-row" : "flex-col"
      }`}
    >
      <button
        type="button"
        onClick={() => onViewCaseStudy(project)}
        aria-label={`Open the ${project.title} case study`}
        className={`relative block shrink-0 overflow-hidden bg-white/5 text-left ${
          featured ? "aspect-[16/10] md:aspect-auto md:min-h-[440px] md:w-[52%]" : "aspect-[16/10]"
        }`}
      >
        <ProjectVisual project={project} />
        {project.gallery && project.gallery.length > 1 && (
          <span className="absolute bottom-3 right-3 rounded-full border border-white/10 bg-black/70 px-2.5 py-1 font-mono text-[10px] text-foreground/70 backdrop-blur">
            {project.gallery.length} screenshots
          </span>
        )}
      </button>
      <div className={`flex flex-col gap-4 flex-1 ${featured ? "p-6 md:p-8" : "p-6"}`}>
        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <p className="font-mono text-[11px] uppercase tracking-widest text-foreground/40">
              {project.kind}
            </p>
            <Status status={project.status} />
          </div>
          <h4 className={`mt-1 font-semibold ${featured ? "text-2xl md:text-3xl" : "text-xl"}`}>
            {project.title}
          </h4>
        </div>
        <p className="text-sm text-foreground/70 leading-relaxed flex-1">{project.tagline}</p>
        <Metrics project={project} large={featured} />
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <Links project={project} onViewCaseStudy={onViewCaseStudy} />
      </div>
    </article>
  );
}
