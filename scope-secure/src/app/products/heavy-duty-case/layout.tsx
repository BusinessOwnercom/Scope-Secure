import type { Metadata } from "next";
import { heavyDutyCaseMetadata } from "@/lib/metadata";

export const metadata: Metadata = heavyDutyCaseMetadata;

export default function HeavyDutyCaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
