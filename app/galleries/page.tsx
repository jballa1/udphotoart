"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Camera, MapPin, Image as ImageIcon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollIndicator } from "@/components/scroll-indicator";
import { HeroShell } from "@/components/hero-shell";

const galleries = [
  {
    id: "recent-revelations",
    title: "Recent Revelations",
    description: "A visual diary of my latest photographic adventures across 9 captivating destinations",
    image: "https://imagedelivery.net/v_WuhwGIT0Zeg5Rlb5xL8Q/8296b099-6beb-4f02-c5a8-ff59f2c25300/public",
    href: "/galleries/recent-revelations",
    stats: {
      photos: 50,
      locations: 9,
    },
    locations: ["Prague", "Paris", "Amsterdam", "Barcelona", "Venice", "Rome", "Vienna", "Budapest", "Krakow"],
    color: "from-blue-600/20 to-purple-600/20",
  },
  {
    id: "world-through-my-lens",
    title: "World Through My Lens",
    description: "733 moments captured across 20 iconic locations throughout America and beyond",
    image: "https://imagedelivery.net/v_WuhwGIT0Zeg5Rlb5xL8Q/images-world-lens-white-sands-national-park-new-mexico-08b3751a-dba1-440a-aeaf-e8b2c81d2afb-rw-1920.jpg/public",
    href: "/galleries/world-through-my-lens",
    stats: {
      photos: 733,
      locations: 20,
    },
    locations: ["White Sands", "Big Bend", "Iditarod", "Balloon Fiesta", "Grand Canyon", "Yellowstone"],
    color: "from-orange-600/20 to-red-600/20",
  },
  {
    id: "captured-perspectives",
    title: "Captured Perspectives",
    description: "Diverse perspectives through 5 unique categories showcasing artistic vision",
    image: "https://imagedelivery.net/v_WuhwGIT0Zeg5Rlb5xL8Q/images-perspectives-landscape-c1474280-d99c-491f-a321-a9009a2a5c3d.jpg/public",
    href: "/galleries/captured-perspectives",
    stats: {
      photos: 120,
      locations: 5,
    },
    locations: ["Landscapes", "Black & White", "Nature", "Oil Country", "Drone Photography"],
    color: "from-green-600/20 to-teal-600/20",
  },
  {
    id: "unspoken",
    title: "Unspoken",
    description: "Life's most precious moments told through portraits, celebrations, and intimate scenes",
    image: "https://imagedelivery.net/v_WuhwGIT0Zeg5Rlb5xL8Q/images-unspoken-portraits-023140e6-f8e1-4e66-a89f-ee346dbacfeb-rw-1200.jpg/public",
    href: "/galleries/unspoken",
    stats: {
      photos: 85,
      locations: 7,
    },
    locations: ["Portraits", "Maternity", "Baby Photoshoot", "Weddings", "Events", "Shadows", "Couples"],
    color: "from-pink-600/20 to-rose-600/20",
  },
];

export default function GalleriesPage() {

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
              <span>4 Collections</span>
              <span>•</span>
              <span>988+ Photos</span>
              <span>•</span>
              <span>41+ Locations</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <ScrollIndicator />
      </HeroShell>

      {/* Galleries Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {galleries.map((gallery, index) => (
                <motion.div
                  key={gallery.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={gallery.href}>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg mb-6">
                      <img
                        src={gallery.image}
                        alt={gallery.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${gallery.color} opacity-40 group-hover:opacity-60 transition-opacity duration-300`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/10 to-transparent" />

                      {/* Stats Badges */}
                      <div className="absolute top-4 right-4 flex gap-2">
                        <div className="bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                          <ImageIcon className="w-3 h-3 text-white" />
                          <span className="text-white text-xs font-sans uppercase tracking-[0.05em]">
                            {gallery.stats.photos}
                          </span>
                        </div>
                        <div className="bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-white" />
                          <span className="text-white text-xs font-sans uppercase tracking-[0.05em]">
                            {gallery.stats.locations}
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
                          {gallery.locations[0] ?? "Collection"}
                        </p>
                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-white tracking-[0.01em] drop-shadow-[0_8px_20px_rgba(0,0,0,0.75)]">
                          {gallery.title}
                        </h2>
                      </div>
                    </div>

                    {/* Description and Locations */}
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        {gallery.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {gallery.locations.slice(0, 6).map((location) => (
                          <span
                            key={location}
                            className="px-3 py-1 bg-secondary rounded-full text-xs font-medium"
                          >
                            {location}
                          </span>
                        ))}
                        {gallery.locations.length > 6 && (
                          <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
                            +{gallery.locations.length - 6} more
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
