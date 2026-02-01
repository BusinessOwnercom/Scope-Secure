import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  count?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

export function StarRating({
  rating,
  count,
  size = "md",
  className,
}: StarRatingProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              sizeMap[size],
              star <= Math.floor(rating)
                ? "fill-accent text-accent"
                : star <= rating
                  ? "fill-accent/50 text-accent"
                  : "fill-transparent text-warm-gray-dark"
            )}
          />
        ))}
      </div>
      {count !== undefined && (
        <span className="ml-1 text-sm text-warm-gray-dark">
          ({count.toLocaleString()})
        </span>
      )}
    </div>
  );
}
