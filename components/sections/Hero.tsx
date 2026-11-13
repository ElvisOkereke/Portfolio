"use client";
import Image from "next/image";
import Link from "next/link";
import { Cursor as CursorComponent, useTypewriter } from "react-simple-typewriter";
import React from "react";

const Cursor = CursorComponent as unknown as React.FC<{ cursorColor?: string }>;

const impact = [
  { value: "200M+", label: "business records served in real time at TELUS" },
  { value: "1,000+", label: "sales staff and dealers on the platform I lead" },
  { value: "2×+", label: "faster queries from my data-sharding design" },
  { value: "4,000+", label: "automated tests across my side projects" },
];

export default function Hero() {
  const [text] = useTypewriter({
    words: ["Software Engineer.", "Full-Stack & Applied ML.", "AI Systems Builder."],
    loop: true,
    delaySpeed: 2000,
  });

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center text-center gap-8 px-6 pt-10 pb-16 relative overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
      />
      <Image
        src="/pics/dp-min.jpg"
        alt="Portrait of Elvis Okereke"
        width={320}
        height={320}
        priority
        className="relative rounded-full h-36 w-36 md:h-48 md:w-48 object-cover border border-white/10"
      />
      <div className="relative z-10 space-y-4">
        <h2 className="section-eyebrow">Elvis Okereke · Toronto</h2>
        <h1 className="text-4xl md:text-6xl font-semibold min-h-[1.2em]">
          {text}
          <Cursor cursorColor="#f5a623" />
        </h1>
        <p className="max-w-2xl mx-auto text-foreground/60">
          Software Developer at TELUS, leading a Next.js and GKE platform that puts 200M+ business
          records, LLM tools and agentic workflows in front of 1,000+ sales staff and dealers. On my
          own time I build AI systems that check their own work and measure every claim.
        </p>
      </div>
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-4">
        <Link href="#projects" className="btn-primary">
          See My Work
        </Link>
        <a href="/resume.pdf" download className="btn-secondary">
          Download Resume
        </a>
      </div>
      <dl className="relative z-10 mt-6 grid w-full max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 md:grid-cols-4">
        {impact.map((s) => (
          <div key={s.label} className="bg-background/95 px-4 py-5">
            <dt className="sr-only">{s.label}</dt>
            <dd className="font-mono text-2xl md:text-3xl font-semibold text-accent">{s.value}</dd>
            <dd className="mt-1 text-xs leading-snug text-foreground/50">{s.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
