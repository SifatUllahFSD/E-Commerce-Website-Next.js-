"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="max-w-md mx-auto px-6 py-24 text-center">
      <CheckCircle2 size={56} className="mx-auto mb-6 text-[var(--color-accent)]" />
      <h1 className="font-display text-3xl mb-4">Order Placed!</h1>
      {orderId && (
        <p className="text-sm text-[var(--color-ink-soft)] mb-2">
          Order ID: <span className="text-[var(--color-ink)] font-medium">#{orderId}</span>
        </p>
      )}
      <p className="text-[var(--color-ink-soft)] mb-8">
        Thank you for shopping with Aurelle. We will call you shortly to confirm your order.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href="/"
          className="inline-block bg-[var(--color-ink)] text-white px-7 py-3 text-sm tracking-wide rounded-md"
        >
          Back to Home
        </a>
        <a
          href="/track/order"
          className="inline-block border border-[var(--color-ink)] px-7 py-3 text-sm tracking-wide rounded-md"
        >
          Track Order
        </a>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <main>
      <TopBar />
      <Navbar />

      <Suspense fallback={null}>
        <OrderSuccessContent />
      </Suspense>

      <Footer />
    </main>
  );
}
