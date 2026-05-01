"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Camera, MapPin, Image as ImageIcon, ArrowRight, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollIndicator } from "@/components/scroll-indicator";
import { HeroShell } from "@/components/hero-shell";

import { fetchGalleryGroupsMeta } from "@/lib/galleries";

interface GalleryGroup {
slug: string;
name: string;
description: string;
featureImage: string;
galleryCount: number;
dashboardDescription?: string;
featured: boolean;
categoryType: string;
position?: number;
icon?: string;
locationBased?: boolean;
}

export default function GalleriesPage() {
const [groups, setGroups] = useState<GalleryGroup[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
async function loadGroups() {
try {
const data = await fetchGalleryGroupsMeta();
setGroups(data);
} catch (error) {
console.error("Error loading gallery groups:", error);
} finally {
setLoading(false);
}
}

```
loadGroups();
```

}, []);

const galleries = groups
.filter((g) => g.categoryType === "Galleries")
.sort((a, b) => {
const pa = a.position ?? Number.MAX_SAFE_INTEGER;
const pb = b.position ?? Number.MAX_SAFE_INTEGER;
return pa - pb;
});

const totalCollections = galleries.length;
const totalPhotos = galleries.reduce((sum, g) => sum + (g.galleryCount ?? 0), 0);

return ( <main className="min-h-screen bg-background"> <Navigation />

```
  <HeroShell
    image="https://imagedelivery.net/v_WuhwGIT0Zeg5Rlb5xL8Q/1f6e7b4f-a18b-47c9-5bc1-99955251bc00/public"
    alt="Photography Galleries"
    className="h-[70vh] flex items-center justify-center"
  >
    <div className="relative z-10 container mx-auto px-4 text-center">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-center gap-2 text-accent">
          <Camera className="w-6 h-6" />
          <span className="section-kicker text-accent">
            Photography Collections
          </span>
        </div>

        <h1 className="hero-title hero-tone-strong">
          EXPLORE MY <span className="text-accent">GALLERIES</span>
        </h1>

        <p className="hero-subtitle hero-tone max-w-2xl mx-auto">
          Explore curated photography collections powered by a dynamic system
        </p>

        <div className="flex justify-center gap-4 text-sm mt-4">
          <span>{loading ? "Loading..." : `${totalCollections} Collections`}</span>
          <span>•</span>
          <span>{loading ? "" : `${totalPhotos} Galleries`}</span>
        </div>
      </motion.div>
    </div>
    <ScrollIndicator />
  </HeroShell>

  <section className="py-16">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {loading &&
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-muted rounded-2xl h-[260px]" />
          ))}

        {!loading &&
          galleries.map((gallery, index) => (
            <motion.div key={gallery.slug}>
              <Link href={`/galleries/${gallery.slug}`}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">

                  <img
                    src={gallery.featureImage}
                    alt={gallery.name}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h2 className="text-white text-3xl font-bold">
                      {gallery.name}
                    </h2>
                  </div>

                </div>

                <p className="mt-3 text-muted-foreground">
                  {gallery.description}
                </p>
              </Link>
            </motion.div>
          ))}
      </div>
    </div>
  </section>

  <Footer />
</main>
```

);
}
