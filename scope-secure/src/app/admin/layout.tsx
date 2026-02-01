import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminNav } from "@/components/admin/AdminNav";

export const metadata: Metadata = {
  title: "Admin Dashboard | ScopeSecure",
  description: "ScopeSecure inventory management dashboard",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // This check is redundant with middleware but provides extra safety
  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-charcoal-dark">
      <AdminNav userEmail={user.email || "Admin"} />
      <main className="p-6 lg:p-8">{children}</main>
    </div>
  );
}
