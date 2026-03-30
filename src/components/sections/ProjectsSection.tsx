import { ExternalLink, Github, Star } from "lucide-react";
import type { Project } from "@/lib/supabase/types";

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary-400">
            Portfolio
          </p>
          <h2 className="text-4xl font-bold md:text-5xl">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            A selection of projects I&apos;ve built — from SaaS products to open-source tools.
          </p>
        </div>

        {/* Featured grid */}
        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Other projects */}
        {others.length > 0 && (
          <>
            <h3 className="mb-4 text-lg font-semibold text-gray-300">Other Projects</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {others.map((project) => (
                <SmallProjectCard key={project.id} project={project} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:glow hover:border-primary-500/30">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500/20 text-primary-400">
          <Star className="h-5 w-5" />
        </div>
        <div className="flex gap-3">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 transition-colors hover:text-white"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          )}
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 transition-colors hover:text-primary-400"
              aria-label="Live demo"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>

      <h3 className="mb-2 text-lg font-semibold text-white group-hover:text-primary-300 transition-colors">
        {project.title}
      </h3>
      <p className="mb-4 text-sm leading-relaxed text-gray-400">{project.description}</p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-2">
        {project.tech_stack.map((tech) => (
          <span
            key={tech}
            className="rounded-md bg-gray-800 px-2.5 py-1 text-xs font-medium text-gray-300"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

function SmallProjectCard({ project }: { project: Project }) {
  return (
    <div className="glass flex items-center justify-between rounded-xl p-4 transition-all hover:border-white/20">
      <div>
        <h4 className="font-medium text-white">{project.title}</h4>
        <p className="mt-0.5 text-sm text-gray-400 line-clamp-1">{project.description}</p>
      </div>
      <div className="flex gap-3 ml-4 shrink-0">
        {project.github_url && (
          <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white">
            <Github className="h-4 w-4" />
          </a>
        )}
        {project.live_url && (
          <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary-400">
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
}
