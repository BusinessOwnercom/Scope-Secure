"use client";

import { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { ShippingForm } from "@/components/checkout/ShippingForm";
import { PaymentForm } from "@/components/checkout/PaymentForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { UpsellSection } from "@/components/cart/UpsellSection";
import { useCart } from "@/components/cart/CartProvider";
import { stripePromise } from "@/lib/stripe";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Loader2 } from "lucide-react";
import type { CheckoutFormData } from "@/types";

export default function CheckoutPage() {
  const { state, itemCount } = useCart();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [shippingData, setShippingData] = useState<CheckoutFormData | null>(null);
  const [step, setStep] = useState<"shipping" | "payment">("shipping");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Create PaymentIntent when shipping is submitted
  const handleShippingSubmit = async (data: CheckoutFormData) => {
    setShippingData(data);
    setLoading(true);
    setError(null);

    try {
      const oneTimeItems = state.items
        .filter((item) => item.product.type === "one-time")
        .map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        }));

      if (oneTimeItems.length === 0) {
        // Only subscription items — skip Stripe Elements
        setStep("payment");
        setLoading(false);
        return;
      }

      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: oneTimeItems, shipping: data }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to initialize payment");
      }

      setClientSecret(result.clientSecret);
      setStep("payment");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    // Stripe handles redirect to /checkout/success
  };

  if (itemCount === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-charcoal pt-24 pb-16">
          <Container>
            <div className="flex flex-col items-center justify-center py-20">
              <p className="font-heading text-xl font-bold uppercase text-white mb-4">
                Your cart is empty
              </p>
              <Button href="/">
                <ArrowLeft className="h-4 w-4" />
                Continue Shopping
              </Button>
            </div>
          </Container>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-charcoal pt-24 pb-16">
        <Container>
          <div className="mb-8">
            <a href="/cart" className="inline-flex items-center gap-2 text-sm text-accent hover:underline">
              <ArrowLeft className="h-4 w-4" />
              Back to Cart
            </a>
            <h1 className="font-heading text-3xl font-bold uppercase tracking-tight text-white md:text-4xl mt-4">
              Checkout
            </h1>
          </div>

          <div className="grid gap-10 lg:grid-cols-5">
            {/* Forms */}
            <div className="lg:col-span-3 space-y-8">
              {/* Step indicators */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`flex items-center gap-2 ${step === "shipping" ? "text-accent" : "text-warm-gray-dark"}`}>
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm ${step === "shipping" ? "bg-accent text-charcoal" : "bg-white/10 text-warm-gray"}`}>
                    1
                  </div>
                  <span className="text-sm font-medium">Shipping</span>
                </div>
                <div className="h-px flex-1 bg-white/10" />
                <div className={`flex items-center gap-2 ${step === "payment" ? "text-accent" : "text-warm-gray-dark"}`}>
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm ${step === "payment" ? "bg-accent text-charcoal" : "bg-white/10 text-warm-gray"}`}>
                    2
                  </div>
                  <span className="text-sm font-medium">Payment</span>
                </div>
              </div>

              {error && (
                <div className="rounded-lg bg-red-cross/10 border border-red-cross/30 px-4 py-3">
                  <p className="text-sm text-red-cross">{error}</p>
                </div>
              )}

              {step === "shipping" && (
                <div className="rounded-xl border border-white/10 bg-charcoal-light p-6">
                  <ShippingForm onSubmit={handleShippingSubmit} isProcessing={loading} />
                  <Button
                    type="submit"
                    form="checkout-form"
                    size="lg"
                    className="w-full mt-6"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Continue to Payment"
                    )}
                  </Button>
                </div>
              )}

              {step === "payment" && clientSecret && (
                <div className="rounded-xl border border-white/10 bg-charcoal-light p-6">
                  <Elements
                    stripe={stripePromise}
                    options={{
                      clientSecret,
                      appearance: {
                        theme: "night",
                        variables: {
                          colorPrimary: "#C9A227",
                          colorBackground: "#2a2a2a",
                          colorText: "#ffffff",
                          colorTextPlaceholder: "#D1CDC9",
                          borderRadius: "2px",
                        },
                      },
                    }}
                  >
                    <PaymentForm onSuccess={handlePaymentSuccess} />
                  </Elements>
                </div>
              )}

              {step === "payment" && !clientSecret && (
                <div className="rounded-xl border border-white/10 bg-charcoal-light p-6 text-center">
                  <p className="text-warm-gray">
                    Your subscription will be processed via secure Stripe checkout.
                  </p>
                  <Button href="/products/bullet-subscription" size="lg" className="mt-4">
                    Complete Subscription Setup
                  </Button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              <OrderSummary />
              <div className="rounded-xl border border-white/10 bg-charcoal-light p-4">
                <UpsellSection />
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
