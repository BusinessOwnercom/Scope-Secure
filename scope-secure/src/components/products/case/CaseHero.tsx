"use client";

import { motion } from "motion/react";
import { Shield, Briefcase } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function CaseHero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-charcoal">
      {/* Background gradient and pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-deep via-charcoal to-charcoal-light" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.04]">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                x="0"
                y="0"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <line x1="0" y1="0" x2="60" y2="0" stroke="#C9A227" strokeWidth="0.3" />
                <line x1="0" y1="0" x2="0" y2="60" stroke="#C9A227" strokeWidth="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        {/* Radial glow */}
        <div className="absolute left-1/4 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <Container className="relative z-10 py-32 md:py-40">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5">
                <Shield className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium text-accent">
                  Pelican-Grade Protection
                </span>
              </div>
            </motion.div>

            <motion.h1
              className="font-heading text-4xl font-bold uppercase leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Protect The
              <br />
              <span className="text-accent">Journey</span>
            </motion.h1>

            <motion.p
              className="mt-6 max-w-lg text-lg leading-relaxed text-warm-gray md:text-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Crushproof. Waterproof. Dustproof.{" "}
              <strong className="text-white">
                The last rifle case you&apos;ll ever need.
              </strong>
            </motion.p>

            <motion.p
              className="mt-6 font-heading text-2xl font-bold text-accent md:text-3xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              From $299.99
            </motion.p>
          </div>

          {/* Product visual placeholder */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative mx-auto aspect-[4/3] w-full max-w-lg">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-2xl bg-accent/10 blur-2xl" />
              {/* Product placeholder */}
              <div className="relative flex h-full w-full items-center justify-center rounded-2xl border border-accent/20 bg-charcoal-light/50">
                <div className="text-center">
                  <Briefcase
                    className="mx-auto h-24 w-24 text-accent/40"
                    strokeWidth={1}
                  />
                  <p className="mt-4 font-heading text-sm uppercase tracking-widest text-warm-gray-dark">
                    Product Image
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
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
