"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/context/ToastContext";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { showToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast(`A 6-digit code has been sent to ${email}`);
    router.push(`/reset-password?email=${encodeURIComponent(email)}`);
  };

  return (
    <main>
      <TopBar />
      <Navbar />

      <div className="max-w-md mx-auto px-6 py-20">
        <div className="text-center mb-10">
          <Mail size={40} className="mx-auto mb-4 text-[var(--color-accent)]" />
          <h1 className="font-display text-3xl mb-2">Forgot Password</h1>
          <p className="text-sm text-[var(--color-ink-soft)]">
            Enter your email and we&apos;ll send you a 6-digit verification code
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
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

          <button
            type="submit"
            className="w-full bg-[var(--color-ink)] text-white py-3 text-sm tracking-wide hover:bg-[var(--color-accent)] transition-colors rounded-md"
          >
            Send Verification Code
          </button>
        </form>

        <p className="text-center text-sm text-[var(--color-ink-soft)] mt-8">
          Remember your password?{" "}
          <a href="/login" className="text-[var(--color-accent)] hover:underline">
            Sign In
          </a>
        </p>
      </div>

      <Footer />
    </main>
  );
}
