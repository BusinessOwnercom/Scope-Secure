"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, ChevronDown } from "lucide-react";
import type { ScopeSpec } from "@/types";
import { searchScopes, getScopeBrands, getScopesByBrand } from "@/lib/scopes";

interface ScopeSearchProps {
  onSelect: (scope: ScopeSpec) => void;
  onClear?: () => void;
  selectedScope?: ScopeSpec | null;
  className?: string;
  placeholder?: string;
}

export function ScopeSearch({
  onSelect,
  onClear,
  selectedScope,
  className,
  placeholder = "Search for your scope (e.g., Vortex Viper PST)",
}: ScopeSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<ScopeSpec[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [showBrands, setShowBrands] = useState(false);
  const [showAllBrands, setShowAllBrands] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const brands = getScopeBrands();

  // Search when query changes
  useEffect(() => {
    if (query.length >= 2) {
      const searchResults = searchScopes(query);
      setResults(searchResults);
      setShowBrands(false);
      setHighlightedIndex(0);
    } else if (query.length === 0 && isOpen) {
      setResults([]);
      setShowBrands(true);
    } else {
      setResults([]);
      setShowBrands(false);
    }
  }, [query, isOpen]);

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll highlighted item into view
  useEffect(() => {
    if (listRef.current && results.length > 0) {
      const highlightedEl = listRef.current.querySelector(`[data-index="${highlightedIndex}"]`);
      highlightedEl?.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex, results.length]);

  const handleSelect = useCallback(
    (scope: ScopeSpec) => {
      onSelect(scope);
      setQuery("");
      setIsOpen(false);
      setResults([]);
    },
    [onSelect]
  );

  const handleBrandClick = useCallback((brand: string) => {
    const brandScopes = getScopesByBrand(brand);
    setResults(brandScopes);
    setShowBrands(false);
    setQuery(brand + " ");
    inputRef.current?.focus();
  }, []);

  const handleClear = useCallback(() => {
    setQuery("");
    setResults([]);
    onClear?.();
    inputRef.current?.focus();
  }, [onClear]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen) {
        if (e.key === "ArrowDown" || e.key === "Enter") {
          setIsOpen(true);
        }
        return;
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
          break;
        case "Enter":
          e.preventDefault();
          if (results[highlightedIndex]) {
            handleSelect(results[highlightedIndex]);
          }
          break;
        case "Escape":
          setIsOpen(false);
          break;
      }
    },
    [isOpen, results, highlightedIndex, handleSelect]
  );

  // If a scope is selected, show it instead of the search input
  if (selectedScope) {
    return (
      <div className={cn("relative", className)}>
        <div className="flex items-center gap-3 rounded-sm border-2 border-accent/30 bg-charcoal-light px-4 py-3">
          <Search className="h-5 w-5 text-accent" />
          <div className="flex-1">
            <p className="font-semibold text-white">{selectedScope.fullName}</p>
            <p className="text-sm text-warm-gray">
              {selectedScope.tubeDiameter} tube | {selectedScope.overallLength}" length | {selectedScope.objectiveDiameter}mm objective
            </p>
          </div>
          <button
            onClick={handleClear}
            className="rounded-full p-1 text-warm-gray hover:bg-charcoal hover:text-white transition-colors"
            aria-label="Clear selection"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-warm-gray" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            "w-full rounded-sm border-2 border-charcoal-light bg-charcoal-light py-3 pl-12 pr-12 text-white placeholder:text-warm-gray/60",
            "focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50",
            "transition-colors duration-200"
          )}
          aria-label="Search for your scope"
          aria-expanded={isOpen}
          aria-controls="scope-search-results"
          aria-autocomplete="list"
          role="combobox"
        />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-warm-gray hover:text-white transition-colors"
          aria-label="Toggle dropdown"
        >
          <ChevronDown className={cn("h-5 w-5 transition-transform", isOpen && "rotate-180")} />
        </button>
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            id="scope-search-results"
            className="absolute z-50 mt-2 w-full rounded-sm border border-charcoal-light bg-charcoal shadow-xl"
          >
            {/* Brand Quick Select */}
            {showBrands && (
              <div className="border-b border-charcoal-light p-3">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-warm-gray">
                  Browse by Brand
                </p>
                <div className="flex flex-wrap gap-2">
                  {(showAllBrands ? brands : brands.slice(0, 12)).map((brand) => (
                    <button
                      key={brand}
                      onClick={() => handleBrandClick(brand)}
                      className="rounded-sm bg-charcoal-light px-3 py-1.5 text-sm text-warm-gray hover:bg-accent hover:text-charcoal transition-colors"
                    >
                      {brand}
                    </button>
                  ))}
                </div>
                {brands.length > 12 && (
                  <button
                    onClick={() => setShowAllBrands(!showAllBrands)}
                    className="mt-2 text-xs text-accent hover:underline"
                  >
                    {showAllBrands ? "Show Less" : `Show All ${brands.length} Brands`}
                  </button>
                )}
              </div>
            )}

            {/* Search Results */}
            {results.length > 0 && (
              <div ref={listRef} className="max-h-80 overflow-y-auto" role="listbox">
                {results.map((scope, index) => (
                  <button
                    key={scope.id}
                    data-index={index}
                    onClick={() => handleSelect(scope)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={cn(
                      "flex w-full items-start gap-3 px-4 py-3 text-left transition-colors",
                      index === highlightedIndex
                        ? "bg-accent/10 text-white"
                        : "text-warm-gray hover:bg-charcoal-light"
                    )}
                    role="option"
                    aria-selected={index === highlightedIndex}
                  >
                    <div className="flex-1">
                      <p className="font-medium text-white">{scope.fullName}</p>
                      <p className="mt-0.5 text-sm text-warm-gray">
                        {scope.tubeDiameter} tube | {scope.overallLength}" | {scope.objectiveDiameter}mm obj
                        {scope.msrp && ` | ~$${scope.msrp.toLocaleString()}`}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* No Results */}
            {query.length >= 2 && results.length === 0 && (
              <div className="p-4 text-center">
                <p className="text-warm-gray">No scopes found for "{query}"</p>
                <p className="mt-2 text-sm text-warm-gray/70">
                  Don't see your scope? You can manually select your specifications below.
                </p>
              </div>
            )}

            {/* Help Text */}
            {query.length < 2 && !showBrands && (
              <div className="p-4 text-center text-warm-gray">
                <p>Type at least 2 characters to search</p>
                <p className="mt-1 text-sm text-warm-gray/70">
                  Or click to browse by brand
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
