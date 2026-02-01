"use client";

import { motion } from "motion/react";
import { Check, X, Crown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { COMPARISON_FEATURES } from "@/lib/constants";

function CellValue({ value }: { value: string | boolean }) {
  if (value === true) {
    return <Check className="mx-auto h-5 w-5 text-green-check" />;
  }
  if (value === false) {
    return <X className="mx-auto h-5 w-5 text-red-cross" />;
  }
  return (
    <span className="text-sm font-medium">
      {value}
    </span>
  );
}

export function ValueDemonstration() {
  return (
    <section id="features" className="bg-white py-20 md:py-28">
      <Container>
        <SectionHeading
          title="The ScopeSecure Difference"
          subtitle="See how ScopeSecure compares to standard scope protection."
        />

        <motion.div
          className="overflow-x-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <table className="w-full min-w-[600px] text-center">
            <thead>
              <tr>
                <th className="pb-4 text-left font-heading text-sm uppercase tracking-wider text-charcoal/50">
                  Feature
                </th>
                <th className="pb-4 font-heading text-sm uppercase tracking-wider text-charcoal/50">
                  <div>Butler Creek</div>
                  <div className="mt-1 text-xs font-normal text-charcoal/40">$15</div>
                </th>
                <th className="pb-4 font-heading text-sm uppercase tracking-wider text-charcoal/50">
                  <div>Tenebraex</div>
                  <div className="mt-1 text-xs font-normal text-charcoal/40">$100</div>
                </th>
                <th className="relative pb-4 font-heading text-sm uppercase tracking-wider text-accent">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase text-charcoal">
                      <Crown className="h-3 w-3" /> Best
                    </span>
                  </div>
                  <div className="mt-4">ScopeSecure</div>
                  <div className="mt-1 text-xs font-normal text-accent/70">$249.99</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal/10">
              {COMPARISON_FEATURES.map((row, index) => (
                <motion.tr
                  key={row.feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <td className="py-4 text-left font-medium text-charcoal">
                    {row.feature}
                  </td>
                  <td className="py-4 text-charcoal/60">
                    <CellValue value={row.butlerCreek} />
                  </td>
                  <td className="py-4 text-charcoal/60">
                    <CellValue value={row.tenebraex} />
                  </td>
                  <td className="rounded-lg bg-accent/5 py-4 font-bold text-charcoal">
                    <CellValue value={row.scopeSecure} />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Callout */}
        <motion.div
          className="mt-10 rounded-lg border border-accent/20 bg-accent/5 p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="font-heading text-lg font-bold uppercase text-charcoal md:text-xl">
            The only product combining structural mount + impact protection
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
