"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CaseHero } from "@/components/products/case/CaseHero";
import { CaseFeatures } from "@/components/products/case/CaseFeatures";
import { CaseSpecs } from "@/components/products/case/CaseSpecs";
import { SizeSelector } from "@/components/products/case/SizeSelector";
import { CaseCTA } from "@/components/products/case/CaseCTA";
import { CaseFAQ } from "@/components/products/case/CaseFAQ";
import { CASE_SIZES } from "@/lib/constants";

export default function HeavyDutyCasePage() {
  const [selectedSize, setSelectedSize] = useState(CASE_SIZES[1]);

  return (
    <>
      <Header />
      <main>
        <CaseHero />
        <CaseFeatures />
        <CaseSpecs />
        <SizeSelector selectedSize={selectedSize} onSelect={setSelectedSize} />
        <CaseCTA selectedSize={selectedSize} />
        <CaseFAQ />
      </main>
      <Footer />
    </>
  );
}
