"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import { blogPosts } from "@/lib/blog-posts";
import { notFound } from "next/navigation";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;

  const post = blogPosts.find((p) => p.id === slug);

  if (!post) {
    notFound();
  }

  // Get related posts (same category, exclude current)
  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        </div>

        <div className="relative z-10 container mx-auto px-4 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-bebas tracking-wide">Back to Blog</span>
            </Link>

            <span className="inline-block px-4 py-1 bg-accent text-white text-xs font-bebas tracking-wide rounded-full mb-4">
              {post.category}
            </span>

            <h1 className="font-bebas text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-bebas">
                  RG
                </div>
                <span className="font-medium">{post.author}</span>
              </div>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Excerpt */}
            <div className="mb-12 p-8 bg-muted/30 rounded-2xl border-l-4 border-accent">
              <p className="text-xl text-muted-foreground italic leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none">
              {post.content.split("\n").map((paragraph, index) => {
                // Handle markdown-style headers
                if (paragraph.startsWith("# ")) {
                  return (
                    <h1
                      key={index}
                      className="font-bebas text-4xl md:text-5xl font-bold mb-6 mt-12 tracking-tight"
                    >
                      {paragraph.replace("# ", "")}
                    </h1>
                  );
                }
                if (paragraph.startsWith("## ")) {
                  return (
                    <h2
                      key={index}
                      className="font-bebas text-3xl md:text-4xl font-bold mb-4 mt-10 tracking-tight"
                    >
                      {paragraph.replace("## ", "")}
                    </h2>
                  );
                }
                if (paragraph.startsWith("### ")) {
                  return (
                    <h3
                      key={index}
                      className="font-bebas text-2xl md:text-3xl font-bold mb-3 mt-8 tracking-tight"
                    >
                      {paragraph.replace("### ", "")}
                    </h3>
                  );
                }
                // Handle list items
                if (paragraph.startsWith("- **")) {
                  const match = paragraph.match(/- \*\*(.*?)\*\*: (.+)/);
                  if (match) {
                    return (
                      <div key={index} className="ml-4 mb-2">
                        <span className="font-bold text-accent">
                          • {match[1]}:
                        </span>{" "}
                        <span className="text-muted-foreground">{match[2]}</span>
                      </div>
                    );
                  }
                }
                if (paragraph.startsWith("- ")) {
                  return (
                    <div key={index} className="ml-4 mb-2 text-muted-foreground">
                      • {paragraph.replace("- ", "")}
                    </div>
                  );
                }
                // Regular paragraphs
                if (paragraph.trim()) {
                  return (
                    <p
                      key={index}
                      className="mb-6 text-muted-foreground leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  );
                }
                return null;
              })}
            </div>

            {/* Share Section */}
            <div className="mt-16 pt-8 border-t">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    Share this article:
                  </span>
                  <button className="p-2 rounded-full hover:bg-muted transition-colors">
                    <Share2 className="w-5 h-5 text-accent" />
                  </button>
                </div>
                <Link
                  href="/blog"
                  className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-bebas tracking-wide"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to All Articles
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-black/5">
          <div className="container mx-auto px-4">
            <h2 className="font-bebas text-3xl md:text-4xl font-bold mb-8 text-center tracking-tight">
              Related Articles
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {relatedPosts.map((relatedPost, index) => (
                <motion.article
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group cursor-pointer"
                >
                  <Link href={`/blog/${relatedPost.id}`}>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 shadow-lg">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                    </div>

                    <div className="space-y-2">
                      <span className="inline-block px-3 py-1 bg-secondary text-xs font-medium rounded-full">
                        {relatedPost.category}
                      </span>

                      <h3 className="font-bebas text-xl font-bold group-hover:text-accent transition-colors line-clamp-2 tracking-tight">
                        {relatedPost.title}
                      </h3>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {relatedPost.readTime}
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
