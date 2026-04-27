import BlogPageClient from "@/components/BlogPageClient";
import { getBlogPosts } from "@/lib/blog-posts";

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return <BlogPageClient posts={posts} />;
}