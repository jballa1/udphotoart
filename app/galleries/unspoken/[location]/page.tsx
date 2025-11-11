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
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={locationData.hero}
            alt={locationData.name}
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
              <MapPin className="w-6 h-6" />
              <span className="section-kicker text-accent">
                {locationData.name}
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
              <span>{locationData.region}</span>
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
          <Link href="/galleries/unspoken">
            <button className="cta-button mb-8 px-6 py-3 rounded-full bg-accent text-white hover:bg-[var(--color-accent-hover)] hover:bg-[var(--color-accent-hover)] transition-colors inline-flex items-center gap-2">
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
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-lg" />
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
      />

      <Footer />
    </main>
  );
}
