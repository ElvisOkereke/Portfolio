"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  ArrowPathIcon,
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  ArrowUturnLeftIcon,
  CubeTransparentIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";
import { threeDProducts } from "@/lib/data/threeDProducts";
import type { PartCommand } from "./ThreeDShowcaseCanvas";

const ThreeDShowcaseCanvas = dynamic(() => import("./ThreeDShowcaseCanvas"), {
  ssr: false,
  loading: () => <PosterFallback />,
});

function PosterFallback() {
  return (
    <div className="relative h-full w-full flex items-center justify-center bg-white/5 overflow-hidden">
      <Image
        src="/pics/garageback.jpg"
        alt="Preview of interactive 3D BMW parts showcase"
        fill
        className="object-cover opacity-30"
      />
      <span className="relative font-mono text-sm text-foreground/70">Loading interactive models…</span>
    </div>
  );
}

function ToolButton({
  label,
  active,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      title={label}
      className={`flex h-9 w-9 items-center justify-center rounded-md border backdrop-blur transition-colors ${
        active
          ? "border-accent/70 bg-accent/15 text-accent"
          : "border-white/10 bg-black/60 text-foreground/70 hover:border-accent/50 hover:text-accent"
      }`}
    >
      {children}
    </button>
  );
}

const controlsHelp = [
  ["Drag a part", "rotate it"],
  ["Drag empty space", "orbit"],
  ["Right-drag / two fingers", "pan"],
  ["Scroll / pinch", "zoom"],
  ["Click a part", "inspect"],
];

