"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Lightbox } from "@/components/lightbox";
import { Heart } from "lucide-react";
import unspokenData from "@/lib/unspoken-photos.json";

export default function UnspokenPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);

  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const selectedCategoryData = selectedCategory
    ? unspokenData.find((cat) => cat.id === selectedCategory)
    : null;

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/unspoken/Portraits/023140e6-f8e1-4e66-a89f-ee346dbacfeb_rw_1200.jpg"
            alt="Unspoken"
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
              <Heart className="w-6 h-6" />
              <span className="text-sm uppercase tracking-widest font-bebas">
                Portrait Photography
              </span>
            </div>
            <h1 className="font-bebas text-6xl md:text-8xl font-bold text-white tracking-tight">
              Unspoken
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Life's precious moments told through portraits—from first breaths to
              life's milestones
            </p>
            <div className="flex items-center justify-center gap-4 text-white/70 text-sm">
              <span>163 Photos</span>
              <span>•</span>
              <span>6 Categories</span>
              <span>•</span>
              <span>Life Stages</span>
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

      {/* Categories Grid */}
      {!selectedCategory && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {unspokenData.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="group cursor-pointer"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {/* Category Card */}
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-4 shadow-lg">
                      <img
                        src={category.hero}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                      {/* Category Badge */}
                      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-white text-xs font-bebas tracking-wide">
                          {category.photoCount} Photos
                        </span>
                      </div>

                      {/* Category Info */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex items-center gap-2 text-accent mb-2">
                          <Heart className="w-4 h-4" />
                          <span className="text-xs uppercase tracking-wider font-bebas">
                            {category.name}
                          </span>
                        </div>
                        <h3 className="font-bebas text-3xl font-bold text-white mb-2 tracking-tight">
                          {category.name}
                        </h3>
                        <p className="text-white/80 text-sm line-clamp-2">
                          {category.description}
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

      {/* Selected Category Gallery with Masonry Layout */}
      {selectedCategory && selectedCategoryData && (
        <section className="py-16 bg-black/5">
          <div className="container mx-auto px-4">
            {/* Back Button */}
            <button
              onClick={() => setSelectedCategory(null)}
              className="mb-8 px-6 py-3 rounded-full bg-accent text-white font-bebas tracking-wide hover:bg-accent/90 transition-colors flex items-center gap-2"
            >
              ← Back to Categories
            </button>

            {/* Gallery Header */}
            <div className="text-center space-y-4 mb-12">
              <div className="flex items-center justify-center gap-2 text-accent">
                <Heart className="w-5 h-5" />
                <span className="text-sm uppercase tracking-widest font-bebas">
                  {selectedCategoryData.name}
                </span>
              </div>
              <h2 className="font-bebas text-5xl md:text-7xl font-bold tracking-tight">
                {selectedCategoryData.name}
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {selectedCategoryData.description}
              </p>
              <div className="text-muted-foreground/70 text-sm">
                {selectedCategoryData.photoCount} photographs
              </div>
            </div>

            {/* Vertical Masonry Grid - Pinterest Style */}
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
              {selectedCategoryData.photos.map((photo, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.02, duration: 0.4 }}
                  className="break-inside-avoid mb-4 cursor-pointer group"
                  onClick={() =>
                    openLightbox(selectedCategoryData.photos, idx)
                  }
                >
                  <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-all duration-300">
                    <img
                      src={photo}
                      alt={`${selectedCategoryData.name} ${idx + 1}`}
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
