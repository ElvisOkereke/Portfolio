import Modal from "@/components/ui/Modal";
import Tag from "@/components/ui/Tag";
import type { FlagshipProject } from "@/lib/data/projects";

type ProjectCaseStudyModalProps = {
  project: FlagshipProject | null;
  onClose: () => void;
};

export default function ProjectCaseStudyModal({ project, onClose }: ProjectCaseStudyModalProps) {
  return (
    <Modal isOpen={project !== null} onClose={onClose}>
      {project && (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-semibold">{project.title}</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>
          <div className="space-y-4 text-sm text-foreground/80 leading-relaxed">
            <p>
              <span className="text-accent font-mono">Problem — </span>
              {project.caseStudy.problem}
            </p>
            <p>
              <span className="text-accent font-mono">Approach — </span>
              {project.caseStudy.approach}
            </p>
            <p>
              <span className="text-accent font-mono">Architecture — </span>
              {project.caseStudy.architecture}
            </p>
            <p>
              <span className="text-accent font-mono">Results — </span>
              {project.caseStudy.results}
            </p>
          </div>
          <div className="flex gap-4 pt-2">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn-secondary">
                View Code
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn-primary">
                Live Demo
              </a>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}
