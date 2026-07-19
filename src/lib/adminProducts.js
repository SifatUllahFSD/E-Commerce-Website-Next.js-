"use client";

import { products as defaultProducts, productCategories } from "@/data/products";

const STORAGE_KEY = "aurelle_admin_products";

export { productCategories };

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function loadAdminProducts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    // ignore
  }
  const seeded = defaultProducts.map((p) => ({ ...p }));
  saveAdminProducts(seeded);
  return seeded;
}

export function saveAdminProducts(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    // ignore
  }
}

export function nextProductId(list) {
  return list.length ? Math.max(...list.map((p) => p.id)) + 1 : 1;
}

export function buildProductFromForm(form, existingId = null) {
  const slug = slugify(form.name);
  return {
    id: existingId ?? undefined,
    slug,
    name: form.name.trim(),
    brand: form.brand.trim() || "Aurelle Beauty",
    category: form.category,
    isNew: !!form.isNew,
    price: Number(form.price) || 0,
    oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
    description: form.description.trim(),
    images: [form.image.trim()],
    image: form.image.trim(),
    href: `/product/${slug}`,
  };
}

export function resetAdminProducts() {
  const seeded = defaultProducts.map((p) => ({ ...p }));
  saveAdminProducts(seeded);
  return seeded;
}
