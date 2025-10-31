import CategoryGrid from "../components/home/CategoryGrid";
import FeaturedSection from "../components/home/FeaturedSection";
import HeroSection from "../components/home/HeroSection";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <CategoryGrid />
      <FeaturedSection />
    </Layout>
  );
}
