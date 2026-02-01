"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CartItemRow } from "@/components/cart/CartItemRow";
import { UpsellSection } from "@/components/cart/UpsellSection";
import { useCart } from "@/components/cart/CartProvider";
import { ShoppingBag, ArrowLeft } from "lucide-react";

export default function CartPage() {
  const { state, subtotal, hasSubscription, itemCount } = useCart();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-charcoal pt-24 pb-16">
        <Container>
          <h1 className="font-heading text-3xl font-bold uppercase tracking-tight text-white md:text-4xl mb-8">
            Your Cart
            {itemCount > 0 && (
              <span className="text-accent ml-2">({itemCount})</span>
            )}
          </h1>

          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <ShoppingBag className="h-20 w-20 text-white/10 mb-6" />
              <p className="font-heading text-xl font-bold uppercase text-white mb-2">
                Your cart is empty
              </p>
              <p className="text-warm-gray-dark mb-8">
                Add a ScopeSecure guard to get started.
              </p>
              <Button href="/">
                <ArrowLeft className="h-4 w-4" />
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="grid gap-10 lg:grid-cols-3">
              {/* Cart items */}
              <div className="lg:col-span-2">
                <div className="rounded-xl border border-white/10 bg-charcoal-light divide-y divide-white/10 px-6">
                  {state.items.map((item) => (
                    <CartItemRow key={item.product.id} item={item} />
                  ))}
                </div>

                <UpsellSection />

                <div className="mt-6">
                  <a href="/" className="inline-flex items-center gap-2 text-sm text-accent hover:underline">
                    <ArrowLeft className="h-4 w-4" />
                    Continue Shopping
                  </a>
                </div>
              </div>

              {/* Summary sidebar */}
              <div>
                <div className="rounded-xl border border-white/10 bg-charcoal-light p-6 sticky top-24">
                  <h2 className="font-heading text-lg font-bold uppercase tracking-wider text-white mb-4">
                    Order Summary
                  </h2>

                  <div className="space-y-3 mb-4">
                    {state.items.map((item) => (
                      <div key={item.product.id} className="flex justify-between text-sm">
                        <span className="text-warm-gray">
                          {item.product.name} {item.quantity > 1 && `x${item.quantity}`}
                        </span>
                        <span className="text-white font-medium">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-white/10 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-warm-gray-dark">Shipping</span>
                      <span className="text-green-check font-medium">FREE</span>
                    </div>
                    <div className="flex justify-between border-t border-white/10 pt-3">
                      <span className="font-heading font-bold uppercase text-white">Total</span>
                      <span className="font-heading text-xl font-bold text-accent">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {hasSubscription && (
                    <p className="mt-3 text-xs text-warm-gray-dark">
                      * Subscriptions billed separately.
                    </p>
                  )}

                  <Button href="/checkout" size="lg" className="w-full mt-6">
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
}
