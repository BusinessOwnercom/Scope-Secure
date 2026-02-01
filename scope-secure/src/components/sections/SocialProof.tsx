"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StarRating } from "@/components/ui/StarRating";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { TESTIMONIALS, REVIEW_COUNT, REVIEW_RATING } from "@/lib/constants";

const categories = [
  { key: "all", label: "All" },
  { key: "hunter", label: "Hunters" },
  { key: "competition", label: "Competition" },
  { key: "military", label: "Military / LE" },
] as const;

type Category = (typeof categories)[number]["key"];

export function SocialProof() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filtered =
    activeCategory === "all"
      ? TESTIMONIALS
      : TESTIMONIALS.filter((t) => t.category === activeCategory);

  return (
    <section id="reviews" className="bg-warm-gray py-20 md:py-28">
      <Container>
        <SectionHeading
          title="Trusted by Serious Shooters"
          subtitle="Hear from hunters, competitors, and professionals who trust ScopeSecure."
        />

        {/* Aggregate rating */}
        <motion.div
          className="mb-12 flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-end gap-2">
            <span className="font-heading text-6xl font-bold text-charcoal">
              {REVIEW_RATING}
            </span>
            <span className="mb-2 text-lg text-charcoal/60">/ 5</span>
          </div>
          <StarRating rating={REVIEW_RATING} size="lg" />
          <p className="text-sm text-charcoal/60">
            Based on {REVIEW_COUNT}+ verified reviews
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                activeCategory === cat.key
                  ? "bg-accent text-charcoal shadow-sm"
                  : "bg-white text-charcoal/60 hover:bg-white/80"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Testimonials grid */}
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {filtered.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
