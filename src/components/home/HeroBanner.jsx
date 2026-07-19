"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/data/heroSlides";
import { handleImgError } from "@/lib/fallback";

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index) => setCurrent(index);
  const prev = () =>
    setCurrent((c) => (c - 1 + heroSlides.length) % heroSlides.length);
  const next = () => setCurrent((c) => (c + 1) % heroSlides.length);

  return (
    <section className="relative h-[70vh] min-h-[420px] overflow-hidden">
      {heroSlides.map((slide, index) => (
        <div
          key={slide.title}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            onError={handleImgError}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />

          <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
            <p className="text-[var(--color-gold)] text-xs tracking-[0.2em] uppercase mb-4">
              {slide.subtitle}
            </p>
            <h1 className="font-display text-white text-3xl sm:text-4xl md:text-6xl max-w-xl mb-5 leading-tight">
              {slide.title}
            </h1>
            <p className="text-white/85 max-w-md mb-8 text-sm md:text-base">
              {slide.description}
            </p>
            <a
              href={slide.href}
              className="inline-block w-fit bg-[var(--color-accent)] text-white px-7 py-3 text-sm tracking-wide hover:bg-[var(--color-ink)] transition-colors"
            >
              {slide.cta}
            </a>
          </div>
        </div>
      ))}

      <button
        onClick={prev}
        aria-label="Previous slide"
        className="hidden md:flex absolute left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-colors"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="hidden md:flex absolute right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-colors"
      >
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.title}
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              index === current ? "w-8 bg-[var(--color-gold)]" : "w-1.5 bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
