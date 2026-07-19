"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, Heart, X } from "lucide-react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2500);
  }, []);

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-3 max-w-[90vw] sm:max-w-sm">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="flex items-center gap-3 bg-[var(--color-ink)] text-white px-4 py-3 shadow-lg animate-toast-in rounded-lg"
          >
            {toast.type === "wishlist" ? (
              <Heart size={18} className="shrink-0 text-[var(--color-gold)]" fill="var(--color-gold)" />
            ) : (
              <CheckCircle2 size={18} className="shrink-0 text-[var(--color-gold)]" />
            )}
            <p className="text-sm flex-1">{toast.message}</p>
            <button
              onClick={() => dismissToast(toast.id)}
              aria-label="Dismiss"
              className="shrink-0 text-white/60 hover:text-white"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
