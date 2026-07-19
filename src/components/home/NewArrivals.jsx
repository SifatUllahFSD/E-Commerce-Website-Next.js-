import { products } from "@/data/products";
import ProductCarousel from "@/components/product/ProductCarousel";

export default function NewArrivals() {
  const newProducts = products.filter((p) => p.isNew);

  if (newProducts.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 py-14">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-[var(--color-accent)] text-xs tracking-[0.2em] uppercase mb-2">
            Just Landed
          </p>
          <h2 className="font-display text-3xl">New Arrivals</h2>
        </div>
      </div>

      <ProductCarousel products={newProducts} />
    </section>
  );
}
