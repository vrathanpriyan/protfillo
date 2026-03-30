import Image from "next/image";
import { MapPin, Mail, Calendar } from "lucide-react";
import type { Profile } from "@/lib/supabase/types";

interface AboutSectionProps {
  profile: Profile | null;
}

const stats = [
  { label: "Years Experience", value: "5+" },
  { label: "Projects Shipped", value: "30+" },
  { label: "Happy Clients", value: "20+" },
  { label: "GitHub Stars", value: "500+" },
];

export function AboutSection({ profile }: AboutSectionProps) {
  return (
    <section id="about" className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary-400">
            About Me
          </p>
          <h2 className="text-4xl font-bold md:text-5xl">
            Crafting Digital{" "}
            <span className="gradient-text">Experiences</span>
          </h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Avatar / visual */}
          <div className="relative mx-auto w-full max-w-sm">
            <div className="aspect-square overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-primary-500/20 to-accent/20 glow">
              {profile?.avatar_url ? (
                <Image
                  src={profile.avatar_url}
                  alt={profile.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-8xl font-bold text-primary-400/30">
                  {profile?.name?.[0] ?? "A"}
                </div>
              )}
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 glass rounded-xl px-4 py-3 shadow-xl">
              <p className="text-xs text-gray-400">Currently at</p>
              <p className="font-semibold text-white">TechCorp Inc.</p>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="mb-6 text-lg leading-relaxed text-gray-300">
              {profile?.bio ??
                "I'm a passionate full-stack developer with 5+ years of experience building scalable web applications. I specialize in React, Next.js, and modern backend technologies."}
            </p>

            <div className="mb-8 flex flex-col gap-3">
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="h-4 w-4 text-primary-400" />
                <span>San Francisco, CA</span>
              </div>
              {profile?.email && (
                <div className="flex items-center gap-3 text-gray-400">
                  <Mail className="h-4 w-4 text-primary-400" />
                  <a href={`mailto:${profile.email}`} className="hover:text-primary-400 transition-colors">
                    {profile.email}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-3 text-gray-400">
                <Calendar className="h-4 w-4 text-primary-400" />
                <span>Available for full-time & freelance</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="glass rounded-xl p-4">
                  <p className="text-2xl font-bold text-primary-400">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
