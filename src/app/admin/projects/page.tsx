import { createClient } from "@/lib/supabase/server";
import { ProjectsClient } from "@/components/admin/crud/ProjectsClient";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase.from("projects").select("*").order("order_index");
  return <ProjectsClient initialData={projects ?? []} />;
}
