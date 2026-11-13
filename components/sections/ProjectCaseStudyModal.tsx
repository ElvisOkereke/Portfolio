"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Modal from "@/components/ui/Modal";
import Lightbox from "@/components/ui/Lightbox";
import Tag from "@/components/ui/Tag";
import type { FlagshipProject } from "@/lib/data/projects";

type ProjectCaseStudyModalProps = {
  project: FlagshipProject | null;
  onClose: () => void;
};

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <h4 className="font-mono text-xs uppercase tracking-widest text-accent">{label}</h4>
      <div className="text-sm text-foreground/80 leading-relaxed">{children}</div>
    </section>
  );
}

function Gallery({ project }: { project: FlagshipProject }) {
  const [open, setOpen] = useState<number | null>(null);
  const shots = project.gallery ?? [];
  useEffect(() => setOpen(null), [project.id]);
  if (shots.length === 0) return null;
  const [first, ...rest] = shots;
  return (
    <section className="space-y-3">
      <h4 className="font-mono text-xs uppercase tracking-widest text-accent">
        Screenshots <span className="text-foreground/40 normal-case tracking-normal">· click to enlarge</span>
      </h4>
      <button
        type="button"
        onClick={() => setOpen(0)}
        className="group block w-full overflow-hidden rounded-lg border border-white/10 bg-black text-left hover:border-accent/50"
      >
        <Image
          src={first.src}
          alt={first.caption}
          width={first.width}
          height={first.height}
          sizes="(min-width: 768px) 720px, 100vw"
          quality={90}
          className={`w-full ${first.height > first.width ? "max-h-[420px] object-contain" : "h-auto"}`}
        />
        <p className="border-t border-white/10 px-3 py-2 text-xs text-foreground/60">{first.caption}</p>
      </button>
      {rest.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {rest.map((shot, i) => (
            <button
              key={shot.src}
              type="button"
              onClick={() => setOpen(i + 1)}
              aria-label={`Enlarge: ${shot.caption}`}
              className="relative aspect-[16/10] overflow-hidden rounded-md border border-white/10 hover:border-accent/50"
            >
              <Image
                src={shot.src}
                alt={shot.caption}
                fill
                sizes="200px"
                className="object-cover object-left-top"
              />
            </button>
          ))}
        </div>
      )}
      <Lightbox images={shots} index={open} onChange={setOpen} />
    </section>
  );
}

export default function ProjectCaseStudyModal({ project, onClose }: ProjectCaseStudyModalProps) {
  return (
    <Modal isOpen={project !== null} onClose={onClose}>
      {project && (
        <div className="space-y-7">
          <header>
            <p className="font-mono text-[11px] uppercase tracking-widest text-foreground/40">
              {project.kind} · {project.status}
            </p>
            <h3 className="mt-1 text-2xl md:text-3xl font-semibold">{project.title}</h3>
            <div className="flex flex-wrap gap-2 mt-3">
              {project.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </header>

          <dl className="grid grid-cols-3 gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-4">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <dt className="sr-only">{m.label}</dt>
                <dd className="font-mono text-xl md:text-2xl font-semibold text-accent">{m.value}</dd>
                <dd className="mt-1 text-[11px] leading-snug text-foreground/50">{m.label}</dd>
              </div>
            ))}
          </dl>

          <Gallery project={project} />

          <Section label="Problem">{project.caseStudy.problem}</Section>
          <Section label="Approach">{project.caseStudy.approach}</Section>
          <Section label="Architecture">{project.caseStudy.architecture}</Section>

          {project.caseStudy.highlights && (
            <Section label="Engineering highlights">
              <ul className="space-y-2">
                {project.caseStudy.highlights.map((h) => (
                  <li key={h} className="flex gap-3">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          <Section label="Results">{project.caseStudy.results}</Section>

          {project.caseStudy.scope && (
            <Section label="Built vs. planned">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/[0.04] p-4">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-emerald-400/80 mb-2">
                    Built and verified
                  </p>
                  <ul className="space-y-1.5 text-foreground/75">
                    {project.caseStudy.scope.built.map((b) => (
                      <li key={b}>✓ {b}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg border border-white/10 p-4">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-foreground/50 mb-2">
                    On the roadmap
                  </p>
                  <ul className="space-y-1.5 text-foreground/60">
                    {project.caseStudy.scope.planned.map((p) => (
                      <li key={p}>○ {p}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Section>
          )}

          <div className="flex flex-wrap gap-4 pt-2">
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
