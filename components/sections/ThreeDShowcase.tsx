"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

const ThreeDShowcaseCanvas = dynamic(() => import("./ThreeDShowcaseCanvas"), {
  ssr: false,
  loading: () => <PosterFallback />,
});

function PosterFallback() {
  return (
    <div className="relative h-[420px] w-full flex items-center justify-center bg-white/5 rounded-lg overflow-hidden">
      <Image
        src="/pics/garageback.jpg"
        alt="Preview of interactive 3D BMW parts showcase"
        fill
        className="object-cover opacity-40"
      />
      <span className="relative font-mono text-sm text-foreground/70">
        Loading interactive models…
      </span>
    </div>
  );
}

export default function ThreeDShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldMount, setShouldMount] = useState(false);

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
      { rootMargin: "200px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="engineering" className="max-w-6xl mx-auto px-6 py-24">
      <h3 className="section-eyebrow mb-2">Also — I design and build physical things</h3>
      <p className="text-foreground/60 mb-8 max-w-2xl">
        A few BMW performance parts I&apos;ve designed and 3D printed for my own car, rendered here
        as interactive models. Drag to rotate, scroll to zoom.
      </p>
      <div ref={containerRef} className="h-[420px] w-full rounded-lg overflow-hidden">
        {shouldMount ? <ThreeDShowcaseCanvas /> : <PosterFallback />}
      </div>
    </section>
  );
}
