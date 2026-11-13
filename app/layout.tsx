import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Elvis Okereke — Software Engineer, Full-Stack & Applied ML",
  description:
    "Software Developer at TELUS leading a GKE platform over 200M+ records. I build measured, self-verifying AI systems: LLM pipelines with evals, on-device ML in the browser, and Rust systems tooling. Toronto.",
  openGraph: {
    title: "Elvis Okereke — Software Engineer, Full-Stack & Applied ML",
    description:
      "Software Developer at TELUS. I build measured, self-verifying AI systems: LLM pipelines with evals, on-device ML and Rust systems tooling.",
    siteName: "Elvis Okereke",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="bg-background text-foreground font-sans antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
