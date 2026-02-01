"use client";

import { motion } from "motion/react";
import { Crosshair, Package, Truck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    number: 1,
    icon: Crosshair,
    title: "Choose Your Caliber",
    description:
      "Select from six popular calibers. Rifle or pistol — we have you covered.",
  },
  {
    number: 2,
    icon: Package,
    title: "Select Your Plan",
    description:
      "Pick a tier based on how much you shoot. Monthly or quarterly delivery.",
  },
  {
    number: 3,
    icon: Truck,
    title: "We Deliver",
    description:
      "Premium, factory-new ammunition ships straight to your door. Free shipping, always.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-warm-gray py-20 md:py-28">
      <Container>
        <SectionHeading
          title="How It Works"
          subtitle="Three simple steps to never worry about ammo again."
        />

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              {/* Numbered circle */}
              <div className="relative mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-charcoal">
                  <span className="font-heading text-2xl font-bold">
                    {step.number}
                  </span>
                </div>
                <div className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-charcoal">
                  <step.icon className="h-5 w-5 text-accent" />
                </div>
              </div>

              {/* Content */}
              <h3 className="font-heading text-xl font-bold uppercase tracking-tight text-charcoal">
                {step.title}
              </h3>
              <p className="mt-3 max-w-xs text-charcoal/70 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
