import type { ExperienceEntry } from "@/lib/data/experience";

export default function ExperienceCard({ entry }: { entry: ExperienceEntry }) {
  return (
    <article className="relative pl-8 border-l border-white/10 pb-12 last:pb-0">
      <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
      <h4 className="text-xl font-semibold">{entry.org}</h4>
      <p className="text-sm text-foreground/50">{entry.location}</p>
      <div className="mt-4 space-y-6">
        {entry.roles.map((role) => (
          <div key={role.title + role.period}>
            <div className="flex flex-wrap items-baseline gap-x-3">
              <h5 className="font-medium text-foreground/90">{role.title}</h5>
              <span className="font-mono text-xs text-foreground/40 uppercase">{role.period}</span>
            </div>
            <ul className="mt-2 list-disc list-inside space-y-1 text-sm text-foreground/70">
              {role.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </article>
  );
}