export default function ThreeDShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [shouldMount, setShouldMount] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [autoRotate, setAutoRotate] = useState(false);
  const [wireframe, setWireframe] = useState(false);
  const [resetToken, setResetToken] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [triangles, setTriangles] = useState<Record<string, number>>({});
  const [partCommand, setPartCommand] = useState<PartCommand | null>(null);
  const sendPart = (id: string, kind: PartCommand["kind"]) => {
    setAutoRotate(false);
    setPartCommand((prev) => ({ id, kind, token: (prev?.token ?? 0) + 1 }));
  };

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldMount(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Gentle turntable by default, unless the visitor prefers reduced motion.
  useEffect(() => {
    setAutoRotate(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const onChange = () => setFullscreen(document.fullscreenElement === stageRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const onStats = useCallback((id: string, count: number) => {
    setTriangles((prev) => (prev[id] === count ? prev : { ...prev, [id]: count }));
  }, []);
  const onUserInteract = useCallback(() => setAutoRotate(false), []);

  const select = (id: string | null) => {
    setSelectedId(id);
    if (id) setAutoRotate(false);
  };
  const reset = () => {
    setSelectedId(null);
    setResetToken((t) => t + 1);
  };
  const toggleFullscreen = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void stageRef.current?.requestFullscreen?.();
  };

  const selected = threeDProducts.find((p) => p.id === selectedId) ?? null;
  const fmt = (n?: number) => (n ? `${(n / 1000).toFixed(1)}k triangles` : "…");

  return (
    <section id="engineering" className="max-w-7xl mx-auto px-6 py-24">
      <h3 className="section-eyebrow mb-4">Also: I design and build physical things</h3>
      <p className="text-foreground/60 mb-8 max-w-2xl">
        Performance parts I&apos;ve designed for my own car. Grab any part and turn it in your
        hands, orbit and zoom around the stage, or click a part to fly to it and read what it does.
      </p>

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div
          ref={stageRef}
          className={`relative overflow-hidden border border-white/10 bg-background ${
            fullscreen ? "h-screen w-screen rounded-none" : "h-[62vh] min-h-[460px] max-h-[760px] rounded-xl"
          }`}
        >
          <div ref={containerRef} className="absolute inset-0">
            {shouldMount ? (
              <ThreeDShowcaseCanvas
                selectedId={selectedId}
                autoRotate={autoRotate}
                wireframe={wireframe}
                resetToken={resetToken}
                partCommand={partCommand}
                onSelect={select}
                onStats={onStats}
                onUserInteract={onUserInteract}
              />
            ) : (
              <PosterFallback />
            )}
          </div>

          {/* toolbar */}
          <div className="absolute right-3 top-3 flex gap-2">
            <ToolButton
              label={autoRotate ? "Pause turntable" : "Play turntable"}
              active={autoRotate}
              onClick={() => setAutoRotate((v) => !v)}
            >
              {autoRotate ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
            </ToolButton>
            <ToolButton label="Toggle wireframe" active={wireframe} onClick={() => setWireframe((v) => !v)}>
              <CubeTransparentIcon className="h-4 w-4" />
            </ToolButton>
            <ToolButton label="Reset view" onClick={reset}>
              <ArrowPathIcon className="h-4 w-4" />
            </ToolButton>
            <ToolButton label={fullscreen ? "Exit full screen" : "Full screen"} onClick={toggleFullscreen}>
              {fullscreen ? (
                <ArrowsPointingInIcon className="h-4 w-4" />
              ) : (
                <ArrowsPointingOutIcon className="h-4 w-4" />
              )}
            </ToolButton>
          </div>

          {/* controls legend */}
          <ul className="pointer-events-none absolute bottom-3 left-3 hidden flex-wrap gap-2 sm:flex">
            {controlsHelp.map(([input, action]) => (
              <li
                key={input}
                className="rounded-md border border-white/10 bg-black/60 px-2 py-1 font-mono text-[10px] text-foreground/60 backdrop-blur"
              >
                <span className="text-foreground/90">{input}</span> · {action}
              </li>
            ))}
          </ul>

          {/* selected part caption (also the only description on touch screens, where there's no hover) */}
          {selected && (
            <div className="absolute left-3 top-3 max-w-[min(22rem,calc(100%-11rem))] rounded-lg border border-accent/40 bg-black/75 p-3 backdrop-blur">
              <p className="text-sm font-semibold">{selected.title}</p>
              <p className="font-mono text-[10px] uppercase tracking-wider text-accent">{selected.subtitle}</p>
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                <span className="mr-1 font-mono text-[10px] uppercase tracking-wider text-foreground/40">Rotate</span>
                <button type="button" onClick={() => sendPart(selected.id, "yaw")} className="part-btn" title="Turn 90° around the vertical axis">
                  ↻ 90°
                </button>
                <button type="button" onClick={() => sendPart(selected.id, "pitch")} className="part-btn" title="Tip 90° toward you">
                  ⤓ 90°
                </button>
                <button type="button" onClick={() => sendPart(selected.id, "reset")} className="part-btn" title="Put the part back upright">
                  <ArrowUturnLeftIcon className="h-3 w-3" /> Upright
                </button>
              </div>
              <button
                type="button"
                onClick={reset}
                className="mt-2 font-mono text-[11px] text-foreground/60 hover:text-accent"
              >
                ← Back to all parts
              </button>
            </div>
          )}
        </div>

        {/* parts panel */}
        <aside aria-label="Parts" className="flex flex-col gap-2 lg:h-[62vh] lg:min-h-[460px] lg:max-h-[760px] lg:overflow-y-auto lg:pr-1">
          {threeDProducts.map((p, i) => {
            const isSelected = p.id === selectedId;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => select(isSelected ? null : p.id)}
                aria-pressed={isSelected}
                className={`rounded-xl border p-4 text-left transition-colors ${
                  isSelected
                    ? "border-accent/60 bg-accent/[0.06]"
                    : "border-white/10 bg-white/[0.03] hover:border-accent/40"
                }`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-mono text-[10px] text-foreground/40">0{i + 1}</span>
                  <span className="font-mono text-[10px] text-foreground/40">{fmt(triangles[p.id])}</span>
                </div>
                <p className="mt-1 font-medium">{p.title}</p>
                <p className="text-xs text-foreground/50">{p.subtitle}</p>
                {isSelected && (
                  <>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/75">{p.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {p.details.map((d) => (
                        <span key={d} className="tag">
                          {d}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </button>
            );
          })}
        </aside>
      </div>
    </section>
  );
}
