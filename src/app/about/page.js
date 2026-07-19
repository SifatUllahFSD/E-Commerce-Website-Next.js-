"use client";

import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { handleImgError } from "@/lib/fallback";

export default function AboutPage() {
  return (
    <main>
      <TopBar />
      <Navbar />

      <section className="relative h-[40vh] min-h-[280px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1600&auto=format&fit=crop"
          alt="Aurelle Beauty"
          onError={handleImgError}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="font-display text-white text-4xl md:text-5xl">About Aurelle</h1>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <p className="text-[var(--color-accent)] text-xs tracking-[0.2em] uppercase mb-3">
          Our Story
        </p>
        <h2 className="font-display text-3xl mb-6">Beauty, Curated With Care</h2>
        <p className="text-[var(--color-ink-soft)] leading-relaxed mb-6">
          Aurelle was founded with a simple idea — that everyone deserves access to premium
          beauty and skincare, without compromise. We carefully select every product on our
          shelves, partnering with trusted brands that share our commitment to quality and
          transparency.
        </p>
        <p className="text-[var(--color-ink-soft)] leading-relaxed mb-6">
          From makeup essentials to skincare rituals, we believe beauty should feel personal.
          That&apos;s why our team tests every product before it reaches you, and why we&apos;re
          always here to help you find exactly what suits your skin and style.
        </p>
        <p className="text-[var(--color-ink-soft)] leading-relaxed">
          Based in Dhaka, we deliver across Bangladesh with a promise of authenticity, care,
          and a touch of luxury in every order.
        </p>

        <div className="grid grid-cols-3 gap-6 mt-14 text-center">
          <div>
            <p className="font-display text-3xl text-[var(--color-accent)]">50+</p>
            <p className="text-xs text-[var(--color-ink-soft)] mt-2 tracking-wide">Trusted Brands</p>
          </div>
          <div>
            <p className="font-display text-3xl text-[var(--color-accent)]">10k+</p>
            <p className="text-xs text-[var(--color-ink-soft)] mt-2 tracking-wide">Happy Customers</p>
          </div>
          <div>
            <p className="font-display text-3xl text-[var(--color-accent)]">64</p>
            <p className="text-xs text-[var(--color-ink-soft)] mt-2 tracking-wide">Districts Covered</p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
