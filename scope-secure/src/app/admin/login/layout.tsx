import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login | ScopeSecure",
  description: "Sign in to access the ScopeSecure admin dashboard",
};

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
