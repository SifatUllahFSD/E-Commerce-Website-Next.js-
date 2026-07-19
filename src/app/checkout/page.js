"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { handleImgError } from "@/lib/fallback";
import { createOrder } from "@/lib/adminOrders";
import { upsertCustomer } from "@/lib/adminCustomers";

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    paymentMethod: "cod",
  });

  const deliveryFee = form.city.trim().toLowerCase() === "dhaka" ? 60 : 120;
  const grandTotal = cartTotal + (items.length > 0 ? deliveryFee : 0);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let email = "";
    try {
      email = sessionStorage.getItem("aurelle_email") || "";
    } catch (err) {
      // ignore
    }

    const order = createOrder({
      items,
      form: { ...form, email },
      deliveryFee,
      total: grandTotal,
    });

    if (email) {
      upsertCustomer({ name: form.fullName, email, phone: form.phone, city: form.city });
    }

    clearCart();
    router.push(`/order-success?orderId=${order.id}`);
  };

  if (items.length === 0) {
    return (
      <main>
        <TopBar />
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="font-display text-3xl mb-4">Your Cart is Empty</h1>
          <p className="text-[var(--color-ink-soft)] mb-8">
            Add some products before checking out.
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
        <h1 className="font-display text-3xl mb-10">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="font-display text-xl mb-2">Shipping Details</h2>

            <div>
              <label className="block text-xs tracking-wide text-[var(--color-ink-soft)] mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                required
                value={form.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] transition-colors rounded-md"
              />
            </div>

            <div>
              <label className="block text-xs tracking-wide text-[var(--color-ink-soft)] mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
                placeholder="01XXXXXXXXX"
                className="w-full border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] transition-colors rounded-md"
              />
            </div>

            <div>
              <label className="block text-xs tracking-wide text-[var(--color-ink-soft)] mb-2">
                Full Address
              </label>
              <textarea
                name="address"
                required
                rows={3}
                value={form.address}
                onChange={handleChange}
                placeholder="House, Road, Area"
                className="w-full border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] transition-colors resize-none rounded-md"
              />
            </div>

            <div>
              <label className="block text-xs tracking-wide text-[var(--color-ink-soft)] mb-2">
                City
              </label>
              <input
                type="text"
                name="city"
                required
                value={form.city}
                onChange={handleChange}
                placeholder="e.g. Dhaka"
                className="w-full border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] transition-colors rounded-md"
              />
              <p className="text-xs text-[var(--color-ink-soft)] mt-2">
                Delivery inside Dhaka: Tk 60 &middot; Outside Dhaka: Tk 120
              </p>
            </div>

            <div>
              <h3 className="text-sm tracking-wide mb-3">Payment Method</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-3 border border-[var(--color-border)] px-4 py-3 cursor-pointer rounded-md">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={form.paymentMethod === "cod"}
                    onChange={handleChange}
                    className="accent-[var(--color-accent)]"
                  />
                  <span className="text-sm">Cash on Delivery</span>
                </label>
                <label className="flex items-center gap-3 border border-[var(--color-border)] px-4 py-3 cursor-pointer opacity-50 rounded-md">
                  <input type="radio" name="paymentMethod" value="online" disabled className="accent-[var(--color-accent)]" />
                  <span className="text-sm">Online Payment (coming soon)</span>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-[var(--color-bg)] border border-[var(--color-border)] p-6 h-fit rounded-lg">
            <h2 className="font-display text-xl mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 shrink-0 overflow-hidden bg-[var(--color-accent-soft)] rounded-md">
                    <img
                      src={item.image}
                      alt={item.name}
                      onError={handleImgError}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs truncate">{item.name}</p>
                    <p className="text-xs text-[var(--color-ink-soft)]">Qty: {item.qty}</p>
                  </div>
                  <span className="text-xs font-medium shrink-0">Tk {item.price * item.qty}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-[var(--color-border)] pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-ink-soft)]">Subtotal</span>
                <span>Tk {cartTotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-ink-soft)]">Delivery</span>
                <span>Tk {deliveryFee}</span>
              </div>
              <div className="flex justify-between text-base font-medium border-t border-[var(--color-border)] pt-3">
                <span>Total</span>
                <span>Tk {grandTotal}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[var(--color-ink)] text-white py-3 text-sm tracking-wide hover:bg-[var(--color-accent)] transition-colors mt-6 rounded-md"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </main>
  );
}
