"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { AdminTable } from "@/components/admin/AdminTable";
import { Modal } from "@/components/admin/Modal";
import type { Experience } from "@/lib/supabase/types";

type FormData = Omit<Experience, "id">;

export function ExperiencesClient({ initialData }: { initialData: Experience[] }) {
  const [data, setData] = useState(initialData);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Experience | null>(null);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>();

  const openAdd = () => { setEditing(null); reset({}); setOpen(true); };
  const openEdit = (row: Experience) => { setEditing(row); reset(row); setOpen(true); };

  const onSubmit = async (form: FormData) => {
    const supabase = createClient();
    const payload = {
      ...form,
      end_date: form.is_current ? null : form.end_date || null,
      order_index: Number(form.order_index) || 0,
    };

    if (editing) {
      const { data: updated, error } = await supabase.from("experiences").update(payload).eq("id", editing.id).select().single();
      if (error) { toast.error(error.message); return; }
      setData((prev) => prev.map((e) => (e.id === editing.id ? updated : e)));
      toast.success("Experience updated");
    } else {
      const { data: created, error } = await supabase.from("experiences").insert(payload).select().single();
      if (error) { toast.error(error.message); return; }
      setData((prev) => [...prev, created]);
      toast.success("Experience created");
    }
    setOpen(false);
  };

  const onDelete = async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase.from("experiences").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    setData((prev) => prev.filter((e) => e.id !== id));
    toast.success("Experience deleted");
  };

  return (
    <>
      <AdminTable
        title="Experience"
        data={data}
        columns={[
          { key: "role", label: "Role" },
          { key: "company", label: "Company" },
          { key: "start_date", label: "Period", render: (r) => (
            <span className="text-xs text-gray-400">
              {r.start_date} — {r.is_current ? "Present" : r.end_date ?? ""}
            </span>
          )},
          { key: "is_current", label: "Current", render: (r) => r.is_current ? <span className="text-green-400">Yes</span> : <span className="text-gray-500">No</span> },
        ]}
        onAdd={openAdd}
        onEdit={openEdit}
        onDelete={onDelete}
      />

      <Modal title={editing ? "Edit Experience" : "Add Experience"} open={open} onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">Role</label>
              <input className={input} placeholder="Senior Developer" {...register("role", { required: "Required" })} />
              {errors.role && <p className="mt-1 text-xs text-red-400">{errors.role.message}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">Company</label>
              <input className={input} placeholder="TechCorp Inc." {...register("company", { required: "Required" })} />
              {errors.company && <p className="mt-1 text-xs text-red-400">{errors.company.message}</p>}
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-300">Description</label>
            <textarea className={`${input} resize-none`} rows={3} {...register("description")} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">Start Date</label>
              <input type="date" className={input} {...register("start_date", { required: "Required" })} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">End Date</label>
              <input type="date" className={input} {...register("end_date")} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">Company URL</label>
              <input className={input} placeholder="https://..." {...register("company_url")} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">Order</label>
              <input type="number" className={input} placeholder="0" {...register("order_index")} />
            </div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="h-4 w-4 accent-primary-500" {...register("is_current")} />
            <span className="text-sm text-gray-300">Currently working here</span>
          </label>
          <button type="submit" disabled={isSubmitting} className={submitBtn}>
            {isSubmitting ? "Saving..." : editing ? "Update Experience" : "Create Experience"}
          </button>
        </form>
      </Modal>
    </>
  );
}

const input = "w-full rounded-lg border border-white/10 bg-gray-800/50 px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500";
const submitBtn = "mt-2 rounded-xl bg-primary-600 py-3 font-semibold text-white hover:bg-primary-500 disabled:opacity-60 transition-colors";
