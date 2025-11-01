"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const categories = ["All", "Landscapes", "Urban", "Portraits", "Nature", "Abstract"];

const galleryImages = [
  {
    id: 1,
    category: "Landscapes",
    title: "Mountain Majesty",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940",
  },
  {
    id: 2,
    category: "Urban",
    title: "City Lights",
    image: "https://images.unsplash.com/photo-1682687221038-404cb8830901?q=80&w=2940",
  },
  {
    id: 3,
    category: "Nature",
    title: "Forest Whispers",
    image: "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?q=80&w=2940",
  },
  {
    id: 4,
    category: "Landscapes",
    title: "Coastal Serenity",
    image: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=2940",
  },
  {
    id: 5,
    category: "Abstract",
    title: "Light Patterns",
    image: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2940",
  },
  {
    id: 6,
    category: "Urban",
    title: "Architectural Lines",
    image: "https://images.unsplash.com/photo-1682687221080-5cb261c645cb?q=80&w=2940",
  },
  {
    id: 7,
    category: "Nature",
    title: "Golden Fields",
    image: "https://images.unsplash.com/photo-1682695794947-17061dc284dd?q=80&w=2940",
  },
  {
    id: 8,
    category: "Landscapes",
    title: "Desert Dreams",
    image: "https://images.unsplash.com/photo-1682695798256-28a674122872?q=80&w=2940",
  },
  {
    id: 9,
    category: "Abstract",
    title: "Color Symphony",
    image: "https://images.unsplash.com/photo-1682695796497-31a44224d6d6?q=80&w=2940",
  },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredImages =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  const handlePrevious = () => {
    if (selectedImage !== null) {
      const currentIndex = filteredImages.findIndex(
        (img) => img.id === selectedImage
      );
      const prevIndex =
        currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
      setSelectedImage(filteredImages[prevIndex].id);
    }
  };

  const handleNext = () => {
    if (selectedImage !== null) {
      const currentIndex = filteredImages.findIndex(
        (img) => img.id === selectedImage
      );
      const nextIndex =
        currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1;
      setSelectedImage(filteredImages[nextIndex].id);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940"
            alt="Gallery"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white">
              The World Through My Lense
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              A visual journey across landscapes, cultures, and fleeting moments
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-accent text-white"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
                  onClick={() => setSelectedImage(image.id)}
                >
                  <Image
                    src={image.image}
                    alt={image.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-xs text-white/70 mb-1">
                        {image.category}
                      </p>
                      <h3 className="font-serif text-xl font-bold text-white">
                        {image.title}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-full transition-colors z-50"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              className="absolute left-4 p-3 text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 p-3 text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-11/12 h-5/6 max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              {filteredImages.find((img) => img.id === selectedImage) && (
                <>
                  <Image
                    src={
                      filteredImages.find((img) => img.id === selectedImage)!
                        .image
                    }
                    alt={
                      filteredImages.find((img) => img.id === selectedImage)!
                        .title
                    }
                    fill
                    className="object-contain"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <p className="text-sm text-white/70 mb-1">
                      {
                        filteredImages.find((img) => img.id === selectedImage)!
                          .category
                      }
                    </p>
                    <h3 className="font-serif text-2xl font-bold text-white">
                      {
                        filteredImages.find((img) => img.id === selectedImage)!
                          .title
                      }
                    </h3>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
