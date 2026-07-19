"use client";

const STORAGE_KEY = "aurelle_customers";

function seedCustomers() {
  return [
    {
      id: 1,
      name: "Nusrat Jahan",
      email: "nusrat@example.com",
      phone: "01711223344",
      city: "Dhaka",
      joinedAt: "2026-05-02T00:00:00.000Z",
    },
    {
      id: 2,
      name: "Tanvir Ahmed",
      email: "tanvir@example.com",
      phone: "01822334455",
      city: "Chattogram",
      joinedAt: "2026-05-18T00:00:00.000Z",
    },
    {
      id: 3,
      name: "Sadia Islam",
      email: "sadia@example.com",
      phone: "01933445566",
      city: "Dhaka",
      joinedAt: "2026-06-09T00:00:00.000Z",
    },
  ];
}

export function loadCustomers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    // ignore
  }
  const seeded = seedCustomers();
  saveCustomers(seeded);
  return seeded;
}

export function saveCustomers(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    // ignore
  }
}

// রেজিস্টার/লগইন করার সময় কল হয় — নতুন কাস্টমার হলে ডিরেক্টরিতে যোগ করে,
// আগে থেকে থাকলে কিছু করে না।
export function upsertCustomer({ name, email, phone = "", city = "" }) {
  const list = loadCustomers();
  const normalizedEmail = (email || "").trim().toLowerCase();
  if (!normalizedEmail) return list;

  const exists = list.find((c) => c.email.trim().toLowerCase() === normalizedEmail);
  if (exists) return list;

  const nextId = list.length ? Math.max(...list.map((c) => c.id)) + 1 : 1;
  const updated = [
    ...list,
    {
      id: nextId,
      name: name || normalizedEmail.split("@")[0],
      email: email.trim(),
      phone,
      city,
      joinedAt: new Date().toISOString(),
    },
  ];
  saveCustomers(updated);
  return updated;
}

export function deleteCustomer(id) {
  const list = loadCustomers();
  const updated = list.filter((c) => c.id !== id);
  saveCustomers(updated);
  return updated;
}

// প্রতিটা কাস্টমারের নামে/ইমেইলে কতগুলো অর্ডার আছে ও মোট কত টাকা খরচ করেছে তা orders থেকে বের করে
export function withOrderStats(customers, orders) {
  return customers.map((c) => {
    const matched = orders.filter(
      (o) =>
        (o.email && o.email.trim().toLowerCase() === c.email.trim().toLowerCase()) ||
        (o.phone && o.phone === c.phone)
    );
    const totalSpent = matched.reduce((sum, o) => sum + (o.total || 0), 0);
    return { ...c, orderCount: matched.length, totalSpent };
  });
}
