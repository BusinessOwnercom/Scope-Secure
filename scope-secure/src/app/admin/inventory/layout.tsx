import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inventory Management | ScopeSecure Admin",
  description: "Manage ScopeSecure product inventory",
};

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
