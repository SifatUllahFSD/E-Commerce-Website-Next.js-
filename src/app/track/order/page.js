"use client";

import { useState } from "react";
import { Package, Search } from "lucide-react";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const steps = ["Order Placed", "Confirmed", "Shipped", "Out for Delivery", "Delivered"];

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setResult({ id: orderId, currentStep: 2 });
  };

  return (
    <main>
      <TopBar />
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <Package size={40} className="mx-auto mb-4 text-[var(--color-accent)]" />
          <h1 className="font-display text-3xl mb-2">Track Your Order</h1>
          <p className="text-sm text-[var(--color-ink-soft)]">
            Enter your order ID to see the latest status
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-3 mb-12">
          <input
            type="text"
            required
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="e.g. AUR-10234"
            className="flex-1 border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] transition-colors rounded-md"
          />
          <button
            type="submit"
            className="bg-[var(--color-ink)] text-white px-6 py-3 text-sm tracking-wide flex items-center gap-2 hover:bg-[var(--color-accent)] transition-colors rounded-md"
          >
            <Search size={16} />
            Track
          </button>
        </form>

        {result && (
          <div>
            <p className="text-sm text-[var(--color-ink-soft)] mb-8">
              Order <span className="text-[var(--color-ink)]">#{result.id}</span>
            </p>

            <div className="flex items-center justify-between relative">
              <div className="absolute top-4 left-0 w-full h-0.5 bg-[var(--color-border)]" />
              <div
                className="absolute top-4 left-0 h-0.5 bg-[var(--color-accent)] transition-all"
                style={{ width: `${(result.currentStep / (steps.length - 1)) * 100}%` }}
              />
              {steps.map((step, index) => (
                <div key={step} className="relative flex flex-col items-center gap-2 z-10">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                      index <= result.currentStep
                        ? "bg-[var(--color-accent)] text-white"
                        : "bg-white border border-[var(--color-border)] text-[var(--color-ink-soft)]"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="text-[10px] text-center text-[var(--color-ink-soft)] max-w-[60px]">
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
