"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, RotateCcw } from "lucide-react";
import {
  loadAdminProducts,
  saveAdminProducts,
  nextProductId,
  buildProductFromForm,
  resetAdminProducts,
} from "@/lib/adminProducts";
import { handleImgError } from "@/lib/fallback";
import ProductForm from "./ProductForm";

export default function ProductsManager() {
  const [list, setList] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    setList(loadAdminProducts());
    setLoaded(true);
  }, []);

  const persist = (newList) => {
    setList(newList);
    saveAdminProducts(newList);
  };

  const handleAddClick = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this product? This cannot be undone.")) return;
    persist(list.filter((p) => p.id !== id));
  };

  const handleFormSubmit = (formData) => {
    if (editingProduct) {
      const updated = buildProductFromForm(formData, editingProduct.id);
      persist(list.map((p) => (p.id === editingProduct.id ? updated : p)));
    } else {
      const newProduct = buildProductFromForm(formData, nextProductId(list));
      persist([newProduct, ...list]);
    }
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleResetAll = () => {
    if (!window.confirm("Reset all products back to the original demo data?")) return;
    setList(resetAdminProducts());
  };

  if (!loaded) {
    return <p className="text-sm text-[var(--color-ink-soft)]">Loading products...</p>;
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <p className="text-sm text-[var(--color-ink-soft)]">
          {list.length} product{list.length !== 1 ? "s" : ""} &middot; stored locally in
          this browser
        </p>
        <div className="flex gap-3">
          <button
            onClick={handleResetAll}
            className="flex items-center gap-2 text-sm border border-[var(--color-border)] px-4 py-2.5 rounded-md hover:bg-[var(--color-bg)] transition-colors"
          >
            <RotateCcw size={14} />
            Reset
          </button>
          <button
            onClick={handleAddClick}
            className="flex items-center gap-2 text-sm bg-[var(--color-ink)] text-white px-4 py-2.5 rounded-md hover:bg-[var(--color-accent)] transition-colors"
          >
            <Plus size={14} />
            Add Product
          </button>
        </div>
      </div>

      <div className="bg-white border border-[var(--color-border)] rounded-lg overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr className="text-left text-xs text-[var(--color-ink-soft)] border-b border-[var(--color-border)]">
              <th className="px-5 py-3">Product</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Price</th>
              <th className="px-5 py-3">New</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((p) => (
              <tr key={p.id} className="border-b border-[var(--color-border)] last:border-b-0">
                <td className="px-5 py-3 flex items-center gap-3">
                  <img
                    src={p.image}
                    alt={p.name}
                    onError={handleImgError}
                    className="w-9 h-9 rounded-md object-cover shrink-0"
                  />
                  <span className="truncate max-w-[220px]">{p.name}</span>
                </td>
                <td className="px-5 py-3 text-[var(--color-ink-soft)]">{p.category}</td>
                <td className="px-5 py-3">
                  Tk {p.price}
                  {p.oldPrice && (
                    <span className="text-xs text-[var(--color-ink-soft)] line-through ml-1">
                      Tk {p.oldPrice}
                    </span>
                  )}
                </td>
                <td className="px-5 py-3">
                  {p.isNew ? (
                    <span className="text-xs bg-[var(--color-accent-soft)] text-[var(--color-accent)] px-2 py-1 rounded">
                      New
                    </span>
                  ) : (
                    <span className="text-xs text-[var(--color-ink-soft)]">—</span>
                  )}
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => handleEditClick(p)}
                      aria-label="Edit product"
                      className="text-[var(--color-ink-soft)] hover:text-[var(--color-accent)] transition-colors"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      aria-label="Delete product"
                      className="text-[var(--color-ink-soft)] hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-[var(--color-ink-soft)]">
                  No products yet. Click &quot;Add Product&quot; to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <ProductForm
          initialData={editingProduct}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
}
