"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { useState, useTransition } from "react";
import { cn } from "@/lib/utils";

interface InventoryFiltersProps {
  currentFilters: {
    filter?: string;
    length?: string;
    height?: string;
    diameter?: string;
    finish?: string;
    search?: string;
  };
}

const stockFilters = [
  { value: "", label: "All Stock" },
  { value: "in-stock", label: "In Stock" },
  { value: "low-stock", label: "Low Stock" },
  { value: "out-of-stock", label: "Out of Stock" },
];

const lengthOptions = [
  { value: "", label: "All Lengths" },
  { value: "9", label: '9"' },
  { value: "11", label: '11"' },
  { value: "13", label: '13"' },
  { value: "14", label: '14"' },
  { value: "15", label: '15"' },
  { value: "17", label: '17"' },
];

const heightOptions = [
  { value: "", label: "All Heights" },
  { value: "1.5", label: '1 1/2"' },
  { value: "1.75", label: '1 3/4"' },
  { value: "2", label: '2"' },
];

const diameterOptions = [
  { value: "", label: "All Diameters" },
  { value: "1in", label: '1"' },
  { value: "30mm", label: "30mm" },
  { value: "34mm", label: "34mm" },
  { value: "40mm", label: "40mm" },
];

const finishOptions = [
  { value: "", label: "All Finishes" },
  { value: "matte-black", label: "Matte Black" },
  { value: "bare-zinc", label: "Bare Zinc" },
  { value: "camo", label: "Camo" },
];

export function InventoryFilters({ currentFilters }: InventoryFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState(currentFilters.search || "");

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    startTransition(() => {
      router.push(`/admin/inventory?${params.toString()}`);
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilter("search", search);
  };

  const clearFilters = () => {
    setSearch("");
    startTransition(() => {
      router.push("/admin/inventory");
    });
  };

  const hasFilters = Object.values(currentFilters).some((v) => v);

  return (
    <div className="bg-charcoal rounded-xl border border-white/10 p-4 mb-6">
      <div className="flex flex-wrap gap-4">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-warm-gray/50" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by SKU..."
              className="w-full bg-charcoal-dark border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white text-sm placeholder-warm-gray/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>
        </form>

        {/* Stock Filter */}
        <select
          value={currentFilters.filter || ""}
          onChange={(e) => updateFilter("filter", e.target.value)}
          className="bg-charcoal-dark border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent"
        >
          {stockFilters.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Length Filter */}
        <select
          value={currentFilters.length || ""}
          onChange={(e) => updateFilter("length", e.target.value)}
          className="bg-charcoal-dark border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent"
        >
          {lengthOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Height Filter */}
        <select
          value={currentFilters.height || ""}
          onChange={(e) => updateFilter("height", e.target.value)}
          className="bg-charcoal-dark border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent"
        >
          {heightOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Diameter Filter */}
        <select
          value={currentFilters.diameter || ""}
          onChange={(e) => updateFilter("diameter", e.target.value)}
          className="bg-charcoal-dark border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent"
        >
          {diameterOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Finish Filter */}
        <select
          value={currentFilters.finish || ""}
          onChange={(e) => updateFilter("finish", e.target.value)}
          className="bg-charcoal-dark border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent"
        >
          {finishOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Clear Filters */}
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-warm-gray hover:bg-white/5 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
            Clear
          </button>
        )}
      </div>

      {/* Loading indicator */}
      {isPending && (
        <div className="mt-3 text-sm text-warm-gray">Loading...</div>
      )}
    </div>
  );
}
