"use client";

import { useCart } from "./CartProvider";
import { UpsellSection } from "./UpsellSection";

interface CartSummaryProps {
  showUpsell?: boolean;
  compact?: boolean;
}

export function CartSummary({ showUpsell = true, compact = false }: CartSummaryProps) {
  const { state, subtotal, hasSubscription } = useCart();

  return (
    <div>
      {/* Line items */}
      <div className="space-y-3">
        {state.items.map((item) => (
          <div key={item.product.id} className="flex justify-between text-sm">
            <span className="text-warm-gray">
              {item.product.name}
              {item.quantity > 1 && ` x${item.quantity}`}
              {item.product.type === "subscription" && " (monthly)"}
            </span>
            <span className="text-white font-medium">
              ${(item.product.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="mt-4 space-y-2 border-t border-white/10 pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-warm-gray-dark">Subtotal</span>
          <span className="text-white">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-warm-gray-dark">Shipping</span>
          <span className="text-green-check font-medium">FREE</span>
        </div>
        {!compact && (
          <div className="flex justify-between text-sm">
            <span className="text-warm-gray-dark">Tax</span>
            <span className="text-warm-gray-dark">Calculated at checkout</span>
          </div>
        )}
        <div className="flex justify-between border-t border-white/10 pt-3">
          <span className="font-heading text-lg font-bold uppercase text-white">
            Total
          </span>
          <span className="font-heading text-lg font-bold text-accent">
            ${subtotal.toFixed(2)}
          </span>
        </div>
        {hasSubscription && (
          <p className="text-xs text-warm-gray-dark">
            * Subscription items billed separately on a recurring basis.
          </p>
        )}
      </div>

      {showUpsell && <UpsellSection />}
    </div>
  );
}
