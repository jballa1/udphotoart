"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { MapPin, Clock } from "lucide-react";

const perspectives = [
  {
    id: 1,
    title: "Through the Lens of Time",
    location: "Ancient Ruins, Peru",
    time: "Dawn",
    image:
      "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?q=80&w=2940",
    perspective:
      "Standing before structures that have witnessed centuries, I'm reminded that perspective is not just about angle—it's about understanding our place in the vastness of time.",
  },
  {
    id: 2,
    title: "Vertical Horizons",
    location: "Manhattan, New York",
    time: "Golden Hour",
    image:
      "https://images.unsplash.com/photo-1682687221038-404cb8830901?q=80&w=2940",
    perspective:
      "In cities, we're taught to look forward. But when you look up, a whole new world of geometry and light reveals itself—a perspective most people never see.",
  },
  {
    id: 3,
    title: "The Minimalist's View",
    location: "Sahara Desert, Morocco",
    time: "Midday",
    image:
      "https://images.unsplash.com/photo-1682695798256-28a674122872?q=80&w=2940",
    perspective:
      "When everything is stripped away, when there's nothing but sand and sky, perspective becomes pure. It's not about what you see—it's about what you feel.",
  },
  {
    id: 4,
    title: "Reflections of Reality",
    location: "Lake District, England",
    time: "Dusk",
    image:
      "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2940",
    perspective:
      "Is the reflection the truth, or is the reality above the water? Perspective teaches us that truth is often a matter of which angle we choose to observe from.",
  },
  {
    id: 5,
    title: "From Above the Clouds",
    location: "Swiss Alps, Switzerland",
    time: "Sunrise",
    image:
      "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=2940",
    perspective:
      "There's something humbling about rising above the clouds. From this perspective, the problems below seem smaller, and the possibilities seem infinite.",
  },
  {
    id: 6,
    title: "The Intimate Perspective",
    location: "Tokyo Streets, Japan",
    time: "Evening",
    image:
      "https://images.unsplash.com/photo-1682687221080-5cb261c645cb?q=80&w=2940",
    perspective:
      "Sometimes the most powerful perspective is the closest one. Getting intimate with your subject reveals details that distant observation would miss.",
  },
];

export default function PerspectivesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=2940"
            alt="Captured Perspectives"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="font-serif text-6xl md:text-8xl font-bold text-white">
              Captured Perspectives
            </h1>
            <p className="text-2xl text-white/90 max-w-3xl mx-auto">
              The world changes with every angle, every moment, every point of
              view
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center space-y-6"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold">
              Seeing Beyond the Obvious
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Photography is the art of perspective—choosing not just what to
              capture, but from where, when, and how. Each perspective tells a
              different story, reveals a different truth, and invites us to see
              the familiar in extraordinary new ways.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Perspectives Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="space-y-32">
            {perspectives.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Image */}
                <div
                  className={`lg:col-span-7 ${
                    index % 2 === 0 ? "" : "lg:col-start-6"
                  }`}
                >
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`lg:col-span-5 space-y-6 ${
                    index % 2 === 0
                      ? ""
                      : "lg:col-start-1 lg:row-start-1"
                  }`}
                >
                  <div>
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-accent" />
                        {item.location}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-accent" />
                        {item.time}
                      </span>
                    </div>
                    <h3 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-lg text-muted-foreground leading-relaxed italic border-l-4 border-accent pl-6">
                    {item.perspective}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-accent text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center space-y-8"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold">
              The Art of Seeing
            </h2>
            <p className="text-xl leading-relaxed">
              Every photographer sees the world differently. My perspective is
              shaped by curiosity, wanderlust, and a belief that beauty exists
              in every corner of our world—you just need to find the right angle
              to reveal it.
            </p>
            <p className="text-lg opacity-90">
              These images represent not just places and moments, but the unique
              way I choose to see and share them with you.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
