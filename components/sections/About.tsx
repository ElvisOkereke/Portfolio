"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto px-6 py-24 grid gap-10 md:grid-cols-[240px_1fr] items-start"
    >
      <Image
        src="/pics/dp-min.jpg"
        alt="Elvis Okereke"
        width={480}
        height={480}
        className="rounded-lg object-cover w-full h-auto"
      />
      <div className="space-y-4">
        <h3 className="section-eyebrow">About</h3>
        <p className="text-foreground/80 leading-relaxed">
          I&apos;m a Computer Engineering graduate from Toronto Metropolitan University, currently
          building production ML/AI infrastructure as a Software Developer at TELUS — most recently
          a retrieval-augmented knowledge base that cut LLM inference costs through semantic
          chunking and response caching.
        </p>
        <p className="text-foreground/80 leading-relaxed">
          Outside of work I build my own ML-powered products end to end, from a Swift app that
          gives LLM-based feedback on tennis technique to a Chrome extension that generates and
          translates subtitles in real time. In school, I helped build fine-tuning pipelines that
          reduced measured bias in language models by 20% using LoRA and parameter-efficient
          fine-tuning.
        </p>
        <p className="text-foreground/80 leading-relaxed">
          I&apos;m based in Toronto and always happy to talk about anything ML, infra, or the
          occasional car project. Check out my code on{" "}
          <a
            href="https://github.com/ElvisOkereke"
            target="_blank"
            rel="noreferrer"
            className="text-accent underline"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </motion.section>
  );
}
