"use client";
import { motion } from "framer-motion";
import { experience } from "@/lib/data/experience";
import ExperienceCard from "@/components/ui/ExperienceCard";

export default function Experience() {
  return (
    <motion.section
      id="experience"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto px-6 py-24"
    >
      <h3 className="section-eyebrow mb-10">Experience</h3>
      {experience.map((entry) => (
        <ExperienceCard key={entry.id} entry={entry} />
      ))}
    </motion.section>
  );
}
