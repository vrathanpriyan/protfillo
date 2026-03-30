import Link from "next/link";
import { Github, Linkedin, Twitter, Code2, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-gray-950/80 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold">
            <Code2 className="h-5 w-5 text-primary-400" />
            <span className="gradient-text">Alex.dev</span>
          </Link>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 transition-colors hover:text-primary-400"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 transition-colors hover:text-primary-400"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 transition-colors hover:text-primary-400"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>

          <p className="flex items-center gap-1.5 text-sm text-gray-500">
            Built with <Heart className="h-3.5 w-3.5 text-red-500" /> using Next.js & Supabase
          </p>
        </div>
      </div>
    </footer>
  );
}
