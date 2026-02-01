"use client";

import { motion } from "motion/react";
import { Crosshair } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function SubscriptionHero() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-charcoal">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-deep via-charcoal to-charcoal-light" />
        {/* Subtle bullet/crosshair pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="bullet-pattern"
                x="0"
                y="0"
                width="120"
                height="120"
                patternUnits="userSpaceOnUse"
              >
                {/* Crosshair */}
                <circle cx="60" cy="60" r="18" fill="none" stroke="#C9A227" strokeWidth="0.5" />
                <circle cx="60" cy="60" r="6" fill="none" stroke="#C9A227" strokeWidth="0.3" />
                <line x1="60" y1="35" x2="60" y2="85" stroke="#C9A227" strokeWidth="0.3" />
                <line x1="35" y1="60" x2="85" y2="60" stroke="#C9A227" strokeWidth="0.3" />
                {/* Bullet silhouette */}
                <ellipse cx="60" cy="15" rx="3" ry="6" fill="none" stroke="#C9A227" strokeWidth="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#bullet-pattern)" />
          </svg>
        </div>
        {/* Radial glow */}
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <Container className="relative z-10 py-32 md:py-40">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5">
              <Crosshair className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">
                Subscription
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-heading text-5xl font-bold uppercase leading-[1.1] tracking-tight text-white md:text-7xl lg:text-8xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Never Run{" "}
            <span className="text-accent">Low</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-warm-gray md:text-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Premium ammunition delivered to your door. Choose your caliber, set
            your schedule, and focus on what matters&nbsp;&mdash;&nbsp;shooting.
          </motion.p>
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-warm-gray-dark">
            Scroll
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-accent to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
