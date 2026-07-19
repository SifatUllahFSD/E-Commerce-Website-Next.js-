"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";

const INITIAL_COUNT = 8;
const STEP = 4;

export default function ExploreProducts() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const isShowingAll = visibleCount >= products.length;
  const visibleProducts = products.slice(0, visibleCount);

  const handleToggle = () => {
    if (isShowingAll) {
      setVisibleCount(INITIAL_COUNT);
    } else {
      setVisibleCount((prev) => Math.min(prev + STEP, products.length));
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-14">
      <div className="text-center mb-10">
        <p className="text-[var(--color-accent)] text-xs tracking-[0.2em] uppercase mb-2">
          Discover
        </p>
        <h2 className="font-display text-3xl">Explore Products</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length > INITIAL_COUNT && (
        <div className="text-center mt-12">
          <button
            onClick={handleToggle}
            className="inline-flex items-center gap-2 whitespace-nowrap border border-[var(--color-ink)] px-6 sm:px-8 py-3 text-sm tracking-wide hover:bg-[var(--color-ink)] hover:text-white transition-colors rounded-md"
          >
            {isShowingAll ? "View Less" : "View More"}
            {isShowingAll ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      )}
    </section>
  );
}
