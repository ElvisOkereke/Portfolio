import Link from "next/link";
import { ArrowUpIcon } from "@heroicons/react/24/solid";

export default function Footer() {
  return (
    <footer className="w-full py-8 flex items-center justify-center">
      <Link
        href="#hero"
        aria-label="Back to top"
        className="opacity-40 hover:opacity-100 transition-opacity"
      >
        <ArrowUpIcon className="h-6 w-6 text-accent" />
      </Link>
    </footer>
  );
}
