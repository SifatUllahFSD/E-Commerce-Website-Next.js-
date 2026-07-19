"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, Trash2 } from "lucide-react";
import { loadCustomers, deleteCustomer, withOrderStats } from "@/lib/adminCustomers";
import { loadOrders } from "@/lib/adminOrders";

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch (err) {
    return iso;
  }
}

export default function CustomersManager() {
  const [list, setList] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setList(loadCustomers());
    setOrders(loadOrders());
    setLoaded(true);
  }, []);

  const enriched = useMemo(() => withOrderStats(list, orders), [list, orders]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return enriched;
    return enriched.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q)
    );
  }, [enriched, query]);

  const handleDelete = (id) => {
    if (!window.confirm("Remove this customer from the directory?")) return;
    setList(deleteCustomer(id));
  };

  if (!loaded) {
    return <p className="text-sm text-[var(--color-ink-soft)]">Loading customers...</p>;
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <p className="text-sm text-[var(--color-ink-soft)]">
          {list.length} customer{list.length !== 1 ? "s" : ""} &middot; stored locally in
          this browser
        </p>

        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-soft)]"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email, phone"
            className="border border-[var(--color-border)] pl-9 pr-3 py-2.5 text-sm outline-none focus:border-[var(--color-accent)] rounded-md w-56"
          />
        </div>
      </div>

      <div className="bg-white border border-[var(--color-border)] rounded-lg overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="text-left text-xs text-[var(--color-ink-soft)] border-b border-[var(--color-border)]">
              <th className="px-5 py-3">Customer</th>
              <th className="px-5 py-3">Contact</th>
              <th className="px-5 py-3">Joined</th>
              <th className="px-5 py-3">Orders</th>
              <th className="px-5 py-3">Total Spent</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-b border-[var(--color-border)] last:border-b-0">
                <td className="px-5 py-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)] flex items-center justify-center text-xs font-medium inline-flex mr-3 align-middle">
                    {c.name.charAt(0).toUpperCase()}
                  </div>
                  <span>{c.name}</span>
                </td>
                <td className="px-5 py-3 text-[var(--color-ink-soft)]">
                  <p className="truncate max-w-[200px]">{c.email}</p>
                  {c.phone && <p className="text-xs">{c.phone}</p>}
                </td>
                <td className="px-5 py-3 text-[var(--color-ink-soft)]">
                  {formatDate(c.joinedAt)}
                </td>
                <td className="px-5 py-3">{c.orderCount}</td>
                <td className="px-5 py-3">Tk {c.totalSpent}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end">
                    <button
                      onClick={() => handleDelete(c.id)}
                      aria-label="Remove customer"
                      className="text-[var(--color-ink-soft)] hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-[var(--color-ink-soft)]">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
