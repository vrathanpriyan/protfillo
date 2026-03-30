"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/lib/supabase/types";

type FormData = Omit<Profile, "id" | "created_at" | "updated_at">;

export function ProfileClient({ initialData }: { initialData: Profile | null }) {
  const { register, handleSubmit, formState: { isSubmitting, isDirty } } = useForm<FormData>({
    defaultValues: initialData ?? {},
  });

  const onSubmit = async (form: FormData) => {
    const supabase = createClient();
    if (initialData) {
      const { error } = await supabase.from("profile").update(form).eq("id", initialData.id);
      if (error) { toast.error(error.message); return; }
    } else {
      const { error } = await supabase.from("profile").insert(form);
      if (error) { toast.error(error.message); return; }
    }
    toast.success("Profile saved");
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Profile</h1>
        <p className="mt-1 text-sm text-gray-400">Update your personal information shown on the portfolio.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="glass max-w-2xl rounded-2xl p-8">
        <div className="grid gap-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">Full Name</label>
              <input className={input} placeholder="Alex Johnson" {...register("name")} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">Title</label>
              <input className={input} placeholder="Full Stack Developer" {...register("title")} />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-300">Bio</label>
            <textarea className={`${input} resize-none`} rows={4} placeholder="Tell your story..." {...register("bio")} />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-300">Email</label>
            <input type="email" className={input} placeholder="you@example.com" {...register("email")} />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-300">Avatar URL</label>
            <input className={input} placeholder="https://..." {...register("avatar_url")} />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-300">Resume URL</label>
            <input className={input} placeholder="https://..." {...register("resume_url")} />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">GitHub</label>
              <input className={input} placeholder="https://github.com/..." {...register("github_url")} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">LinkedIn</label>
              <input className={input} placeholder="https://linkedin.com/..." {...register("linkedin_url")} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">Twitter</label>
              <input className={input} placeholder="https://twitter.com/..." {...register("twitter_url")} />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !isDirty}
          className="mt-6 rounded-xl bg-primary-600 px-8 py-3 font-semibold text-white hover:bg-primary-500 disabled:opacity-60 transition-colors"
        >
          {isSubmitting ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}

const input = "w-full rounded-lg border border-white/10 bg-gray-800/50 px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500";
