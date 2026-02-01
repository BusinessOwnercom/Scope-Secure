"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Logo } from "@/components/icons/Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { NAV_LINKS, PRODUCTS } from "@/lib/constants";
import { useCart } from "@/components/cart/CartProvider";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { addItem, openDrawer, itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-charcoal/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container>
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <a href="#" aria-label="ScopeSecure Home">
            <Logo />
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-heading text-sm uppercase tracking-widest text-warm-gray transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            ))}
            <Button onClick={() => addItem(PRODUCTS['scope-guard'])} size="sm">
              Order Now &mdash; $249.99
            </Button>
            <button
              onClick={openDrawer}
              className="relative text-warm-gray transition-colors hover:text-accent"
              aria-label="Open cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-charcoal">
                  {itemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="text-white md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>
      </Container>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-charcoal/98 backdrop-blur-md md:hidden"
        >
          <Container>
            <div className="flex flex-col gap-4 pb-6 pt-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-heading text-lg uppercase tracking-widest text-warm-gray transition-colors hover:text-accent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button onClick={() => addItem(PRODUCTS['scope-guard'])} size="md" className="mt-2 w-full">
                Order Now &mdash; $249.99
              </Button>
            </div>
          </Container>
        </motion.div>
      )}
    </motion.header>
  );
}
