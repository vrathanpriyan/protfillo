"use client";

import Link from "next/link";
import { ArrowDown, Github, Linkedin, Twitter, Download } from "lucide-react";
import type { Profile } from "@/lib/supabase/types";

interface HeroSectionProps {
  profile: Profile | null;
}

export function HeroSection({ profile }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 pt-20">
      <div className="mx-auto max-w-4xl text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-1.5 text-sm text-primary-300">
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
          Available for opportunities
        </div>

        {/* Heading */}
        <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-7xl">
          Hi, I&apos;m{" "}
          <span className="gradient-text">{profile?.name ?? "Alex Johnson"}</span>
        </h1>

        <p className="mb-4 text-2xl font-medium text-gray-300 md:text-3xl">
          {profile?.title ?? "Full Stack Developer"}
        </p>

        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-400">
          {profile?.bio ??
            "Passionate developer building modern web applications with React, Next.js, and cloud technologies."}
        </p>

        {/* CTA buttons */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="#projects"
            className="rounded-xl bg-primary-600 px-8 py-3.5 font-semibold text-white shadow-lg shadow-primary-500/25 transition-all hover:bg-primary-500 hover:shadow-primary-500/40 hover:-translate-y-0.5"
          >
            View My Work
          </Link>
          <Link
            href="#contact"
            className="rounded-xl border border-white/20 bg-white/5 px-8 py-3.5 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:-translate-y-0.5"
          >
            Get In Touch
          </Link>
          {profile?.resume_url && (
            <a
              href={profile.resume_url}
              download
              className="flex items-center gap-2 rounded-xl border border-accent/30 bg-accent/10 px-6 py-3.5 font-semibold text-accent-light transition-all hover:bg-accent/20 hover:-translate-y-0.5"
            >
              <Download className="h-4 w-4" />
              Resume
            </a>
          )}
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-5">
          {profile?.github_url && (
            <a
              href={profile.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 transition-colors hover:text-primary-400"
              aria-label="GitHub"
            >
              <Github className="h-6 w-6" />
            </a>
          )}
          {profile?.linkedin_url && (
            <a
              href={profile.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 transition-colors hover:text-primary-400"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </a>
          )}
          {profile?.twitter_url && (
            <a
              href={profile.twitter_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 transition-colors hover:text-primary-400"
              aria-label="Twitter"
            >
              <Twitter className="h-6 w-6" />
            </a>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-600">
        <ArrowDown className="h-5 w-5" />
      </div>
    </section>
  );
}
