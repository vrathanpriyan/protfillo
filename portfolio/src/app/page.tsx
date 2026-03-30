import { createClient } from "@/lib/supabase/server";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { CertificatesSection } from "@/components/sections/CertificatesSection";
import { ContactSection } from "@/components/sections/ContactSection";

export const revalidate = 3600;

export default async function Home() {
  const supabase = await createClient();

  const [
    { data: profile },
    { data: projects },
    { data: skills },
    { data: experiences },
    { data: certificates },
  ] = await Promise.all([
    supabase.from("profile").select("*").single(),
    supabase.from("projects").select("*").order("order_index"),
    supabase.from("skills").select("*").order("order_index"),
    supabase.from("experiences").select("*").order("order_index"),
    supabase.from("certificates").select("*").order("order_index"),
  ]);

  return (
    <>
      <HeroSection profile={profile} />
      <AboutSection profile={profile} />
      <ProjectsSection projects={projects ?? []} />
      <SkillsSection skills={skills ?? []} />
      <ExperienceSection experiences={experiences ?? []} />
      <CertificatesSection certificates={certificates ?? []} />
      <ContactSection />
    </>
  );
}
