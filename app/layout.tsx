import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Elvis Okereke — AI Engineer",
  description:
    "AI/ML engineer building production RAG systems, LLM-powered apps, and applied ML tools. Full-stack, Toronto.",
  openGraph: {
    title: "Elvis Okereke — AI Engineer",
    description:
      "AI/ML engineer building production RAG systems, LLM-powered apps, and applied ML tools.",
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
