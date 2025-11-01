"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useRef } from "react";

const unspokenMoments = [
  {
    id: 1,
    title: "The Weight of Silence",
    emotion: "Contemplation",
    image:
      "https://images.unsplash.com/photo-1682687221080-5cb261c645cb?q=80&w=2940",
    story:
      "In the quiet moments between words, we find the deepest truths. This image captures a soul lost in thought, where silence speaks volumes.",
  },
  {
    id: 2,
    title: "Echoes of Memory",
    emotion: "Nostalgia",
    image:
      "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2940",
    story:
      "Some moments live forever in the spaces between heartbeats—memories that resurface in the golden light of remembrance.",
  },
  {
    id: 3,
    title: "Solitary Strength",
    emotion: "Resilience",
    image:
      "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=2940",
    story:
      "Standing alone doesn't mean standing weak. In solitude, we often discover our truest strength.",
  },
  {
    id: 4,
    title: "The Language of Eyes",
    emotion: "Connection",
    image:
      "https://images.unsplash.com/photo-1682687221038-404cb8830901?q=80&w=2940",
    story:
      "Sometimes a glance carries more meaning than a thousand words. Eyes speak a universal language of emotion.",
  },
  {
    id: 5,
    title: "Shadows of the Past",
    emotion: "Melancholy",
    image:
      "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?q=80&w=2940",
    story:
      "We all carry shadows from yesterday. They shape us, define us, and remind us of the journey we've traveled.",
  },
];

function ParallaxSection({ item, index }: { item: typeof unspokenMoments[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative min-h-screen flex items-center py-24">
      <div className="container mx-auto px-4">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
            isEven ? "" : "lg:grid-flow-dense"
          }`}
        >
          <motion.div
            style={{ y, opacity }}
            className={`relative h-[600px] rounded-lg overflow-hidden ${
              isEven ? "" : "lg:col-start-2"
            }`}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`space-y-6 ${isEven ? "" : "lg:col-start-1 lg:row-start-1"}`}
          >
            <div>
              <span className="inline-block px-4 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
                {item.emotion}
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
                {item.title}
              </h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed italic">
              "{item.story}"
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function UnspokenPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1682687221080-5cb261c645cb?q=80&w=2940"
            alt="Unspoken"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 max-w-4xl mx-auto"
          >
            <h1 className="font-serif text-6xl md:text-8xl font-bold text-white">
              Unspoken
            </h1>
            <p className="text-2xl md:text-3xl text-white/90 font-light italic">
              Emotions and stories without words
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              In a world filled with noise, the most profound moments often
              exist in silence. These images capture the essence of human
              emotion—raw, unfiltered, and beautifully unspoken.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-white/50 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Parallax Sections */}
      {unspokenMoments.map((item, index) => (
        <ParallaxSection key={item.id} item={item} index={index} />
      ))}

      {/* Closing Quote */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center space-y-8"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold italic">
              "The most powerful stories are those told without words"
            </h2>
            <p className="text-xl text-muted-foreground">
              Every photograph in this collection speaks to the silent language
              we all share—the language of emotion, memory, and the human
              experience.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
