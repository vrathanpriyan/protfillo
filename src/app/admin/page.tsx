import { createClient } from "@/lib/supabase/server";
import { FolderKanban, Wrench, Briefcase, Award, MessageSquare } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [
    { count: projectsCount },
    { count: skillsCount },
    { count: expCount },
    { count: certCount },
    { count: msgCount },
    { count: unreadCount },
  ] = await Promise.all([
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("skills").select("*", { count: "exact", head: true }),
    supabase.from("experiences").select("*", { count: "exact", head: true }),
    supabase.from("certificates").select("*", { count: "exact", head: true }),
    supabase.from("contact_messages").select("*", { count: "exact", head: true }),
    supabase.from("contact_messages").select("*", { count: "exact", head: true }).eq("is_read", false),
  ]);

  const stats = [
    { label: "Projects", value: projectsCount ?? 0, icon: FolderKanban, color: "text-blue-400", bg: "bg-blue-500/10", href: "/admin/projects" },
    { label: "Skills", value: skillsCount ?? 0, icon: Wrench, color: "text-purple-400", bg: "bg-purple-500/10", href: "/admin/skills" },
    { label: "Experiences", value: expCount ?? 0, icon: Briefcase, color: "text-green-400", bg: "bg-green-500/10", href: "/admin/experiences" },
    { label: "Certificates", value: certCount ?? 0, icon: Award, color: "text-yellow-400", bg: "bg-yellow-500/10", href: "/admin/certificates" },
    { label: "Messages", value: msgCount ?? 0, icon: MessageSquare, color: "text-red-400", bg: "bg-red-500/10", href: "/admin/messages", badge: unreadCount ?? 0 },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-gray-400">Welcome back. Here&apos;s your portfolio overview.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((stat) => (
          <a key={stat.label} href={stat.href} className="glass rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:border-white/20">
            <div className={`mb-3 inline-flex rounded-xl p-2.5 ${stat.bg}`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
              {"badge" in stat && (stat.badge ?? 0) > 0 && (
                <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                  {stat.badge} new
                </span>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
