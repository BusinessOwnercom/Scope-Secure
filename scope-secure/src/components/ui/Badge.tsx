import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface BadgeProps {
  icon: LucideIcon;
  label: string;
  variant?: "trust" | "feature" | "inline";
  className?: string;
}

const variantStyles = {
  trust: "flex-col items-center gap-2 px-4 py-3 rounded-lg bg-white/5",
  feature:
    "flex-col items-center gap-2 px-4 py-3 rounded-lg border border-accent/20",
  inline: "flex-row items-center gap-2",
};

export function Badge({
  icon: Icon,
  label,
  variant = "trust",
  className,
}: BadgeProps) {
  return (
    <div className={cn("flex text-center", variantStyles[variant], className)}>
      <Icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
