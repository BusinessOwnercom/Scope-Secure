"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { HEAVY_DUTY_CASE_FAQ } from "@/lib/constants";

export function CaseFAQ() {
  return (
    <section className="bg-white py-20 md:py-28">
      <Container>
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about the Heavy Duty Rifle Case."
        />

        <motion.div
          className="mx-auto max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Accordion items={HEAVY_DUTY_CASE_FAQ} />
        </motion.div>
      </Container>
    </section>
  );
}
