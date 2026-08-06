import { otherProjects } from "@/lib/data/otherProjects";
import OtherProjectCard from "@/components/ui/OtherProjectCard";

export default function OtherProjects() {
  return (
    <section id="other-projects" className="max-w-6xl mx-auto px-6 py-24">
      <h3 className="section-eyebrow mb-10">Other Projects</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {otherProjects.map((project) => (
          <OtherProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
