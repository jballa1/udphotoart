"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { MapPin, Globe2 } from "lucide-react";
import { ScrollIndicator } from "@/components/scroll-indicator";
import locationsData from "@/lib/revelations-photos.json";
import { useRouter } from "next/navigation";

const regions = ["All", "Europe", "Asia", "Americas"];

export default function RevelationsPage() {
  const [selectedRegion, setSelectedRegion] = useState("All");
  const router = useRouter();
  const filteredLocations = locationsData.filter((loc) =>
    selectedRegion === "All" ? true : loc.region === selectedRegion
  );

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://imagedelivery.net/v_WuhwGIT0Zeg5Rlb5xL8Q/8296b099-6beb-4f02-c5a8-ff59f2c25300/public"
            alt="Recent Revelations"
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
              <Globe2 className="w-6 h-6" />
              <span className="section-kicker text-accent">
                Global Exploration
              </span>
            </div>
            <h1 className="hero-title text-white">
              Recent Revelations
            </h1>
            <p className="hero-subtitle text-white/85 max-w-2xl mx-auto">
              Contemporary global urban exploration across cities — from
              Nordic winters to vibrant India
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-white/70 text-sm font-sans uppercase tracking-[0.05em]">
              <span>216 Photos</span>
              <span>•</span>
              <span>9 Locations</span>
              <span>•</span>
              <span>4 Continents</span>
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
                        router.push(`/galleries/recent-revelations/${location.id}`)
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
                            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.name)},${encodeURIComponent(location.country)}`,
                            "_blank"
                          );
                        }} className="flex items-center gap-2 text-accent mb-2 pointer-events-auto">
                        <MapPin className="w-4 h-4" />
                        <span className="text-xs uppercase tracking-[0.08em] font-sans">
                          {location.country}
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
