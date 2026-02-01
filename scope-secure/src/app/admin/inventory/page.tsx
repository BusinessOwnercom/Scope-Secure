import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { InventoryTable } from "@/components/admin/InventoryTable";
import { InventoryFilters } from "@/components/admin/InventoryFilters";
import { Package, Loader2 } from "lucide-react";
import type { ProductVariant } from "@/lib/supabase/types";

interface SearchParams {
  filter?: string;
  length?: string;
  height?: string;
  diameter?: string;
  finish?: string;
  search?: string;
}

async function getInventory(searchParams: SearchParams): Promise<ProductVariant[]> {
  const supabase = await createClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let query = (supabase as any).from("product_variants").select("*");

  // Apply filters
  if (searchParams.filter === "low-stock") {
    query = query.gt("quantity", 0).lte("quantity", 5);
  } else if (searchParams.filter === "out-of-stock") {
    query = query.eq("quantity", 0);
  } else if (searchParams.filter === "in-stock") {
    query = query.gt("quantity", 0);
  }

  if (searchParams.length) {
    query = query.eq("guard_length", searchParams.length);
  }
  if (searchParams.height) {
    query = query.eq("scope_height", searchParams.height);
  }
  if (searchParams.diameter) {
    query = query.eq("mount_diameter", searchParams.diameter);
  }
  if (searchParams.finish) {
    query = query.eq("finish", searchParams.finish);
  }
  if (searchParams.search) {
    query = query.ilike("sku", `%${searchParams.search}%`);
  }

  // Order by stock level (low stock first)
  query = query.order("quantity", { ascending: true });

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching inventory:", error);
    return [];
  }

  return (data || []) as ProductVariant[];
}

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const inventory = await getInventory(params);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-white uppercase tracking-wider">
            Inventory Management
          </h1>
          <p className="text-warm-gray mt-1">
            Manage stock levels for all product variants
          </p>
        </div>
        <div className="text-right">
          <p className="text-warm-gray text-sm">Total Variants</p>
          <p className="font-heading text-2xl font-bold text-white">
            {inventory.length}
          </p>
        </div>
      </div>

      <InventoryFilters currentFilters={params} />

      <Suspense
        fallback={
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        }
      >
        {inventory.length > 0 ? (
          <InventoryTable variants={inventory} />
        ) : (
          <div className="bg-charcoal rounded-xl border border-white/10 p-12 text-center">
            <Package className="h-16 w-16 text-warm-gray/30 mx-auto mb-4" />
            <h3 className="text-white font-medium text-lg mb-2">
              No variants found
            </h3>
            <p className="text-warm-gray">
              {Object.keys(params).length > 0
                ? "Try adjusting your filters"
                : "Run the database seed script to populate inventory"}
            </p>
          </div>
        )}
      </Suspense>
    </div>
  );
}
