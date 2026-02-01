"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import { CheckCircle, ArrowRight, Package } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/components/cart/CartProvider";

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();

  // Clear cart on mount
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-charcoal pt-24 pb-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center py-20">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <CheckCircle className="mx-auto h-24 w-24 text-green-check" />
            </motion.div>

            <motion.h1
              className="mt-8 font-heading text-3xl font-bold uppercase tracking-tight text-white md:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Order Confirmed!
            </motion.h1>

            <motion.p
              className="mt-4 text-lg text-warm-gray"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Thank you for your purchase. Your ScopeSecure is on its way.
            </motion.p>

            <motion.div
              className="mt-8 rounded-xl border border-white/10 bg-charcoal-light p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Package className="mx-auto h-10 w-10 text-accent mb-4" />
              <h2 className="font-heading text-lg font-bold uppercase text-white">
                What&apos;s Next
              </h2>
              <ul className="mt-4 space-y-3 text-left max-w-sm mx-auto">
                <li className="flex items-start gap-3 text-sm text-warm-gray">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-charcoal font-bold text-xs">1</span>
                  You&apos;ll receive a confirmation email with your order details.
                </li>
                <li className="flex items-start gap-3 text-sm text-warm-gray">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-charcoal font-bold text-xs">2</span>
                  Your order ships within 1-2 business days with tracking.
                </li>
                <li className="flex items-start gap-3 text-sm text-warm-gray">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-charcoal font-bold text-xs">3</span>
                  Install in minutes — no special tools required.
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button href="/" size="lg">
                Continue Shopping
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
