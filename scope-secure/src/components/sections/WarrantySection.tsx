"use client";

import { motion } from "motion/react";
import { TreePine, Truck, Dog } from "lucide-react";
import { Container } from "@/components/ui/Container";

const icons = {
  TreePine,
  Truck,
  Dog,
};

const scenarios = [
  {
    icon: TreePine,
    title: "Dropped from tree stand?",
    answer: "Covered.",
  },
  {
    icon: Truck,
    title: "Run over by ATV?",
    answer: "Covered.",
  },
  {
    icon: Dog,
    title: "Dog chewed it?",
    answer: "...Covered.",
  },
];

export function WarrantySection() {
  return (
    <section id="warranty" className="bg-forest py-20 md:py-28">
      <Container>
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl font-bold uppercase tracking-tight text-white md:text-4xl lg:text-5xl">
            Unlimited. Unconditional.
            <br />
            <span className="text-accent">Lifetime Warranty.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            If ScopeSecure ever fails — for any reason — we replace it.{" "}
            <strong className="text-white">No questions. No receipt required.</strong>
          </p>
          <div className="mt-6 h-1 w-16 mx-auto rounded-full bg-accent" />
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {scenarios.map((scenario, index) => (
            <motion.div
              key={scenario.title}
              className="rounded-lg bg-white/10 p-8 text-center backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
            >
              <scenario.icon className="mx-auto h-12 w-12 text-accent" strokeWidth={1.5} />
              <p className="mt-4 font-heading text-lg font-bold uppercase text-white">
                {scenario.title}
              </p>
              <p className="mt-2 text-2xl font-bold text-accent">
                {scenario.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
