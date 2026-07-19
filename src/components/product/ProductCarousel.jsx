"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";

export default function ProductCarousel({ products, autoSlideMs = 3500 }) {
  const trackRef = useRef(null);
  const intervalRef = useRef(null);
  const [arrowTop, setArrowTop] = useState(null);

  const getStep = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    const firstItem = track.firstElementChild;
    if (!firstItem) return 0;
    const gap = parseFloat(getComputedStyle(track).columnGap || 0);
    return firstItem.getBoundingClientRect().width + gap;
  }, []);

  // প্রোডাক্ট ছবির আসল height মেপে arrow-কে ঠিক ছবির মাঝ বরাবর বসানো —
  // এভাবে ডেস্কটপ/ট্যাব/মোবাইল সব জায়গায় arrow একই জায়গায় (ছবির সেন্টারে) থাকবে
  const measureArrowPosition = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const imageBox = track.querySelector(".product-card-image");
    if (imageBox) {
      setArrowTop(imageBox.getBoundingClientRect().height / 2);
    }
  }, []);

  useEffect(() => {
    measureArrowPosition();
    window.addEventListener("resize", measureArrowPosition);
    return () => window.removeEventListener("resize", measureArrowPosition);
  }, [measureArrowPosition, products]);

  const scrollNext = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const step = getStep();
    const maxScroll = track.scrollWidth - track.clientWidth;

    if (track.scrollLeft >= maxScroll - 2) {
      track.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      track.scrollBy({ left: step, behavior: "smooth" });
    }
  }, [getStep]);

  const scrollPrev = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const step = getStep();

    if (track.scrollLeft <= 2) {
      track.scrollTo({ left: track.scrollWidth, behavior: "smooth" });
    } else {
      track.scrollBy({ left: -step, behavior: "smooth" });
    }
  }, [getStep]);

  const resetAutoSlide = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(scrollNext, autoSlideMs);
  }, [scrollNext, autoSlideMs]);

  useEffect(() => {
    resetAutoSlide();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [resetAutoSlide]);

  const handleManualClick = (direction) => {
    if (direction === "next") scrollNext();
    else scrollPrev();
    resetAutoSlide();
  };

  if (!products || products.length === 0) return null;

  const showArrows = products.length > 2;

  return (
    <div className="relative w-full max-w-full overflow-hidden">
      <div
        ref={trackRef}
        className="flex gap-3 md:gap-4 lg:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="shrink-0 snap-start basis-[calc(50%-6px)] md:basis-[calc(33.333%-11px)] lg:basis-[calc(25%-18px)]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {showArrows && (
        <>
          <button
            onClick={() => handleManualClick("prev")}
            aria-label="Previous products"
            style={arrowTop ? { top: `${arrowTop}px` } : undefined}
            className="flex absolute left-1.5 top-[35%] -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 items-center justify-center rounded-full bg-[var(--color-ink)]/85 text-white backdrop-blur-sm shadow-lg hover:bg-[var(--color-ink)] active:scale-95 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => handleManualClick("next")}
            aria-label="Next products"
            style={arrowTop ? { top: `${arrowTop}px` } : undefined}
            className="flex absolute right-1.5 top-[35%] -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 items-center justify-center rounded-full bg-[var(--color-ink)]/85 text-white backdrop-blur-sm shadow-lg hover:bg-[var(--color-ink)] active:scale-95 transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </>
      )}
    </div>
  );
}
