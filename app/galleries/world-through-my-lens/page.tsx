"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { MapPin, Compass } from "lucide-react";
import { ScrollIndicator } from "@/components/scroll-indicator";
import worldLensData from "@/lib/world-lens-photos.json";
import { useRouter } from "next/navigation";

const regions = ["All", "Southwest", "Alaska", "Peru", "West Coast", "Midwest"];

export default function GalleryPage() {
  const [selectedRegion, setSelectedRegion] = useState("All");
  const router = useRouter();
  const filteredLocations = worldLensData.filter((loc) =>
    selectedRegion === "All" ? true : loc.region === selectedRegion
  );

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://imagedelivery.net/v_WuhwGIT0Zeg5Rlb5xL8Q/images-world-lens-big-bend-national-park-texas-0bac9d96-b622-453a-be16-80de4506f6e4-rw-1920.jpg/public"
            alt="World Through My Lens"
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
              <Compass className="w-6 h-6" />
              <span className="section-kicker text-accent">
                Adventure & Nature
              </span>
            </div>
            <h1 className="hero-title text-white">
              The World Through My Lens
            </h1>
            <p className="hero-subtitle text-white/85 max-w-2xl mx-auto">
              Adventures across America and beyond—landscapes, wildlife, and the
              beauty of our natural world
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-white/70 text-sm font-sans uppercase tracking-[0.05em]">
              <span>733 Photos</span>
              <span>•</span>
              <span>20 Locations</span>
              <span>•</span>
              <span>5 Regions</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <ScrollIndicator />
      </section>

      {/* Region Filter */}
      <section className="sticky top-20 z-20 bg-background/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-6 py-2 rounded-full font-sans uppercase tracking-[0.05em] transition-all ${
                  selectedRegion === region
                    ? "bg-accent text-white shadow-lg scale-105"
                    : "bg-secondary text-foreground hover:bg-accent/10 hover:text-accent"
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedRegion}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredLocations.map((location, index) => (
                <motion.div
                  key={location.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group cursor-pointer"
                >
                    <div
                      onClick={() =>
                        router.push(`/galleries/world-through-my-lens/${location.id}`)
                      }
                      className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-4 shadow-lg"
                    >
                      <img
                        src={location.hero}
                        alt={location.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                      {/* Location Badge */}
                      <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-white text-xs font-sans uppercase tracking-[0.05em]">
                          {location.photoCount} Photos
                        </span>
                      </div>

                      {/* Location Info */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                          <div onClick={(e) => {
                          e.stopPropagation();
                          window.open(
                            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.state)},${encodeURIComponent(location.name)}`,
                            "_blank"
                          );
                        }} className="flex items-center gap-2 text-accent mb-2 pointer-events-auto">
                            <MapPin className="w-4 h-4" />
                            <span className="text-xs uppercase tracking-[0.08em] font-sans">
                              {location.state}
                            </span>
                          </div>
                        <h3 className="font-heading text-3xl font-bold text-white mb-2 tracking-[0.01em]">
                            {location.name}
                          </h3>
                          <p className="text-white/80 text-sm line-clamp-2">
                            {location.description}
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
