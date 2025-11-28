"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Camera, MapPin, Image as ImageIcon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollIndicator } from "@/components/scroll-indicator";
import { HeroShell } from "@/components/hero-shell";

interface GalleryGroup {
  slug: string;
  name: string;
  description: string;
  featureImage: string;
  photos: number;
  locations: number;
  names: string[];
  dashboardDescription?: string;
  featured: boolean;
  categoryType: string;
  position?: number;
  color?: string;
}

export default function GalleriesPage() {
  const [groups, setGroups] = useState<GalleryGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGroups() {
      try {
        const res = await fetch("/api/gallery-groups");
        if (!res.ok) {
          throw new Error("Failed to load galleries");
        }
        const data = (await res.json()) as GalleryGroup[];
        setGroups(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadGroups();
  }, []);

  const galleries = useMemo(
    () =>
      groups
        .filter((g) => g.categoryType === "Galleries")
        .sort((a, b) => {
          const pa = a.position ?? Number.MAX_SAFE_INTEGER;
          const pb = b.position ?? Number.MAX_SAFE_INTEGER;
          return pa - pb;
        }),
    [groups],
  );

  const totalCollections = galleries.length;
  const totalPhotos = galleries.reduce(
    (sum, g) => sum + (g.photos ?? 0),
  0,
  );
  const totalLocations = galleries.reduce(
    (sum, g) => sum + (g.locations ?? 0),
    0,
  );

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <HeroShell
        image="https://imagedelivery.net/v_WuhwGIT0Zeg5Rlb5xL8Q/1f6e7b4f-a18b-47c9-5bc1-99955251bc00/public"
        alt="Photography Galleries"
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
              <Camera className="w-6 h-6" />
              <span className="section-kicker text-accent">
                Photography Collections
              </span>
            </div>
            <h1 className="hero-title hero-tone-strong">
              EXPLORE MY <span className="text-accent">GALLERIES</span>
            </h1>
            <p className="hero-subtitle hero-tone max-w-2xl mx-auto">
              Four distinct collections capturing the beauty of our world through
              different lenses and perspectives
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 hero-tone-muted text-sm font-sans uppercase tracking-[0.05em]">
              <span>
                {loading ? "Loading..." : `${totalCollections} Collections`}
              </span>
              <span>•</span>
              <span>
                {loading ? "" : `${totalPhotos} Photos`}
              </span>
              <span>•</span>
              <span>
                {loading ? "" : `${totalLocations} Locations`}
              </span>
            </div>
          </motion.div>
        </div>
        <ScrollIndicator />
      </HeroShell>

      {/* Galleries Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {loading &&
              Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse bg-muted/60 rounded-2xl h-[260px]"
                />
              ))}
            {!loading &&
              galleries.map((gallery, index) => (
                <motion.div
                  key={gallery.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`/galleries/${gallery.slug}`}>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg mb-6">
                      <img
                        src={gallery.featureImage || "https://imagedelivery.net/v_WuhwGIT0Zeg5Rlb5xL8Q/1f6e7b4f-a18b-47c9-5bc1-99955251bc00/public"}
                        alt={gallery.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${gallery.color} opacity-40 group-hover:opacity-60 transition-opacity duration-300`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/10 to-transparent" />

                      {/* Stats Badges */}
                      <div className="absolute top-4 right-4 flex gap-2">
                        <div className="bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                          <ImageIcon className="w-3 h-3 text-white" />
                          <span className="text-white text-xs font-sans uppercase tracking-[0.05em]">
                            {gallery.photos}
                          </span>
                        </div>
                        <div className="bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-white" />
                          <span className="text-white text-xs font-sans uppercase tracking-[0.05em]">
                            {gallery.locations}
                          </span>
                        </div>
                      </div>

                      {/* Hover CTA */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4 text-center">
                        <Button className="cta-button bg-accent hover:bg-[var(--color-accent-hover)] text-white px-6 py-3">
                          EXPLORE GALLERY
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>

                      {/* Title Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/75 via-black/30 to-transparent">
                        <p className="text-[0.6rem] uppercase tracking-[0.35em] text-accent mb-1 drop-shadow-[0_4px_10px_rgba(0,0,0,0.85)]">
                          {gallery.names[0] ?? "Collection"}
                        </p>
                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-white tracking-[0.01em] drop-shadow-[0_8px_20px_rgba(0,0,0,0.75)]">
                          {gallery.name}
                        </h2>
                      </div>
                    </div>

                    {/* Description and Locations */}
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        {gallery.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {gallery.names.slice(0, 6).map((location) => (
                          <span
                            key={location}
                            className="px-3 py-1 bg-secondary rounded-full text-xs font-medium"
                          >
                            {location}
                          </span>
                        ))}
                        {gallery.names.length > 6 && (
                          <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
                            +{gallery.names.length - 6} more
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black/5">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <h2 className="font-heading text-4xl md:text-6xl font-bold tracking-[0.01em]">
              BRING THESE MOMENTS <span className="text-accent">HOME</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Gallery-quality prints and photobooks available for all collections
            </p>
            <Link href="/shop">
              <Button
                size="lg"
                className="cta-button bg-accent hover:bg-[var(--color-accent-hover)] text-white mt-6 px-8 py-6 text-lg"
              >
                VISIT SHOP
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
