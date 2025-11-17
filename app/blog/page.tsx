"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ArrowRight, BookOpen, Calendar, Clock } from "lucide-react";
import { ScrollIndicator } from "@/components/scroll-indicator";
import { blogPosts } from "@/lib/blog-posts";

export default function BlogPage() {
  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://imagedelivery.net/v_WuhwGIT0Zeg5Rlb5xL8Q/images-perspectives-nature-0dae414e-aff8-446f-9f8b-f26987a17d3c-rw-1200.jpg/public"
            alt="Blog"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/50" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-center gap-2 text-accent">
              <BookOpen className="w-6 h-6" />
              <span className="section-kicker text-accent">
                Photography Journal
              </span>
            </div>
            <h1 className="hero-title text-white">
              Stories & Insights
            </h1>
            <p className="hero-subtitle text-white/85 max-w-2xl mx-auto">
              A look beyond the image - perspectives that reveal the craft , the journey, and stories from the world behind the lens
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-white/70 text-sm font-sans uppercase tracking-[0.05em]">
              <span>10 Articles</span>
              <span>•</span>
              <span>Photography & Travel</span>
              <span>•</span>
              <span>Tips & Techniques</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <ScrollIndicator />
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16 bg-black/5">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-lg"
            >
              <Link href={`/blog/${featuredPost.id}`}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative h-[400px] lg:h-[600px]">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                  </div>

                  <div className="bg-muted p-8 lg:p-12 flex flex-col justify-center">
                    <span className="inline-block px-4 py-1 bg-accent text-white text-xs font-sans uppercase tracking-[0.05em] rounded-full w-fit mb-4">
                      Featured Article
                    </span>

                    <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4 group-hover:text-accent transition-colors tracking-[0.01em]">
                      {featuredPost.title}
                    </h2>

                    <p className="text-lg text-muted-foreground mb-6 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(featuredPost.date).toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime}
                      </span>
                    </div>

                    <div className="inline-block px-3 py-1 bg-secondary text-xs font-medium rounded-full w-fit mb-6">
                      {featuredPost.category}
                    </div>

                    <div className="flex items-center text-accent text-lg font-sans uppercase tracking-[0.05em] group-hover:gap-2 transition-all">
                      Read Full Story
                      <ArrowRight className="ml-1 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 tracking-[0.01em]">
              More Stories
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Exploring photography through adventure, technique, and personal
              reflection
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group cursor-pointer"
              >
                <Link href={`/blog/${post.id}`}>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 shadow-lg">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                    {/* Category Badge */}
                    <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-white text-xs font-sans uppercase tracking-[0.05em]">
                        {post.readTime}
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                      <span className="inline-block px-3 py-1 bg-accent/90 text-white text-xs font-medium rounded-full mb-3">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-heading text-2xl font-bold group-hover:text-accent transition-colors line-clamp-2 tracking-[0.01em]">
                      {post.title}
                    </h3>

                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
