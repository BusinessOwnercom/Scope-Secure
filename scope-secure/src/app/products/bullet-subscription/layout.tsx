import type { Metadata } from "next";
import { bulletSubscriptionMetadata } from "@/lib/metadata";

export const metadata: Metadata = bulletSubscriptionMetadata;

export default function BulletSubscriptionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
