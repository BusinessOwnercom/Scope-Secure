"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Calculator, DollarSign, AlertTriangle, TrendingDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { PRODUCT_PRICE, SCOPE_OPTIONS, PRODUCTS } from "@/lib/constants";
import { useCart } from "@/components/cart/CartProvider";

export function PriceCalculator() {
  const [scopeValue, setScopeValue] = useState(3000);
  const { addItem } = useCart();
  const protectionPercent = ((PRODUCT_PRICE / scopeValue) * 100).toFixed(1);
  const replacementCost = scopeValue + 45 + 25; // scope + shipping + wait cost estimate

  return (
    <section className="bg-charcoal py-20 md:py-28">
      <Container>
        <SectionHeading
          title="What's Your Scope Worth?"
          subtitle="Calculate the true cost of leaving your optics unprotected."
          light
        />

        <motion.div
          className="mx-auto max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="rounded-xl border border-white/10 bg-charcoal-light p-6 md:p-10">
            {/* Scope value selector */}
            <div className="mb-8">
              <label className="mb-4 block font-heading text-lg font-semibold uppercase tracking-wider text-white">
                Your Scope Investment
              </label>
              <div className="flex flex-wrap gap-2">
                {SCOPE_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setScopeValue(option.value)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                      scopeValue === option.value
                        ? "bg-accent text-charcoal shadow-lg shadow-accent/20"
                        : "bg-white/5 text-warm-gray hover:bg-white/10"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="grid gap-4 md:grid-cols-3">
              <motion.div
                className="rounded-lg bg-white/5 p-5"
                key={`percent-${scopeValue}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <DollarSign className="mb-2 h-6 w-6 text-accent" />
                <p className="text-sm text-warm-gray-dark">Protection Cost</p>
                <p className="mt-1 font-heading text-3xl font-bold text-accent">
                  {protectionPercent}%
                </p>
                <p className="text-xs text-warm-gray-dark">of your scope value</p>
              </motion.div>

              <motion.div
                className="rounded-lg bg-white/5 p-5"
                key={`replace-${scopeValue}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <AlertTriangle className="mb-2 h-6 w-6 text-red-cross" />
                <p className="text-sm text-warm-gray-dark">Replacement Cost</p>
                <p className="mt-1 font-heading text-3xl font-bold text-white">
                  ${replacementCost.toLocaleString()}
                </p>
                <p className="text-xs text-warm-gray-dark">+ 4-6 week wait</p>
              </motion.div>

              <motion.div
                className="rounded-lg bg-white/5 p-5"
                key={`hunt-${scopeValue}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <TrendingDown className="mb-2 h-6 w-6 text-red-cross" />
                <p className="text-sm text-warm-gray-dark">Hunt at Risk</p>
                <p className="mt-1 font-heading text-3xl font-bold text-white">
                  $5K-30K+
                </p>
                <p className="text-xs text-warm-gray-dark">ruined by one drop</p>
              </motion.div>
            </div>

            {/* CTA */}
            <div className="mt-8 text-center">
              <p className="mb-4 text-warm-gray">
                Protect your{" "}
                <span className="font-bold text-white">
                  ${scopeValue.toLocaleString()}
                </span>{" "}
                investment for just{" "}
                <span className="font-bold text-accent">
                  {protectionPercent}%
                </span>{" "}
                of its value.
              </p>
              <Button onClick={() => addItem(PRODUCTS['scope-guard'])} size="lg">
                Protect Your Investment &mdash; ${PRODUCT_PRICE}
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
