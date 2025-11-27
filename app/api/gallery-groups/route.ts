import { NextResponse } from "next/server";
import {
  fetchAllGalleryCollections,
  fetchGalleryGroupsMeta,
} from "@/lib/galleries";

export async function GET() {
  try {
    const [groups, collections] = await Promise.all([
      fetchGalleryGroupsMeta(),
      fetchAllGalleryCollections(),
    ]);

    const bySlug = new Map(
      groups.map((g) => [g.slug, { ...g, photos: 0, locations: 0, names: [] as string[] }]),
    );

    for (const c of collections) {
      const entry = bySlug.get(c.group);
      if (!entry) continue;
      entry.photos += c.photoCount ?? 0;
      entry.locations += 1;
      entry.names.push(c.name);
    }

    const result = Array.from(bySlug.values());
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching gallery groups:", error);
    return NextResponse.json(
      { error: "Failed to load gallery groups" },
      { status: 500 },
    );
  }
}

