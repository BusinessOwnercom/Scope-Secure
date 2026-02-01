"use client";

import { motion } from "motion/react";
import { Shield, Flag, Wrench, Lock, Award, Crosshair } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const badges = [
  {
    icon: Shield,
    title: "Patented Design",
    description: "Protected by US patent. The only scope guard with proven zero retention.",
  },
  {
    icon: Flag,
    title: "Made in the USA",
    description: "Designed and manufactured in America with aerospace-grade materials.",
  },
  {
    icon: Wrench,
    title: "Easy Installation",
    description: "Pre-assembled. Installs in minutes with no special tools required.",
  },
  {
    icon: Lock,
    title: "Secure Checkout",
    description: "256-bit SSL encryption. Your payment info is always protected.",
  },
  {
    icon: Award,
    title: "Lifetime Warranty",
    description: "Unconditional, unlimited lifetime replacement. No questions asked.",
  },
  {
    icon: Crosshair,
    title: "Precision Engineered",
    description: "Aircraft-grade aluminum. Proprietary locator pin technology.",
  },
];

export function TrustBadges() {
  return (
    <section className="bg-white py-20 md:py-28">
      <Container>
        <SectionHeading
          title="Built to Protect"
          subtitle="Every detail engineered for the serious shooter."
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.title}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                <badge.icon className="h-8 w-8 text-accent" strokeWidth={1.5} />
              </div>
              <h3 className="mt-4 font-heading text-lg font-bold uppercase text-charcoal">
                {badge.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/60">
                {badge.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
