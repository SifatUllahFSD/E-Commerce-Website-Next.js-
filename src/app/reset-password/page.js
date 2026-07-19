"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, KeyRound } from "lucide-react";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/context/ToastContext";

function ResetPasswordForm() {
  const router = useRouter();
  const { showToast } = useToast();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleCodeChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...code];
    next[index] = value;
    setCode(next);
    if (value && index < 5) {
      document.getElementById(`code-${index + 1}`)?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.join("").length !== 6) {
      showToast("Please enter the full 6-digit code");
      return;
    }
    if (password !== confirmPassword) {
      showToast("Passwords do not match");
      return;
    }
    showToast("Password reset successful! Please sign in.");
    router.push("/login");
  };

  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <div className="text-center mb-10">
        <KeyRound size={40} className="mx-auto mb-4 text-[var(--color-accent)]" />
        <h1 className="font-display text-3xl mb-2">Reset Password</h1>
        <p className="text-sm text-[var(--color-ink-soft)]">
          Enter the 6-digit code sent to{" "}
          <span className="text-[var(--color-ink)]">{email || "your email"}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs tracking-wide text-[var(--color-ink-soft)] mb-3 text-center">
            Verification Code
          </label>
          <div className="flex justify-center gap-2">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                className="w-11 h-12 text-center border border-[var(--color-border)] text-lg outline-none focus:border-[var(--color-accent)] transition-colors rounded-md"
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs tracking-wide text-[var(--color-ink-soft)] mb-2">
            New Password
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

        <div>
          <label className="block text-xs tracking-wide text-[var(--color-ink-soft)] mb-2">
            Confirm New Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] transition-colors rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[var(--color-ink)] text-white py-3 text-sm tracking-wide hover:bg-[var(--color-accent)] transition-colors rounded-md"
        >
          Reset Password
        </button>
      </form>

      <p className="text-center text-sm text-[var(--color-ink-soft)] mt-8">
        Didn&apos;t get a code?{" "}
        <a href="/forgot-password" className="text-[var(--color-accent)] hover:underline">
          Resend
        </a>
      </p>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <main>
      <TopBar />
      <Navbar />
      <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
      <Footer />
    </main>
  );
}
