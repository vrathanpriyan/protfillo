import { createClient } from "@/lib/supabase/server";
import { SkillsClient } from "@/components/admin/crud/SkillsClient";

export const dynamic = "force-dynamic";

export default async function AdminSkillsPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("skills").select("*").order("order_index");
  return <SkillsClient initialData={data ?? []} />;
}
