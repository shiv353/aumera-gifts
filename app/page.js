import AboutUs from "@/components/AboutUs";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import Navbar from "@/components/Navbar";
import TopProducts from "@/components/TopProducts";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroCarousel />
        <TopProducts />
        <AboutUs />
      </main>
      <Footer />
    </>
  );
}
