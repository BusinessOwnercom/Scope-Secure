"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CASE_SPECS } from "@/lib/constants";

const specLabels: Record<keyof typeof CASE_SPECS, string> = {
  material: "Material",
  waterproof: "Waterproof Rating",
  temperatureRange: "Temperature Range",
  foam: "Foam Interior",
  locks: "Lock System",
  pressureValve: "Pressure Valve",
  warranty: "Warranty",
  madeIn: "Origin",
};

export function CaseSpecs() {
  const specEntries = Object.entries(CASE_SPECS) as [
    keyof typeof CASE_SPECS,
    string,
  ][];

  return (
    <section className="bg-charcoal py-20 md:py-28">
      <Container>
        <SectionHeading
          title="Technical Specifications"
          subtitle="Engineering details for the detail-oriented."
          light
        />

        <motion.div
          className="mx-auto max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="divide-y divide-white/10">
            {specEntries.map(([key, value]) => (
              <div
                key={key}
                className="grid grid-cols-1 gap-2 py-4 sm:grid-cols-2 sm:gap-8"
              >
                <dt className="font-heading text-sm uppercase tracking-wider text-warm-gray-dark">
                  {specLabels[key]}
                </dt>
                <dd className="font-medium text-white">{value}</dd>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
