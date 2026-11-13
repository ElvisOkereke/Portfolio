"use client";
import { useCallback, useEffect } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import type { Screenshot } from "@/lib/data/projects";

type LightboxProps = {
  images: Screenshot[];
  index: number | null;
  onChange: (index: number | null) => void;
};

/** Full-screen screenshot viewer with keyboard (← → Esc) and click navigation. */
export default function Lightbox({ images, index, onChange }: LightboxProps) {
  const open = index !== null;
  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      onChange((index + delta + images.length) % images.length);
    },
    [index, images.length, onChange]
  );

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault(); // keep the surrounding modal open
        onChange(null);
      } else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKeyDown, { capture: true });
    return () => window.removeEventListener("keydown", onKeyDown, { capture: true });
  }, [open, go, onChange]);

  if (index === null) return null;
  const shot = images[index];
  const many = images.length > 1;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Screenshot viewer"
      className="fixed inset-0 z-[60] flex flex-col bg-black/95"
      onClick={(e) => {
        e.stopPropagation();
        onChange(null);
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 text-sm text-foreground/60">
        <span className="font-mono text-xs">
          {index + 1} / {images.length}
        </span>
        <button aria-label="Close screenshot" className="hover:text-accent" onClick={() => onChange(null)}>
          <XMarkIcon className="h-7 w-7" />
        </button>
      </div>
      <div className="relative flex flex-1 items-center justify-center px-2 md:px-16 min-h-0">
        <Image
          key={shot.src}
          src={shot.src}
          alt={shot.caption}
          width={shot.width}
          height={shot.height}
          sizes="100vw"
          quality={92}
          className="max-h-full w-auto max-w-full object-contain rounded-md border border-white/10"
          onClick={(e) => e.stopPropagation()}
        />
        {many && (
          <>
            <button
              aria-label="Previous screenshot"
              className="absolute left-2 md:left-4 rounded-full border border-white/15 bg-black/70 p-2 text-foreground/70 hover:text-accent"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <button
              aria-label="Next screenshot"
              className="absolute right-2 md:right-4 rounded-full border border-white/15 bg-black/70 p-2 text-foreground/70 hover:text-accent"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </>
        )}
      </div>
      <p className="mx-auto max-w-3xl px-6 py-4 text-center text-sm text-foreground/70">{shot.caption}</p>
    </div>
  );
}
