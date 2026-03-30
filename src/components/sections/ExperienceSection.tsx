import { Briefcase, ExternalLink } from "lucide-react";
import type { Experience } from "@/lib/supabase/types";

interface ExperienceSectionProps {
  experiences: Experience[];
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary-400">
            Career
          </p>
          <h2 className="text-4xl font-bold md:text-5xl">
            Work <span className="gradient-text">Experience</span>
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-primary-500/50 via-accent/30 to-transparent md:left-8" />

          <div className="flex flex-col gap-8">
            {experiences.map((exp, i) => (
              <div key={exp.id} className="relative flex gap-6 md:gap-10">
                {/* Dot */}
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary-500/30 bg-gray-900 md:h-16 md:w-16">
                  <Briefcase className="h-5 w-5 text-primary-400" />
                </div>

                {/* Card */}
                <div className="glass flex-1 rounded-2xl p-6 transition-all hover:border-white/20">
                  <div className="mb-1 flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{exp.role}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-primary-400 font-medium">{exp.company}</span>
                        {exp.company_url && (
                          <a href={exp.company_url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary-400">
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                    <span className="rounded-full border border-white/10 bg-gray-800 px-3 py-1 text-xs text-gray-400">
                      {formatDate(exp.start_date)} — {exp.is_current ? "Present" : exp.end_date ? formatDate(exp.end_date) : ""}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="mt-3 text-sm leading-relaxed text-gray-400">{exp.description}</p>
                  )}
                  {exp.is_current && (
                    <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                      Current Role
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
