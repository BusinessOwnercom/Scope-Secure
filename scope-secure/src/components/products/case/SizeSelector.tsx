"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CASE_SIZES } from "@/lib/constants";
import type { CaseSize } from "@/types";

interface SizeSelectorProps {
  selectedSize: CaseSize;
  onSelect: (size: CaseSize) => void;
}

export function SizeSelector({ selectedSize, onSelect }: SizeSelectorProps) {
  return (
    <section className="bg-white py-20 md:py-28">
      <Container>
        <SectionHeading
          title="Choose Your Size"
          subtitle="Three sizes to fit every rifle and configuration."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CASE_SIZES.map((size, index) => {
            const isSelected = selectedSize.id === size.id;

            return (
              <motion.button
                key={size.id}
                onClick={() => onSelect(size)}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-lg border-2 p-6 text-left transition-colors",
                  isSelected
                    ? "border-accent shadow-lg shadow-accent/10"
                    : "border-charcoal/10 hover:border-accent/40"
                )}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-xl font-bold uppercase text-charcoal">
                    {size.name}
                  </h3>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-accent"
                    >
                      <Check className="h-4 w-4 text-charcoal" />
                    </motion.div>
                  )}
                </div>

                {/* Description */}
                <p className="mt-2 text-sm leading-relaxed text-charcoal/60">
                  {size.description}
                </p>

                {/* Dimensions */}
                <div className="mt-4 space-y-1.5 border-t border-charcoal/10 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-charcoal/50">Interior</span>
                    <span className="font-medium text-charcoal">
                      {size.interiorDimensions}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-charcoal/50">Exterior</span>
                    <span className="font-medium text-charcoal">
                      {size.exteriorDimensions}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-charcoal/50">Weight</span>
                    <span className="font-medium text-charcoal">
                      {size.weight}
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="mt-4 border-t border-charcoal/10 pt-4">
                  <span className="font-heading text-2xl font-bold text-accent">
                    ${size.price.toFixed(2)}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
