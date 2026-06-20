import dbConnect from "@/lib/db";
import Product from "@/lib/models/Product";

export async function GET(request) {
  try {
    await dbConnect();
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "12", 10);
    const topRated = url.searchParams.get("topRated") === "true";

    const query = {};
    const sort = topRated ? { rating: -1, createdAt: -1 } : { createdAt: -1 };
    const skip = (Math.max(page, 1) - 1) * limit;

    const total = await Product.countDocuments(query);
    const products = await Product.find(query).sort(sort).skip(skip).limit(limit);
    const totalPages = Math.max(Math.ceil(total / limit), 1);

    const headers = {
      "Cache-Control": "public, max-age=60, stale-while-revalidate=30"
    };

    return new Response(JSON.stringify({ products, total, totalPages, page, limit }), {
      status: 200,
      headers
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return Response.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const product = await Product.create(body);
    return Response.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return Response.json({ error: "Failed to create product" }, { status: 500 });
  }
}
