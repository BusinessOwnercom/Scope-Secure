"use client";

import { useCart } from "@/components/cart/CartProvider";

export function OrderSummary() {
  const { state, subtotal, hasSubscription } = useCart();

  return (
    <div className="rounded-xl border border-white/10 bg-charcoal-light p-6">
      <h3 className="font-heading text-lg font-bold uppercase tracking-wider text-white mb-4">
        Order Summary
      </h3>

      <div className="space-y-3">
        {state.items.map((item) => (
          <div key={item.product.id} className="flex justify-between text-sm">
            <div className="text-warm-gray">
              <span>{item.product.name}</span>
              {item.quantity > 1 && (
                <span className="text-warm-gray-dark"> x{item.quantity}</span>
              )}
              {item.product.finish && (
                <span className="text-accent text-xs block">{item.product.finish}</span>
              )}
              {item.product.type === "subscription" && (
                <span className="text-accent text-xs block">Monthly subscription</span>
              )}
              {item.product.size && (
                <span className="text-accent text-xs block">{item.product.size}</span>
              )}
            </div>
            <span className="text-white font-medium shrink-0 ml-4">
              ${(item.product.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-2 border-t border-white/10 pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-warm-gray-dark">Subtotal</span>
          <span className="text-white">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-warm-gray-dark">Shipping</span>
          <span className="text-green-check font-medium">FREE</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-warm-gray-dark">Tax</span>
          <span className="text-warm-gray-dark">Calculated at payment</span>
        </div>
        <div className="flex justify-between border-t border-white/10 pt-3">
          <span className="font-heading text-lg font-bold uppercase text-white">
            Total
          </span>
          <span className="font-heading text-lg font-bold text-accent">
            ${subtotal.toFixed(2)}
          </span>
        </div>
      </div>

      {hasSubscription && (
        <p className="mt-3 text-xs text-warm-gray-dark">
          * Subscription items will be billed separately on a recurring basis.
        </p>
      )}
    </div>
  );
}
