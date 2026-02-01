import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyCTA } from "@/components/layout/StickyCTA";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustBar } from "@/components/sections/TrustBar";
import { ScopeConfigurator } from "@/components/sections/ScopeConfigurator";
import { ValueDemonstration } from "@/components/sections/ValueDemonstration";
import { PriceCalculator } from "@/components/sections/PriceCalculator";
import { SocialProof } from "@/components/sections/SocialProof";
import { VideoSection } from "@/components/sections/VideoSection";
import { WarrantySection } from "@/components/sections/WarrantySection";
import { TrustBadges } from "@/components/sections/TrustBadges";
import { ProductFinishes } from "@/components/sections/ProductFinishes";
import { FAQSection } from "@/components/sections/FAQSection";
import { EmailCapture } from "@/components/sections/EmailCapture";
import {
  PRODUCT_PRICE,
  REVIEW_COUNT,
  REVIEW_RATING,
  FAQ_ITEMS,
} from "@/lib/constants";

function JsonLd() {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "ScopeSecure Guard",
    description:
      "The only patented scope guard that protects your optics from falls up to 12 feet without losing zero. Made in the USA.",
    image: "https://scopesecure.com/images/og-image.jpg",
    brand: { "@type": "Brand", name: "ScopeSecure" },
    offers: {
      "@type": "Offer",
      url: "https://scopesecure.com",
      priceCurrency: "USD",
      price: PRODUCT_PRICE,
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "ScopeSecure" },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: REVIEW_RATING,
      reviewCount: REVIEW_COUNT,
      bestRating: 5,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ScopeSecure",
    url: "https://scopesecure.com",
    logo: "https://scopesecure.com/images/logo.png",
    sameAs: [
      "https://www.facebook.com/ScopeSecure/",
      "https://www.instagram.com/scope_secure/",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "support@scopesecure.com",
      contactType: "customer service",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
    </>
  );
}

export default function Home() {
  return (
    <>
      <JsonLd />
      <Header />
      <main>
        <HeroSection />
        <TrustBar />
        <ScopeConfigurator />
        <ValueDemonstration />
        <PriceCalculator />
        <SocialProof />
        <VideoSection />
        <WarrantySection />
        <TrustBadges />
        <ProductFinishes />
        <FAQSection />
        <EmailCapture />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
