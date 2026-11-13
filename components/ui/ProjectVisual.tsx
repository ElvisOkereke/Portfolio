import Image from "next/image";
import type { FlagshipProject } from "@/lib/data/projects";

/**
 * A stylised mock of the subtitle overlay: a Korean burned-in line with the
 * English translation laid over it, plus the measured latency.
 */
function SubtitleOverlayVisual() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden bg-[radial-gradient(ellipse_at_30%_20%,#1f3b2a_0%,#0d1a12_45%,#070707_100%)]"
    >
      <div className="absolute left-[12%] top-[18%] h-24 w-24 rounded-full border border-cyan-300/40 bg-cyan-300/5" />
      <div className="absolute left-[16%] top-[30%] h-1 w-40 rotate-[-28deg] bg-gradient-to-r from-cyan-300/60 to-transparent" />
      <div className="absolute right-[10%] top-[14%] h-16 w-16 rounded-full bg-orange-400/20 blur-xl" />
      <div className="absolute right-4 top-4 font-mono text-[10px] text-accent/80 border border-accent/40 rounded px-1.5 py-0.5 bg-black/40">
        OCR · WebGPU · 22 ms
      </div>
      <div className="absolute inset-x-6 bottom-6 rounded-md border border-dashed border-accent/60 p-2">
        <p className="text-center text-sm text-white/35 line-through decoration-white/20">
          뽀삐 궁 타이밍 미쳤다
        </p>
        <p className="mt-1 rounded bg-black/70 px-2 py-1 text-center text-sm md:text-base font-medium text-white">
          Poppy&apos;s ult timing was insane
        </p>
        <span className="absolute -top-3 left-3 bg-[#0b140e] px-1.5 font-mono text-[10px] text-accent">
          0.20 s → EN
        </span>
      </div>
    </div>
  );
}

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
  if (project.visual === "subtitle-overlay") return <SubtitleOverlayVisual />;
  if (project.image && project.imageStyle === "window") return <WindowShot project={project} />;
  if (project.image) return <ScreenFrame project={project} />;
  return (
    <span className="absolute inset-0 flex items-center justify-center font-mono text-sm text-foreground/30">
      {project.title}
    </span>
  );
}
