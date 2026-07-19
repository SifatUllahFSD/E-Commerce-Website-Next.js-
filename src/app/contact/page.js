"use client";

import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/context/ToastContext";

export default function ContactPage() {
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <main>
      <TopBar />
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-14">
          <p className="text-[var(--color-accent)] text-xs tracking-[0.2em] uppercase mb-2">
            Get In Touch
          </p>
          <h1 className="font-display text-3xl">Contact Us</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-14">
          <div>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 shrink-0 bg-[var(--color-accent-soft)] flex items-center justify-center rounded-md">
                  <Phone size={18} className="text-[var(--color-accent)]" />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Phone</p>
                  <p className="text-sm text-[var(--color-ink-soft)]">+880 1700-000000</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 shrink-0 bg-[var(--color-accent-soft)] flex items-center justify-center rounded-md">
                  <Mail size={18} className="text-[var(--color-accent)]" />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Email</p>
                  <p className="text-sm text-[var(--color-ink-soft)]">support@aurelle.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 shrink-0 bg-[var(--color-accent-soft)] flex items-center justify-center rounded-md">
                  <MapPin size={18} className="text-[var(--color-accent)]" />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Address</p>
                  <p className="text-sm text-[var(--color-ink-soft)]">Gulshan Avenue, Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs tracking-wide text-[var(--color-ink-soft)] mb-2">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] transition-colors rounded-md"
              />
            </div>
            <div>
              <label className="block text-xs tracking-wide text-[var(--color-ink-soft)] mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] transition-colors rounded-md"
              />
            </div>
            <div>
              <label className="block text-xs tracking-wide text-[var(--color-ink-soft)] mb-2">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                className="w-full border border-[var(--color-border)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] transition-colors resize-none rounded-md"
              />
            </div>
            <button
              type="submit"
              className="bg-[var(--color-ink)] text-white px-8 py-3 text-sm tracking-wide hover:bg-[var(--color-accent)] transition-colors rounded-md"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </main>
  );
}
