import { createClient } from "@/lib/supabase/server";
import { ExperiencesClient } from "@/components/admin/crud/ExperiencesClient";

export default async function AdminExperiencesPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("experiences").select("*").order("order_index");
  return <ExperiencesClient initialData={data ?? []} />;
}
