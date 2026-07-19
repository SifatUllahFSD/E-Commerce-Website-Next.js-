"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Package, MapPin, LogOut, ShoppingBag } from "lucide-react";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const tabs = [
  { id: "account", label: "Account Info", icon: User },
  { id: "orders", label: "Order History", icon: Package },
  { id: "addresses", label: "Addresses", icon: MapPin },
];

export default function ProfilePage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [user, setUser] = useState({ name: "", email: "" });
  const [activeTab, setActiveTab] = useState("account");

  useEffect(() => {
    let role = null;
    let email = "";
    let name = "";
    try {
      role = sessionStorage.getItem("aurelle_role");
      email = sessionStorage.getItem("aurelle_email") || "";
      name = sessionStorage.getItem("aurelle_name") || "";
    } catch (err) {
      // ignore
    }

    if (!role) {
      router.replace("/login");
      return;
    }

    setUser({ name: name || "Aurelle Customer", email });
    setChecked(true);
  }, [router]);

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

  if (!checked) {
    return (
      <main>
        <TopBar />
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-24 text-center text-[var(--color-ink-soft)]">
          Loading...
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <TopBar />
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-16 h-16 rounded-full bg-[var(--color-accent-soft)] flex items-center justify-center text-[var(--color-accent)] font-display text-2xl">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="font-display text-2xl">{user.name}</h1>
            <p className="text-sm text-[var(--color-ink-soft)]">{user.email}</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          <aside className="w-full md:w-56 shrink-0">
            <nav className="flex md:flex-col gap-2 overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-4 py-3 text-sm text-left rounded-md whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? "bg-[var(--color-ink)] text-white"
                        : "text-[var(--color-ink-soft)] hover:bg-[var(--color-bg)]"
                    }`}
                  >
                    <Icon size={16} />
                    {tab.label}
                  </button>
                );
              })}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 text-sm text-left rounded-md text-[var(--color-accent)] hover:bg-[var(--color-accent-soft)]/40 transition-colors whitespace-nowrap"
              >
                <LogOut size={16} />
                Logout
              </button>
            </nav>
          </aside>

          <div className="flex-1 border border-[var(--color-border)] rounded-lg p-6 min-h-[300px]">
            {activeTab === "account" && (
              <div className="space-y-5 max-w-sm">
                <h2 className="font-display text-xl mb-4">Account Information</h2>
                <div>
                  <label className="block text-xs tracking-wide text-[var(--color-ink-soft)] mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue={user.name}
                    className="w-full border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] transition-colors rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wide text-[var(--color-ink-soft)] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue={user.email}
                    className="w-full border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] transition-colors rounded-md"
                  />
                </div>
                <button className="bg-[var(--color-ink)] text-white px-6 py-3 text-sm tracking-wide rounded-md hover:bg-[var(--color-accent)] transition-colors">
                  Save Changes
                </button>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="text-center py-16">
                <ShoppingBag size={40} className="mx-auto mb-4 text-[var(--color-ink-soft)]" />
                <h2 className="font-display text-xl mb-2">No Orders Yet</h2>
                <p className="text-sm text-[var(--color-ink-soft)] mb-6">
                  Your order history will appear here once you place an order.
                </p>
                <a
                  href="/shop"
                  className="inline-block bg-[var(--color-ink)] text-white px-6 py-3 text-sm tracking-wide rounded-md"
                >
                  Start Shopping
                </a>
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="text-center py-16">
                <MapPin size={40} className="mx-auto mb-4 text-[var(--color-ink-soft)]" />
                <h2 className="font-display text-xl mb-2">No Saved Addresses</h2>
                <p className="text-sm text-[var(--color-ink-soft)] mb-6">
                  Save an address at checkout to see it here next time.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
