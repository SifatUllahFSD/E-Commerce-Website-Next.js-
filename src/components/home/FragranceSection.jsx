import { products } from "@/data/products";
import ProductCarousel from "@/components/product/ProductCarousel";

export default function FragranceSection() {
  const items = products.filter((p) => p.category === "Fragrance");

  return (
    <section className="max-w-7xl mx-auto px-6 py-14">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-[var(--color-accent)] text-xs tracking-[0.2em] uppercase mb-2">
            Signature Scents
          </p>
          <h2 className="font-display text-3xl">Fragrance</h2>
        </div>
        <a href="/category/fragrance" className="hidden sm:block text-sm nav-link">
          View All
        </a>
      </div>

      <ProductCarousel products={items} />
    </section>
  );
}
