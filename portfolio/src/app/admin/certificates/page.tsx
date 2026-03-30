import { createClient } from "@/lib/supabase/server";
import { CertificatesClient } from "@/components/admin/crud/CertificatesClient";

export default async function AdminCertificatesPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("certificates").select("*").order("order_index");
  return <CertificatesClient initialData={data ?? []} />;
}
