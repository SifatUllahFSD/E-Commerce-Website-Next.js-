import { Mail } from "lucide-react";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "./SocialIcons";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-bg)] mt-14">
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-xl mb-1">Join The Aurelle Circle</h3>
            <p className="text-sm text-white/60">
              Get early access to new launches and exclusive offers.
            </p>
          </div>
          <form className="flex w-full md:w-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="bg-transparent border border-white/20 px-3 sm:px-4 py-3 text-sm outline-none w-full md:w-72 placeholder:text-white/40 min-w-0"
            />
            <button
              type="submit"
              className="bg-[var(--color-accent)] px-4 sm:px-6 py-3 text-sm tracking-wide shrink-0"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <h4 className="font-display text-lg mb-4">Aurelle</h4>
          <p className="text-sm text-white/60 leading-relaxed">
            Premium beauty and lifestyle essentials, curated for you.
          </p>
          <div className="flex gap-4 mt-5">
            <a href="#" aria-label="Facebook" className="hover:text-[var(--color-gold)] transition-colors">
              <FacebookIcon />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-[var(--color-gold)] transition-colors">
              <InstagramIcon />
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-[var(--color-gold)] transition-colors">
              <YoutubeIcon />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm tracking-wide mb-4 text-white/80">Shop</h4>
          <ul className="space-y-2.5 text-sm text-white/60">
            <li><a href="/category/makeup" className="hover:text-white transition-colors">Makeup</a></li>
            <li><a href="/category/skin-care" className="hover:text-white transition-colors">Skin Care</a></li>
            <li><a href="/category/hair-care" className="hover:text-white transition-colors">Hair Care</a></li>
            <li><a href="/offered/product" className="hover:text-white transition-colors">Flash Sale</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm tracking-wide mb-4 text-white/80">Support</h4>
          <ul className="space-y-2.5 text-sm text-white/60">
            <li><a href="/track/order" className="hover:text-white transition-colors">Track Order</a></li>
            <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
            <li><a href="/forgot-password" className="hover:text-white transition-colors">Forgot Password</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm tracking-wide mb-4 text-white/80">Contact</h4>
          <ul className="space-y-2.5 text-sm text-white/60">
            <li className="flex items-center gap-2">
              <Mail size={14} />
              support@aurelle.com
            </li>
            <li>+880 1700-000000</li>
            <li>Dhaka, Bangladesh</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 text-xs text-white/40 flex flex-col sm:flex-row justify-between gap-2">
          <p>&copy; 2026 Aurelle. All rights reserved.</p>
          <p>Cash on Delivery available across Bangladesh</p>
        </div>
      </div>
    </footer>
  );
}
