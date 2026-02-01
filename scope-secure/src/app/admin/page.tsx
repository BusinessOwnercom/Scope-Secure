import { createClient } from "@/lib/supabase/server";
import { Package, AlertTriangle, TrendingUp, Boxes } from "lucide-react";
import Link from "next/link";

interface VariantData {
  quantity: number;
  low_stock_threshold: number;
}

interface TransactionWithVariant {
  id: string;
  variant_id: string;
  quantity_change: number;
  reason: string | null;
  created_by: string | null;
  created_at: string;
  product_variants: {
    sku: string;
    guard_length: string;
    scope_height: string;
    mount_diameter: string;
  } | null;
}

async function getInventoryStats() {
  const supabase = await createClient();

  // Get all variants
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any)
    .from("product_variants")
    .select("quantity, low_stock_threshold");

  if (error || !data) {
    return {
      totalSkus: 0,
      totalStock: 0,
      lowStockCount: 0,
      outOfStockCount: 0,
    };
  }

  const variants = data as VariantData[];
  const totalStock = variants.reduce((sum, v) => sum + v.quantity, 0);
  const lowStockCount = variants.filter(
    (v) => v.quantity > 0 && v.quantity <= v.low_stock_threshold
  ).length;
  const outOfStockCount = variants.filter((v) => v.quantity === 0).length;

  return {
    totalSkus: variants.length,
    totalStock,
    lowStockCount,
    outOfStockCount,
  };
}

async function getRecentTransactions(): Promise<TransactionWithVariant[]> {
  const supabase = await createClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await (supabase as any)
    .from("inventory_transactions")
    .select(
      `
      *,
      product_variants (
        sku,
        guard_length,
        scope_height,
        mount_diameter
      )
    `
    )
    .order("created_at", { ascending: false })
    .limit(10);

  return (data || []) as TransactionWithVariant[];
}

export default async function AdminDashboard() {
  const stats = await getInventoryStats();
  const recentTransactions = await getRecentTransactions();

  const statCards = [
    {
      label: "Total SKUs",
      value: stats.totalSkus,
      icon: Boxes,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
    {
      label: "Total Units in Stock",
      value: stats.totalStock.toLocaleString(),
      icon: Package,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
    },
    {
      label: "Low Stock Items",
      value: stats.lowStockCount,
      icon: TrendingUp,
      color: "text-amber-400",
      bgColor: "bg-amber-400/10",
      alert: stats.lowStockCount > 0,
    },
    {
      label: "Out of Stock",
      value: stats.outOfStockCount,
      icon: AlertTriangle,
      color: "text-red-400",
      bgColor: "bg-red-400/10",
      alert: stats.outOfStockCount > 0,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-white uppercase tracking-wider">
          Dashboard
        </h1>
        <p className="text-warm-gray mt-1">
          Overview of your inventory status
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-charcoal rounded-xl border border-white/10 p-6"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-warm-gray text-sm">{stat.label}</p>
                  <p
                    className={`font-heading text-2xl font-bold ${
                      stat.alert ? stat.color : "text-white"
                    }`}
                  >
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-charcoal rounded-xl border border-white/10 p-6">
          <h2 className="font-heading text-lg font-semibold text-white uppercase tracking-wider mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Link
              href="/admin/inventory"
              className="flex items-center justify-between p-4 rounded-lg bg-charcoal-dark hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-accent" />
                <span className="text-white font-medium">Manage Inventory</span>
              </div>
              <span className="text-warm-gray group-hover:text-white transition-colors">
                →
              </span>
            </Link>

            {stats.lowStockCount > 0 && (
              <Link
                href="/admin/inventory?filter=low-stock"
                className="flex items-center justify-between p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <span className="text-amber-100 font-medium">
                    View {stats.lowStockCount} Low Stock Items
                  </span>
                </div>
                <span className="text-amber-300 group-hover:text-white transition-colors">
                  →
                </span>
              </Link>
            )}

            {stats.outOfStockCount > 0 && (
              <Link
                href="/admin/inventory?filter=out-of-stock"
                className="flex items-center justify-between p-4 rounded-lg bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <span className="text-red-100 font-medium">
                    View {stats.outOfStockCount} Out of Stock Items
                  </span>
                </div>
                <span className="text-red-300 group-hover:text-white transition-colors">
                  →
                </span>
              </Link>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-charcoal rounded-xl border border-white/10 p-6">
          <h2 className="font-heading text-lg font-semibold text-white uppercase tracking-wider mb-4">
            Recent Activity
          </h2>
          {recentTransactions.length > 0 ? (
            <div className="space-y-3">
              {recentTransactions.slice(0, 5).map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-charcoal-dark"
                >
                  <div>
                    <p className="text-white text-sm font-medium">
                      {tx.product_variants?.sku || "Unknown SKU"}
                    </p>
                    <p className="text-warm-gray text-xs">
                      {tx.reason || "Stock adjustment"}
                    </p>
                  </div>
                  <span
                    className={`font-mono text-sm font-medium ${
                      tx.quantity_change > 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {tx.quantity_change > 0 ? "+" : ""}
                    {tx.quantity_change}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-warm-gray/30 mx-auto mb-3" />
              <p className="text-warm-gray">No recent activity</p>
              <p className="text-warm-gray/60 text-sm mt-1">
                Stock changes will appear here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
