import { NextResponse, type NextRequest } from "next/server";
import { fetchGalleryCollectionBySlug } from "@/lib/galleries";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await context.params;
    const gallery = await fetchGalleryCollectionBySlug(slug);

    if (!gallery) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(gallery);
  } catch (error) {
    console.error("Error fetching gallery from WordPress:", error);
    return NextResponse.json(
      { error: "Failed to load gallery" },
      { status: 500 },
    );
  }
}

