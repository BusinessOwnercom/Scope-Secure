"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "./CartProvider";
import type { CartItem } from "@/types";

interface CartItemRowProps {
  item: CartItem;
}

export function CartItemRow({ item }: CartItemRowProps) {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;
  const lineTotal = product.price * quantity;

  return (
    <div className="flex gap-4 py-4">
      {/* Product placeholder image */}
      <div className="h-16 w-16 shrink-0 rounded-lg bg-charcoal-light flex items-center justify-center">
        <span className="text-xs text-warm-gray-dark font-heading uppercase">
          {product.category === "scope-guard"
            ? "Guard"
            : product.category === "ammo-subscription"
              ? "Ammo"
              : "Case"}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-heading text-sm font-bold uppercase text-white truncate">
          {product.name}
        </h4>
        <p className="text-xs text-warm-gray-dark mt-0.5">
          ${product.price.toFixed(2)}
          {product.type === "subscription" && `/${product.interval}`}
        </p>
        {product.finish && (
          <p className="text-xs text-accent mt-0.5">Finish: {product.finish}</p>
        )}
        {product.config && (
          <p className="text-xs text-accent mt-0.5">
            {product.config.guardLength}&quot; | {product.config.scopeHeight} | {product.config.mountDiameter}
          </p>
        )}
        {product.size && (
          <p className="text-xs text-accent mt-0.5">Size: {product.size}</p>
        )}

        {/* Quantity controls */}
        <div className="mt-2 flex items-center gap-2">
          {product.type === "subscription" ? (
            <span className="text-xs text-warm-gray">Recurring</span>
          ) : (
            <div className="flex items-center rounded-md border border-white/10">
              <button
                onClick={() => updateQuantity(product.id, quantity - 1)}
                className="px-2 py-1 text-warm-gray hover:text-white transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="px-2 py-1 text-sm font-medium text-white min-w-[24px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => updateQuantity(product.id, quantity + 1)}
                className="px-2 py-1 text-warm-gray hover:text-white transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
          )}
          <button
            onClick={() => removeItem(product.id)}
            className="ml-auto text-warm-gray-dark hover:text-red-cross transition-colors"
            aria-label="Remove item"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Line total */}
      <div className="text-right shrink-0">
        <span className="text-sm font-bold text-white">
          ${lineTotal.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
