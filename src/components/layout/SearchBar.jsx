"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { products } from "@/data/products";
import { handleImgError } from "@/lib/fallback";

export default function SearchBar({ onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = useMemo(() => {
    if (query.trim().length < 2) return [];
    const q = query.toLowerCase();
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [query]);

  return (
    <div className="p-2">
      <div className="relative">
        <Search
          size={16}
          className="absolute left-0 top-1/2 -translate-y-1/2 text-[var(--color-ink-soft)]"
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for products, brands..."
          className="w-full bg-transparent border-b border-[var(--color-ink)] pl-6 pr-8 py-2 text-sm outline-none placeholder:text-[var(--color-ink-soft)]"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-[var(--color-ink-soft)]"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {query.trim().length >= 2 && (
        <div className="mt-4">
          {results.length === 0 ? (
            <p className="text-sm text-[var(--color-ink-soft)] py-4">
              No products found for &quot;{query}&quot;
            </p>
          ) : (
            <div className="space-y-1">
              {results.map((product) => (
                <a
                  key={product.id}
                  href={product.href}
                  onClick={onClose}
                  className="flex items-center gap-4 py-2 px-2 hover:bg-black/5 rounded-lg transition-colors"
                >
                  <div className="w-12 h-12 shrink-0 overflow-hidden rounded-md bg-[var(--color-accent-soft)]">
                    <img
                      src={product.image}
                      alt={product.name}
                      onError={handleImgError}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-[var(--color-ink-soft)] uppercase">
                      {product.brand}
                    </p>
                    <p className="text-sm truncate">{product.name}</p>
                  </div>
                  <span className="text-sm font-medium shrink-0">
                    Tk {product.price}
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
