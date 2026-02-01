"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Loader2, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { CaliberOption, SubscriptionTier } from "@/types";

interface SubscriptionCTAProps {
  caliber: CaliberOption | null;
  tier: SubscriptionTier | null;
  interval: "monthly" | "quarterly";
}

export function SubscriptionCTA({
  caliber,
  tier,
  interval,
}: SubscriptionCTAProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isReady = caliber !== null && tier !== null;
  const price = tier
    ? interval === "monthly"
      ? tier.monthlyPrice
      : tier.quarterlyPrice
    : 0;

  async function handleCheckout() {
    if (!caliber || !tier) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ caliber, tier, interval }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
      setLoading(false);
    }
  }

  return (
    <section className="bg-charcoal py-20 md:py-28">
      <Container>
        <motion.div
          className="mx-auto max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Summary card */}
          <div className="rounded-sm border border-white/10 bg-charcoal-light p-8 md:p-10">
            <h3 className="text-center font-heading text-2xl font-bold uppercase tracking-tight text-white md:text-3xl">
              Your Subscription
            </h3>
            <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-accent" />

            {/* Summary details */}
            <div className="mt-8 space-y-4">
              {/* Caliber */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <span className="text-sm uppercase tracking-wider text-warm-gray-dark">
                  Caliber
                </span>
                <span
                  className={cn(
                    "font-heading text-lg font-semibold",
                    caliber ? "text-white" : "text-warm-gray-dark"
                  )}
                >
                  {caliber ? caliber.shortName : "Not selected"}
                </span>
              </div>

              {/* Plan */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <span className="text-sm uppercase tracking-wider text-warm-gray-dark">
                  Plan
                </span>
                <span
                  className={cn(
                    "font-heading text-lg font-semibold",
                    tier ? "text-white" : "text-warm-gray-dark"
                  )}
                >
                  {tier ? tier.name : "Not selected"}
                </span>
              </div>

              {/* Rounds */}
              {tier && (
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <span className="text-sm uppercase tracking-wider text-warm-gray-dark">
                    Rounds / Shipment
                  </span>
                  <span className="font-heading text-lg font-semibold text-white">
                    {tier.roundsPerShipment}
                  </span>
                </div>
              )}

              {/* Frequency */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <span className="text-sm uppercase tracking-wider text-warm-gray-dark">
                  Frequency
                </span>
                <span className="font-heading text-lg font-semibold text-white capitalize">
                  {interval}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm uppercase tracking-wider text-warm-gray-dark">
                  Total
                </span>
                <span className="font-heading text-3xl font-bold text-accent">
                  {isReady
                    ? `$${price.toFixed(2)}/${interval === "monthly" ? "mo" : "qtr"}`
                    : "$—"}
                </span>
              </div>
            </div>

            {/* CTA button */}
            <div className="mt-8">
              {isReady ? (
                <Button
                  onClick={handleCheckout}
                  size="lg"
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Creating Session...
                    </>
                  ) : (
                    <>
                      Start Your Subscription
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </Button>
              ) : (
                <div className="rounded-sm bg-white/5 px-6 py-4 text-center">
                  <p className="text-sm text-warm-gray-dark">
                    Select a caliber and plan above to get started.
                  </p>
                </div>
              )}
            </div>

            {/* Error message */}
            {error && (
              <motion.p
                className="mt-4 text-center text-sm text-red-400"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.p>
            )}

            {/* Trust copy */}
            {isReady && (
              <p className="mt-4 text-center text-xs text-warm-gray-dark">
                Cancel or pause anytime. No contracts. Free shipping.
              </p>
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
