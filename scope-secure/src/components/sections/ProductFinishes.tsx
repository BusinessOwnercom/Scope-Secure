"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FinishCard } from "@/components/ui/FinishCard";
import { Button } from "@/components/ui/Button";
import { PRODUCT_FINISHES, PRODUCT_PRICE, PRODUCTS } from "@/lib/constants";
import { useCart } from "@/components/cart/CartProvider";

export function ProductFinishes() {
  const [selectedFinish, setSelectedFinish] = useState(PRODUCT_FINISHES[1].id);
  const { addItem } = useCart();

  return (
    <section id="finishes" className="bg-warm-gray py-20 md:py-28">
      <Container>
        <SectionHeading
          title="Choose Your Finish"
          subtitle="Three finishes. One price. Same uncompromising protection."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {PRODUCT_FINISHES.map((finish, index) => (
            <motion.div
              key={finish.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <FinishCard
                finish={finish}
                isSelected={selectedFinish === finish.id}
                onSelect={() => setSelectedFinish(finish.id)}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="mb-4 text-charcoal/60">
            All finishes — <span className="font-bold text-charcoal">${PRODUCT_PRICE}</span>
          </p>
          <Button onClick={() => { const product = { ...PRODUCTS['scope-guard'], finish: selectedFinish }; addItem(product); }} size="lg">
            Select &amp; Protect &mdash; ${PRODUCT_PRICE}
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
