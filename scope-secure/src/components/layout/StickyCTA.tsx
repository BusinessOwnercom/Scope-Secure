"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/Button";
import { PRODUCT_PRICE } from "@/lib/constants";

export function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    const el = document.getElementById("configurator");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 border-t border-accent/20 bg-charcoal/95 backdrop-blur-md p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.3)] md:hidden"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate font-heading text-sm font-bold uppercase text-white">
                ScopeSecure
              </p>
              <p className="text-xs text-accent">
                ${PRODUCT_PRICE}
              </p>
            </div>
            <Button onClick={handleClick} size="sm" className="shrink-0">
              Find Your Fit
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
