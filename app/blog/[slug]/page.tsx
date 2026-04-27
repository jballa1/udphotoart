// /app/blog/[slug]/page.tsx

import { getBlogPostBySlug } from "@/lib/blog-posts";
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogPostPage({ params }: Props) {
  // ✅ FIX 1: Await params (Next.js 15 requirement)
  const { slug } = await params;

  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  return (
    <main className="bg-white">
      {/* HERO IMAGE */}
      {post.image && (
        <div className="w-full h-[60vh] relative">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h1 className="text-white text-4xl md:text-5xl font-serif text-center max-w-3xl px-4">
              {post.title}
            </h1>
          </div>
        </div>
      )}

      {/* CONTENT */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <article className="prose prose-lg max-w-none">
          {/* ✅ FIX 2: Ensure content is always string */}
          <div
            dangerouslySetInnerHTML={{
              __html: post.content || "",
            }}
          />
        </article>
      </section>
    </main>
  );
}