import Footer from "@/components/Footer";
import dbConnect from "@/lib/db";
import Product from "@/lib/models/Product";
import ProductDetails from "@/components/ProductDetails";

export default async function ProductPage({ params }) {
  try {
    await dbConnect();
    const product = await Product.findById(params.id).lean();
    if (!product) {
      return (
        <main className="section">
          <h1>Product not found</h1>
          <p>The requested product could not be located.</p>
        </main>
      );
    }

    const serializable = JSON.parse(JSON.stringify(product));

    return (
      <>
        <main>
          <ProductDetails product={serializable} />
        </main>
        <Footer />
      </>
    );
  } catch (error) {
    console.error("Error loading product:", error);
    return (
      <main className="section">
        <h1>Error</h1>
        <p>Unable to load product details.</p>
      </main>
    );
  }
}
