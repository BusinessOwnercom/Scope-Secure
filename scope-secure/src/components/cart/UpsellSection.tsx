"use client";

import { Plus } from "lucide-react";
import { useCart } from "./CartProvider";
import { PRODUCTS } from "@/lib/constants";

const UPSELL_PRODUCT_IDS = ["bullet-subscription", "heavy-duty-case"] as const;

export function UpsellSection() {
  const { state, addItem } = useCart();

  const cartProductIds = state.items.map((item) => item.product.id);
  const upsellProducts = UPSELL_PRODUCT_IDS.filter(
    (id) => !cartProductIds.includes(id)
  ).map((id) => PRODUCTS[id]);

  if (upsellProducts.length === 0) return null;

  return (
    <div className="border-t border-white/10 pt-4 mt-4">
      <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-accent mb-3">
        Complete Your Setup
      </h4>
      <div className="space-y-3">
        {upsellProducts.map((product) => (
          <div
            key={product.id}
            className="flex items-center gap-3 rounded-lg bg-white/5 p-3"
          >
            {/* Mini placeholder */}
            <div className="h-10 w-10 shrink-0 rounded bg-charcoal-light flex items-center justify-center">
              <span className="text-[8px] text-warm-gray-dark font-heading uppercase">
                {product.category === "ammo-subscription" ? "Ammo" : "Case"}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">
                {product.name}
              </p>
              <p className="text-xs text-warm-gray-dark">
                ${product.price.toFixed(2)}
                {product.type === "subscription" && "/mo"}
              </p>
            </div>

            <button
              onClick={() => addItem(product)}
              className="flex items-center gap-1 rounded-md bg-accent/10 border border-accent/30 px-3 py-1.5 text-xs font-semibold text-accent hover:bg-accent/20 transition-colors shrink-0"
            >
              <Plus className="h-3 w-3" />
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
