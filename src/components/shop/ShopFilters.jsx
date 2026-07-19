"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { productCategories, maxProductPrice } from "@/data/products";

function FilterContent({ selectedCategories, onToggleCategory, priceLimit, onPriceChange }) {
  return (
    <>
      <div className="mb-8">
        <h3 className="font-display text-lg mb-4">Category</h3>
        <div className="space-y-3">
          {productCategories.map((cat) => (
            <label key={cat} className="flex items-center gap-3 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => onToggleCategory(cat)}
                className="accent-[var(--color-accent)] w-4 h-4"
              />
              <span className="text-[var(--color-ink-soft)]">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-display text-lg mb-4">Max Price</h3>
        <input
          type="range"
          min={0}
          max={maxProductPrice}
          step={50}
          value={priceLimit}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          className="w-full accent-[var(--color-accent)]"
        />
        <p className="text-sm text-[var(--color-ink-soft)] mt-2">Up to Tk {priceLimit}</p>
      </div>
    </>
  );
}

export default function ShopFilters(props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden flex items-center gap-2 border border-[var(--color-border)] px-4 py-2.5 text-sm mb-6 w-fit rounded-md"
      >
        <SlidersHorizontal size={15} />
        Filters
      </button>

      <aside className="hidden lg:block w-64 shrink-0">
        <FilterContent {...props} />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-[var(--color-surface)] p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-lg">Filters</h3>
              <button onClick={() => setMobileOpen(false)} aria-label="Close filters">
                <X size={22} />
              </button>
            </div>
            <FilterContent {...props} />
            <button
              onClick={() => setMobileOpen(false)}
              className="w-full bg-[var(--color-ink)] text-white py-3 text-sm tracking-wide mt-8 rounded-md"
            >
              Show Results
            </button>
          </div>
        </div>
      )}
    </>
  );
}
