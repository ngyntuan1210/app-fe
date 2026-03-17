import ClientLayout from "@/layouts/ClientLayout";
import BannerCarousel from "@/components/home/BannerCarousel";
import ProductSection from "@/components/home/ProductSection";
import PromoBanner from "@/components/home/PromoBanner";
import NewsSection from "@/components/home/NewsSection";

export default function Home() {
 return (
    <ClientLayout>

      <BannerCarousel />

      <ProductSection />

      <PromoBanner />

      <NewsSection />

    </ClientLayout>
  );
}
