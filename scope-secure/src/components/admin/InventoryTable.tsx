"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Minus, Save, AlertTriangle, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductVariant } from "@/lib/supabase/types";

interface InventoryTableProps {
  variants: ProductVariant[];
}

const finishLabels: Record<string, string> = {
  "matte-black": "Matte Black",
  "bare-zinc": "Bare Zinc",
  camo: "Camo",
};

const heightLabels: Record<string, string> = {
  "1.5": '1 1/2"',
  "1.75": '1 3/4"',
  "2": '2"',
};

export function InventoryTable({ variants }: InventoryTableProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<number>(0);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);

  const startEditing = (variant: ProductVariant) => {
    setEditingId(variant.id);
    setEditValue(variant.quantity);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditValue(0);
  };

  const saveQuantity = async (variantId: string) => {
    setSavingId(variantId);
    try {
      const response = await fetch("/api/admin/inventory", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: variantId, quantity: editValue }),
      });

      if (response.ok) {
        setSuccessId(variantId);
        setTimeout(() => setSuccessId(null), 1500);
        setEditingId(null);
        startTransition(() => {
          router.refresh();
        });
      }
    } catch (error) {
      console.error("Failed to update quantity:", error);
    } finally {
      setSavingId(null);
    }
  };

  const adjustQuantity = async (variantId: string, change: number) => {
    setSavingId(variantId);
    try {
      const response = await fetch("/api/admin/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: variantId, change }),
      });

      if (response.ok) {
        setSuccessId(variantId);
        setTimeout(() => setSuccessId(null), 1500);
        startTransition(() => {
          router.refresh();
        });
      }
    } catch (error) {
      console.error("Failed to adjust quantity:", error);
    } finally {
      setSavingId(null);
    }
  };

  const getStockStatus = (variant: ProductVariant) => {
    if (variant.quantity === 0) return "out-of-stock";
    if (variant.quantity <= variant.low_stock_threshold) return "low-stock";
    return "in-stock";
  };

  return (
    <div className="bg-charcoal rounded-xl border border-white/10 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-4 py-3 text-left text-xs font-medium text-warm-gray uppercase tracking-wider">
                SKU
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-warm-gray uppercase tracking-wider">
                Length
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-warm-gray uppercase tracking-wider">
                Height
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-warm-gray uppercase tracking-wider">
                Diameter
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-warm-gray uppercase tracking-wider">
                Finish
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-warm-gray uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-warm-gray uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-warm-gray uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {variants.map((variant) => {
              const status = getStockStatus(variant);
              const isEditing = editingId === variant.id;
              const isSaving = savingId === variant.id;
              const isSuccess = successId === variant.id;

              return (
                <tr
                  key={variant.id}
                  className={cn(
                    "hover:bg-white/5 transition-colors",
                    status === "out-of-stock" && "bg-red-500/5",
                    status === "low-stock" && "bg-amber-500/5"
                  )}
                >
                  <td className="px-4 py-3">
                    <span className="font-mono text-sm text-white">
                      {variant.sku}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-warm-gray">
                    {variant.guard_length}"
                  </td>
                  <td className="px-4 py-3 text-warm-gray">
                    {heightLabels[variant.scope_height] || variant.scope_height}
                  </td>
                  <td className="px-4 py-3 text-warm-gray">
                    {variant.mount_diameter === "1in"
                      ? '1"'
                      : variant.mount_diameter}
                  </td>
                  <td className="px-4 py-3 text-warm-gray">
                    {finishLabels[variant.finish] || variant.finish}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium",
                        status === "in-stock" &&
                          "bg-green-500/10 text-green-400",
                        status === "low-stock" &&
                          "bg-amber-500/10 text-amber-400",
                        status === "out-of-stock" && "bg-red-500/10 text-red-400"
                      )}
                    >
                      {status === "low-stock" && (
                        <AlertTriangle className="h-3 w-3" />
                      )}
                      {status === "in-stock" && "In Stock"}
                      {status === "low-stock" && "Low Stock"}
                      {status === "out-of-stock" && "Out of Stock"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {isEditing ? (
                      <div className="flex items-center justify-center gap-2">
                        <input
                          type="number"
                          min="0"
                          value={editValue}
                          onChange={(e) =>
                            setEditValue(parseInt(e.target.value) || 0)
                          }
                          className="w-20 bg-charcoal-dark border border-accent rounded px-2 py-1 text-center text-white text-sm focus:outline-none"
                          autoFocus
                        />
                        <button
                          onClick={() => saveQuantity(variant.id)}
                          disabled={isSaving}
                          className="p-1 rounded bg-accent text-charcoal hover:bg-accent/80 disabled:opacity-50"
                        >
                          <Save className="h-4 w-4" />
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="p-1 rounded bg-white/10 text-warm-gray hover:bg-white/20"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => startEditing(variant)}
                        className={cn(
                          "font-mono text-lg font-semibold min-w-[60px] text-center block mx-auto",
                          isSuccess ? "text-green-400" : "text-white",
                          "hover:text-accent transition-colors"
                        )}
                      >
                        {isSuccess ? (
                          <Check className="h-5 w-5 mx-auto" />
                        ) : (
                          variant.quantity
                        )}
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => adjustQuantity(variant.id, -1)}
                        disabled={isSaving || variant.quantity === 0}
                        className="p-1.5 rounded bg-white/5 text-warm-gray hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        title="Decrease by 1"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => adjustQuantity(variant.id, 1)}
                        disabled={isSaving}
                        className="p-1.5 rounded bg-white/5 text-warm-gray hover:bg-white/10 hover:text-white disabled:opacity-30 transition-colors"
                        title="Increase by 1"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
