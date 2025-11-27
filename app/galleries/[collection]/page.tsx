"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, notFound, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ScrollIndicator } from "@/components/scroll-indicator";
import { HeroShell } from "@/components/hero-shell";
import { Camera, Compass, Globe2, Heart, MapPin } from "lucide-react";

interface GalleryCollection {
  id: string;
  name: string;
  group: string;
  region?: string;
  state?: string;
  country?: string;
  description?: string;
  hero: string;
  photos: string[];
  photoCount: number;
  theme?: string;
  icon?: string;
}

interface GalleryGroup {
  slug: string;
  name: string;
  description: string;
  featureImage: string;
  subtitle?: string;
  kicker?: string;
  secondaryLabel?: string;
}

export default function CollectionPage() {
  const params = useParams<{ collection: string }>();
  const collectionSlug = params.collection;

  const [groupMeta, setGroupMeta] = useState<GalleryGroup | null>(null);
  const [items, setItems] = useState<GalleryCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const router = useRouter();

  useEffect(() => {
    if (!collectionSlug) return;

    async function loadCollections() {
      try {
        const res = await fetch(
          `/api/galleries?group=${encodeURIComponent(collectionSlug)}`,
        );
        if (!res.ok) {
          throw new Error("Failed to load galleries");
        }
        const data = (await res.json()) as GalleryCollection[];
        if (!data.length) {
          notFound();
          return;
        }
        setItems(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadCollections();
  }, [collectionSlug]);

  useEffect(() => {
    async function loadGroupMeta() {
      try {
        const res = await fetch("/api/gallery-groups");
        if (!res.ok) return;
        const data = (await res.json()) as GalleryGroup[];
        const meta = data.find((g) => g.slug === collectionSlug);
        if (!meta) {
          notFound();
          return;
        }
        setGroupMeta(meta);
      } catch (error) {
        console.error(error);
      }
    }

    loadGroupMeta();
  }, [collectionSlug]);

  const filters = useMemo(() => {
    const set = new Set<string>();
    for (const item of items) {
      if (collectionSlug === "captured-perspectives") {
        if (item.theme) set.add(item.theme);
      } else if (collectionSlug === "unspoken") {
        set.add(item.name);
      } else if (collectionSlug === "world-through-my-lens") {
        if (item.region) set.add(item.region);
      } else if (collectionSlug === "recent-revelations") {
        if (item.region) set.add(item.region);
      }
    }
    const list = Array.from(set).sort((a, b) => a.localeCompare(b));
    return ["All", ...list];
  }, [items, collectionSlug]);

  const filteredItems = useMemo(() => {
    if (selectedFilter === "All") return items;
    return items.filter((item) => {
      if (collectionSlug === "captured-perspectives") {
        return item.theme === selectedFilter;
      }
      if (collectionSlug === "unspoken") {
        return item.name === selectedFilter;
      }
      if (
        collectionSlug === "world-through-my-lens" ||
        collectionSlug === "recent-revelations"
      ) {
        return item.region === selectedFilter;
      }
      return true;
    });
  }, [items, selectedFilter, collectionSlug]);

  const totalPhotos = items.reduce(
    (sum, item) => sum + (item.photoCount ?? 0),
    0,
  );
  const totalLocations = items.length;
  const secondaryCount = new Set(
    items
      .map((item) =>
        collectionSlug === "captured-perspectives" || collectionSlug === "unspoken"
          ? item.name
          : item.region,
      )
      .filter(Boolean),
  ).size;

  if (!groupMeta) {
    return null;
  }

  const Icon =
    collectionSlug === "world-through-my-lens"
      ? Compass
      : collectionSlug === "recent-revelations"
        ? Globe2
        : collectionSlug === "unspoken"
          ? Heart
          : Camera;

  const secondaryLabel =
    groupMeta.secondaryLabel ||
    (collectionSlug === "captured-perspectives" || collectionSlug === "unspoken"
      ? "Categories"
      : "Regions");

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <HeroShell
        image={
          groupMeta.featureImage ||
          "https://imagedelivery.net/v_WuhwGIT0Zeg5Rlb5xL8Q/1f6e7b4f-a18b-47c9-5bc1-99955251bc00/public"
        }
        alt={groupMeta.name}
        className="h-[70vh] flex items-center justify-center"
      >
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-center gap-2 text-accent">
              <Icon className="w-6 h-6" />
              <span className="section-kicker text-accent">
                {groupMeta.kicker || "Photography Collection"}
              </span>
            </div>
            <h1 className="hero-title hero-tone-strong">
              {groupMeta.name}
            </h1>
            <p className="hero-subtitle hero-tone max-w-2xl mx-auto">
              {groupMeta.subtitle || groupMeta.description}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 hero-tone-muted text-sm font-sans uppercase tracking-[0.05em]">
              <span>
                {loading ? "Loading..." : `${totalPhotos} Photos`}
              </span>
              <span>•</span>
              <span>
                {loading ? "" : `${totalLocations} Locations`}
              </span>
              <span>•</span>
              <span>
                {loading ? "" : `${secondaryCount || 0} ${secondaryLabel}`}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <ScrollIndicator />
      </HeroShell>

      {/* Filter Bar */}
      <section className="sticky top-20 z-20 bg-background/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-6 py-2 rounded-full font-sans uppercase tracking-[0.05em] transition-all ${
                  selectedFilter === filter
                    ? "bg-accent text-white shadow-lg scale-105"
                    : "bg-secondary text-foreground hover:bg-accent/10 hover:text-accent"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {loading &&
                Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="animate-pulse bg-muted/60 rounded-2xl h-[260px]"
                  />
                ))}
              {!loading &&
                filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="group cursor-pointer"
                  >
                    <div
                      onClick={() =>
                        router.push(
                          `/galleries/${collectionSlug}/${item.id}`,
                        )
                      }
                      className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-4 shadow-lg"
                    >
                      <img
                        src={item.hero}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                      {/* Badge */}
                      <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-white text-xs font-sans uppercase tracking-[0.05em]">
                          {item.photoCount} Photos
                        </span>
                      </div>

                      {/* Info */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                        {collectionSlug === "world-through-my-lens" &&
                          item.state && (
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(
                                  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                    item.state ?? "",
                                  )},${encodeURIComponent(item.name)}`,
                                  "_blank",
                                );
                              }}
                              className="flex items-center gap-2 text-accent mb-2 pointer-events-auto"
                            >
                              <MapPin className="w-4 h-4" />
                              <span className="text-xs uppercase tracking-[0.08em] font-sans">
                                {item.state}
                              </span>
                            </div>
                          )}
                        {collectionSlug === "recent-revelations" &&
                          item.country && (
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(
                                  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                    item.name,
                                  )},${encodeURIComponent(item.country)}`,
                                  "_blank",
                                );
                              }}
                              className="flex items-center gap-2 text-accent mb-2 pointer-events-auto"
                            >
                              <MapPin className="w-4 h-4" />
                              <span className="text-xs uppercase tracking-[0.08em] font-sans">
                                {item.country}
                              </span>
                            </div>
                          )}
                        <h3 className="font-heading text-3xl font-bold text-white mb-2 tracking-[0.01em]">
                          {item.name}
                        </h3>
                        <p className="text-white/80 text-sm line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </main>
  );
}
