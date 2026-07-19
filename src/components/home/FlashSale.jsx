import { flashSaleProducts, flashSaleEndsInHours } from "@/data/flashSale";
import ProductCarousel from "@/components/product/ProductCarousel";
import CountdownTimer from "@/components/home/CountdownTimer";

export default function FlashSale() {
  return (
    <section className="bg-[var(--color-accent-soft)]/40 py-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-[var(--color-accent)] text-xs tracking-[0.2em] uppercase mb-2">
              Limited Time
            </p>
            <h2 className="font-display text-3xl">Flash Sale</h2>
          </div>
          <CountdownTimer hoursFromNow={flashSaleEndsInHours} />
        </div>

        <ProductCarousel products={flashSaleProducts} />
      </div>
    </section>
  );
}
