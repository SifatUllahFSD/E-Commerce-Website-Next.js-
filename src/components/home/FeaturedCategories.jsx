"use client";

import { categories } from "@/data/categories";
import { handleImgError } from "@/lib/fallback";

export default function FeaturedCategories() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-14">
      <div className="text-center mb-10">
        <p className="text-[var(--color-accent)] text-xs tracking-[0.2em] uppercase mb-2">
          Explore
        </p>
        <h2 className="font-display text-3xl">Shop by Category</h2>
      </div>

      <div className="flex gap-6 overflow-x-auto md:grid md:grid-cols-6 md:overflow-visible scrollbar-hide pb-2">
        {categories.map((cat) => (
          <a
            key={cat.name}
            href={cat.href}
            className="flex flex-col items-center gap-3 shrink-0 w-24 md:w-auto group"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border border-[var(--color-border)] group-hover:border-[var(--color-gold)] transition-colors">
              <img
                src={cat.image}
                alt={cat.name}
                onError={handleImgError}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <span className="text-xs text-center text-[var(--color-ink-soft)] group-hover:text-[var(--color-ink)] transition-colors">
              {cat.name}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
