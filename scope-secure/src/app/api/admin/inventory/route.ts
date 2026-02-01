import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * PATCH /api/admin/inventory
 * Update the absolute quantity for a product variant
 */
export async function PATCH(request: Request) {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, quantity } = await request.json();

    if (!id || quantity === undefined || quantity < 0) {
      return NextResponse.json(
        { error: "Invalid request. Requires id and quantity (>= 0)" },
        { status: 400 }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from("product_variants")
      .update({ quantity })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating inventory:", error);
      return NextResponse.json(
        { error: "Failed to update inventory" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("Inventory PATCH error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/inventory
 * Adjust quantity by a delta (positive or negative)
 */
export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, change, reason } = await request.json();

    if (!id || change === undefined || change === 0) {
      return NextResponse.json(
        { error: "Invalid request. Requires id and non-zero change" },
        { status: 400 }
      );
    }

    // First get current quantity
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: current, error: fetchError } = await (supabase as any)
      .from("product_variants")
      .select("quantity")
      .eq("id", id)
      .single();

    if (fetchError || !current) {
      return NextResponse.json(
        { error: "Product variant not found" },
        { status: 404 }
      );
    }

    const newQuantity = Math.max(0, current.quantity + change);

    // Update quantity
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from("product_variants")
      .update({ quantity: newQuantity })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error adjusting inventory:", error);
      return NextResponse.json(
        { error: "Failed to adjust inventory" },
        { status: 500 }
      );
    }

    // Log the transaction (trigger will handle this, but we add reason if provided)
    if (reason) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase as any).from("inventory_transactions").insert({
        variant_id: id,
        quantity_change: change,
        reason,
        created_by: user.id,
      });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("Inventory POST error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
