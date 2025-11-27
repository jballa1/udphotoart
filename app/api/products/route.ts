import { NextResponse } from "next/server";
import { fetchProducts } from "@/lib/products";

export async function GET() {
  try {
    const products = await fetchProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products from WordPress:", error);
    return NextResponse.json(
      { error: "Failed to load products" },
      { status: 500 },
    );
  }
}

