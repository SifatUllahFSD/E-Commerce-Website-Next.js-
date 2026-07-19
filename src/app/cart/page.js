"use client";

import { Trash2, Minus, Plus } from "lucide-react";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { handleImgError } from "@/lib/fallback";

export default function CartPage() {
  const { items, removeFromCart, updateQty, cartTotal } = useCart();

  if (items.length === 0) {
    return (
      <main>
        <TopBar />
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="font-display text-3xl mb-4">Your Cart is Empty</h1>
          <p className="text-[var(--color-ink-soft)] mb-8">
            Looks like you haven&apos;t added anything yet.
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
        <h1 className="font-display text-3xl mb-10">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 divide-y divide-[var(--color-border)]">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 py-6">
                <a
                  href={item.href}
                  className="w-24 h-24 shrink-0 overflow-hidden bg-[var(--color-accent-soft)] rounded-md"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={handleImgError}
                    className="w-full h-full object-cover"
                  />
                </a>

                <div className="flex-1">
                  <a href={item.href}>
                    <h3 className="text-sm mb-2">{item.name}</h3>
                  </a>
                  <p className="text-sm text-[var(--color-ink-soft)] mb-4">Tk {item.price}</p>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-[var(--color-border)] rounded-md">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="w-8 h-8 flex items-center justify-center"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center text-sm">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="w-8 h-8 flex items-center justify-center"
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[var(--color-ink-soft)] hover:text-[var(--color-accent)]"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <p className="text-sm font-medium">Tk {item.price * item.qty}</p>
              </div>
            ))}
          </div>

          <div className="bg-[var(--color-bg)] border border-[var(--color-border)] p-6 h-fit rounded-lg">
            <h2 className="font-display text-xl mb-6">Order Summary</h2>
            <div className="flex justify-between text-sm mb-3">
              <span className="text-[var(--color-ink-soft)]">Subtotal</span>
              <span>Tk {cartTotal}</span>
            </div>
            <div className="flex justify-between text-sm mb-6">
              <span className="text-[var(--color-ink-soft)]">Delivery</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="flex justify-between text-base font-medium border-t border-[var(--color-border)] pt-4 mb-6">
              <span>Total</span>
              <span>Tk {cartTotal}</span>
            </div>
            <a
              href="/checkout"
              className="block text-center w-full bg-[var(--color-ink)] text-white py-3 text-sm tracking-wide hover:bg-[var(--color-accent)] transition-colors rounded-md"
            >
              Proceed to Checkout
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
