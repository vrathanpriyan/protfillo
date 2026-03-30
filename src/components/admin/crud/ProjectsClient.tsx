"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { AdminTable } from "@/components/admin/AdminTable";
import { Modal } from "@/components/admin/Modal";
import type { Project } from "@/lib/supabase/types";

type FormData = Omit<Project, "id" | "created_at" | "updated_at"> & { tech_stack_str: string };

export function ProjectsClient({ initialData }: { initialData: Project[] }) {
  const [data, setData] = useState(initialData);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>();

  const openAdd = () => { setEditing(null); reset({}); setOpen(true); };
  const openEdit = (row: Project) => {
    setEditing(row);
    reset({ ...row, tech_stack_str: row.tech_stack.join(", "), featured: row.featured });
    setOpen(true);
  };

  const onSubmit = async (form: FormData) => {
    const supabase = createClient();
    const payload = {
      title: form.title,
      description: form.description,
      long_description: form.long_description || null,
      tech_stack: form.tech_stack_str.split(",").map((s) => s.trim()).filter(Boolean),
      github_url: form.github_url || null,
      live_url: form.live_url || null,
      image_url: form.image_url || null,
      featured: form.featured ?? false,
      order_index: Number(form.order_index) || 0,
    };

    if (editing) {
      const { data: updated, error } = await supabase.from("projects").update(payload).eq("id", editing.id).select().single();
      if (error) { toast.error(error.message); return; }
      setData((prev) => prev.map((p) => (p.id === editing.id ? updated : p)));
      toast.success("Project updated");
    } else {
      const { data: created, error } = await supabase.from("projects").insert(payload).select().single();
      if (error) { toast.error(error.message); return; }
      setData((prev) => [...prev, created]);
      toast.success("Project created");
    }
    setOpen(false);
  };

  const onDelete = async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    setData((prev) => prev.filter((p) => p.id !== id));
    toast.success("Project deleted");
  };

  return (
    <>
      <AdminTable
        title="Projects"
        data={data}
        columns={[
          { key: "title", label: "Title" },
          { key: "description", label: "Description", render: (r) => <span className="line-clamp-1 max-w-xs">{r.description}</span> },
          { key: "tech_stack", label: "Stack", render: (r) => <span className="text-xs text-gray-400">{r.tech_stack.slice(0, 3).join(", ")}</span> },
          { key: "featured", label: "Featured", render: (r) => r.featured ? <span className="text-green-400">Yes</span> : <span className="text-gray-500">No</span> },
        ]}
        onAdd={openAdd}
        onEdit={openEdit}
        onDelete={onDelete}
      />

      <Modal title={editing ? "Edit Project" : "Add Project"} open={open} onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Field label="Title" error={errors.title?.message}>
            <input className={input} placeholder="Project title" {...register("title", { required: "Required" })} />
          </Field>
          <Field label="Short Description" error={errors.description?.message}>
            <input className={input} placeholder="One-liner description" {...register("description", { required: "Required" })} />
          </Field>
          <Field label="Long Description">
            <textarea className={`${input} resize-none`} rows={3} placeholder="Detailed description..." {...register("long_description")} />
          </Field>
          <Field label="Tech Stack (comma separated)" error={errors.tech_stack_str?.message}>
            <input className={input} placeholder="Next.js, TypeScript, Supabase" {...register("tech_stack_str", { required: "Required" })} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="GitHub URL">
              <input className={input} placeholder="https://github.com/..." {...register("github_url")} />
            </Field>
            <Field label="Live URL">
              <input className={input} placeholder="https://..." {...register("live_url")} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Order Index">
              <input type="number" className={input} placeholder="0" {...register("order_index")} />
            </Field>
            <Field label="Featured">
              <label className="flex items-center gap-2 pt-2 cursor-pointer">
                <input type="checkbox" className="h-4 w-4 accent-primary-500" {...register("featured")} />
                <span className="text-sm text-gray-300">Mark as featured</span>
              </label>
            </Field>
          </div>
          <button type="submit" disabled={isSubmitting} className={submitBtn}>
            {isSubmitting ? "Saving..." : editing ? "Update Project" : "Create Project"}
          </button>
        </form>
      </Modal>
    </>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-300">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}

const input = "w-full rounded-lg border border-white/10 bg-gray-800/50 px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500";
const submitBtn = "mt-2 rounded-xl bg-primary-600 py-3 font-semibold text-white hover:bg-primary-500 disabled:opacity-60 transition-colors";
