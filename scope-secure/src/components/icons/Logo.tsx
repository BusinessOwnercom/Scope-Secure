import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Shield icon */}
      <svg
        viewBox="0 0 32 36"
        fill="none"
        className="h-8 w-7"
        aria-hidden="true"
      >
        <path
          d="M16 0L0 6v12c0 9.94 6.84 19.24 16 21.6C25.16 37.24 32 27.94 32 18V6L16 0z"
          fill="currentColor"
          className="text-accent"
        />
        {/* Crosshair */}
        <line x1="16" y1="10" x2="16" y2="26" stroke="#1a1a1a" strokeWidth="1.5" />
        <line x1="8" y1="18" x2="24" y2="18" stroke="#1a1a1a" strokeWidth="1.5" />
        <circle cx="16" cy="18" r="4" stroke="#1a1a1a" strokeWidth="1.5" fill="none" />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="font-heading text-xl font-bold uppercase tracking-widest text-white">
          Scope
        </span>
        <span className="font-heading text-xl font-bold uppercase tracking-widest text-accent">
          Secure
        </span>
      </div>
    </div>
  );
}
