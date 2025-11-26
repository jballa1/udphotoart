import { NextResponse, type NextRequest } from "next/server";
import { fetchBlogPostBySlug } from "@/lib/wordpress";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await context.params;
    const post = await fetchBlogPostBySlug(slug);

    if (!post) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching blog post from WordPress:", error);
    return NextResponse.json(
      { error: "Failed to load blog post" },
      { status: 500 },
    );
  }
}
