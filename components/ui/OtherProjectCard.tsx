import Tag from "@/components/ui/Tag";
import type { OtherProject } from "@/lib/data/otherProjects";

export default function OtherProjectCard({ project }: { project: OtherProject }) {
  return (
    <a
      href={project.githubUrl}
      target="_blank"
      rel="noreferrer"
      className="block border border-white/10 rounded-lg p-5 hover:border-accent/50 transition-colors"
    >
      <h5 className="font-medium">{project.title}</h5>
      <p className="text-sm text-foreground/60 mt-1">{project.description}</p>
      <div className="flex flex-wrap gap-2 mt-3">
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </a>
  );
}
