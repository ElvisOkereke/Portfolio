"use client";
import { SocialIcon } from "react-social-icons";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-5 py-4 max-w-7xl mx-auto w-full">
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-1"
      >
        <SocialIcon
          url="https://github.com/ElvisOkereke"
          style={{ height: 32, width: 32 }}
          fgColor="#e5e5e5"
          bgColor="transparent"
        />
        <SocialIcon
          url="https://www.linkedin.com/in/elvis-okereke-0b4ba8149/"
          style={{ height: 32, width: 32 }}
          fgColor="#e5e5e5"
          bgColor="transparent"
        />
      </motion.div>
      <motion.div
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Link
          href="#contact"
          className="text-sm uppercase tracking-widest text-foreground/70 hover:text-accent transition-colors"
        >
          Contact
        </Link>
      </motion.div>
    </header>
  );
}
