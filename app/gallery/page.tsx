"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Lightbox } from "@/components/lightbox";
import { MapPin, Compass } from "lucide-react";
import worldLensData from "@/lib/world-lens-photos.json";

const regions = ["All", "Southwest", "Alaska", "Peru", "West Coast", "Midwest"];

export default function GalleryPage() {
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);

  const filteredLocations = worldLensData.filter((loc) =>
    selectedRegion === "All" ? true : loc.region === selectedRegion
  );

  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const selectedLocationData = selectedLocation
    ? worldLensData.find((loc) => loc.id === selectedLocation)
    : null;

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://imagedelivery.net/v_WuhwGIT0Zeg5Rlb5xL8Q/images-world-lens-big-bend-national-park-texas-0bac9d96-b622-453a-be16-80de4506f6e4-rw-1920.jpg/public"
            alt="World Through My Lens"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
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
              <span className="text-sm uppercase tracking-widest font-bebas">
                Adventure & Nature
              </span>
            </div>
            <h1 className="font-bebas text-6xl md:text-8xl font-bold text-white tracking-tight">
              The World Through My Lens
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Adventures across America and beyond—landscapes, wildlife, and the
              beauty of our natural world
            </p>
            <div className="flex items-center justify-center gap-4 text-white/70 text-sm">
              <span>733 Photos</span>
              <span>•</span>
              <span>20 Locations</span>
              <span>•</span>
              <span>5 Regions</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Region Filter */}
      <section className="sticky top-16 z-20 bg-background/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => {
                  setSelectedRegion(region);
                  setSelectedLocation(null);
                }}
                className={`px-6 py-2 rounded-full font-bebas text-sm tracking-wide transition-all ${
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
      {!selectedLocation && (
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
                    onClick={() => setSelectedLocation(location.id)}
                  >
                    {/* Location Card */}
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-4 shadow-lg">
                      <img
                        src={location.hero}
                        alt={location.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                      {/* Location Badge */}
                      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-white text-xs font-bebas tracking-wide">
                          {location.photoCount} Photos
                        </span>
                      </div>

                      {/* Location Info */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex items-center gap-2 text-accent mb-2">
                          <MapPin className="w-4 h-4" />
                          <span className="text-xs uppercase tracking-wider font-bebas">
                            {location.state}
                          </span>
                        </div>
                        <h3 className="font-bebas text-3xl font-bold text-white mb-2 tracking-tight">
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
      )}

      {/* Selected Location Gallery with Masonry Layout */}
      {selectedLocation && selectedLocationData && (
        <section className="py-16 bg-black/5">
          <div className="container mx-auto px-4">
            {/* Back Button */}
            <button
              onClick={() => setSelectedLocation(null)}
              className="mb-8 px-6 py-3 rounded-full bg-accent text-white font-bebas tracking-wide hover:bg-accent/90 transition-colors flex items-center gap-2"
            >
              ← Back to Locations
            </button>

            {/* Gallery Header */}
            <div className="text-center space-y-4 mb-12">
              <div className="flex items-center justify-center gap-2 text-accent">
                <MapPin className="w-5 h-5" />
                <span className="text-sm uppercase tracking-widest font-bebas">
                  {selectedLocationData.state}
                </span>
              </div>
              <h2 className="font-bebas text-5xl md:text-7xl font-bold tracking-tight">
                {selectedLocationData.name}
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {selectedLocationData.description}
              </p>
              <div className="text-muted-foreground/70 text-sm">
                {selectedLocationData.photoCount} photographs
              </div>
            </div>

            {/* Vertical Masonry Grid - Pinterest Style */}
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
              {selectedLocationData.photos.map((photo, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.02, duration: 0.4 }}
                  className="break-inside-avoid mb-4 cursor-pointer group"
                  onClick={() =>
                    openLightbox(selectedLocationData.photos, idx)
                  }
                >
                  <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-all duration-300">
                    <img
                      src={photo}
                      alt={`${selectedLocationData.name} ${idx + 1}`}
                      className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-lg" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
      <Lightbox
        images={lightboxImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />

      <Footer />
    </main>
  );
}
