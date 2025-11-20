"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ScrollIndicator } from "@/components/scroll-indicator";
import { Heart } from "lucide-react";
import { useFavorites } from "@/components/favorites-provider";
import { FavoriteToggle } from "@/components/favorite-toggle";
import { Lightbox } from "@/components/lightbox";
import { AddToCartButton } from "@/components/add-to-cart-button";

export default function FavoritesGalleryPage() {
  const { favorites } = useFavorites();
  const hasFavorites = favorites.length > 0;
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const favoriteImages = useMemo(
    () => favorites.map((favorite) => favorite.image),
    [favorites]
  );

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://imagedelivery.net/v_WuhwGIT0Zeg5Rlb5xL8Q/b248f4d5-cd97-41ac-e843-1173c969f600/public"
            alt="Favorites"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
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
                Curated by You
              </span>
            </div>
            <h1 className="hero-title text-white">
              Your Favorites
            </h1>
            <p className="hero-subtitle text-white/85 max-w-2xl mx-auto">
              Collect the moments that resonate most and revisit them anytime.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-white/80 text-sm font-sans uppercase tracking-[0.05em]">
              <span>
                {favorites.length} Saved{" "}
                {favorites.length === 1 ? "Photo" : "Photos"}
              </span>
              <span>•</span>
              <span>Across Galleries</span>
            </div>
          </motion.div>
        </div>

        <ScrollIndicator />
      </section>

      {/* Favorites Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {hasFavorites ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {favorites.map((favorite, idx) => (
                  <motion.div
                    key={favorite.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03, duration: 0.4 }}
                    className="rounded-2xl border border-border bg-muted/20 shadow-sm overflow-hidden"
                  >
                    <div className="relative">
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => openLightbox(idx)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            openLightbox(idx);
                          }
                        }}
                        className="group relative block w-full overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        aria-label={`Open ${favorite.title} in lightbox`}
                      >
                        <img
                          src={favorite.image}
                          alt={favorite.title}
                          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="absolute top-3 right-3 flex items-center gap-2">
                          <FavoriteToggle {...favorite} />
                          <AddToCartButton
                            title={`${favorite.title} Print`}
                            image={favorite.image}
                            collection={favorite.gallery}
                            price={189}
                            category="Prints"
                            mode="icon"
                            label={`Add ${favorite.title} to cart`}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="px-5 py-4 space-y-2">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
                            {favorite.gallery}
                          </p>
                          <h3 className="text-lg font-heading">
                            {favorite.title}
                          </h3>
                        </div>
                        <Link
                          href={favorite.href}
                          className="text-xs font-semibold uppercase tracking-[0.2em] text-accent hover:text-accent/80"
                        >
                          View
                        </Link>
                      </div>
                      {favorite.subtitle && (
                        <p className="text-sm text-muted-foreground">
                          {favorite.subtitle}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <Lightbox
                images={favoriteImages}
                initialIndex={lightboxIndex}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                renderHeaderActions={(_, index) => {
                  const favorite = favorites[index];
                  if (!favorite) return null;
                  return (
                    <div className="flex items-center gap-2">
                      <FavoriteToggle {...favorite} />
                      <AddToCartButton
                        title={`${favorite.title} Print`}
                        image={favorite.image}
                        collection={favorite.gallery}
                        price={189}
                        category="Prints"
                        label={`Add ${favorite.title} to cart`}
                        mode="icon"
                      />
                    </div>
                  );
                }}
              />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-24 gap-6">
              <div className="rounded-full border border-dashed border-accent/60 p-6 text-accent">
                <Heart className="w-10 h-10" />
              </div>
              <div className="space-y-2 max-w-xl">
                <h2 className="text-2xl font-heading">No favorites yet</h2>
                <p className="text-muted-foreground">
                  Browse any gallery and tap the heart icon to save the images
                  that inspire you. They will appear here for quick access.
                </p>
              </div>
              <Link
                href="/galleries"
                className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[var(--color-accent-hover)]"
              >
                Explore Galleries
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
