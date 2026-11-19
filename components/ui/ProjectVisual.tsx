import Image from "next/image";
import type { FlagshipProject } from "@/lib/data/projects";

const backdrop =
  "absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(245,166,35,0.16),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(80,120,255,0.10),transparent_60%)] bg-[#0d0d0d]";

/** A desktop screenshot framed in a minimal window, cropped from the top left so headings stay visible. */
function ScreenFrame({ project }: { project: FlagshipProject }) {
  return (
    <div className={`${backdrop} p-4 sm:p-6 flex`}>
      <div className="relative flex-1 flex flex-col overflow-hidden rounded-lg border border-white/10 bg-[#141414] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:-translate-y-1">
        <div className="flex h-6 shrink-0 items-center gap-1.5 border-b border-white/10 bg-white/[0.04] px-3">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="ml-2 truncate font-mono text-[10px] text-foreground/40">{project.title}</span>
        </div>
        <div className="relative flex-1">
          <Image
            src={project.image!}
            alt={`${project.title} screenshot`}
            fill
            sizes="(min-width: 1024px) 600px, (min-width: 768px) 50vw, 100vw"
            quality={90}
            className="object-cover object-left-top"
          />
        </div>
      </div>
    </div>
  );
}

/** An app window screenshot that already has its own chrome: shown whole, never cropped. */
function WindowShot({ project }: { project: FlagshipProject }) {
  return (
    <div className={`${backdrop} p-4 sm:p-6`}>
      <div className="relative h-full w-full transition-transform duration-500 group-hover:-translate-y-1">
        <Image
          src={project.image!}
          alt={`${project.title} screenshot`}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          quality={90}
          className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.7)]"
        />
      </div>
    </div>
  );
}

export default function ProjectVisual({ project }: { project: FlagshipProject }) {
  if (project.image && project.imageStyle === "window") return <WindowShot project={project} />;
  if (project.image) return <ScreenFrame project={project} />;
  return (
    <span className="absolute inset-0 flex items-center justify-center font-mono text-sm text-foreground/30">
      {project.title}
    </span>
  );
}
