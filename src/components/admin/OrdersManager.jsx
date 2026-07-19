"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, Eye, Trash2, X } from "lucide-react";
import {
  loadOrders,
  updateOrderStatus,
  deleteOrder,
  orderStatuses,
} from "@/lib/adminOrders";

const statusStyles = {
  Pending: "bg-amber-50 text-amber-700",
  Confirmed: "bg-blue-50 text-blue-700",
  Shipped: "bg-purple-50 text-purple-700",
  Delivered: "bg-green-50 text-green-700",
  Cancelled: "bg-red-50 text-red-700",
};

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

export default function OrdersManager() {
  const [list, setList] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewOrder, setViewOrder] = useState(null);

  useEffect(() => {
    setList(loadOrders());
    setLoaded(true);
  }, []);

  const filtered = useMemo(() => {
    return list.filter((o) => {
      const matchesQuery =
        !query.trim() ||
        o.id.toLowerCase().includes(query.trim().toLowerCase()) ||
        o.customerName.toLowerCase().includes(query.trim().toLowerCase()) ||
        o.phone.includes(query.trim());
      const matchesStatus = statusFilter === "all" || o.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [list, query, statusFilter]);

  const handleStatusChange = (id, status) => {
    const updated = updateOrderStatus(id, status);
    setList(updated);
    if (viewOrder && viewOrder.id === id) {
      setViewOrder((prev) => ({ ...prev, status }));
    }
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this order? This cannot be undone.")) return;
    setList(deleteOrder(id));
    if (viewOrder && viewOrder.id === id) setViewOrder(null);
  };

  if (!loaded) {
    return <p className="text-sm text-[var(--color-ink-soft)]">Loading orders...</p>;
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <p className="text-sm text-[var(--color-ink-soft)]">
          {list.length} order{list.length !== 1 ? "s" : ""} &middot; stored locally in
          this browser
        </p>

        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-soft)]"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search order, name, phone"
              className="border border-[var(--color-border)] pl-9 pr-3 py-2.5 text-sm outline-none focus:border-[var(--color-accent)] rounded-md w-56"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-[var(--color-border)] px-3 py-2.5 text-sm outline-none focus:border-[var(--color-accent)] rounded-md bg-white"
          >
            <option value="all">All Statuses</option>
            {orderStatuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white border border-[var(--color-border)] rounded-lg overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[680px]">
          <thead>
            <tr className="text-left text-xs text-[var(--color-ink-soft)] border-b border-[var(--color-border)]">
              <th className="px-5 py-3">Order ID</th>
              <th className="px-5 py-3">Customer</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Total</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr key={o.id} className="border-b border-[var(--color-border)] last:border-b-0">
                <td className="px-5 py-3 font-medium">#{o.id}</td>
                <td className="px-5 py-3">
                  <p className="truncate max-w-[160px]">{o.customerName}</p>
                  <p className="text-xs text-[var(--color-ink-soft)]">{o.phone}</p>
                </td>
                <td className="px-5 py-3 text-[var(--color-ink-soft)]">
                  {formatDate(o.createdAt)}
                </td>
                <td className="px-5 py-3">Tk {o.total}</td>
                <td className="px-5 py-3">
                  <select
                    value={o.status}
                    onChange={(e) => handleStatusChange(o.id, e.target.value)}
                    className={`text-xs px-2 py-1.5 rounded-md border-0 outline-none cursor-pointer ${statusStyles[o.status] || "bg-gray-50 text-gray-700"}`}
                  >
                    {orderStatuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => setViewOrder(o)}
                      aria-label="View order"
                      className="text-[var(--color-ink-soft)] hover:text-[var(--color-accent)] transition-colors"
                    >
                      <Eye size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(o.id)}
                      aria-label="Delete order"
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
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {viewOrder && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setViewOrder(null)} />

          <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 h-14 border-b border-[var(--color-border)] sticky top-0 bg-white">
              <h3 className="font-display text-lg">Order #{viewOrder.id}</h3>
              <button type="button" onClick={() => setViewOrder(null)} aria-label="Close">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <p className="text-xs tracking-wide text-[var(--color-ink-soft)] mb-2">
                  Customer
                </p>
                <p className="text-sm">{viewOrder.customerName}</p>
                <p className="text-sm text-[var(--color-ink-soft)]">{viewOrder.phone}</p>
                {viewOrder.email && (
                  <p className="text-sm text-[var(--color-ink-soft)]">{viewOrder.email}</p>
                )}
              </div>

              <div>
                <p className="text-xs tracking-wide text-[var(--color-ink-soft)] mb-2">
                  Shipping Address
                </p>
                <p className="text-sm">{viewOrder.address}</p>
                <p className="text-sm text-[var(--color-ink-soft)]">{viewOrder.city}</p>
              </div>

              <div>
                <p className="text-xs tracking-wide text-[var(--color-ink-soft)] mb-2">
                  Items
                </p>
                <div className="space-y-2">
                  {viewOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span>
                        {item.name} &times; {item.qty}
                      </span>
                      <span>Tk {item.price * item.qty}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[var(--color-border)] mt-3 pt-3 space-y-1">
                  <div className="flex justify-between text-sm text-[var(--color-ink-soft)]">
                    <span>Delivery</span>
                    <span>Tk {viewOrder.deliveryFee}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span>Total</span>
                    <span>Tk {viewOrder.total}</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs tracking-wide text-[var(--color-ink-soft)] mb-2">
                  Status
                </p>
                <select
                  value={viewOrder.status}
                  onChange={(e) => handleStatusChange(viewOrder.id, e.target.value)}
                  className="w-full border border-[var(--color-border)] px-3 py-2.5 text-sm outline-none focus:border-[var(--color-accent)] rounded-md bg-white"
                >
                  {orderStatuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
