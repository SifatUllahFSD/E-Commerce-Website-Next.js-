"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  LogOut,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";
import { products as defaultProducts } from "@/data/products";
import { handleImgError } from "@/lib/fallback";
import { loadAdminProducts } from "@/lib/adminProducts";
import { loadOrders } from "@/lib/adminOrders";
import { loadCustomers } from "@/lib/adminCustomers";
import ProductsManager from "@/components/admin/ProductsManager";
import OrdersManager from "@/components/admin/OrdersManager";
import CustomersManager from "@/components/admin/CustomersManager";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "products", label: "Products", icon: Package },
  { id: "orders", label: "Orders", icon: ShoppingBag },
  { id: "customers", label: "Customers", icon: Users },
];

export default function AdminPage() {
  const router = useRouter();
  const [status, setStatus] = useState("checking"); // checking | denied | ok
  const [activeNav, setActiveNav] = useState("dashboard");
  const [liveProducts, setLiveProducts] = useState(defaultProducts);
  const [liveOrders, setLiveOrders] = useState([]);
  const [liveCustomers, setLiveCustomers] = useState([]);

  useEffect(() => {
    let role = null;
    try {
      role = sessionStorage.getItem("aurelle_role");
    } catch (err) {
      // ignore
    }
    setStatus(role === "admin" ? "ok" : "denied");
    setLiveProducts(loadAdminProducts());
    setLiveOrders(loadOrders());
    setLiveCustomers(loadCustomers());
  }, []);

  // Products/Orders/Customers ট্যাব থেকে ফিরে আসার সময় Dashboard-এর সংখ্যাও আপডেট রাখা
  useEffect(() => {
    if (activeNav === "dashboard") {
      setLiveProducts(loadAdminProducts());
      setLiveOrders(loadOrders());
      setLiveCustomers(loadCustomers());
    }
  }, [activeNav]);

  const handleLogout = () => {
    try {
      sessionStorage.removeItem("aurelle_role");
      sessionStorage.removeItem("aurelle_email");
      sessionStorage.removeItem("aurelle_name");
    } catch (err) {
      // ignore
    }
    router.push("/login");
  };

  if (status === "checking") {
    return (
      <div className="min-h-screen flex items-center justify-center text-[var(--color-ink-soft)]">
        Loading...
      </div>
    );
  }

  if (status === "denied") {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <h1 className="font-display text-2xl mb-3">Access Denied</h1>
          <p className="text-sm text-[var(--color-ink-soft)] mb-8">
            This area is only for Aurelle administrators. Please sign in with an
            admin account.
          </p>
          <a
            href="/login"
            className="inline-block bg-[var(--color-ink)] text-white px-6 py-3 text-sm tracking-wide rounded-md"
          >
            Go to Sign In
          </a>
        </div>
      </div>
    );
  }

  const totalRevenue = liveOrders
    .filter((o) => o.status !== "Cancelled")
    .reduce((sum, o) => sum + (o.total || 0), 0);

  const stats = [
    { label: "Total Revenue", value: `Tk ${totalRevenue.toLocaleString()}`, icon: TrendingUp },
    { label: "Total Orders", value: String(liveOrders.length), icon: ShoppingBag },
    { label: "Total Products", value: String(liveProducts.length), icon: Package },
    { label: "Total Customers", value: String(liveCustomers.length), icon: Users },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[var(--color-bg)]">
      {/* Sidebar */}
      <aside className="w-full md:w-60 shrink-0 bg-[var(--color-ink)] text-white flex md:flex-col">
        <div className="px-6 py-5 border-b border-white/10 hidden md:block">
          <p className="font-display text-xl">Aurelle</p>
          <p className="text-xs text-white/50 tracking-wide">Admin Panel</p>
        </div>

        <nav className="flex md:flex-col flex-1 overflow-x-auto scrollbar-hide">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`flex items-center gap-3 px-6 py-4 text-sm whitespace-nowrap transition-colors ${
                  activeNav === item.id
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="hidden md:flex flex-col border-t border-white/10 p-4 gap-2">
          <a
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-xs text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Store
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-xs text-white/60 hover:text-white transition-colors"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 p-6 sm:p-8">
        <h1 className="font-display text-2xl mb-8 capitalize">{activeNav}</h1>

        {activeNav === "dashboard" && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="bg-white border border-[var(--color-border)] rounded-lg p-5"
                  >
                    <Icon size={18} className="text-[var(--color-accent)] mb-3" />
                    <p className="text-xl font-medium">{stat.value}</p>
                    <p className="text-xs text-[var(--color-ink-soft)] mt-1">{stat.label}</p>
                  </div>
                );
              })}
            </div>

            <h2 className="font-display text-lg mb-4">Recent Products</h2>
            <div className="bg-white border border-[var(--color-border)] rounded-lg overflow-hidden overflow-x-auto">
              <table className="w-full text-sm min-w-[500px]">
                <thead>
                  <tr className="text-left text-xs text-[var(--color-ink-soft)] border-b border-[var(--color-border)]">
                    <th className="px-5 py-3">Product</th>
                    <th className="px-5 py-3">Category</th>
                    <th className="px-5 py-3">Price</th>
                    <th className="px-5 py-3">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {liveProducts.slice(0, 6).map((p) => (
                    <tr key={p.id} className="border-b border-[var(--color-border)] last:border-b-0">
                      <td className="px-5 py-3 flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          onError={handleImgError}
                          className="w-9 h-9 rounded-md object-cover"
                        />
                        <span className="truncate max-w-[180px]">{p.name}</span>
                      </td>
                      <td className="px-5 py-3 text-[var(--color-ink-soft)]">{p.category}</td>
                      <td className="px-5 py-3">Tk {p.price}</td>
                      <td className="px-5 py-3 text-green-700">In Stock</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeNav === "products" && <ProductsManager />}
        {activeNav === "orders" && <OrdersManager />}
        {activeNav === "customers" && <CustomersManager />}

        <div className="md:hidden mt-10 flex gap-3">
          <a
            href="/"
            className="flex-1 text-center border border-[var(--color-ink)] py-3 text-sm rounded-md"
          >
            Back to Store
          </a>
          <button
            onClick={handleLogout}
            className="flex-1 text-center bg-[var(--color-ink)] text-white py-3 text-sm rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
