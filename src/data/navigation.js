export const navigation = [
  { label: "Home", href: "/" },
  {
    label: "Makeup",
    href: "/category/makeup",
    columns: [
      {
        heading: "Face Makeup",
        links: [
          { name: "Foundation", href: "/category/makeup" },
          { name: "Concealer", href: "/category/makeup" },
          { name: "Face Powder", href: "/category/makeup" },
          { name: "Blush", href: "/category/makeup" },
          { name: "Highlighter", href: "/category/makeup" },
        ],
      },
      {
        heading: "Lips Makeup",
        links: [
          { name: "Bullet Lipstick", href: "/category/makeup" },
          { name: "Liquid Lipstick", href: "/category/makeup" },
          { name: "Lip Gloss", href: "/category/makeup" },
          { name: "Lip Tint", href: "/category/makeup" },
        ],
      },
      {
        heading: "Eye Makeup",
        links: [
          { name: "Mascara", href: "/category/makeup" },
          { name: "Eye Liner", href: "/category/makeup" },
          { name: "Eye Shadow", href: "/category/makeup" },
          { name: "Kajal", href: "/category/makeup" },
        ],
      },
      {
        heading: "Nails & Tools",
        links: [
          { name: "Nail Polish", href: "/category/makeup" },
          { name: "Makeup Brush", href: "/category/makeup" },
          { name: "Beauty Blender", href: "/category/makeup" },
        ],
      },
    ],
    promo: {
      title: "The Glow Edit",
      subtitle: "New season shades, just landed",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop",
      href: "/category/makeup",
    },
  },
  {
    label: "Skin Care",
    href: "/category/skin-care",
    columns: [
      {
        heading: "Face Care",
        links: [
          { name: "Facewash & Cleanser", href: "/category/skin-care" },
          { name: "Serum & Essence", href: "/category/skin-care" },
          { name: "Sunscreen", href: "/category/skin-care" },
          { name: "Toner", href: "/category/skin-care" },
        ],
      },
      {
        heading: "Body Care",
        links: [
          { name: "Body Wash", href: "/category/skin-care" },
          { name: "Body Scrub", href: "/category/skin-care" },
          { name: "Lotions & Creams", href: "/category/skin-care" },
        ],
      },
    ],
    promo: {
      title: "Skin First",
      subtitle: "Dermat-approved daily rituals",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop",
      href: "/category/skin-care",
    },
  },
  { label: "Hair Care", href: "/category/hair-care" },
  { label: "Fragrance", href: "/category/fragrance" },
  { label: "Flash Sale", href: "/offered/product" },
];
