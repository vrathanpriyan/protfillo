"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type FormData = { email: string; password: string };

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async ({ email, password }: FormData) => {
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }
    toast.success("Welcome back!");
    router.push("/admin");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass rounded-2xl p-8">
      <div className="mb-5">
        <label className="mb-1.5 block text-sm font-medium text-gray-300">Email</label>
        <input
          type="email"
          placeholder="admin@example.com"
          className="w-full rounded-lg border border-white/10 bg-gray-800/50 px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
      </div>

      <div className="mb-6">
        <label className="mb-1.5 block text-sm font-medium text-gray-300">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="w-full rounded-lg border border-white/10 bg-gray-800/50 px-4 py-3 pr-12 text-white placeholder-gray-500 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            {...register("password", { required: "Password is required" })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 py-3.5 font-semibold text-white hover:bg-primary-500 disabled:opacity-60 transition-colors"
      >
        {loading ? (
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        ) : (
          <><LogIn className="h-4 w-4" /> Sign In</>
        )}
      </button>
    </form>
  );
}
