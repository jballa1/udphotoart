"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Calendar, Eye } from "lucide-react";

const revelations = [
  {
    id: 1,
    title: "Golden Hour Reflections",
    description:
      "Capturing the ethereal beauty of sunset's last light dancing on still waters",
    image:
      "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2940",
    date: "2024-10-15",
    views: "2.4k",
  },
  {
    id: 2,
    title: "Urban Symphony",
    description:
      "The rhythmic patterns and geometric poetry of modern architecture",
    image:
      "https://images.unsplash.com/photo-1682687221038-404cb8830901?q=80&w=2940",
    date: "2024-10-12",
    views: "1.8k",
  },
  {
    id: 3,
    title: "Silent Conversations",
    description:
      "Intimate moments between strangers in bustling city streets",
    image:
      "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=2940",
    date: "2024-10-08",
    views: "3.1k",
  },
  {
    id: 4,
    title: "Wilderness Awakening",
    description:
      "Morning mist unveiling the secrets of untouched natural landscapes",
    image:
      "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?q=80&w=2940",
    date: "2024-10-05",
    views: "2.7k",
  },
  {
    id: 5,
    title: "Monochrome Emotions",
    description:
      "Stripping away color to reveal raw, unfiltered human expression",
    image:
      "https://images.unsplash.com/photo-1682687221080-5cb261c645cb?q=80&w=2940",
    date: "2024-10-01",
    views: "2.2k",
  },
  {
    id: 6,
    title: "Celestial Dreams",
    description:
      "When earth meets sky in a breathtaking dance of light and shadow",
    image:
      "https://images.unsplash.com/photo-1682695794947-17061dc284dd?q=80&w=2940",
    date: "2024-09-28",
    views: "4.5k",
  },
];

export default function RevelationsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2940"
            alt="Recent Revelations"
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
              Recent Revelations
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              My latest discoveries, where each moment reveals something
              extraordinary
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {revelations.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg mb-4">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-4 text-white/80 text-sm mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(item.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {item.views}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-2xl font-bold group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
