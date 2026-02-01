"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import type { ProductFinish } from "@/types";

interface FinishCardProps {
  finish: ProductFinish;
  isSelected: boolean;
  onSelect: () => void;
}

export function FinishCard({ finish, isSelected, onSelect }: FinishCardProps) {
  return (
    <motion.button
      onClick={onSelect}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border-2 text-left transition-colors",
        isSelected
          ? "border-accent shadow-lg shadow-accent/10"
          : "border-charcoal/10 hover:border-accent/40"
      )}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Color preview */}
      <div className={cn("h-48 w-full", finish.colorClass)} />

      {/* Info */}
      <div className="bg-white p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-lg font-bold text-charcoal">
            {finish.name}
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
        <p className="mt-2 text-sm text-charcoal/60 leading-relaxed">
          {finish.description}
        </p>
      </div>
    </motion.button>
  );
}
