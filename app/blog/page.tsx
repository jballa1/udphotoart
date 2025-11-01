"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "The Golden Hour: A Photographer's Best Friend",
    excerpt:
      "Discover why the golden hour creates the most magical light for photography and how to make the most of those fleeting moments.",
    image:
      "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2940",
    category: "Techniques",
    author: "Rigo Gonzalez-Nossa",
    date: "2024-10-20",
    readTime: "5 min read",
    featured: true,
  },
  {
    id: 2,
    title: "Behind the Lens: My Journey Through the Swiss Alps",
    excerpt:
      "A personal account of capturing the raw beauty of mountain landscapes and the challenges faced along the way.",
    image:
      "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=2940",
    category: "Travel",
    author: "Rigo Gonzalez-Nossa",
    date: "2024-10-15",
    readTime: "8 min read",
    featured: false,
  },
  {
    id: 3,
    title: "The Art of Black and White Photography",
    excerpt:
      "Exploring how removing color can amplify emotion and create timeless images that speak to the soul.",
    image:
      "https://images.unsplash.com/photo-1682687221080-5cb261c645cb?q=80&w=2940",
    category: "Techniques",
    author: "Rigo Gonzalez-Nossa",
    date: "2024-10-10",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: 4,
    title: "Street Photography: Capturing Life's Candid Moments",
    excerpt:
      "The ethics, techniques, and mindset behind capturing authentic moments in public spaces.",
    image:
      "https://images.unsplash.com/photo-1682687221038-404cb8830901?q=80&w=2940",
    category: "Street Photography",
    author: "Rigo Gonzalez-Nossa",
    date: "2024-10-05",
    readTime: "7 min read",
    featured: false,
  },
  {
    id: 5,
    title: "Essential Gear for Landscape Photography",
    excerpt:
      "A comprehensive guide to the equipment that helps me capture stunning landscape photographs.",
    image:
      "https://images.unsplash.com/photo-1682695798256-28a674122872?q=80&w=2940",
    category: "Gear",
    author: "Rigo Gonzalez-Nossa",
    date: "2024-09-28",
    readTime: "10 min read",
    featured: false,
  },
  {
    id: 6,
    title: "Finding Your Unique Photographic Voice",
    excerpt:
      "How to develop a distinctive style that sets your work apart in a crowded field.",
    image:
      "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?q=80&w=2940",
    category: "Inspiration",
    author: "Rigo Gonzalez-Nossa",
    date: "2024-09-22",
    readTime: "6 min read",
    featured: false,
  },
];

export default function BlogPage() {
  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-accent/20 to-background" />

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h1 className="font-serif text-5xl md:text-7xl font-bold">
              Stories & Insights
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Thoughts, techniques, and tales from behind the lens
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-lg overflow-hidden group cursor-pointer"
            >
              <Link href={`/blog/${featuredPost.id}`}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative h-[400px] lg:h-[600px]">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="bg-muted p-8 lg:p-12 flex flex-col justify-center">
                    <span className="inline-block px-3 py-1 bg-accent text-white text-xs font-medium rounded-full w-fit mb-4">
                      Featured
                    </span>

                    <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 group-hover:text-accent transition-colors">
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
                      <span className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        {featuredPost.category}
                      </span>
                    </div>

                    <div className="flex items-center text-accent font-medium group-hover:gap-2 transition-all">
                      Read More
                      <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group cursor-pointer"
              >
                <Link href={`/blog/${post.id}`}>
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-muted text-xs font-medium rounded-full">
                        {post.category}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold group-hover:text-accent transition-colors line-clamp-2">
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
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto text-center space-y-6"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold">
              Stay Inspired
            </h2>
            <p className="text-lg text-muted-foreground">
              Subscribe to receive photography tips, behind-the-scenes stories,
              and updates on new work.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors font-medium"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
