import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const metadata = { title: "Admin Panel — Portfolio" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-950">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-6 md:p-8">{children}</main>
    </div>
  );
}
