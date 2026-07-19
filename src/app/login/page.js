"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/context/ToastContext";
import { upsertCustomer } from "@/lib/adminCustomers";

// ডেমো admin ইমেইল — এই ইমেইল দিয়ে "Sign In" করলে /admin ড্যাশবোর্ডে যাবে।
// বাস্তব প্রজেক্টে এই চেক অবশ্যই ব্যাকএন্ডে (ডেটাবেজ + সেশন/JWT) হতে হবে, এটা শুধু ফ্রন্টএন্ড ডেমো।
const ADMIN_EMAIL = "admin@aurelle.com";

export default function LoginPage() {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { showToast } = useToast();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    const isAdmin = email.trim().toLowerCase() === ADMIN_EMAIL;
    const displayName = fullName.trim() || email.split("@")[0] || "Guest";

    try {
      sessionStorage.setItem("aurelle_role", isAdmin ? "admin" : "customer");
      sessionStorage.setItem("aurelle_email", email.trim());
      sessionStorage.setItem("aurelle_name", displayName);
    } catch (err) {
      // sessionStorage না থাকলেও ক্র্যাশ যেন না করে
    }

    if (!isAdmin) {
      upsertCustomer({ name: displayName, email: email.trim() });
    }

    showToast(
      mode === "login" ? "Signed in successfully!" : "Account created successfully!"
    );

    router.push(isAdmin ? "/admin" : "/profile");
  };

  return (
    <main>
      <TopBar />
      <Navbar />

      <div className="max-w-md mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl mb-2">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-sm text-[var(--color-ink-soft)]">
            {mode === "login"
              ? "Sign in to continue to Aurelle"
              : "Join Aurelle for exclusive offers and faster checkout"}
          </p>
        </div>

        <div className="flex border border-[var(--color-border)] mb-8 rounded-md overflow-hidden">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 py-3 text-sm tracking-wide transition-colors ${
              mode === "login" ? "bg-[var(--color-ink)] text-white" : "text-[var(--color-ink-soft)]"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode("register")}
            className={`flex-1 py-3 text-sm tracking-wide transition-colors ${
              mode === "register" ? "bg-[var(--color-ink)] text-white" : "text-[var(--color-ink-soft)]"
            }`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === "register" && (
            <div>
              <label className="block text-xs tracking-wide text-[var(--color-ink-soft)] mb-2">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
                className="w-full border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] transition-colors rounded-md"
              />
            </div>
          )}

          <div>
            <label className="block text-xs tracking-wide text-[var(--color-ink-soft)] mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] transition-colors rounded-md"
            />
          </div>

          <div>
            <label className="block text-xs tracking-wide text-[var(--color-ink-soft)] mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] transition-colors pr-10 rounded-md"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-soft)]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {mode === "login" && (
            <div className="text-right">
              <a href="/forgot-password" className="text-xs text-[var(--color-accent)] hover:underline">
                Forgot password?
              </a>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[var(--color-ink)] text-white py-3 text-sm tracking-wide hover:bg-[var(--color-accent)] transition-colors rounded-md"
          >
            {mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-[var(--color-ink-soft)] mt-8">
          {mode === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <button onClick={() => setMode("register")} className="text-[var(--color-accent)] hover:underline">
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button onClick={() => setMode("login")} className="text-[var(--color-accent)] hover:underline">
                Sign In
              </button>
            </>
          )}
        </p>
      </div>

      <Footer />
    </main>
  );
}
