import { createClient } from "@/lib/supabase/server";
import { ProfileClient } from "@/components/admin/crud/ProfileClient";

export default async function AdminProfilePage() {
  const supabase = await createClient();
  const { data } = await supabase.from("profile").select("*").single();
  return <ProfileClient initialData={data} />;
}
