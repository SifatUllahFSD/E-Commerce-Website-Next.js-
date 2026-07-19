import { notFound } from "next/navigation";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductGallery from "@/components/product/ProductGallery";
import AddToCartBox from "@/components/product/AddToCartBox";
import ProductCard from "@/components/product/ProductCard";
import { products } from "@/data/products";

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) return notFound();

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <main>
      <TopBar />
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <ProductGallery images={product.images} name={product.name} />
          <AddToCartBox product={product} />
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-2xl mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
