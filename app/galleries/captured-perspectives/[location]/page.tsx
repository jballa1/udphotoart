"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Lightbox } from "@/components/lightbox";
import { ScrollIndicator } from "@/components/scroll-indicator";
import { Camera, MapPin, MoveLeft } from "lucide-react";
import { useState, use } from "react";
import { notFound } from "next/navigation";
import locationsData from "@/lib/perspectives-photos.json";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { FavoriteToggle } from "@/components/favorite-toggle";

export default function LocationPage({ params }: { params: Promise<{ location: string }> }) {
  const { location } = use(params);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const locationData = locationsData.find((loc) => loc.id === location);

  if (!locationData) {
    notFound();
  }

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <motion.main
      className="min-h-screen bg-background"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={locationData.hero}
            alt={locationData.name}
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
              <Camera  className="w-6 h-6" />
              <span className="section-kicker text-accent">
                {locationData.theme}
              </span>
            </div>
            <h1 className="hero-title text-white">
              {locationData.name}
            </h1>
            <p className="hero-subtitle text-white/85 max-w-2xl mx-auto">
              {locationData.description}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-white/70 text-sm font-sans uppercase tracking-[0.05em]">
              <span>{locationData.photoCount} Photos</span>
              <span>•</span>
              <span>{locationData.theme}</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <ScrollIndicator />
      </section>

      {/* Gallery */}
      <section className="py-16 bg-black/5">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link href="/galleries/captured-perspectives">
            <button className="cta-button mb-8 inline-flex items-center gap-2 rounded-full border border-accent px-4 py-2 text-sm text-accent hover:bg-accent hover:text-white transition-colors">
              <MoveLeft size={14}/> Back to Captured Perspectives
            </button>
          </Link>

          {/* Vertical Masonry Grid - Pinterest Style */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
            {locationData.photos.map((photo, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.02, duration: 0.4 }}
                className="break-inside-avoid mb-4 cursor-pointer group"
                onClick={() => openLightbox(idx)}
              >
                    <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-all duration-300">
                      <img
                        src={photo}
                        alt={`${locationData.name} ${idx + 1}`}
                        className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-lg" />
                      <div className="absolute top-3 right-3 flex items-center gap-2">
                        <FavoriteToggle
                          id={photo}
                          image={photo}
                          title={locationData.name}
                          subtitle={locationData.theme}
                          gallery="Captured Perspectives"
                          href={`/galleries/captured-perspectives/${locationData.id}`}
                        />
                        <AddToCartButton
                          title={`${locationData.name} Print`}
                          image={photo}
                          collection={locationData.name}
                          price={189}
                          category="Prints"
                          label={`Add ${locationData.name} to cart`}
                          mode="icon"
                        />
                      </div>
                    </div>
                  </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        images={locationData.photos}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        renderHeaderActions={(_, index) => {
          const image = locationData.photos[index];
          if (!image) return null;
          return (
            <div className="flex items-center gap-2">
              <FavoriteToggle
                id={image}
                image={image}
                title={locationData.name}
                subtitle={locationData.theme}
                gallery="Captured Perspectives"
                href={`/galleries/captured-perspectives/${locationData.id}`}
              />
              <AddToCartButton
                title={`${locationData.name} Print`}
                image={image}
                collection={locationData.name}
                price={189}
                category="Prints"
                label={`Add ${locationData.name} to cart`}
                mode="icon"
              />
            </div>
          );
        }}
      />

      <Footer />
    </motion.main>
  );
}
