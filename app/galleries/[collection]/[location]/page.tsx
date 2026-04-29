"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Lightbox } from "@/components/lightbox";
import { ScrollIndicator } from "@/components/scroll-indicator";
import { MapPin, MoveLeft, Camera, Heart, Compass, Globe2 } from "lucide-react";
import { notFound, useParams } from "next/navigation";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { FavoriteToggle } from "@/components/favorite-toggle";
import { HeroShell } from "@/components/hero-shell";
import { AcfIcon } from "@/components/acf-icon";

interface GalleryPhoto {
  id: number;
  image: string;
  forSale?: boolean;
  pictimeUrl?: string;
}

interface GalleryCollection {
  id: string;
  name: string;
  group: string;
  region?: string;
  state?: string;
  country?: string;
  description?: string;
  hero: string;
  photos: GalleryPhoto[];
  photoCount: number;
  theme?: string;
  icon?: string;
}

interface GalleryGroupMeta {
  slug: string;
  name: string;
}

export default function LocationPage() {
  const params = useParams<{ collection: string; location: string }>();
  const collectionSlug = params.collection;
  const locationSlug = params.location;

  const [locationData, setLocationData] = useState<GalleryCollection | null>(
    null,
  );
  const [groupMeta, setGroupMeta] = useState<GalleryGroupMeta | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    if (!locationSlug) return;

    async function loadLocation() {
      try {
        const res = await fetch(`/api/gallery/${locationSlug}`);
        if (res.status === 404) {
          notFound();
          return;
        }
        if (!res.ok) {
          throw new Error("Failed to load gallery");
        }
        const data = (await res.json()) as GalleryCollection;

        // Ensure the gallery belongs to the requested collection
        if (data.group !== collectionSlug) {
          notFound();
          return;
        }

        setLocationData(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadLocation();
  }, [collectionSlug, locationSlug]);

  useEffect(() => {
    if (!collectionSlug) return;

    async function loadGroupMeta() {
      try {
        const res = await fetch("/api/gallery-groups");
        if (!res.ok) return;
        const data = (await res.json()) as GalleryGroupMeta[];
        const meta = data.find((g) => g.slug === collectionSlug);
        if (meta) {
          setGroupMeta(meta);
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadGroupMeta();
  }, [collectionSlug]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };


  const KickerIconFallback = Camera;

  const kickerText =
    locationData?.state ??
    locationData?.country ??
    locationData?.region ??
    locationData?.theme ??
    locationData?.name;

  const groupTitle = groupMeta?.name ?? "Galleries";

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
        image={
          locationData?.hero ||
          "https://imagedelivery.net/v_WuhwGIT0Zeg5Rlb5xL8Q/1f6e7b4f-a18b-47c9-5bc1-99955251bc00/public"
        }
        alt={locationData?.name || "Gallery"}
        className="h-[70vh] flex items-center justify-center"
      >
        <div className="relative z-10 container mx-auto px-4 text-center">
          {!locationData ? (
            <div className="space-y-4 animate-pulse">
              <div className="mx-auto h-4 w-40 rounded-full bg-black/30" />
              <div className="mx-auto h-10 w-64 rounded-full bg-black/30" />
              <div className="mx-auto h-4 w-72 rounded-full bg-black/20" />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {kickerText && (
                <div className="flex items-center justify-center gap-2 text-accent">
                  <AcfIcon
                    name={locationData.icon}
                    fallback={KickerIconFallback}
                    className="w-6 h-6"
                  />
                  <span className="section-kicker text-accent">
                    {kickerText}
                  </span>
                </div>
              )}
              <h1 className="hero-title hero-tone-strong">
                {locationData.name}
              </h1>
              <p className="hero-subtitle hero-tone max-w-2xl mx-auto">
                {locationData.description}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 hero-tone-muted text-sm font-sans uppercase tracking-[0.05em]">
                <span>{locationData.photoCount} Photos</span>
                {locationData.region && (
                  <>
                    <span>•</span>
                    <span>{locationData.region}</span>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </div>

        {/* Scroll Indicator */}
        <ScrollIndicator />
      </HeroShell>

      {/* Gallery */}
      <section className="py-16 bg-black/5">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link href={`/galleries/${collectionSlug}`}>
            <button className="cta-button mb-8 inline-flex items-center gap-2 rounded-full border border-accent px-4 py-2 text-sm text-accent hover:bg-accent hover:text-white transition-colors">
              <MoveLeft size={14} /> Back to {groupTitle}
            </button>
          </Link>

          {/* Vertical Masonry Grid - Pinterest Style */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
            {!locationData &&
              Array.from({ length: 8 }).map((_, idx) => (
                <div
                  key={idx}
                  className="mb-4 h-64 w-full animate-pulse break-inside-avoid rounded-lg bg-muted/60"
                />
              ))}
            {locationData &&
              locationData.photos.map((photo, idx) => (
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
                      src={photo.image}
                      alt={`${locationData.name} ${idx + 1}`}
                      className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-lg" />
                    <div className="absolute top-3 right-3 flex items-center gap-2">
                      <FavoriteToggle
                        id={photo.image}
                        image={photo.image}
                        title={locationData.name}
                        subtitle={
                          locationData.state ??
                          locationData.country ??
                          locationData.region ??
                          locationData.name
                        }
                        gallery={groupTitle}
                        href={`/galleries/${collectionSlug}/${locationData.id}`}
                      />
                      {photo.pictimeUrl && (
                        <AddToCartButton
                          title={`${locationData.name} Print`}
                          image={photo.image}
                          collection={locationData.name}
                          price={189}
                          category="Prints"
                          label={`Purchase ${locationData.name}`}
                          mode="icon"
                          pictimeUrl={photo.pictimeUrl}
                        />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {locationData && (
        <Lightbox
          images={locationData.photos.map((photo) => photo.image)}
          initialIndex={lightboxIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          renderHeaderActions={(_, index) => {
            const photo = locationData.photos[index];
            if (!photo) return null;
            return (
              <div className="flex items-center gap-2">
                <FavoriteToggle
                  id={photo.image}
                  image={photo.image}
                  title={locationData.name}
                  subtitle={
                    locationData.state ??
                    locationData.country ??
                    locationData.region ??
                    locationData.name
                  }
                  gallery={groupTitle}
                  href={`/galleries/${collectionSlug}/${locationData.id}`}
                  pictimeUrl={photo.pictimeUrl}
                />
                {photo.pictimeUrl && (
                  <AddToCartButton
                    title={`${locationData.name} Print`}
                    image={photo.image}
                    collection={locationData.name}
                    price={189}
                    category="Prints"
                    label={`Purchase ${locationData.name}`}
                    mode="icon"
                    pictimeUrl={photo.pictimeUrl}
                  />
                )}
              </div>
            );
          }}
        />
      )}

      <Footer />
    </motion.main>
  );
}
