"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, ShoppingBag } from "lucide-react";
import { useCart } from "./CartProvider";
import { CartItemRow } from "./CartItemRow";
import { UpsellSection } from "./UpsellSection";
import { Button } from "@/components/ui/Button";

export function CartDrawer() {
  const { state, closeDrawer, itemCount, subtotal, hasSubscription } = useCart();

  return (
    <AnimatePresence>
      {state.isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={closeDrawer}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-charcoal shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-accent" />
                <h2 className="font-heading text-lg font-bold uppercase tracking-wider text-white">
                  Your Cart
                </h2>
                {itemCount > 0 && (
                  <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-bold text-charcoal">
                    {itemCount}
                  </span>
                )}
              </div>
              <button
                onClick={closeDrawer}
                className="text-warm-gray hover:text-white transition-colors"
                aria-label="Close cart"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6">
              {state.items.length === 0 ? (
                /* Empty state */
                <div className="flex flex-col items-center justify-center h-full py-16">
                  <ShoppingBag className="h-16 w-16 text-white/10 mb-4" />
                  <p className="font-heading text-lg font-bold uppercase text-white mb-2">
                    Your cart is empty
                  </p>
                  <p className="text-sm text-warm-gray-dark mb-6">
                    Add a ScopeSecure guard to get started.
                  </p>
                  <Button onClick={closeDrawer} size="sm">
                    Start Shopping
                  </Button>
                </div>
              ) : (
                <div className="divide-y divide-white/10">
                  {state.items.map((item) => (
                    <CartItemRow key={item.product.id} item={item} />
                  ))}
                </div>
              )}

              {/* Upsell */}
              {state.items.length > 0 && <UpsellSection />}
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <div className="border-t border-white/10 px-6 py-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-heading text-sm uppercase tracking-wider text-warm-gray">
                    Subtotal
                  </span>
                  <span className="font-heading text-xl font-bold text-accent">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                {hasSubscription && (
                  <p className="text-xs text-warm-gray-dark">
                    Subscriptions billed separately on a recurring basis.
                  </p>
                )}
                <Button href="/checkout" size="lg" className="w-full" onClick={closeDrawer}>
                  Checkout
                </Button>
                <div className="text-center">
                  <a
                    href="/cart"
                    className="text-sm text-accent hover:underline"
                    onClick={closeDrawer}
                  >
                    View Full Cart
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
