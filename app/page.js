import AboutUs from "@/components/AboutUs";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import Navbar from "@/components/Navbar";
import Products from "@/components/Products";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroCarousel />
        <Products />
        <AboutUs />
      </main>
      <Footer />
    </>
  );
}
