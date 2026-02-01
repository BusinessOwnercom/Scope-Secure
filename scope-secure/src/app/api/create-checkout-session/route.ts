import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover",
});

export async function POST(request: Request) {
  try {
    const { caliber, tier, interval, email } = await request.json();

    // Create a Stripe Checkout Session for subscription
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: email || undefined,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Ammo Subscription — ${tier.name}`,
              description: `${tier.roundsPerShipment} rounds of ${caliber.name}, delivered ${interval}`,
            },
            unit_amount: Math.round(
              (interval === "monthly"
                ? tier.monthlyPrice
                : tier.quarterlyPrice) * 100
            ),
            recurring: {
              interval: interval === "monthly" ? "month" : "month",
              interval_count: interval === "monthly" ? 1 : 3,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${request.headers.get("origin")}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get("origin")}/products/bullet-subscription`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout session error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
