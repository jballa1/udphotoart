"use client";

import Link from "next/link";

type BlogPost = {
  id?: string;
  title: string;
  slug: string;
  image?: string;
};

export default function BlogPageClient({ posts }: { posts: BlogPost[] }) {
  return (
    <main className="min-h-screen bg-background p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Blog</h1>

      <div className="max-w-3xl mx-auto space-y-6">
        {posts.map((post) => (
          <div
            key={post.slug}
            className="border p-4 rounded hover:shadow-md transition"
          >
            {/* Image */}
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover rounded mb-3"
              />
            )}

            {/* Title (Clickable) */}
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-xl font-semibold hover:underline cursor-pointer">
                {post.title}
              </h2>
            </Link>

            {/* Slug (temporary subtitle) */}
            <p className="text-sm text-gray-500">{post.slug}</p>
          </div>
        ))}
      </div>
    </main>
  );
}