import { NextResponse } from "next/server";
import { fetchBlogPosts } from "@/lib/wordpress";

export async function GET() {
  try {
    const posts = await fetchBlogPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching blog posts from WordPress:", error);
    return NextResponse.json(
      { error: "Failed to load blog posts" },
      { status: 500 },
    );
  }
}

