"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CALIBER_OPTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { CaliberOption } from "@/types";

interface CaliberSelectorProps {
  selectedCaliber: CaliberOption | null;
  onSelect: (caliber: CaliberOption) => void;
}

export function CaliberSelector({
  selectedCaliber,
  onSelect,
}: CaliberSelectorProps) {
  return (
    <section id="caliber" className="bg-charcoal py-20 md:py-28">
      <Container>
        <SectionHeading
          title="Choose Your Caliber"
          subtitle="Select your preferred caliber to get started."
          light
        />

        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CALIBER_OPTIONS.map((caliber, index) => {
            const isSelected = selectedCaliber?.id === caliber.id;

            return (
              <motion.button
                key={caliber.id}
                onClick={() => onSelect(caliber)}
                className={cn(
                  "group relative rounded-sm border-2 p-6 text-left transition-all duration-200",
                  isSelected
                    ? "border-accent bg-accent/10"
                    : "border-white/10 bg-charcoal-light hover:border-accent/40 hover:bg-charcoal-light/80"
                )}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Selection indicator */}
                <div
                  className={cn(
                    "absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors",
                    isSelected
                      ? "border-accent bg-accent"
                      : "border-white/30 bg-transparent"
                  )}
                >
                  {isSelected && (
                    <motion.div
                      className="h-2 w-2 rounded-full bg-charcoal"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </div>

                {/* Short name */}
                <span
                  className={cn(
                    "font-heading text-2xl font-bold uppercase tracking-tight transition-colors",
                    isSelected ? "text-accent" : "text-white"
                  )}
                >
                  {caliber.shortName}
                </span>

                {/* Full name */}
                <p className="mt-1 text-sm font-medium text-warm-gray">
                  {caliber.name}
                </p>

                {/* Description */}
                <p className="mt-2 text-sm leading-relaxed text-warm-gray-dark">
                  {caliber.description}
                </p>
              </motion.button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
