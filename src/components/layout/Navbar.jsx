"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Heart, User, ShoppingBag, Menu } from "lucide-react";
import { navigation } from "@/data/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { handleImgError } from "@/lib/fallback";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [accountHref, setAccountHref] = useState("/login");

  const lastScrollY = useRef(0);

  useEffect(() => {
    try {
      const role = sessionStorage.getItem("aurelle_role");
      if (role === "admin") setAccountHref("/admin");
      else if (role === "customer") setAccountHref("/profile");
    } catch (err) {
      // ignore
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY < 80) {
        setHidden(false);
      } else if (currentY > lastScrollY.current) {
        setHidden(true);
        setActiveMenu(null);
        setSearchOpen(false);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* স্পেসার — যাতে fixed navbar পেজের কনটেন্টের উপর বসে না যায় */}
      <div className="h-20 md:h-32" />

      <div
        className={`fixed top-3 md:top-11 inset-x-0 z-50 px-4 sm:px-6 transition-all duration-500 ease-out ${
          hidden ? "-translate-y-28 opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <div
          className="max-w-7xl mx-auto relative"
          onMouseLeave={() => setActiveMenu(null)}
        >
          <div className="rounded-2xl bg-white/75 backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_rgba(36,28,26,0.08)]">
            <div className="h-16 px-5 sm:px-7 flex items-center justify-between gap-6">
              <a href="/" className="font-display text-xl sm:text-2xl tracking-wide shrink-0">
                Aurelle
              </a>

              <nav className="hidden lg:flex items-center gap-8">
                {navigation.map((item) => (
                  <div
                    key={item.label}
                    onMouseEnter={() => setActiveMenu(item.columns ? item.label : null)}
                  >
                    <a
                      href={item.href}
                      className="nav-link text-sm tracking-wide text-[var(--color-ink)]"
                    >
                      {item.label}
                    </a>
                  </div>
                ))}
              </nav>

              <div className="flex items-center gap-4 sm:gap-5 shrink-0">
                <button
                  aria-label="Search"
                  onClick={() => {
                    setSearchOpen((v) => !v);
                    setActiveMenu(null);
                  }}
                  className="text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors"
                >
                  <Search size={19} />
                </button>

                <a
                  href="/my/wishlists"
                  aria-label="Wishlist"
                  className="hidden sm:block relative text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors"
                >
                  <Heart size={19} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[var(--color-accent)] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </a>

                <a
                  href={accountHref}
                  aria-label="Account"
                  className="hidden sm:block text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors"
                >
                  <User size={19} />
                </a>

                <a
                  href="/cart"
                  aria-label="Cart"
                  className="relative text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors"
                >
                  <ShoppingBag size={19} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[var(--color-accent)] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </a>

                <button
                  className="lg:hidden text-[var(--color-ink)]"
                  onClick={() => setMobileOpen(true)}
                  aria-label="Open menu"
                >
                  <Menu size={22} />
                </button>
              </div>
            </div>
          </div>

          {searchOpen && (
            <div className="hidden lg:block absolute left-0 top-full mt-3 w-full rounded-2xl bg-white/90 backdrop-blur-xl border border-white/50 shadow-2xl p-6 animate-fade-in">
              <SearchBar onClose={() => setSearchOpen(false)} />
            </div>
          )}

          {activeMenu && (
            <div className="hidden lg:block absolute left-0 top-full mt-3 w-full rounded-2xl bg-white/90 backdrop-blur-xl border border-white/50 shadow-2xl p-8 animate-fade-in">
              {navigation
                .filter((item) => item.label === activeMenu)
                .map((item) => (
                  <div key={item.label} className="grid grid-cols-5 gap-10">
                    {item.columns.map((col) => (
                      <div key={col.heading}>
                        <h4 className="font-display text-sm mb-4 text-[var(--color-accent)]">
                          {col.heading}
                        </h4>
                        <ul className="space-y-2.5">
                          {col.links.map((link) => (
                            <li key={link.name}>
                              <a
                                href={link.href}
                                className="text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors"
                              >
                                {link.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}

                    {item.promo && (
                      <a
                        href={item.promo.href}
                        className="relative col-span-1 rounded-xl overflow-hidden group"
                      >
                        <img
                          src={item.promo.image}
                          alt={item.promo.title}
                          onError={handleImgError}
                          className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="relative p-5 flex flex-col justify-end h-48">
                          <p className="text-white/80 text-xs mb-1">{item.promo.subtitle}</p>
                          <p className="font-display text-white text-lg">{item.promo.title}</p>
                        </div>
                      </a>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
