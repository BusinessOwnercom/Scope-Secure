import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

interface StockData {
  quantity: number;
  low_stock_threshold: number;
}

/**
 * GET /api/inventory/check
 * Check stock availability for a specific configuration
 * 
 * Query params:
 * - guardLength: string (e.g., "9", "11", "13", etc.)
 * - scopeHeight: string (e.g., "1.5", "1.75", "2")
 * - mountDiameter: string (e.g., "1in", "30mm", "34mm", "40mm")
 * - finish: string (optional, defaults to "matte-black")
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    const guardLength = searchParams.get("guardLength");
    const scopeHeight = searchParams.get("scopeHeight");
    const mountDiameter = searchParams.get("mountDiameter");
    const finish = searchParams.get("finish") || "matte-black";

    if (!guardLength || !scopeHeight || !mountDiameter) {
      return NextResponse.json(
        { error: "Missing required parameters: guardLength, scopeHeight, mountDiameter" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from("product_variants")
      .select("quantity, low_stock_threshold")
      .eq("guard_length", guardLength)
      .eq("scope_height", scopeHeight)
      .eq("mount_diameter", mountDiameter)
      .eq("finish", finish)
      .single();

    if (error || !data) {
      // If no variant found, assume configuration is available but needs ordering
      return NextResponse.json({
        inStock: false,
        quantity: 0,
        status: "unavailable",
        message: "This configuration is not currently in stock",
      });
    }

    const stockData = data as StockData;
    const isLowStock = stockData.quantity > 0 && stockData.quantity <= stockData.low_stock_threshold;
    const isOutOfStock = stockData.quantity === 0;

    let status: "in-stock" | "low-stock" | "out-of-stock";
    if (isOutOfStock) {
      status = "out-of-stock";
    } else if (isLowStock) {
      status = "low-stock";
    } else {
      status = "in-stock";
    }

    return NextResponse.json({
      inStock: stockData.quantity > 0,
      quantity: stockData.quantity,
      status,
      lowStockThreshold: stockData.low_stock_threshold,
    });
  } catch (err) {
    console.error("Stock check error:", err);
    return NextResponse.json(
      { error: "Failed to check stock" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/inventory/check
 * Batch check stock for multiple configurations
 */
export async function POST(request: Request) {
  try {
    const { configurations } = await request.json();

    if (!Array.isArray(configurations)) {
      return NextResponse.json(
        { error: "configurations must be an array" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const results: Record<string, { inStock: boolean; quantity: number; status: string }> = {};

    for (const config of configurations) {
      const { guardLength, scopeHeight, mountDiameter, finish = "matte-black" } = config;
      
      const key = `${guardLength}-${scopeHeight}-${mountDiameter}-${finish}`;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data } = await (supabase as any)
        .from("product_variants")
        .select("quantity, low_stock_threshold")
        .eq("guard_length", guardLength)
        .eq("scope_height", scopeHeight)
        .eq("mount_diameter", mountDiameter)
        .eq("finish", finish)
        .single();

      if (!data) {
        results[key] = { inStock: false, quantity: 0, status: "unavailable" };
      } else {
        const stockData = data as StockData;
        const isLowStock = stockData.quantity > 0 && stockData.quantity <= stockData.low_stock_threshold;
        const isOutOfStock = stockData.quantity === 0;

        results[key] = {
          inStock: stockData.quantity > 0,
          quantity: stockData.quantity,
          status: isOutOfStock ? "out-of-stock" : isLowStock ? "low-stock" : "in-stock",
        };
      }
    }

    return NextResponse.json({ results });
  } catch (err) {
    console.error("Batch stock check error:", err);
    return NextResponse.json(
      { error: "Failed to check stock" },
      { status: 500 }
    );
  }
}
