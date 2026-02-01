import type { Metadata } from "next";

export const siteMetadata: Metadata = {
  metadataBase: new URL("https://scopesecure.com"),
  title: "ScopeSecure | 12-Foot Drop Protection for Rifle & Crossbow Scopes",
  description:
    "The only patented scope guard that protects your optics from falls up to 12 feet without losing zero. Made in the USA. Lifetime warranty. Protect your $3,000+ scope investment for $249.99.",
  keywords: [
    "scope guard",
    "scope protection",
    "rifle scope protector",
    "scope cover",
    "scope drop protection",
    "zero retention",
    "ScopeSecure",
    "rifle scope guard",
    "crossbow scope guard",
    "scope protector",
  ],
  authors: [{ name: "ScopeSecure" }],
  creator: "ScopeSecure",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://scopesecure.com",
    siteName: "ScopeSecure",
    title: "ScopeSecure | 12-Foot Drop Protection. Zero Lost.",
    description:
      "The only patented scope guard that protects your investment AND your zero. Made in the USA with a lifetime warranty.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ScopeSecure Scope Guard - 12-Foot Drop Protection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ScopeSecure | 12-Foot Drop Protection. Zero Lost.",
    description:
      "The only patented scope guard that protects your investment AND your zero.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const bulletSubscriptionMetadata: Metadata = {
  title: "Ammo Subscription | Premium Ammunition Delivered Monthly | ScopeSecure",
  description:
    "Never run low on ammo. Premium factory-new ammunition delivered to your door monthly or quarterly. Choose your caliber, select your tier, save up to 23%. Free shipping.",
  keywords: [
    "ammo subscription",
    "ammunition delivery",
    "bulk ammo",
    "ammo subscription box",
    "monthly ammo delivery",
    "ScopeSecure ammo",
  ],
  openGraph: {
    title: "Ammo Subscription | Never Run Low | ScopeSecure",
    description:
      "Premium ammunition delivered on your schedule. Choose caliber, quantity, and frequency. Save up to 23% vs retail.",
    url: "https://scopesecure.com/products/bullet-subscription",
    siteName: "ScopeSecure",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ScopeSecure Ammo Subscription",
      },
    ],
  },
};

export const heavyDutyCaseMetadata: Metadata = {
  title: "Heavy Duty Rifle Case | Waterproof, Crushproof | ScopeSecure",
  description:
    "Pelican-grade protection for your rifles. IP67 waterproof, crushproof, dustproof hard case with pick-and-pluck foam. TSA-approved. Lifetime warranty. Starting at $299.99.",
  keywords: [
    "rifle case",
    "hard rifle case",
    "waterproof gun case",
    "crushproof case",
    "TSA approved rifle case",
    "pelican style rifle case",
    "ScopeSecure case",
  ],
  openGraph: {
    title: "Heavy Duty Rifle Case | Pelican-Grade Protection | ScopeSecure",
    description:
      "IP67 waterproof, crushproof hard case. Pick-and-pluck foam. TSA-approved locks. Lifetime warranty.",
    url: "https://scopesecure.com/products/heavy-duty-case",
    siteName: "ScopeSecure",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ScopeSecure Heavy Duty Rifle Case",
      },
    ],
  },
};

export const cartMetadata: Metadata = {
  title: "Your Cart | ScopeSecure",
  description: "Review your ScopeSecure cart and proceed to checkout.",
  robots: { index: false, follow: false },
};

export const checkoutMetadata: Metadata = {
  title: "Checkout | ScopeSecure",
  description: "Complete your ScopeSecure purchase. Secure Stripe checkout.",
  robots: { index: false, follow: false },
};

export const checkoutSuccessMetadata: Metadata = {
  title: "Order Confirmed | ScopeSecure",
  description: "Your ScopeSecure order has been confirmed. Thank you for your purchase.",
  robots: { index: false, follow: false },
};
