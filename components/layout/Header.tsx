"use client";
import { useEffect, useState } from "react";
import { SocialIcon } from "react-social-icons";
import { motion } from "framer-motion";
import Link from "next/link";

const nav = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 w-full transition-colors duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-5 py-3 max-w-7xl mx-auto">
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
            url="https://www.linkedin.com/in/elvisokereke/"
            style={{ height: 32, width: 32 }}
            fgColor="#e5e5e5"
            bgColor="transparent"
          />
        </motion.div>
        <motion.nav
          aria-label="Sections"
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-5 md:gap-7"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-xs uppercase tracking-widest text-foreground/60 hover:text-accent transition-colors ${
                item.label === "Contact" ? "" : "hidden md:inline"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="/resume.pdf"
            download
            className="rounded-full border border-accent/60 px-3 py-1 text-xs uppercase tracking-widest text-accent hover:bg-accent hover:text-background transition-colors"
          >
            Resume
          </a>
        </motion.nav>
      </div>
    </header>
  );
}
