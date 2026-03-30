"use client";

import { useState } from "react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { Trash2, Mail, MailOpen } from "lucide-react";
import type { ContactMessageRow } from "@/lib/supabase/types";

export function MessagesClient({ initialData }: { initialData: ContactMessageRow[] }) {
  const [data, setData] = useState(initialData);
  const [selected, setSelected] = useState<ContactMessageRow | null>(null);

  const markRead = async (id: string, is_read: boolean) => {
    const supabase = createClient();
    await (supabase.from("contact_messages") as ReturnType<typeof supabase.from>)
      .update({ is_read } as never)
      .eq("id", id);
    setData((prev) => prev.map((m) => (m.id === id ? { ...m, is_read } : m)));
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    const supabase = createClient();
    const { error } = await supabase.from("contact_messages").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    setData((prev) => prev.filter((m) => m.id !== id));
    if (selected?.id === id) setSelected(null);
    toast.success("Message deleted");
  };

  const unread = data.filter((m) => !m.is_read).length;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Messages</h1>
          {unread > 0 && (
            <p className="mt-1 text-sm text-gray-400">
              <span className="text-primary-400 font-medium">{unread}</span> unread
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* List */}
        <div className="lg:col-span-2 flex flex-col gap-2">
          {data.length === 0 && (
            <div className="glass rounded-2xl p-8 text-center text-gray-500">No messages yet.</div>
          )}
          {data.map((msg) => (
            <button
              key={msg.id}
              onClick={() => { setSelected(msg); if (!msg.is_read) markRead(msg.id, true); }}
              className={`glass w-full rounded-xl p-4 text-left transition-all hover:border-white/20 ${selected?.id === msg.id ? "border-primary-500/50" : ""}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    {!msg.is_read && <span className="h-2 w-2 shrink-0 rounded-full bg-primary-400" />}
                    <p className={`truncate text-sm font-medium ${msg.is_read ? "text-gray-300" : "text-white"}`}>
                      {msg.name}
                    </p>
                  </div>
                  <p className="truncate text-xs text-gray-500">{msg.email}</p>
                  {msg.subject && <p className="mt-1 truncate text-xs text-gray-400">{msg.subject}</p>}
                </div>
                <span className="shrink-0 text-xs text-gray-600">
                  {new Date(msg.created_at).toLocaleDateString()}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Detail */}
        <div className="lg:col-span-3">
          {selected ? (
            <div className="glass rounded-2xl p-6">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white">{selected.name}</h2>
                  <a href={`mailto:${selected.email}`} className="text-sm text-primary-400 hover:underline">{selected.email}</a>
                  {selected.subject && <p className="mt-1 text-sm text-gray-400">Re: {selected.subject}</p>}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => markRead(selected.id, !selected.is_read)}
                    className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
                    title={selected.is_read ? "Mark unread" : "Mark read"}
                  >
                    {selected.is_read ? <Mail className="h-4 w-4" /> : <MailOpen className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => handleDelete(selected.id)}
                    className="rounded-lg p-2 text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="rounded-xl bg-gray-800/50 p-4">
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-300">{selected.message}</p>
              </div>
              <p className="mt-3 text-xs text-gray-600">
                Received {new Date(selected.created_at).toLocaleString()}
              </p>
              <a
                href={`mailto:${selected.email}?subject=Re: ${selected.subject ?? "Your message"}`}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-500 transition-colors"
              >
                <Mail className="h-4 w-4" /> Reply via Email
              </a>
            </div>
          ) : (
            <div className="glass flex h-48 items-center justify-center rounded-2xl text-gray-500">
              Select a message to read
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
