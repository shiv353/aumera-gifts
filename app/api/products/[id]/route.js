import dbConnect from "@/lib/db";
import Product from "@/lib/models/Product";

const normalizeProductData = (body) => {
  const normalized = { ...body };

  if (typeof normalized.images === "string") {
    normalized.images = normalized.images
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);
  }

  if (typeof normalized.rating === "string" && normalized.rating.trim() !== "") {
    normalized.rating = Number(normalized.rating);
  }

  return normalized;
};

export async function PATCH(request, { params }) {
  try {
    await dbConnect();
    const body = await request.json();
    const product = await Product.findByIdAndUpdate(
      params.id,
      { $set: normalizeProductData(body) },
      { new: true, runValidators: true }
    );

    if (!product) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    return Response.json(product, { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return Response.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  return PATCH(request, { params });
}
