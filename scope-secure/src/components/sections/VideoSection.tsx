"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { VideoPlayer } from "@/components/ui/VideoPlayer";

export function VideoSection() {
  return (
    <section id="video" className="bg-charcoal py-20 md:py-28">
      <Container>
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl font-bold uppercase tracking-tight text-white md:text-4xl lg:text-5xl">
            See It <span className="text-accent">Survive</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-warm-gray">
            Watch ScopeSecure protect a $3,000 scope from a 12-foot drop — and
            maintain perfect zero.
          </p>
          <div className="mt-6 h-1 w-16 mx-auto rounded-full bg-accent" />
        </motion.div>

        <motion.div
          className="mx-auto mt-12 max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <VideoPlayer />
        </motion.div>

        <motion.p
          className="mx-auto mt-8 max-w-lg text-center text-sm text-warm-gray-dark"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Zero verified before and after impact. No other scope guard can make
          this claim.
        </motion.p>
      </Container>
    </section>
  );
}
