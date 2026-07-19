"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { productCategories } from "@/lib/adminProducts";

const emptyForm = {
  name: "",
  brand: "",
  category: productCategories[0],
  price: "",
  oldPrice: "",
  image: "",
  description: "",
  isNew: false,
};

export default function ProductForm({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        brand: initialData.brand || "",
        category: initialData.category || productCategories[0],
        price: initialData.price ?? "",
        oldPrice: initialData.oldPrice ?? "",
        image: initialData.image || "",
        description: initialData.description || "",
        isNew: !!initialData.isNew,
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />

      <form
        onSubmit={handleSubmit}
        className="relative bg-white rounded-lg shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between px-6 h-14 border-b border-[var(--color-border)] sticky top-0 bg-white">
          <h3 className="font-display text-lg">
            {initialData ? "Edit Product" : "Add New Product"}
          </h3>
          <button type="button" onClick={onCancel} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs tracking-wide text-[var(--color-ink-soft)] mb-1.5">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full border border-[var(--color-border)] px-3 py-2.5 text-sm outline-none focus:border-[var(--color-accent)] rounded-md"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs tracking-wide text-[var(--color-ink-soft)] mb-1.5">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                value={form.brand}
                onChange={handleChange}
                placeholder="Aurelle Beauty"
                className="w-full border border-[var(--color-border)] px-3 py-2.5 text-sm outline-none focus:border-[var(--color-accent)] rounded-md"
              />
            </div>
            <div>
              <label className="block text-xs tracking-wide text-[var(--color-ink-soft)] mb-1.5">
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border border-[var(--color-border)] px-3 py-2.5 text-sm outline-none focus:border-[var(--color-accent)] rounded-md bg-white"
              >
                {productCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs tracking-wide text-[var(--color-ink-soft)] mb-1.5">
                Price (Tk)
              </label>
              <input
                type="number"
                name="price"
                required
                min="0"
                value={form.price}
                onChange={handleChange}
                className="w-full border border-[var(--color-border)] px-3 py-2.5 text-sm outline-none focus:border-[var(--color-accent)] rounded-md"
              />
            </div>
            <div>
              <label className="block text-xs tracking-wide text-[var(--color-ink-soft)] mb-1.5">
                Old Price (optional)
              </label>
              <input
                type="number"
                name="oldPrice"
                min="0"
                value={form.oldPrice}
                onChange={handleChange}
                className="w-full border border-[var(--color-border)] px-3 py-2.5 text-sm outline-none focus:border-[var(--color-accent)] rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs tracking-wide text-[var(--color-ink-soft)] mb-1.5">
              Image URL
            </label>
            <input
              type="url"
              name="image"
              required
              value={form.image}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/..."
              className="w-full border border-[var(--color-border)] px-3 py-2.5 text-sm outline-none focus:border-[var(--color-accent)] rounded-md"
            />
          </div>

          <div>
            <label className="block text-xs tracking-wide text-[var(--color-ink-soft)] mb-1.5">
              Description
            </label>
            <textarea
              name="description"
              rows={3}
              value={form.description}
              onChange={handleChange}
              className="w-full border border-[var(--color-border)] px-3 py-2.5 text-sm outline-none focus:border-[var(--color-accent)] rounded-md resize-none"
            />
          </div>

          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              name="isNew"
              checked={form.isNew}
              onChange={handleChange}
              className="accent-[var(--color-accent)] w-4 h-4"
            />
            Mark as New Arrival
          </label>
        </div>

        <div className="flex gap-3 px-6 py-4 border-t border-[var(--color-border)] sticky bottom-0 bg-white">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 border border-[var(--color-border)] py-2.5 text-sm rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 bg-[var(--color-ink)] text-white py-2.5 text-sm rounded-md hover:bg-[var(--color-accent)] transition-colors"
          >
            {initialData ? "Save Changes" : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
