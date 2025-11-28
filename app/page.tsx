"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Camera,
  MapPin,
  Heart,
  Sparkles,
  BookOpen,
  ShoppingCart,
  Compass,
  Aperture,
  Tag,
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ScrollIndicator } from "@/components/scroll-indicator";
import { HeroShell } from "@/components/hero-shell";
import { useEffect, useState, useMemo } from "react";
import type { BlogPost } from "@/lib/blog-posts";
import { AcfIcon } from "@/components/acf-icon";

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);
  const [blogLoading, setBlogLoading] = useState(true);

  interface GalleryGroup {
    slug: string;
    name: string;
    description: string;
    featureImage: string;
    photos: number;
    locations: number;
    dashboardDescription?: string;
    featured: boolean;
    categoryType: string;
    position?: number;
    icon?: string;
    locationBased?: boolean;
  }

  interface SignatureGallery {
    id: string;
    name: string;
    group: string;
    hero: string;
    description?: string;
    region?: string;
    state?: string;
    country?: string;
    theme?: string;
    signatureCollection?: boolean;
    dashboardPosition?: number;
  }

  const [galleryGroups, setGalleryGroups] = useState<GalleryGroup[]>([]);
  const [galleryGroupsLoading, setGalleryGroupsLoading] = useState(true);
  const [signatureGalleries, setSignatureGalleries] = useState<SignatureGallery[]>([]);
  const [signatureLoading, setSignatureLoading] = useState(true);

  useEffect(() => {
    async function loadLatestPosts() {
      try {
        const res = await fetch("/api/blog");
        if (!res.ok) {
          throw new Error("Failed to load blog posts");
        }
        const data = (await res.json()) as BlogPost[];
        setLatestPosts(data.slice(0, 3));
      } catch (error) {
        console.error(error);
      } finally {
        setBlogLoading(false);
      }
    }

    loadLatestPosts();
  }, []);

  useEffect(() => {
    async function loadGalleryGroups() {
      try {
        const res = await fetch("/api/gallery-groups");
        if (!res.ok) return;
        const data = (await res.json()) as GalleryGroup[];
        setGalleryGroups(data);
      } catch (error) {
        console.error(error);
      } finally {
        setGalleryGroupsLoading(false);
      }
    }

    loadGalleryGroups();
  }, []);

  useEffect(() => {
    async function loadSignatureGalleries() {
      try {
        const res = await fetch("/api/galleries");
        if (!res.ok) return;
        const data = (await res.json()) as SignatureGallery[];
        const filtered = data
          .filter((g) => g.signatureCollection)
          .sort((a, b) => {
            const pa = a.dashboardPosition ?? Number.MAX_SAFE_INTEGER;
            const pb = b.dashboardPosition ?? Number.MAX_SAFE_INTEGER;
            return pa - pb;
          });
        setSignatureGalleries(filtered);
      } catch (error) {
        console.error(error);
      } finally {
        setSignatureLoading(false);
      }
    }

    loadSignatureGalleries();
  }, []);

  // Arrange signature galleries to match original layout:
  // - First large card in top-left
  // - A block of smaller cards to the right
  // - Second large card beneath the first large, left side
  const displaySignatureGalleries = useMemo(() => {
    if (signatureGalleries.length <= 2) {
      return signatureGalleries;
    }

    const ordered = [...signatureGalleries];
    const [firstLarge, secondLarge, ...rest] = ordered;

    const firstRowSmalls = rest.slice(0, 4);
    const remaining = rest.slice(4);

    return [firstLarge, ...firstRowSmalls, secondLarge, ...remaining];
  }, [signatureGalleries]);

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section with Shrinking Effect */}
      <HeroShell
        image="https://imagedelivery.net/v_WuhwGIT0Zeg5Rlb5xL8Q/1c2abe0c-bac1-4f44-cca1-309651b87d00/public"
        alt="White Sands National Park - Professional Photography by Rigo Gonzalez-Nossa"
        className="h-screen flex items-center justify-center"
        background={
          <motion.div
            style={{ scale, opacity }}
            className="absolute inset-0 z-0"
          >
            <img
              src="https://imagedelivery.net/v_WuhwGIT0Zeg5Rlb5xL8Q/1c2abe0c-bac1-4f44-cca1-309651b87d00/public"
              alt="White Sands National Park - Professional Photography by Rigo Gonzalez-Nossa"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>
        }
      >
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
              className=" hidden md:flex items-center justify-center mb-2"
            >
              <Image
                src="/images/logo-white.png"
                alt="UDPhotoArt Logo"
                width={350}
                height={200}
                className="object-contain"
              />
              
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="hero-subtitle hero-tone max-w-3xl mx-auto"
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
                  className="cta-button bg-accent hover:bg-[var(--color-accent-hover)] text-white px-8 py-6 md:text-lg group"
                >
                  EXPLORE GALLERIES
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/shop">
                <Button
                  size="lg"
                  variant="outline"
                  className="cta-button hero-cta-outline border-2 bg-transparent px-8 py-6 md:text-lg transition-all hover:bg-[var(--hero-text-strong)] hover:text-[var(--hero-cta-contrast)] hover:border-[var(--hero-text-strong)]"
                >
                  SHOP
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
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        >
          <ScrollIndicator/>
        </motion.div>
      </HeroShell>

      {/* Featured Collections */}
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
              <Sparkles className="w-6 h-6" />
              <span className="section-kicker text-accent">
                PHOTOGRAPHY COLLECTIONS
              </span>
            </div>
            <h2 className="section-heading mb-6">
              FEATURED GALLERIES
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Wander through curated collections shaped by my journeys - moments of stillness, movement, and connection - each gallery offering its own sense of presence and emotion.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {galleryGroupsLoading &&
              Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="group animate-pulse relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer shadow-lg bg-muted/60"
                />
              ))}
            {!galleryGroupsLoading &&
              galleryGroups
                .filter(
                  (group) =>
                    group.categoryType === "Galleries" && group.featured,
                )
                .sort((a, b) => {
                  const pa = a.position ?? Number.MAX_SAFE_INTEGER;
                  const pb = b.position ?? Number.MAX_SAFE_INTEGER;
                  return pa - pb;
                })
                .slice(0, 4)
                .map((group, index) => {
              const iconFallback = Camera;
              const locationsLabel = group.locationBased
                ? "Locations"
                : "Categories";

              const countText = `${group.photos} Photos`;
              const locationsText = `${group.locations} ${locationsLabel}`;

              return (
              <motion.div
                key={group.slug}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer shadow-lg"
              >
                <Link href={`/galleries/${group.slug}`}>
                  <div className="relative w-full h-full">
                    <img
                      src={
                        group.featureImage ||
                        "https://imagedelivery.net/v_WuhwGIT0Zeg5Rlb5xL8Q/1f6e7b4f-a18b-47c9-5bc1-99955251bc00/public"
                      }
                      alt={group.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <AcfIcon
                        name={group.icon}
                        fallback={iconFallback}
                        className="w-8 h-8 text-accent mb-3"
                      />
                      <h3 className="font-heading text-3xl font-bold text-white mb-2 tracking-[0.01em]">
                        {group.name}
                      </h3>
                      <div className="flex items-center gap-3 text-white/70 text-xs mb-3 font-sans uppercase tracking-[0.05em]">
                        <span>{countText}</span>
                        <span>•</span>
                        <span>{locationsText}</span>
                      </div>
                      <p className="text-white/80 text-sm mb-4">
                        {group.dashboardDescription || group.description}
                      </p>
                      <div className="flex items-center text-accent text-sm font-sans uppercase tracking-[0.05em] group-hover:gap-2 transition-all">
                        EXPLORE COLLECTION
                        <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
            })}
          </div>
        </div>
      </section>

      {/* Featured Photography Highlights */}
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
              <MapPin className="w-6 h-6" />
              <span className="section-kicker text-accent">
                PHOTOGRAPHY HIGHLIGHTS
              </span>
            </div>
            <h2 className="section-heading mb-6">
              SIGNATURE COLLECTIONS
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A refined collection of images that capture beauty found across people, places and moments.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {signatureLoading &&
              Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="relative aspect-square overflow-hidden rounded-2xl bg-muted/60 animate-pulse"
                />
              ))}
            {!signatureLoading &&
              displaySignatureGalleries.map((item, index) => {
                const largeIds = signatureGalleries.slice(0, 2).map((g) => g.id);
                const isLarge = largeIds.includes(item.id);
                const span = isLarge ? "md:col-span-2 md:row-span-2" : "";

                const groupMeta = galleryGroups.find(
                  (g) => g.slug === item.group,
                );
                const collectionLabel =
                  groupMeta?.name ||
                  item.group
                    .split("-")
                    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
                    .join(" ");

                const subtitle =
                  item.region || item.state || item.country || item.theme;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.5 }}
                    className={`relative aspect-square overflow-hidden rounded-2xl group cursor-pointer shadow-lg ${span}`}
                  >
                    <Link href={`/galleries/${item.group}/${item.id}`}>
                      <img
                        src={item.hero}
                        alt={item.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                          <p className="text-white/70 text-xs font-sans uppercase tracking-[0.08em] mb-1">
                            {collectionLabel}
                          </p>
                          <p className="text-white font-heading text-xl tracking-[0.01em]">
                            {item.name}
                          </p>
                          {subtitle && (
                            <p className="text-white/70 text-xs mt-1">
                              {subtitle}
                            </p>
                          )}
                          <div className="flex items-center text-accent text-sm font-sans uppercase tracking-[0.05em] mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            VIEW GALLERY
                            <ArrowRight className="ml-1 w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
          </div>

          <div className="text-center">
            <Link href="/galleries">
              <Button
                size="lg"
                variant="outline"
                className="cta-button group px-8 py-4"
              >
                VIEW ALL GALLERIES
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* What I Offer */}
      <section className="py-24 ">
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
              <span className="section-kicker text-accent">
                SERVICES & PRODUCTS
              </span>
            </div>
            <h2 className="section-heading mb-6">
              WHAT I OFFER
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Gallery-quality prints, photobooks, and digital collections to bring art into your space
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mx-auto">
            {galleryGroupsLoading &&
              Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse bg-muted/60 rounded-2xl h-[220px]"
                />
              ))}
            {!galleryGroupsLoading &&
              galleryGroups
                .filter(
                  (group) =>
                    group.categoryType === "Products" && group.featured,
                )
                .sort((a, b) => {
                  const pa = a.position ?? Number.MAX_SAFE_INTEGER;
                  const pb = b.position ?? Number.MAX_SAFE_INTEGER;
                  return pa - pb;
                })
                .slice(0, 4)
                .map((group, index) => {
                  const iconFallback =
                    /print/i.test(group.name)
                      ? Camera
                      : /book/i.test(group.name)
                        ? BookOpen
                        : /digital/i.test(group.name)
                          ? Sparkles
                          : Camera;
                  const description =
                    group.dashboardDescription || group.description;

                  return (
              <motion.div
                key={group.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="bg-background p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow flex flex-col justify-between"
              >
                <div >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
                    <AcfIcon
                      name={group.icon}
                      fallback={iconFallback}
                      className="w-8 h-8 text-accent"
                    />
                  </div>
                  <h3 className="font-heading text-2xl font-bold mb-4 tracking-[0.01em]">
                    {group.name}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {description}
                  </p>
                </div>
                <Link href="/shop" className="justify-self-end">
                  <Button variant="outline" className="cta-button group px-6 py-4">
                    LEARN MORE
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
                  );
                })}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
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
              <BookOpen className="w-6 h-6" />
              <span className="section-kicker text-accent">
                PHOTOGRAPHY JOURNAL
              </span>
            </div>
            <h2 className="section-heading mb-6">
              STORIES & INSIGHTS
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A look beyond the image - perspectives that reveal the craft , the journey, and stories from the world behind the lens.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto">
            {blogLoading &&
              Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="group cursor-pointer animate-pulse space-y-4"
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 shadow-lg bg-muted/60" />
                  <div className="space-y-3">
                    <div className="h-6 bg-muted/70 rounded w-3/4" />
                    <div className="h-4 bg-muted/60 rounded w-full" />
                    <div className="h-4 bg-muted/50 rounded w-2/3" />
                  </div>
                </div>
              ))}
            {!blogLoading &&
              latestPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
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

                      <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-white text-xs font-sans uppercase tracking-[0.05em]">
                          {post.readTime}
                        </span>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                        <span className="inline-block px-3 py-1 bg-accent/90 text-white text-xs font-sans uppercase tracking-[0.05em] rounded-full mb-3">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-heading text-2xl font-bold group-hover:text-accent transition-colors line-clamp-2 tracking-[0.01em]">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center text-accent text-sm font-sans uppercase tracking-[0.05em] group-hover:gap-2 transition-all">
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
              <Button
                size="lg"
                variant="outline"
                className="cta-button group px-8 py-4"
              >
                VIEW ALL ARTICLES
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-full min-h-[500px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src="https://imagedelivery.net/v_WuhwGIT0Zeg5Rlb5xL8Q/b74ff548-5932-4194-a9e1-8dcd7a2eb900/public"
                alt="Rigo Gonzalez-Nossa - Fine Art Photographer"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <h2 className="section-heading">
                RIGO GONZALEZ-NOSSA
              </h2>
              <div className="h-1 w-20 bg-accent"></div>
              <p className="text-base text-muted-foreground leading-relaxed">
                Photography, for me, is a journey of curiosity. I believe every frame holds a story — a fleeting look, 
                a quiet laugh, a hidden emotion — and my passion is uncovering those moments, gently and authentically. 
                Whether I’m roaming city streets, catching golden-hour light, or standing in the stillness of a sunrise, 
                I strive to create images that feel natural, intimate, and timeless.
              </p>
              <div>
              <p className="text-base text-muted-foreground leading-relaxed">
                Life has carried me through many places and many perspectives — from the coastlines of California to the quiet mornings in Savannah, 
                the changing landscapes of South Texas, and the airy silence of an Alaskan winter. I’ve wandered colorful plazas in Poland, 
                lingered in the history and architecture of Europe, absorbed the layered realities of India, and witnessed the stark truths of war in Iraq.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                These journeys taught me to see not through perfection, but through presence — to notice how people carry their stories, 
                how landscapes shift, and how, beneath all our differences, we share brief, beautiful threads of connection.
              </p>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                My path meandered through strategy, leadership, and corporate life — but I always gravitated back to an introspective way of understanding 
                the world through images. That background gives me a unique perspective: an appreciation for what connects us and for the quiet details that 
                make each person, place, and moment distinct.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                Behind the camera, I find joy in simple things: a morning cup of coffee, a walk to clear the mind, or ideas sparked in quiet reflection. 
                These small joys shape how I create — thoughtful, grounded, and open to the unexpected.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                I pour this same energy into UD Photo Art: building a space where creativity meets purpose, and where every photograph feels like a conversation. 
                Whether you’re here to explore, to buy, to seek services or advice, or simply to pause and enjoy the images, I hope they offer something 
                that resonates — a memory, a feeling, or a moment you didn’t expect to find.
              </p>
              <div>
              <p className="text-base text-muted-foreground font-bold leading-relaxed">
                Let’s make something beautiful.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                If you’re curious to chat about a session, a print, or a collaborative idea, I’d be thrilled to hear from you.
              </p>
              </div>
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="cta-button bg-accent hover:bg-[var(--color-accent-hover)] text-white px-6 py-4"
                  >
                    LET'S COLLABORATE
                  </Button>
                </Link>
                <Link href="/blog">
                  <Button
                    size="lg"
                    variant="outline"
                    className="cta-button px-6 py-4"
                  >
                    READ MY STORIES
                  </Button>
                </Link>
              </div>
            </motion.div>
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
            <h2 className="section-heading">
              LET'S CREATE SOMETHING BEAUTIFUL
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Whether you're looking for fine art prints, commissioned work, or collaboration opportunities—I'd love to hear from you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="cta-button bg-accent hover:bg-[var(--color-accent-hover)] px-10 py-6 md:text-lg text-white"
                >
                  GET IN TOUCH
                </Button>
              </Link>
              <Link href="/shop">
                <Button
                  size="lg"
                  variant="outline"
                  className="cta-button px-10 py-6 md:text-lg"
                >
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
