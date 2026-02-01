"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  className?: string;
}

export function VideoPlayer({ className }: VideoPlayerProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={cn(
          "group relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg bg-charcoal-light",
          className
        )}
        aria-label="Play video"
      >
        {/* Placeholder background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal-light to-charcoal" />

        {/* Crosshair pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-accent" />
          <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-accent" />
          <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent" />
        </div>

        {/* Play button */}
        <motion.div
          className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-accent shadow-lg shadow-accent/30"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Play className="h-8 w-8 text-charcoal ml-1" fill="currentColor" />
        </motion.div>

        {/* Caption overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
          <p className="font-heading text-lg text-white uppercase tracking-wider">
            Watch ScopeSecure Survive a 12-Foot Drop
          </p>
        </div>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl rounded-lg bg-charcoal p-8 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute right-4 top-4 text-warm-gray hover:text-white"
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </button>
              <Play className="mx-auto mb-4 h-16 w-16 text-accent" />
              <h3 className="font-heading text-2xl font-bold uppercase text-white">
                Video Coming Soon
              </h3>
              <p className="mt-3 text-warm-gray">
                Our drop test demonstration video is currently in production.
                Sign up below to be notified when it launches.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
