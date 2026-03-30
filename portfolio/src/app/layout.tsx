import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Alex Johnson — Full Stack Developer",
  description:
    "Portfolio of Alex Johnson, a Full Stack Developer specializing in Next.js, TypeScript, and Supabase.",
  keywords: ["developer", "portfolio", "Next.js", "TypeScript", "React", "Supabase"],
  authors: [{ name: "Alex Johnson" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Alex Johnson — Full Stack Developer",
    description: "Building modern web applications with React, Next.js, and cloud technologies.",
    siteName: "Alex Johnson Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Johnson — Full Stack Developer",
    description: "Building modern web applications with React, Next.js, and cloud technologies.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans`}>
        <div className="relative min-h-screen">
          {/* Background grid */}
          <div
            className="fixed inset-0 -z-10 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
          {/* Gradient orbs */}
          <div className="fixed top-0 left-1/4 -z-10 h-96 w-96 rounded-full bg-primary-500/10 blur-3xl" />
          <div className="fixed bottom-1/4 right-1/4 -z-10 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
        <Toaster
          position="bottom-right"
          theme="dark"
          toastOptions={{
            style: { background: "#1f2937", border: "1px solid #374151", color: "#f9fafb" },
          }}
        />
      </body>
    </html>
  );
}
