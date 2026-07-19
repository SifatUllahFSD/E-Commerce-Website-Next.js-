"use client";

import { Heart, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import { handleImgError } from "@/lib/fallback";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();
  const inWishlist = isInWishlist(product.id);

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  const handleAddToCart = () => {
    addToCart(product, 1);
    showToast(`${product.name} added to cart`);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    showToast(inWishlist ? "Removed from wishlist" : "Added to wishlist", "wishlist");
  };

  return (
    <div className="group">
      <div className="product-card-image relative aspect-[4/5] overflow-hidden bg-[var(--color-accent-soft)] mb-4 rounded-lg">
        <a href={product.href}>
          <img
            src={product.image}
            alt={product.name}
            onError={handleImgError}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </a>

        {discount && (
          <span className="absolute top-3 left-3 bg-[var(--color-accent)] text-white text-[11px] px-2 py-1 tracking-wide rounded">
            -{discount}%
          </span>
        )}

        <button
          onClick={handleToggleWishlist}
          aria-label="Toggle wishlist"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors"
        >
          <Heart
            size={15}
            fill={inWishlist ? "var(--color-accent)" : "none"}
            color={inWishlist ? "var(--color-accent)" : "currentColor"}
          />
        </button>

        <button
          onClick={handleAddToCart}
          className="absolute bottom-0 left-0 w-full bg-[var(--color-ink)] text-white text-xs tracking-wide py-3 flex items-center justify-center gap-2 translate-y-full transition-transform duration-300 [@media(hover:hover)]:group-hover:translate-y-0"
        >
          <ShoppingBag size={14} />
          Add to Cart
        </button>
      </div>

      <p className="text-[11px] text-[var(--color-ink-soft)] uppercase tracking-wide mb-1">
        {product.brand}
      </p>
      <a href={product.href}>
        <h3 className="text-sm mb-2 hover:text-[var(--color-accent)] transition-colors">
          {product.name}
        </h3>
      </a>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Tk {product.price}</span>
        {product.oldPrice && (
          <span className="text-xs text-[var(--color-ink-soft)] line-through">
            Tk {product.oldPrice}
          </span>
        )}
      </div>
    </div>
  );
}
