import { NextResponse } from "next/server";
import Stripe from "stripe";
import { PRODUCTS } from "@/lib/constants";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover",
});

interface CartItemPayload {
  productId: string;
  quantity: number;
}

export async function POST(request: Request) {
  try {
    const { items, shipping } = await request.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty" },
        { status: 400 }
      );
    }

    // Server-side price calculation — never trust client totals
    let totalInCents = 0;
    const lineItems: string[] = [];

    for (const item of items as CartItemPayload[]) {
      const product = PRODUCTS[item.productId];
      if (!product) {
        return NextResponse.json(
          { error: `Unknown product: ${item.productId}` },
          { status: 400 }
        );
      }
      // Skip subscription items — those go through Checkout Sessions
      if (product.type === "subscription") continue;

      const itemTotal = Math.round(product.price * 100) * item.quantity;
      totalInCents += itemTotal;
      lineItems.push(`${product.name} x${item.quantity}`);
    }

    if (totalInCents === 0) {
      return NextResponse.json(
        { error: "No one-time items in cart" },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalInCents,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        items: lineItems.join(", "),
        email: shipping?.email || "",
        name: shipping ? `${shipping.firstName} ${shipping.lastName}` : "",
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error("PaymentIntent error:", err);
    return NextResponse.json(
      { error: "Failed to create payment intent" },
      { status: 500 }
    );
  }
}
