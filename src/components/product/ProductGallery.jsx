"use client";

import { useState } from "react";
import { handleImgError } from "@/lib/fallback";

export default function ProductGallery({ images, name }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="aspect-square overflow-hidden bg-[var(--color-accent-soft)] mb-4 rounded-lg">
        <img
          src={images[active]}
          alt={name}
          onError={handleImgError}
          className="w-full h-full object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((img, index) => (
            <button
              key={img}
              onClick={() => setActive(index)}
              className={`w-20 h-20 overflow-hidden border-2 rounded-md transition-colors ${
                active === index ? "border-[var(--color-accent)]" : "border-transparent"
              }`}
            >
              <img
                src={img}
                alt=""
                onError={handleImgError}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
