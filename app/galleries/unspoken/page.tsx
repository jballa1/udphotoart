"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Heart } from "lucide-react";
import { ScrollIndicator } from "@/components/scroll-indicator";
import unspokenData from "@/lib/unspoken-photos.json";

export default function UnspokenPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://imagedelivery.net/v_WuhwGIT0Zeg5Rlb5xL8Q/images-unspoken-portraits-023140e6-f8e1-4e66-a89f-ee346dbacfeb-rw-1200.jpg/public"
            alt="Unspoken"
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
              <Heart className="w-6 h-6" />
              <span className="section-kicker text-accent">
                Portrait Photography
              </span>
            </div>
            <h1 className="hero-title text-white">
              Unspoken
            </h1>
            <p className="hero-subtitle text-white/85 max-w-2xl mx-auto">
              Life's precious moments told through portraits—from first breaths to
              life's milestones
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-white/70 text-sm font-sans uppercase tracking-[0.05em]">
              <span>163 Photos</span>
              <span>•</span>
              <span>6 Categories</span>
              <span>•</span>
              <span>Life Stages</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <ScrollIndicator />
      </section>

      {/* Locations Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key="unspoken-grid"
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
                >
                  <Link href={`/galleries/unspoken/${category.id}`}>
                    {/* Location Card */}
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-4 shadow-lg">
                      <img
                        src={category.hero}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                      {/* Location Badge */}
                      <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-white text-xs font-sans uppercase tracking-[0.05em]">
                          {category.photoCount} Photos
                        </span>
                      </div>

                      {/* Location Info */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                        <div className="flex items-center gap-2 text-accent mb-2">
                            <Heart className="w-4 h-4" />
                            <span className="text-xs uppercase tracking-[0.08em] font-sans">
                              {category.name}
                            </span>
                          </div>
                        <h3 className="font-heading text-3xl font-bold text-white mb-2 tracking-[0.01em]">
                            {category.name}
                          </h3>
                          <p className="text-white/80 text-sm line-clamp-2">
                            {category.description}
                          </p>
                      </div>
                    </div>
                  </Link>
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
