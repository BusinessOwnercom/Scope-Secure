"use client";

import { motion } from "motion/react";
import { Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PRODUCTS } from "@/lib/constants";
import { useCart } from "@/components/cart/CartProvider";
import type { CaseSize } from "@/types";

interface CaseCTAProps {
  selectedSize: CaseSize;
}

const perks = [
  { icon: Truck, label: "Free Shipping" },
  { icon: ShieldCheck, label: "Lifetime Warranty" },
  { icon: RotateCcw, label: "30-Day Returns" },
];

export function CaseCTA({ selectedSize }: CaseCTAProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      ...PRODUCTS["heavy-duty-case"],
      size: selectedSize.name,
      price: selectedSize.price,
    });
  };

  return (
    <section className="bg-charcoal py-20 md:py-28">
      <Container>
        <motion.div
          className="mx-auto max-w-xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Summary box */}
          <div className="rounded-lg border border-white/10 bg-charcoal-light p-8">
            <p className="font-heading text-sm uppercase tracking-widest text-warm-gray-dark">
              Selected Size
            </p>
            <h3 className="mt-2 font-heading text-2xl font-bold uppercase text-white">
              {selectedSize.name}
            </h3>
            <p className="mt-1 text-3xl font-bold text-accent">
              ${selectedSize.price.toFixed(2)}
            </p>

            <div className="mt-6">
              <Button onClick={handleAddToCart} size="lg" className="w-full">
                Add to Cart &mdash; ${selectedSize.price.toFixed(2)}
              </Button>
            </div>
          </div>

          {/* Perks */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
            {perks.map((perk) => (
              <div
                key={perk.label}
                className="flex items-center gap-2 text-warm-gray"
              >
                <perk.icon className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium">{perk.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
