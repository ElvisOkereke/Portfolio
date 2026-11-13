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
          I&apos;m a Computer Engineering graduate from Toronto Metropolitan University and a
          Software Developer at TELUS, where I lead SAiL, a distributed Next.js platform on GKE
          that gives 1,000+ sales staff and dealers real-time access to 200M+ business records
          through LLM tools and agentic workflows. I work across the whole stack: data sharding,
          Spark pipelines, auth, CI/CD, infrastructure as code, and a production MCP server for
          RAG that cut LLM inference costs.
        </p>
        <p className="text-foreground/80 leading-relaxed">
          Outside of work I build AI systems that check their own work: a research engine that
          re-verifies every claim it cites and is scored against frozen baselines, a Chrome
          extension that runs OCR and Whisper on-device to translate video live, and a Rust game
          recorder backed by a hardware-in-the-loop test rig. I care about measuring things. If a
          number is on this site, there&apos;s a benchmark behind it. In school I fine-tuned LLMs
          with LoRA and cut measured bias by 20%.
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
