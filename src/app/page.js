import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroBanner from "@/components/home/HeroBanner";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import NewArrivals from "@/components/home/NewArrivals";
import TopSellingProducts from "@/components/home/TopSellingProducts";
import MakeupSection from "@/components/home/MakeupSection";
import SkinCareSection from "@/components/home/SkinCareSection";
import HairCareSection from "@/components/home/HairCareSection";
import FragranceSection from "@/components/home/FragranceSection";
import ExploreProducts from "@/components/home/ExploreProducts";
import FlashSale from "@/components/home/FlashSale";

export default function Home() {
  return (
    <main>
      <TopBar />
      <Navbar />
      <HeroBanner />
      <FeaturedCategories />
      <NewArrivals />
      <TopSellingProducts />
      <MakeupSection />
      <SkinCareSection />
      <HairCareSection />
      <FragranceSection />
      <ExploreProducts />
      <FlashSale />
      <Footer />
    </main>
  );
}
