import { LoginForm } from "@/components/admin/LoginForm";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) redirect("/admin");

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold gradient-text">Admin Panel</h1>
          <p className="mt-2 text-gray-400">Sign in to manage your portfolio</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
