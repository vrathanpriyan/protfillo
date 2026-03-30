import type { Skill } from "@/lib/supabase/types";

interface SkillsSectionProps {
  skills: Skill[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const categories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <section id="skills" className="py-24 px-6 bg-gray-900/30">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary-400">
            Expertise
          </p>
          <h2 className="text-4xl font-bold md:text-5xl">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div key={category} className="glass rounded-2xl p-6">
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-primary-400">
                {category}
              </h3>
              <div className="flex flex-col gap-4">
                {skills
                  .filter((s) => s.category === category)
                  .map((skill) => (
                    <SkillBar key={skill.id} skill={skill} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillBar({ skill }: { skill: Skill }) {
  const proficiency = skill.proficiency ?? 80;

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-200">{skill.name}</span>
        <span className="text-xs text-gray-500">{proficiency}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent transition-all duration-1000"
          style={{ width: `${proficiency}%` }}
        />
      </div>
    </div>
  );
}
