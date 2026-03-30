"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Send, Mail, Github, Linkedin } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { ContactMessage } from "@/lib/supabase/types";

type FormData = ContactMessage;

export function ContactSection() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("contact_messages").insert(data);
      if (error) throw error;
      toast.success("Message sent! I'll get back to you soon.");
      reset();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-gray-900/30">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary-400">
            Contact
          </p>
          <h2 className="text-4xl font-bold md:text-5xl">
            Let&apos;s <span className="gradient-text">Work Together</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Have a project in mind or just want to chat? My inbox is always open.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Info */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="glass rounded-2xl p-6">
              <h3 className="mb-4 font-semibold text-white">Get in touch</h3>
              <div className="flex flex-col gap-4">
                <a
                  href="mailto:alex@example.com"
                  className="flex items-center gap-3 text-gray-400 hover:text-primary-400 transition-colors"
                >
                  <Mail className="h-5 w-5 text-primary-400" />
                  alex@example.com
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-400 hover:text-primary-400 transition-colors"
                >
                  <Github className="h-5 w-5 text-primary-400" />
                  github.com/alexjohnson
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-400 hover:text-primary-400 transition-colors"
                >
                  <Linkedin className="h-5 w-5 text-primary-400" />
                  linkedin.com/in/alexjohnson
                </a>
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <p className="text-sm text-gray-400">
                Currently open to full-time roles and interesting freelance projects. Response time is usually within 24 hours.
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="lg:col-span-3 glass rounded-2xl p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-gray-300">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-lg border border-white/10 bg-gray-800/50 px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-300">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="w-full rounded-lg border border-white/10 bg-gray-800/50 px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" },
                  })}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-gray-300">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                placeholder="What's this about?"
                className="w-full rounded-lg border border-white/10 bg-gray-800/50 px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                {...register("subject")}
              />
            </div>

            <div className="mt-5">
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-gray-300">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Tell me about your project..."
                className="w-full resize-none rounded-lg border border-white/10 bg-gray-800/50 px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                {...register("message", { required: "Message is required" })}
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-primary-500/25 transition-all hover:bg-primary-500 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
