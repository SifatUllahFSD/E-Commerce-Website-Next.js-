"use client";

import { Trash2, ShoppingBag } from "lucide-react";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { handleImgError } from "@/lib/fallback";

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (items.length === 0) {
    return (
      <main>
        <TopBar />
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="font-display text-3xl mb-4">Your Wishlist is Empty</h1>
          <p className="text-[var(--color-ink-soft)] mb-8">
            Save items you love by tapping the heart icon.
          </p>
          <a
            href="/shop"
            className="inline-block bg-[var(--color-ink)] text-white px-7 py-3 text-sm tracking-wide rounded-md"
          >
            Continue Shopping
          </a>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <TopBar />
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="font-display text-3xl mb-10">My Wishlist</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          {items.map((item) => (
            <div key={item.id} className="group">
              <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-accent-soft)] mb-4 rounded-lg">
                <a href={item.href}>
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={handleImgError}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </a>

                <button
                  onClick={() => removeFromWishlist(item.id)}
                  aria-label="Remove from wishlist"
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors"
                >
                  <Trash2 size={14} />
                </button>

                <button
                  onClick={() => addToCart(item, 1)}
                  className="absolute bottom-0 left-0 w-full bg-[var(--color-ink)] text-white text-xs tracking-wide py-3 flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                >
                  <ShoppingBag size={14} />
                  Add to Cart
                </button>
              </div>

              <p className="text-[11px] text-[var(--color-ink-soft)] uppercase tracking-wide mb-1">
                {item.brand}
              </p>
              <a href={item.href}>
                <h3 className="text-sm mb-2">{item.name}</h3>
              </a>
              <span className="text-sm font-medium">Tk {item.price}</span>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
