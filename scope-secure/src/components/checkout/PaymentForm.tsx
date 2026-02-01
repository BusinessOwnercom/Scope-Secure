"use client";

import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Loader2, Lock } from "lucide-react";

interface PaymentFormProps {
  onSuccess: () => void;
}

export function PaymentForm({ onSuccess }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message || "Payment failed");
      setProcessing(false);
      return;
    }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
    });

    if (confirmError) {
      setError(confirmError.message || "Payment failed");
      setProcessing(false);
    } else {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h3 className="font-heading text-lg font-bold uppercase tracking-wider text-white">
        Payment
      </h3>

      <div className="rounded-lg border border-white/10 bg-white/5 p-4">
        <PaymentElement
          options={{
            layout: "tabs",
          }}
        />
      </div>

      {error && (
        <div className="rounded-lg bg-red-cross/10 border border-red-cross/30 px-4 py-3">
          <p className="text-sm text-red-cross">{error}</p>
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={!stripe || processing}
      >
        {processing ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Lock className="h-4 w-4" />
            Place Order
          </>
        )}
      </Button>

      <p className="text-center text-xs text-warm-gray-dark flex items-center justify-center gap-1">
        <Lock className="h-3 w-3" />
        Secured with 256-bit SSL encryption
      </p>
    </form>
  );
}
