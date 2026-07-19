"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingBag, Heart, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";

export default function AddToCartBox({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const inWishlist = isInWishlist(product.id);

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  const handleAddToCart = () => {
    addToCart(product, qty);
    showToast(`${product.name} added to cart`);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div>
      <p className="text-sm text-[var(--color-accent)] uppercase tracking-wide mb-2">
        {product.brand}
      </p>
      <h1 className="font-display text-3xl mb-4">{product.name}</h1>

      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl font-medium">Tk {product.price}</span>
        {product.oldPrice && (
          <>
            <span className="text-base text-[var(--color-ink-soft)] line-through">
              Tk {product.oldPrice}
            </span>
            <span className="bg-[var(--color-accent)] text-white text-xs px-2 py-1 rounded">
              -{discount}%
            </span>
          </>
        )}
      </div>

      <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed mb-8">
        {product.description}
      </p>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center border border-[var(--color-border)] rounded-md">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-10 h-10 flex items-center justify-center hover:bg-[var(--color-bg)]"
            aria-label="Decrease quantity"
          >
            <Minus size={14} />
          </button>
          <span className="w-10 text-center text-sm">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="w-10 h-10 flex items-center justify-center hover:bg-[var(--color-bg)]"
            aria-label="Increase quantity"
          >
            <Plus size={14} />
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          className="flex-1 bg-[var(--color-ink)] text-white py-3 flex items-center justify-center gap-2 text-sm tracking-wide hover:bg-[var(--color-accent)] transition-colors rounded-md"
        >
          {added ? <Check size={16} /> : <ShoppingBag size={16} />}
          {added ? "Added to Cart" : "Add to Cart"}
        </button>

        <button
          onClick={() => toggleWishlist(product)}
          aria-label="Add to wishlist"
          className="w-11 h-11 border border-[var(--color-border)] flex items-center justify-center hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors rounded-md"
        >
          <Heart
            size={16}
            fill={inWishlist ? "var(--color-accent)" : "none"}
            color={inWishlist ? "var(--color-accent)" : "currentColor"}
          />
        </button>
      </div>

      <p className="text-xs text-[var(--color-ink-soft)]">
        Cash on Delivery available &middot; Free delivery inside Dhaka
      </p>
    </div>
  );
}
