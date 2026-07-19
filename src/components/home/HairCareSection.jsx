import { products } from "@/data/products";
import ProductCarousel from "@/components/product/ProductCarousel";

export default function HairCareSection() {
  const items = products.filter((p) => p.category === "Hair Care");

  return (
    <section className="bg-[var(--color-accent-soft)]/30 py-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[var(--color-accent)] text-xs tracking-[0.2em] uppercase mb-2">
              Strengthen
            </p>
            <h2 className="font-display text-3xl">Hair Care</h2>
          </div>
          <a href="/category/hair-care" className="hidden sm:block text-sm nav-link">
            View All
          </a>
        </div>

        <ProductCarousel products={items} />
      </div>
    </section>
  );
}
