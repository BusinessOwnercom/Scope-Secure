"use client";

import { motion } from "motion/react";
import { Shield, Flag, Infinity, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { REVIEW_COUNT, REVIEW_RATING } from "@/lib/constants";

const badges = [
  { icon: Shield, label: "Patented Technology" },
  { icon: Flag, label: "Made in USA" },
  { icon: Infinity, label: "Lifetime Warranty" },
  { icon: Star, label: `${REVIEW_RATING} Stars | ${REVIEW_COUNT}+ Reviews` },
];

export function TrustBar() {
  return (
    <section className="bg-warm-gray py-6">
      <Container>
        <motion.div
          className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {badges.map((badge, index) => (
            <motion.div
              key={badge.label}
              className="flex items-center justify-center gap-2 rounded-lg px-3 py-2 md:gap-3"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <badge.icon className="h-5 w-5 shrink-0 text-accent" strokeWidth={1.5} />
              <span className="text-xs font-semibold text-charcoal sm:text-sm">
                {badge.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
