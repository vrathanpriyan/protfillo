"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { AdminTable } from "@/components/admin/AdminTable";
import { Modal } from "@/components/admin/Modal";
import type { Certificate } from "@/lib/supabase/types";

type FormData = Omit<Certificate, "id" | "created_at">;

export function CertificatesClient({ initialData }: { initialData: Certificate[] }) {
  const [data, setData] = useState(initialData);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Certificate | null>(null);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>();

  const openAdd = () => { setEditing(null); reset({}); setOpen(true); };
  const openEdit = (row: Certificate) => { setEditing(row); reset(row); setOpen(true); };

  const onSubmit = async (form: FormData) => {
    const supabase = createClient();
    const payload = { ...form, order_index: Number(form.order_index) || 0, expiry_date: form.expiry_date || null };

    if (editing) {
      const { data: updated, error } = await supabase.from("certificates").update(payload).eq("id", editing.id).select().single();
      if (error) { toast.error(error.message); return; }
      setData((prev) => prev.map((c) => (c.id === editing.id ? updated : c)));
      toast.success("Certificate updated");
    } else {
      const { data: created, error } = await supabase.from("certificates").insert(payload).select().single();
      if (error) { toast.error(error.message); return; }
      setData((prev) => [...prev, created]);
      toast.success("Certificate created");
    }
    setOpen(false);
  };

  const onDelete = async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase.from("certificates").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    setData((prev) => prev.filter((c) => c.id !== id));
    toast.success("Certificate deleted");
  };

  return (
    <>
      <AdminTable
        title="Certificates"
        data={data}
        columns={[
          { key: "title", label: "Title" },
          { key: "issuer", label: "Issuer" },
          { key: "issue_date", label: "Issued" },
          { key: "credential_url", label: "Link", render: (r) => r.credential_url
            ? <a href={r.credential_url} target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:underline text-xs">View</a>
            : <span className="text-gray-500">—</span>
          },
        ]}
        onAdd={openAdd}
        onEdit={openEdit}
        onDelete={onDelete}
      />

      <Modal title={editing ? "Edit Certificate" : "Add Certificate"} open={open} onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">Title</label>
              <input className={input} placeholder="AWS Solutions Architect" {...register("title", { required: "Required" })} />
              {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title.message}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">Issuer</label>
              <input className={input} placeholder="Amazon Web Services" {...register("issuer", { required: "Required" })} />
              {errors.issuer && <p className="mt-1 text-xs text-red-400">{errors.issuer.message}</p>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">Issue Date</label>
              <input type="date" className={input} {...register("issue_date", { required: "Required" })} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">Expiry Date</label>
              <input type="date" className={input} {...register("expiry_date")} />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-300">Credential URL</label>
            <input className={input} placeholder="https://..." {...register("credential_url")} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-300">Description</label>
            <textarea className={`${input} resize-none`} rows={2} {...register("description")} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-300">Order</label>
            <input type="number" className={input} placeholder="0" {...register("order_index")} />
          </div>
          <button type="submit" disabled={isSubmitting} className={submitBtn}>
            {isSubmitting ? "Saving..." : editing ? "Update Certificate" : "Create Certificate"}
          </button>
        </form>
      </Modal>
    </>
  );
}

const input = "w-full rounded-lg border border-white/10 bg-gray-800/50 px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500";
const submitBtn = "mt-2 rounded-xl bg-primary-600 py-3 font-semibold text-white hover:bg-primary-500 disabled:opacity-60 transition-colors";
