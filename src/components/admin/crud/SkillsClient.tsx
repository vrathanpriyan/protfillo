"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { AdminTable } from "@/components/admin/AdminTable";
import { Modal } from "@/components/admin/Modal";
import type { Skill } from "@/lib/supabase/types";

type FormData = Omit<Skill, "id">;

const CATEGORIES = ["Languages", "Frontend", "Backend", "DevOps", "Tools", "Other"];

export function SkillsClient({ initialData }: { initialData: Skill[] }) {
  const [data, setData] = useState(initialData);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Skill | null>(null);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>();

  const openAdd = () => { setEditing(null); reset({}); setOpen(true); };
  const openEdit = (row: Skill) => { setEditing(row); reset(row); setOpen(true); };

  const onSubmit = async (form: FormData) => {
    const supabase = createClient();
    const payload = { ...form, proficiency: Number(form.proficiency), order_index: Number(form.order_index) || 0 };

    if (editing) {
      const { data: updated, error } = await supabase.from("skills").update(payload).eq("id", editing.id).select().single();
      if (error) { toast.error(error.message); return; }
      setData((prev) => prev.map((s) => (s.id === editing.id ? updated : s)));
      toast.success("Skill updated");
    } else {
      const { data: created, error } = await supabase.from("skills").insert(payload).select().single();
      if (error) { toast.error(error.message); return; }
      setData((prev) => [...prev, created]);
      toast.success("Skill created");
    }
    setOpen(false);
  };

  const onDelete = async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase.from("skills").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    setData((prev) => prev.filter((s) => s.id !== id));
    toast.success("Skill deleted");
  };

  return (
    <>
      <AdminTable
        title="Skills"
        data={data}
        columns={[
          { key: "name", label: "Skill" },
          { key: "category", label: "Category" },
          { key: "proficiency", label: "Proficiency", render: (r) => (
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-24 overflow-hidden rounded-full bg-gray-700">
                <div className="h-full rounded-full bg-primary-500" style={{ width: `${r.proficiency}%` }} />
              </div>
              <span className="text-xs text-gray-400">{r.proficiency}%</span>
            </div>
          )},
        ]}
        onAdd={openAdd}
        onEdit={openEdit}
        onDelete={onDelete}
      />

      <Modal title={editing ? "Edit Skill" : "Add Skill"} open={open} onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-300">Name</label>
            <input className={input} placeholder="TypeScript" {...register("name", { required: "Required" })} />
            {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-300">Category</label>
            <select className={input} {...register("category", { required: "Required" })}>
              <option value="">Select category</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">Proficiency (1-100)</label>
              <input type="number" min={1} max={100} className={input} placeholder="85" {...register("proficiency")} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">Order</label>
              <input type="number" className={input} placeholder="0" {...register("order_index")} />
            </div>
          </div>
          <button type="submit" disabled={isSubmitting} className={submitBtn}>
            {isSubmitting ? "Saving..." : editing ? "Update Skill" : "Create Skill"}
          </button>
        </form>
      </Modal>
    </>
  );
}

const input = "w-full rounded-lg border border-white/10 bg-gray-800/50 px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500";
const submitBtn = "mt-2 rounded-xl bg-primary-600 py-3 font-semibold text-white hover:bg-primary-500 disabled:opacity-60 transition-colors";
