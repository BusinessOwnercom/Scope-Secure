import type { Metadata } from "next";

// Block all search engine indexing for this private route
export const metadata: Metadata = {
  title: "Marketing HQ — ScopeSecure (Private)",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function MarketingPlanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
