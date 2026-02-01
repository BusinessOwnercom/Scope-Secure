import { cn } from "@/lib/utils";
import { StarRating } from "./StarRating";
import { Quote } from "lucide-react";
import type { Testimonial } from "@/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

const categoryLabels = {
  hunter: "Hunter",
  competition: "Competition",
  military: "Military / LE",
};

export function TestimonialCard({
  testimonial,
  className,
}: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-lg bg-white p-6 shadow-sm border border-charcoal/5",
        "min-w-[300px] md:min-w-[350px]",
        className
      )}
    >
      <Quote className="mb-3 h-8 w-8 text-accent/30" />
      <p className="mb-4 flex-1 text-charcoal/80 leading-relaxed italic">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="mt-auto border-t border-charcoal/10 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-heading font-semibold text-charcoal">
              {testimonial.name}
            </p>
            <p className="text-sm text-charcoal/60">{testimonial.role}</p>
          </div>
          <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            {categoryLabels[testimonial.category]}
          </span>
        </div>
        <StarRating rating={testimonial.rating} size="sm" className="mt-2" />
      </div>
    </div>
  );
}
