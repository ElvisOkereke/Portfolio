import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Elvis Okereke — Software Developer",
  description:
    "Software Developer at TELUS (full-stack + DevOps) building AI systems and the tools I actually use. Toronto.",
  openGraph: {
    title: "Elvis Okereke — Software Developer",
    description:
      "Software Developer at TELUS (full-stack + DevOps) building AI systems and the tools I actually use.",
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
