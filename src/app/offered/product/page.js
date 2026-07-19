import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import CountdownTimer from "@/components/home/CountdownTimer";
import { flashSaleProducts, flashSaleEndsInHours } from "@/data/flashSale";

export default function FlashSalePage() {
  return (
    <main>
      <TopBar />
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-[var(--color-accent)] text-xs tracking-[0.2em] uppercase mb-2">
              Limited Time
            </p>
            <h1 className="font-display text-3xl">Flash Sale</h1>
          </div>
          <CountdownTimer hoursFromNow={flashSaleEndsInHours} />
        </div>

        {flashSaleProducts.length === 0 ? (
          <p className="text-[var(--color-ink-soft)]">
            No flash sale items right now. Check back soon!
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {flashSaleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
