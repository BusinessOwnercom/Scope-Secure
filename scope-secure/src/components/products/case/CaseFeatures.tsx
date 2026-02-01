"use client";

import { motion } from "motion/react";
import { Droplet, Shield, Wind, Gauge, Layers, Lock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const features = [
  {
    icon: Droplet,
    title: "IP67 Waterproof",
    description: "Submersible to 1 meter for 30 minutes",
  },
  {
    icon: Shield,
    title: "Crushproof",
    description: "High-impact polymer withstands extreme force",
  },
  {
    icon: Wind,
    title: "Dustproof",
    description: "Complete seal against sand, dirt, and debris",
  },
  {
    icon: Gauge,
    title: "Pressure Valve",
    description: "Automatic equalization for air travel",
  },
  {
    icon: Layers,
    title: "Custom Foam",
    description: "Pick-and-pluck interior, egg-crate lid",
  },
  {
    icon: Lock,
    title: "TSA Locks",
    description: "Integrated TSA-approved combination locks",
  },
];

export function CaseFeatures() {
  return (
    <section className="bg-warm-gray py-20 md:py-28">
      <Container>
        <SectionHeading
          title="Built for the Worst Conditions"
          subtitle="Every feature designed to keep your rifle safe in any environment."
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                <feature.icon
                  className="h-8 w-8 text-accent"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="mt-4 font-heading text-lg font-bold uppercase text-charcoal">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/60">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
