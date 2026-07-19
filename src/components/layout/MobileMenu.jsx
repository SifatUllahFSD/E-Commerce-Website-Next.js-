"use client";

import { useState } from "react";
import { X, ChevronDown, User, Heart } from "lucide-react";
import { navigation } from "@/data/navigation";

export default function MobileMenu({ open, onClose }) {
  const [expanded, setExpanded] = useState(null);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] lg:hidden">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      <div className="absolute top-24 inset-x-4 sm:inset-x-6 rounded-2xl bg-white/85 backdrop-blur-xl border border-white/50 shadow-2xl max-h-[72vh] overflow-hidden flex flex-col animate-sheet-in">
        <div className="flex items-center justify-between px-5 h-14 border-b border-[var(--color-border)]/60 shrink-0">
          <span className="font-display text-lg">Menu</span>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="w-8 h-8 rounded-full flex items-center justify-center bg-black/5 hover:bg-black/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {navigation.map((item) => (
            <div key={item.label} className="border-b border-[var(--color-border)]/60 last:border-b-0">
              {item.columns ? (
                <>
                  <button
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                    onClick={() =>
                      setExpanded(expanded === item.label ? null : item.label)
                    }
                  >
                    <span className="text-sm tracking-wide">{item.label}</span>
                    <ChevronDown
                      size={17}
                      className={`transition-transform ${
                        expanded === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {expanded === item.label && (
                    <div className="px-5 pb-4 space-y-4">
                      {item.columns.map((col) => (
                        <div key={col.heading}>
                          <p className="text-xs uppercase tracking-wider text-[var(--color-accent)] mb-2">
                            {col.heading}
                          </p>
                          <ul className="space-y-2">
                            {col.links.map((link) => (
                              <li key={link.name}>
                                <a
                                  href={link.href}
                                  className="text-sm text-[var(--color-ink-soft)]"
                                  onClick={onClose}
                                >
                                  {link.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <a
                  href={item.href}
                  className="block px-5 py-4 text-sm tracking-wide"
                  onClick={onClose}
                >
                  {item.label}
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="border-t border-[var(--color-border)]/60 px-5 py-4 flex items-center gap-6 shrink-0">
          <a href="/login" className="flex items-center gap-2 text-sm" onClick={onClose}>
            <User size={17} />
            Sign In
          </a>
          <a href="/my/wishlists" className="flex items-center gap-2 text-sm" onClick={onClose}>
            <Heart size={17} />
            Wishlist
          </a>
        </div>
      </div>
    </div>
  );
}
