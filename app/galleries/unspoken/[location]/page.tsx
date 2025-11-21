"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Lightbox } from "@/components/lightbox";
import { ScrollIndicator } from "@/components/scroll-indicator";
import { MapPin, MoveLeft } from "lucide-react";
import { useState, use } from "react";
import { notFound } from "next/navigation";
import locationsData from "@/lib/unspoken-photos.json";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { FavoriteToggle } from "@/components/favorite-toggle";
import { HeroShell } from "@/components/hero-shell";

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
      <HeroShell
        image={locationData.hero}
        alt={locationData.name}
        className="h-[70vh] flex items-center justify-center"
      >
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            
            <h1 className="hero-title hero-tone-strong">
              {locationData.name}
            </h1>
            <p className="hero-subtitle hero-tone max-w-2xl mx-auto">
              {locationData.description}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 hero-tone-muted text-sm font-sans uppercase tracking-[0.05em]">
              <span>{locationData.photoCount} Photos</span>
              <span>•</span>
              <span>{locationData.name}</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <ScrollIndicator />
      </HeroShell>

      {/* Gallery */}
      <section className="py-16 bg-black/5">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link href="/galleries/unspoken">
            <button className="cta-button mb-8 inline-flex items-center gap-2 rounded-full border border-accent px-4 py-2 text-sm text-accent hover:bg-accent hover:text-white transition-colors">
              <MoveLeft size={14}/> Back to Unspoken
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
                          subtitle={locationData.name}
                          gallery="Unspoken"
                          href={`/galleries/unspoken/${locationData.id}`}
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
                subtitle={locationData.name}
                gallery="Unspoken"
                href={`/galleries/unspoken/${locationData.id}`}
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
