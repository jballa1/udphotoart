import { NextResponse, type NextRequest } from "next/server";
import {
  fetchAllGalleryCollections,
  fetchGalleryCollectionsByGroup,
} from "@/lib/galleries";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const groupParam = searchParams.get("group");

    if (groupParam) {
      const collections = await fetchGalleryCollectionsByGroup(groupParam);
      return NextResponse.json(collections);
    }

    const all = await fetchAllGalleryCollections();
    return NextResponse.json(all);
  } catch (error) {
    console.error("Error fetching galleries from WordPress:", error);
    return NextResponse.json(
      { error: "Failed to load galleries" },
      { status: 500 },
    );
  }
}
