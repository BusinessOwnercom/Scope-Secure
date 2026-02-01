"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Settings, Check, AlertCircle, ShoppingCart, Ruler, MoveVertical, Circle, Package, Loader2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ScopeSearch } from "@/components/ui/ScopeSearch";
import {
  PRODUCT_PRICE,
  PRODUCTS,
  GUARD_LENGTH_OPTIONS,
  SCOPE_HEIGHT_OPTIONS,
  MOUNT_DIAMETER_OPTIONS,
} from "@/lib/constants";
import { getScopeSecureConfig, validateConfig, getConfigSummary } from "@/lib/scope-mapping";
import { SCOPE_DATABASE } from "@/lib/scopes";
import { useCart } from "@/components/cart/CartProvider";
import type { ScopeSpec, GuardLength, ScopeHeight, MountDiameter, ScopeSecureConfig } from "@/types";
import { cn } from "@/lib/utils";

interface StockStatus {
  inStock: boolean;
  quantity: number;
  status: "in-stock" | "low-stock" | "out-of-stock" | "unavailable" | "loading";
}

export function ScopeConfigurator() {
  const { addItem } = useCart();
  const [selectedScope, setSelectedScope] = useState<ScopeSpec | null>(null);
  const [config, setConfig] = useState<ScopeSecureConfig>({
    guardLength: "9",
    scopeHeight: "1.5",
    mountDiameter: "1in",
  });
  const [isAutoFilled, setIsAutoFilled] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [stockStatus, setStockStatus] = useState<StockStatus>({
    inStock: true,
    quantity: 0,
    status: "loading",
  });

  // Check stock availability when config changes
  const checkStock = useCallback(async () => {
    setStockStatus((prev) => ({ ...prev, status: "loading" }));
    
    try {
      const params = new URLSearchParams({
        guardLength: config.guardLength,
        scopeHeight: config.scopeHeight,
        mountDiameter: config.mountDiameter,
      });
      
      const response = await fetch(`/api/inventory/check?${params}`);
      const data = await response.json();
      
      setStockStatus({
        inStock: data.inStock ?? true,
        quantity: data.quantity ?? 0,
        status: data.status ?? "in-stock",
      });
    } catch {
      // Default to in-stock if API fails (don't block sales)
      setStockStatus({
        inStock: true,
        quantity: 0,
        status: "in-stock",
      });
    }
  }, [config.guardLength, config.scopeHeight, config.mountDiameter]);

  // Check stock when config changes
  useEffect(() => {
    checkStock();
  }, [checkStock]);

  // When a scope is selected, auto-fill the configuration
  useEffect(() => {
    if (selectedScope) {
      const autoConfig = getScopeSecureConfig(selectedScope);
      setConfig(autoConfig);
      setIsAutoFilled(true);
    }
  }, [selectedScope]);

  const handleClearScope = () => {
    setSelectedScope(null);
    setIsAutoFilled(false);
  };

  const handleConfigChange = <K extends keyof ScopeSecureConfig>(
    key: K,
    value: ScopeSecureConfig[K]
  ) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
    setIsAutoFilled(false);
  };

  const validation = validateConfig(config);
  const summary = getConfigSummary(config);

  return (
    <section id="configurator" className="bg-charcoal-dark py-20 md:py-28">
      <Container>
        <SectionHeading
          title="Find Your Perfect Fit"
          subtitle="Search for your scope and we'll automatically recommend the right ScopeSecure configuration."
          light
        />

        <motion.div
          className="mx-auto max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="rounded-xl border border-white/10 bg-charcoal p-6 md:p-10">
            {/* Step 1: Scope Search */}
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-charcoal font-bold">
                  1
                </div>
                <h3 className="font-heading text-lg font-semibold uppercase tracking-wider text-white">
                  Find Your Scope
                </h3>
              </div>
              <ScopeSearch
                onSelect={setSelectedScope}
                onClear={handleClearScope}
                selectedScope={selectedScope}
              />
              <p className="mt-2 text-sm text-warm-gray/70">
                Search our database of {SCOPE_DATABASE.length}+ popular scopes or manually select specifications below.
              </p>
            </div>

            {/* Auto-fill notification */}
            <AnimatePresence>
              {isAutoFilled && selectedScope && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 overflow-hidden"
                >
                  <div className="flex items-center gap-3 rounded-lg bg-accent/10 border border-accent/30 px-4 py-3">
                    <Check className="h-5 w-5 text-accent flex-shrink-0" />
                    <p className="text-sm text-white">
                      <span className="font-semibold">Auto-configured!</span> Based on your{" "}
                      <span className="text-accent">{selectedScope.fullName}</span>, we recommend:{" "}
                      <span className="font-medium">{summary}</span>
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 2: Configuration Options */}
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-charcoal font-bold">
                  2
                </div>
                <h3 className="font-heading text-lg font-semibold uppercase tracking-wider text-white">
                  {isAutoFilled ? "Verify Configuration" : "Select Configuration"}
                </h3>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {/* Guard Length */}
                <div>
                  <label className="mb-3 flex items-center gap-2 text-sm font-medium text-warm-gray">
                    <Ruler className="h-4 w-4" />
                    Guard Length
                  </label>
                  <div className="space-y-2">
                    {GUARD_LENGTH_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleConfigChange("guardLength", option.value)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-lg px-4 py-3 text-left transition-all",
                          config.guardLength === option.value
                            ? "bg-accent text-charcoal shadow-lg shadow-accent/20"
                            : "bg-white/5 text-warm-gray hover:bg-white/10"
                        )}
                      >
                        <span className="font-medium">{option.label}</span>
                        {config.guardLength === option.value && (
                          <Check className="h-4 w-4" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scope Height */}
                <div>
                  <label className="mb-3 flex items-center gap-2 text-sm font-medium text-warm-gray">
                    <MoveVertical className="h-4 w-4" />
                    Scope Height
                  </label>
                  <div className="space-y-2">
                    {SCOPE_HEIGHT_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleConfigChange("scopeHeight", option.value)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-lg px-4 py-3 text-left transition-all",
                          config.scopeHeight === option.value
                            ? "bg-accent text-charcoal shadow-lg shadow-accent/20"
                            : "bg-white/5 text-warm-gray hover:bg-white/10"
                        )}
                      >
                        <div>
                          <span className="font-medium">{option.label}</span>
                          <p className={cn(
                            "text-xs mt-0.5",
                            config.scopeHeight === option.value
                              ? "text-charcoal/70"
                              : "text-warm-gray/60"
                          )}>
                            {option.description}
                          </p>
                        </div>
                        {config.scopeHeight === option.value && (
                          <Check className="h-4 w-4 flex-shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mount Diameter */}
                <div>
                  <label className="mb-3 flex items-center gap-2 text-sm font-medium text-warm-gray">
                    <Circle className="h-4 w-4" />
                    Tube Diameter
                  </label>
                  <div className="space-y-2">
                    {MOUNT_DIAMETER_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleConfigChange("mountDiameter", option.value)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-lg px-4 py-3 text-left transition-all",
                          config.mountDiameter === option.value
                            ? "bg-accent text-charcoal shadow-lg shadow-accent/20"
                            : "bg-white/5 text-warm-gray hover:bg-white/10"
                        )}
                      >
                        <span className="font-medium">{option.label}</span>
                        {config.mountDiameter === option.value && (
                          <Check className="h-4 w-4" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Warnings */}
            <AnimatePresence>
              {validation.warnings.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 overflow-hidden"
                >
                  <div className="space-y-2">
                    {validation.warnings.map((warning, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 rounded-lg bg-amber-500/10 border border-amber-500/30 px-4 py-3"
                      >
                        <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-amber-100">{warning}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Summary & CTA */}
            <div className="rounded-lg bg-charcoal-light p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-sm text-warm-gray mb-1">Your Configuration</p>
                  <p className="text-lg font-semibold text-white">{summary}</p>
                  {selectedScope && (
                    <p className="text-sm text-warm-gray mt-1">
                      For: {selectedScope.fullName}
                    </p>
                  )}
                  {/* Stock Status Badge */}
                  <div className="mt-2">
                    {stockStatus.status === "loading" ? (
                      <span className="inline-flex items-center gap-1.5 text-xs text-warm-gray">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        Checking availability...
                      </span>
                    ) : stockStatus.status === "in-stock" ? (
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400">
                        <Package className="h-3 w-3" />
                        In Stock
                      </span>
                    ) : stockStatus.status === "low-stock" ? (
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400">
                        <AlertCircle className="h-3 w-3" />
                        Low Stock - Only {stockStatus.quantity} left
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400">
                        <AlertCircle className="h-3 w-3" />
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-center md:items-end gap-2">
                  <p className="text-sm text-warm-gray">Total Price</p>
                  <p className="font-heading text-3xl font-bold text-accent">
                    ${PRODUCT_PRICE}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                {!validation.requiresCustomOrder && stockStatus.inStock && (
                  <Button
                    onClick={() => {
                      const configId = `scope-guard-${config.guardLength}-${config.scopeHeight}-${config.mountDiameter}`;
                      const product = { ...PRODUCTS['scope-guard'], id: configId, config };
                      addItem(product);
                      setAddedToCart(true);
                      setTimeout(() => setAddedToCart(false), 1500);
                    }}
                    size="lg"
                    className="flex-1"
                    disabled={stockStatus.status === "loading"}
                  >
                    {addedToCart ? (
                      <>
                        <Check className="h-5 w-5" />
                        Added to Cart!
                      </>
                    ) : stockStatus.status === "loading" ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Checking...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-5 w-5" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                )}
                {!stockStatus.inStock && stockStatus.status !== "loading" && (
                  <Button
                    href="mailto:support@scopesecure.com?subject=Stock%20Notification%20Request"
                    variant="secondary"
                    size="lg"
                    className="flex-1"
                  >
                    Notify When Available
                  </Button>
                )}
                {validation.requiresCustomOrder && (
                  <Button
                    href="mailto:support@scopesecure.com?subject=Custom%20Order%20Request"
                    variant="secondary"
                    size="lg"
                    className="flex-1"
                  >
                    Request Custom Order
                  </Button>
                )}
              </div>
            </div>

            {/* Help Text */}
            <p className="mt-6 text-center text-sm text-warm-gray/70">
              Not sure about your measurements?{" "}
              <a href="#faq" className="text-accent hover:underline">
                Check our FAQ
              </a>{" "}
              or{" "}
              <a href="mailto:support@scopesecure.com" className="text-accent hover:underline">
                contact us
              </a>{" "}
              for help.
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
