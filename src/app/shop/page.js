"use client";

import { useMemo, useState } from "react";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import ShopFilters from "@/components/shop/ShopFilters";
import { products, maxProductPrice } from "@/data/products";

export default function ShopPage() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceLimit, setPriceLimit] = useState(maxProductPrice);

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const categoryMatch =
        selectedCategories.length === 0 || selectedCategories.includes(p.category);
      const priceMatch = p.price <= priceLimit;
      return categoryMatch && priceMatch;
    });
  }, [selectedCategories, priceLimit]);

  return (
    <main>
      <TopBar />
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="font-display text-3xl mb-8">All Products</h1>

        <div className="flex flex-col lg:flex-row gap-10">
          <ShopFilters
            selectedCategories={selectedCategories}
            onToggleCategory={toggleCategory}
            priceLimit={priceLimit}
            onPriceChange={setPriceLimit}
          />

          <div className="flex-1">
            <p className="text-sm text-[var(--color-ink-soft)] mb-6">
              Showing {filteredProducts.length} of {products.length} products
            </p>

            {filteredProducts.length === 0 ? (
              <p className="text-[var(--color-ink-soft)]">No products match your filters.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
