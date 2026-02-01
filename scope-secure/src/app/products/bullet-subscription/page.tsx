"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SubscriptionHero } from "@/components/products/subscription/SubscriptionHero";
import { HowItWorks } from "@/components/products/subscription/HowItWorks";
import { CaliberSelector } from "@/components/products/subscription/CaliberSelector";
import { PricingTiers } from "@/components/products/subscription/PricingTiers";
import { SubscriptionCTA } from "@/components/products/subscription/SubscriptionCTA";
import { SubscriptionFAQ } from "@/components/products/subscription/SubscriptionFAQ";
import type { CaliberOption, SubscriptionTier } from "@/types";

export default function BulletSubscriptionPage() {
  const [selectedCaliber, setSelectedCaliber] = useState<CaliberOption | null>(
    null
  );
  const [selectedTier, setSelectedTier] = useState<SubscriptionTier | null>(
    null
  );
  const [interval, setInterval] = useState<"monthly" | "quarterly">("monthly");

  return (
    <>
      <Header />
      <main>
        <SubscriptionHero />
        <HowItWorks />
        <CaliberSelector
          selectedCaliber={selectedCaliber}
          onSelect={setSelectedCaliber}
        />
        <PricingTiers
          selectedTier={selectedTier}
          onSelect={setSelectedTier}
          interval={interval}
          onIntervalChange={setInterval}
        />
        <SubscriptionCTA
          caliber={selectedCaliber}
          tier={selectedTier}
          interval={interval}
        />
        <SubscriptionFAQ />
      </main>
      <Footer />
    </>
  );
}
