"use client";
import Image from "next/image";
import Link from "next/link";
import { Cursor as CursorComponent, useTypewriter } from "react-simple-typewriter";
import React from "react";

const Cursor = CursorComponent as unknown as React.FC<{ cursorColor?: string }>;

export default function Hero() {
  const [text] = useTypewriter({
    words: ["Software Developer.", "Full-Stack + DevOps Engineer.", "AI Systems Builder."],
    loop: true,
    delaySpeed: 2000,
  });

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center text-center gap-8 px-6 relative overflow-hidden"
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
        className="relative rounded-full h-40 w-40 md:h-56 md:w-56 object-cover border border-white/10"
      />
      <div className="relative z-10 space-y-4">
        <h2 className="section-eyebrow">Elvis Okereke</h2>
        <h1 className="text-4xl md:text-6xl font-semibold min-h-[1.2em]">
          {text}
          <Cursor cursorColor="#f5a623" />
        </h1>
        <p className="max-w-xl mx-auto text-foreground/60">
          Software Developer at TELUS, building data-heavy apps on GKE over 200M+ records. On my
          own time I build AI systems and the tools I actually use.
        </p>
      </div>
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-4">
        <a href="/resume.pdf" download className="btn-primary">
          Download Resume
        </a>
        <Link href="#contact" className="btn-secondary">
          Contact Me
        </Link>
      </div>
    </section>
  );
}
