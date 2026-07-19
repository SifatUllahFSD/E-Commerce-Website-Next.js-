export default function TopBar() {
  return (
    <div className="hidden md:block fixed top-0 inset-x-0 z-40 bg-[var(--color-ink)] text-[var(--color-bg)]">
      <div className="max-w-7xl mx-auto px-6 h-9 flex items-center justify-between text-xs tracking-wide">
        <p>Free delivery inside Dhaka on orders over 1000 Taka</p>
        <div className="flex items-center gap-6">
          <a href="/track/order" className="hover:text-[var(--color-gold)] transition-colors">
            Track Order
          </a>
          <a href="tel:01700000000" className="hover:text-[var(--color-gold)] transition-colors">
            Call Us
          </a>
          <a href="/login" className="hover:text-[var(--color-gold)] transition-colors">
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}
