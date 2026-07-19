"use client";

const STORAGE_KEY = "aurelle_orders";

export const orderStatuses = [
  "Pending",
  "Confirmed",
  "Shipped",
  "Delivered",
  "Cancelled",
];

function seedOrders() {
  return [
    {
      id: "AUR-10231",
      customerName: "Nusrat Jahan",
      phone: "01711223344",
      email: "nusrat@example.com",
      address: "House 12, Road 4, Banani",
      city: "Dhaka",
      paymentMethod: "cod",
      items: [
        { id: 1, name: "Radiance Sunscreen SPF 50", price: 990, qty: 2 },
        { id: 5, name: "Rose Petal Body Mist", price: 750, qty: 1 },
      ],
      deliveryFee: 60,
      total: 2730,
      status: "Delivered",
      createdAt: "2026-07-10T09:20:00.000Z",
    },
    {
      id: "AUR-10232",
      customerName: "Tanvir Ahmed",
      phone: "01822334455",
      email: "tanvir@example.com",
      address: "Flat 3B, Chattogram Road",
      city: "Chattogram",
      paymentMethod: "card",
      items: [{ id: 3, name: "Velvet Matte Lipstick", price: 650, qty: 1 }],
      deliveryFee: 120,
      total: 770,
      status: "Shipped",
      createdAt: "2026-07-14T13:05:00.000Z",
    },
    {
      id: "AUR-10233",
      customerName: "Sadia Islam",
      phone: "01933445566",
      email: "sadia@example.com",
      address: "House 7, Sector 10, Uttara",
      city: "Dhaka",
      paymentMethod: "cod",
      items: [
        { id: 2, name: "Hydrating Face Serum", price: 1200, qty: 1 },
        { id: 4, name: "Silk Eyeshadow Palette", price: 1450, qty: 1 },
      ],
      deliveryFee: 60,
      total: 2710,
      status: "Pending",
      createdAt: "2026-07-18T16:40:00.000Z",
    },
  ];
}

export function loadOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    // ignore
  }
  const seeded = seedOrders();
  saveOrders(seeded);
  return seeded;
}

export function saveOrders(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    // ignore
  }
}

function nextOrderId(list) {
  const nums = list
    .map((o) => parseInt(String(o.id).replace(/[^0-9]/g, ""), 10))
    .filter((n) => !Number.isNaN(n));
  const max = nums.length ? Math.max(...nums) : 10230;
  return `AUR-${max + 1}`;
}

// checkout থেকে নতুন অর্ডার তৈরি করার সময় ব্যবহার হয় — cart items + shipping form নিয়ে
// একটি order object বানিয়ে localStorage-এ যোগ করে, এবং নতুন order-এর id রিটার্ন করে।
export function createOrder({ items, form, deliveryFee, total }) {
  const list = loadOrders();
  const order = {
    id: nextOrderId(list),
    customerName: form.fullName,
    phone: form.phone,
    email: form.email || "",
    address: form.address,
    city: form.city,
    paymentMethod: form.paymentMethod,
    items: items.map((i) => ({ id: i.id, name: i.name, price: i.price, qty: i.qty })),
    deliveryFee,
    total,
    status: "Pending",
    createdAt: new Date().toISOString(),
  };
  const updated = [order, ...list];
  saveOrders(updated);
  return order;
}

export function updateOrderStatus(id, status) {
  const list = loadOrders();
  const updated = list.map((o) => (o.id === id ? { ...o, status } : o));
  saveOrders(updated);
  return updated;
}

export function deleteOrder(id) {
  const list = loadOrders();
  const updated = list.filter((o) => o.id !== id);
  saveOrders(updated);
  return updated;
}

export function findOrder(id) {
  const list = loadOrders();
  return list.find((o) => o.id.toLowerCase() === String(id).toLowerCase().trim()) || null;
}
