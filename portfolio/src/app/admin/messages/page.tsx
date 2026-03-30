import { createClient } from "@/lib/supabase/server";
import { MessagesClient } from "@/components/admin/crud/MessagesClient";

export default async function AdminMessagesPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
  return <MessagesClient initialData={data ?? []} />;
}
