import type { Metadata } from "next";
import ThreeDShowcase from "@/components/sections/ThreeDShowcase";

const title = "Interactive 3D parts — Elvis Okereke";
const description =
  "Performance car parts I designed and built, in an interactive 3D viewer: turn each part in your hands, orbit, zoom and read what it does.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/3d" },
  openGraph: {
    title,
    description,
    siteName: "Elvis Okereke",
    type: "website",
    images: [{ url: "/pics/garageback.jpg", alt: "Preview of the interactive 3D parts showcase" }],
  },
};

export default function ThreeDPage() {
  return (
    <main>
      <ThreeDShowcase standalone />
    </main>
  );
}
