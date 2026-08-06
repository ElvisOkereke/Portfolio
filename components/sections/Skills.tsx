import { skills } from "@/lib/data/skills";

export default function Skills() {
  return (
    <section id="skills" className="max-w-4xl mx-auto px-6 py-24">
      <h3 className="section-eyebrow mb-10">Skills</h3>
      <div className="grid gap-10 sm:grid-cols-3">
        {skills.map((group) => (
          <div key={group.category}>
            <h4 className="font-mono text-xs uppercase tracking-widest text-accent mb-4">
              {group.category}
            </h4>
            <ul className="space-y-2 text-foreground/80">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
