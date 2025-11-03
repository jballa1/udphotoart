"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Camera, MapPin, Heart, Sparkles, BookOpen, ShoppingCart, Compass } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section with Shrinking Effect */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div
          style={{ scale, opacity }}
          className="absolute inset-0 z-0"
        >
          <img
            src="/images/world-lens/White Sands National Park, New Mexico/08b3751a-dba1-440a-aeaf-e8b2c81d2afb_rw_1920.jpg"
            alt="White Sands National Park - Professional Photography by Rigo Gonzalez-Nossa"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Logo/Brand Mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <Camera className="w-12 h-12 text-accent" />
              <span className="font-bebas text-5xl tracking-wide text-white">UDPHOTOART</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="font-bebas text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-tight"
            >
              SEIZING THE{" "}
              <span className="text-accent">MOMENT</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto"
            >
              Fine art photography capturing the beauty of our world—from vast landscapes
              to intimate portraits, transforming fleeting moments into timeless art
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
            >
              <Link href="/galleries">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-lg font-bebas tracking-wide group"
                >
                  EXPLORE GALLERIES
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/shop">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-black px-8 py-6 text-lg font-bebas tracking-wide transition-all"
                >
                  SHOP PRINTS
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator - Fixed at bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Collections */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 text-accent mb-4">
              <Sparkles className="w-6 h-6" />
              <span className="text-sm uppercase tracking-widest font-bebas">
                PHOTOGRAPHY COLLECTIONS
              </span>
            </div>
            <h2 className="font-bebas text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              FEATURED GALLERIES
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore curated collections capturing diverse moments and emotions from around the world
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Recent Revelations",
                count: "50 Photos",
                locations: "9 Countries",
                description: "Latest captures from international travels",
                image: "/images/revelations/Prague - Czech Republic/0d73fbe7-c3c7-4a77-95ad-c83a9180162c_rw_1920.jpg",
                href: "/galleries/recent-revelations",
                icon: Sparkles,
              },
              {
                title: "World Through My Lens",
                count: "733 Photos",
                locations: "20 Locations",
                description: "Adventures across America and beyond",
                image: "/images/world-lens/Big Bend National Park, Texas/0bac9d96-b622-453a-be16-80de4506f6e4_rw_1920.jpg",
                href: "/galleries/world-through-my-lens",
                icon: Compass,
              },
              {
                title: "Captured Perspectives",
                count: "230 Photos",
                locations: "5 Categories",
                description: "Artistic interpretations and unique viewpoints",
                image: "/images/perspectives/LandScape/c1474280-d99c-491f-a321-a9009a2a5c3d.jpg",
                href: "/galleries/captured-perspectives",
                icon: Camera,
              },
              {
                title: "Unspoken",
                count: "163 Photos",
                locations: "6 Categories",
                description: "Life's precious moments without words",
                image: "/images/unspoken/Portraits/023140e6-f8e1-4e66-a89f-ee346dbacfeb_rw_1200.jpg",
                href: "/galleries/unspoken",
                icon: Heart,
              },
            ].map((collection, index) => (
              <motion.div
                key={collection.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer shadow-lg"
              >
                <Link href={collection.href}>
                  <div className="relative w-full h-full">
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <collection.icon className="w-8 h-8 text-accent mb-3" />
                      <h3 className="font-bebas text-3xl font-bold text-white mb-2 tracking-tight">
                        {collection.title}
                      </h3>
                      <div className="flex items-center gap-3 text-white/70 text-xs mb-3 font-bebas tracking-wide">
                        <span>{collection.count}</span>
                        <span>•</span>
                        <span>{collection.locations}</span>
                      </div>
                      <p className="text-white/80 text-sm mb-4">
                        {collection.description}
                      </p>
                      <div className="flex items-center text-accent text-sm font-bebas tracking-wide group-hover:gap-2 transition-all">
                        EXPLORE COLLECTION
                        <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-black/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src="/images/rigo-headshot.png"
                alt="Rigo Gonzalez-Nossa - Fine Art Photographer"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 text-accent mb-4">
                <Camera className="w-5 h-5" />
                <span className="text-sm uppercase tracking-widest font-bebas">
                  PHOTOGRAPHER & ARTIST
                </span>
              </div>
              <h2 className="font-bebas text-5xl md:text-6xl font-bold tracking-tight">
                RIGO GONZALEZ-NOSSA
              </h2>
              <div className="h-1 w-20 bg-accent"></div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Rigo Gonzalez-Nossa, GPHR, is a U.S. Army Gulf War veteran with 20 years of international
                human resources experience in the oil & gas industry. Beyond his professional achievements,
                Rigo has cultivated a profound passion for fine art photography that captures the essence
                of fleeting moments.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A natural-born leader with charisma and vision, Rigo brings his unique perspective—shaped by
                diverse global experiences—to every photograph. His work reflects a keen eye for detail,
                creative imagination, and an unwavering commitment to seizing moments that tell powerful stories.
              </p>
              <div className="pt-4 flex gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 font-bebas tracking-wide">
                    LET'S COLLABORATE
                  </Button>
                </Link>
                <Link href="/blog">
                  <Button size="lg" variant="outline" className="font-bebas tracking-wide">
                    READ MY STORIES
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Photography Highlights */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 text-accent mb-4">
              <MapPin className="w-6 h-6" />
              <span className="text-sm uppercase tracking-widest font-bebas">
                PHOTOGRAPHY HIGHLIGHTS
              </span>
            </div>
            <h2 className="font-bebas text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              FEATURED WORK
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A curated selection showcasing the diversity and artistry across all collections
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              {
                src: "/images/world-lens/Iditarod, Alaska/0a2c4313-37cb-429f-acaf-f6ad40735097_rw_1920.jpg",
                span: "md:col-span-2 md:row-span-2",
                title: "Iditarod, Alaska",
                href: "/galleries/world-through-my-lens",
                collection: "World Through My Lens"
              },
              {
                src: "/images/perspectives/Nature/0dae414e-aff8-446f-9f8b-f26987a17d3c_rw_1200.jpg",
                span: "",
                title: "Nature",
                href: "/galleries/captured-perspectives",
                collection: "Captured Perspectives"
              },
              {
                src: "/images/unspoken/Maternity/157f88b0-4f8a-460c-9eb0-bd9a03228cf6_rw_1200.jpg",
                span: "",
                title: "Maternity",
                href: "/galleries/unspoken",
                collection: "Unspoken"
              },
              {
                src: "/images/revelations/Prague - Czech Republic/0a7a37ed-d4ef-4b40-841d-32a3cb9ee23b_rw_1920.jpg",
                span: "",
                title: "Prague",
                href: "/galleries/recent-revelations",
                collection: "Recent Revelations"
              },
              {
                src: "/images/world-lens/Balloon Fiesta, New Mexico/00490719-d6fd-4b26-ac92-ac443e3db926_rw_1920.jpg",
                span: "",
                title: "Balloon Fiesta",
                href: "/galleries/world-through-my-lens",
                collection: "World Through My Lens"
              },
              {
                src: "/images/perspectives/Black&White/04c630a6-0dbe-447c-8f39-be082ae74df5_rw_1200.jpg",
                span: "md:col-span-2",
                title: "Black & White",
                href: "/galleries/captured-perspectives",
                collection: "Captured Perspectives"
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className={`relative aspect-square overflow-hidden rounded-2xl group cursor-pointer shadow-lg ${item.span}`}
              >
                <Link href={item.href}>
                  <img
                    src={item.src}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-white/70 text-xs font-bebas tracking-widest mb-1">{item.collection}</p>
                      <p className="text-white font-bebas text-xl tracking-wide">{item.title}</p>
                      <div className="flex items-center text-accent text-sm font-bebas tracking-wide mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        VIEW GALLERY
                        <ArrowRight className="ml-1 w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/gallery">
              <Button size="lg" variant="outline" className="font-bebas tracking-wide group">
                VIEW ALL GALLERIES
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* What I Offer */}
      <section className="py-24 bg-black/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 text-accent mb-4">
              <ShoppingCart className="w-6 h-6" />
              <span className="text-sm uppercase tracking-widest font-bebas">
                SERVICES & PRODUCTS
              </span>
            </div>
            <h2 className="font-bebas text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              WHAT I OFFER
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Museum-quality prints, photobooks, and digital collections to bring art into your space
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Camera,
                title: "Fine Art Prints",
                description: "Museum-quality giclée prints on archival paper in multiple sizes—from intimate 8x10\" to striking 40x60\" pieces",
                link: "/shop"
              },
              {
                icon: BookOpen,
                title: "Photobooks",
                description: "Curated hardcover collections showcasing complete stories from each gallery with 100+ pages of stunning imagery",
                link: "/shop"
              },
              {
                icon: Sparkles,
                title: "Digital Downloads",
                description: "High-resolution digital collections perfect for personal use, wallpapers, and digital galleries",
                link: "/shop"
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="bg-background p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
                  <service.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-bebas text-2xl font-bold mb-4 tracking-tight">{service.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                <Link href={service.link}>
                  <Button variant="outline" className="font-bebas tracking-wide group">
                    LEARN MORE
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 text-accent mb-4">
              <BookOpen className="w-6 h-6" />
              <span className="text-sm uppercase tracking-widest font-bebas">
                PHOTOGRAPHY JOURNAL
              </span>
            </div>
            <h2 className="font-bebas text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              STORIES & INSIGHTS
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Behind-the-scenes stories, photography techniques, and adventures from the field
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Capturing Wild Horses in Big Bend",
                excerpt: "An unforgettable encounter with wild mustangs in the dramatic Texas landscape",
                image: "/images/world-lens/Big Bend National Park, Texas/0bac9d96-b622-453a-be16-80de4506f6e4_rw_1920.jpg",
                category: "Wildlife",
                readTime: "8 min read",
                link: "/blog/capturing-wild-horses-big-bend"
              },
              {
                title: "White Sands: Photographing Another World",
                excerpt: "Capturing the ethereal beauty of New Mexico's otherworldly gypsum dunes",
                image: "/images/world-lens/White Sands National Park, New Mexico/0444d443-61f2-4036-a528-a51643d9d672_rw_1920.jpg",
                category: "Landscape",
                readTime: "7 min read",
                link: "/blog/white-sands-photographing-otherworldly-landscape"
              },
              {
                title: "Monochrome Magic: Black & White Photography",
                excerpt: "How removing color amplifies emotion and creates timeless imagery",
                image: "/images/perspectives/Black&White/04c630a6-0dbe-447c-8f39-be082ae74df5_rw_1200.jpg",
                category: "Techniques",
                readTime: "6 min read",
                link: "/blog/monochrome-magic-black-white-photography"
              }
            ].map((post, index) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group cursor-pointer"
              >
                <Link href={post.link}>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 shadow-lg">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-white text-xs font-bebas tracking-wide">
                        {post.readTime}
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="inline-block px-3 py-1 bg-accent/90 text-white text-xs font-bebas tracking-wide rounded-full mb-3">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-bebas text-2xl font-bold group-hover:text-accent transition-colors line-clamp-2 tracking-tight">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-accent text-sm font-bebas tracking-wide group-hover:gap-2 transition-all">
                      READ MORE
                      <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/blog">
              <Button size="lg" variant="outline" className="font-bebas tracking-wide group">
                VIEW ALL ARTICLES
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-black/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center space-y-8 bg-gradient-to-br from-accent/5 to-accent/10 p-16 rounded-2xl border-2 border-accent/20"
          >
            <div className="flex items-center justify-center gap-2 text-accent mb-4">
              <Camera className="w-8 h-8" />
            </div>
            <h2 className="font-bebas text-5xl md:text-6xl font-bold tracking-tight">
              LET'S CREATE SOMETHING BEAUTIFUL
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Whether you're looking for fine art prints, commissioned work, or collaboration opportunities—I'd love to hear from you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/contact">
                <Button size="lg" className="bg-accent hover:bg-accent/90 px-10 py-6 text-lg font-bebas tracking-wide">
                  GET IN TOUCH
                </Button>
              </Link>
              <Link href="/shop">
                <Button size="lg" variant="outline" className="px-10 py-6 text-lg font-bebas tracking-wide">
                  BROWSE SHOP
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
