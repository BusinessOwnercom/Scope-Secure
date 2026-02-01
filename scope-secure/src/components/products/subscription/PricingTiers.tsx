"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SUBSCRIPTION_TIERS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { SubscriptionTier } from "@/types";

interface PricingTiersProps {
  selectedTier: SubscriptionTier | null;
  onSelect: (tier: SubscriptionTier) => void;
  interval: "monthly" | "quarterly";
  onIntervalChange: (interval: "monthly" | "quarterly") => void;
}

export function PricingTiers({
  selectedTier,
  onSelect,
  interval,
  onIntervalChange,
}: PricingTiersProps) {
  return (
    <section id="plans" className="bg-warm-gray py-20 md:py-28">
      <Container>
        <SectionHeading
          title="Choose Your Plan"
          subtitle="Pick the tier that matches how often you shoot. Save more with quarterly billing."
        />

        {/* Interval toggle */}
        <div className="mb-12 flex items-center justify-center">
          <div className="inline-flex items-center rounded-sm bg-charcoal/10 p-1">
            <button
              onClick={() => onIntervalChange("monthly")}
              className={cn(
                "rounded-sm px-6 py-2.5 font-heading text-sm font-semibold uppercase tracking-wider transition-all duration-200",
                interval === "monthly"
                  ? "bg-accent text-charcoal shadow-sm"
                  : "text-charcoal/60 hover:text-charcoal"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => onIntervalChange("quarterly")}
              className={cn(
                "rounded-sm px-6 py-2.5 font-heading text-sm font-semibold uppercase tracking-wider transition-all duration-200",
                interval === "quarterly"
                  ? "bg-accent text-charcoal shadow-sm"
                  : "text-charcoal/60 hover:text-charcoal"
              )}
            >
              Quarterly
            </button>
          </div>
        </div>

        {/* Tier cards */}
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-3">
          {SUBSCRIPTION_TIERS.map((tier, index) => {
            const isSelected = selectedTier?.id === tier.id;
            const isPopular = tier.popular;
            const price =
              interval === "monthly"
                ? tier.monthlyPrice
                : tier.quarterlyPrice;

            return (
              <motion.button
                key={tier.id}
                onClick={() => onSelect(tier)}
                className={cn(
                  "relative rounded-sm border-2 p-8 text-left transition-all duration-200",
                  isPopular && !isSelected && "border-accent/50 bg-white shadow-lg",
                  isSelected
                    ? "border-accent bg-white shadow-xl ring-2 ring-accent/20"
                    : !isPopular && "border-charcoal/10 bg-white hover:border-accent/30 hover:shadow-md"
                )}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Popular badge */}
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-block rounded-full bg-accent px-4 py-1 font-heading text-xs font-bold uppercase tracking-wider text-charcoal">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Radio indicator */}
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="font-heading text-xl font-bold uppercase tracking-tight text-charcoal">
                    {tier.name}
                  </h3>
                  <div
                    className={cn(
                      "flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors",
                      isSelected
                        ? "border-accent bg-accent"
                        : "border-charcoal/30 bg-transparent"
                    )}
                  >
                    {isSelected && (
                      <motion.div
                        className="h-2 w-2 rounded-full bg-white"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </div>
                </div>

                {/* Rounds */}
                <p className="text-sm font-medium text-charcoal/60">
                  {tier.roundsPerShipment} rounds per shipment
                </p>

                {/* Price */}
                <div className="mt-4">
                  <div className="flex items-baseline gap-1">
                    <span className="font-heading text-4xl font-bold text-charcoal">
                      ${price.toFixed(2)}
                    </span>
                    <span className="text-sm text-charcoal/50">
                      /{interval === "monthly" ? "mo" : "qtr"}
                    </span>
                  </div>
                </div>

                {/* Per round */}
                <p className="mt-2 text-sm text-charcoal/60">
                  {tier.perRoundPrice} per round
                </p>

                {/* Savings badge */}
                {tier.savings && (
                  <div className="mt-4">
                    <span className="inline-block rounded-full bg-forest/10 px-3 py-1 text-xs font-semibold text-forest">
                      {tier.savings}
                    </span>
                  </div>
                )}

                {/* Divider */}
                <div className="my-6 h-px bg-charcoal/10" />

                {/* Features */}
                <ul className="space-y-2 text-sm text-charcoal/70">
                  <li className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-accent" />
                    Factory-new brass-cased ammo
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-accent" />
                    Free shipping, always
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-accent" />
                    Cancel or pause anytime
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-accent" />
                    Top-tier brands guaranteed
                  </li>
                </ul>
              </motion.button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
