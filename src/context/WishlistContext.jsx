"use client";

import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("aurelle_wishlist");
      if (stored) setItems(JSON.parse(stored));
    } catch (e) {
      console.error("Could not load wishlist:", e);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("aurelle_wishlist", JSON.stringify(items));
    }
  }, [items, loaded]);

  const isInWishlist = (id) => items.some((i) => i.id === id);

  const toggleWishlist = (product) => {
    setItems((prev) => {
      const exists = prev.some((i) => i.id === product.id);
      if (exists) {
        return prev.filter((i) => i.id !== product.id);
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          image: product.image,
          href: product.href,
        },
      ];
    });
  };

  const removeFromWishlist = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <WishlistContext.Provider
      value={{ items, toggleWishlist, isInWishlist, removeFromWishlist, wishlistCount: items.length }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
