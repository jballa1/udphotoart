"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, Heart, Sparkles, Instagram } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div
          style={{ scale, opacity }}
          className="absolute inset-0 z-0"
        >
          <img
            src="/images/gallery/203217169_623662585704759_4794879987940944976_n.jpg"
            alt="White Sands - Professional Photography by Rigo Gonzalez-Nossa"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-8"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight"
            >
              Seizing the{" "}
              <span className="text-accent italic">Moment</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light tracking-wide"
            >
              Where ideas meet the lens — transforming moments into art
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/gallery">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-lg group"
                >
                  Explore Gallery
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg"
                >
                  Get in Touch
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
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
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Featured Collections
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Curated selections from my latest works, each telling a unique
              story
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Recent Revelations",
                description:
                  "Latest captures that reveal beauty in the everyday",
                image:
                  "/images/gallery/474177725_1522287742508901_6560590722516461752_n.jpg",
                href: "/revelations",
                icon: Sparkles,
              },
              {
                title: "The World Through My Lense",
                description: "A journey across landscapes and cultures",
                image:
                  "/images/gallery/90626056_228166948587660_82746590816632832_n.jpg",
                href: "/gallery",
                icon: Camera,
              },
              {
                title: "Unspoken",
                description: "Emotions and stories without words",
                image:
                  "/images/gallery/115803853_337350214335999_6770418776897400047_n.jpg",
                href: "/unspoken",
                icon: Heart,
              },
            ].map((collection, index) => (
              <motion.div
                key={collection.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="group relative overflow-hidden rounded-lg aspect-[3/4] cursor-pointer"
              >
                <Link href={collection.href}>
                  <div className="relative w-full h-full">
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                    <div className="absolute inset-0 flex flex-col justify-end p-8">
                      <collection.icon className="w-8 h-8 text-accent mb-4" />
                      <h3 className="font-serif text-2xl font-bold text-white mb-2">
                        {collection.title}
                      </h3>
                      <p className="text-white/80 text-sm mb-4">
                        {collection.description}
                      </p>
                      <div className="flex items-center text-accent text-sm font-medium group-hover:gap-2 transition-all">
                        Explore
                        <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[600px] rounded-lg overflow-hidden"
            >
              <Image
                src="/images/rigo-headshot.png"
                alt="Rigo Gonzalez-Nossa - Photographer"
                fill
                className="object-cover object-center"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="font-serif text-4xl md:text-5xl font-bold">
                About Rigo Gonzalez-Nossa
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Rigo Gonzalez-Nossa, GPHR, is a U.S. Army Gulf War veteran with 20 years of international
                human resources experience in the oil & gas industry. Beyond his professional achievements,
                Rigo has cultivated a profound passion for fine art photography that captures the essence
                of fleeting moments.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A natural-born leader with charisma and vision, Rigo brings his unique perspective—shaped by
                diverse global experiences—to every photograph. His work reflects a keen eye for detail,
                creative imagination, and an unwavering commitment to seizing moments that tell powerful stories.
                Through UDPhotoArt, he transforms ordinary scenes into extraordinary visual poetry.
              </p>
              <div className="pt-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-accent hover:bg-accent/90">
                    Let's Collaborate
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Photography Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Featured Work
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A selection of recent photographs capturing moments across landscapes, cultures, and emotions
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { src: "/images/gallery/185764493_590243925713292_92118344006535365_n.jpg", span: "md:col-span-2 md:row-span-2", alt: "Mountain Adventure" },
              { src: "/images/gallery/470196863_1497706194967056_3568915975243293120_n.jpg", span: "", alt: "Snowy Mountain" },
              { src: "/images/gallery/469658610_1492810825456593_1774479610467036168_n.jpg", span: "", alt: "Pine Trees" },
              { src: "/images/gallery/473780120_1522297332507942_2116857038139102782_n.jpg", span: "", alt: "Outdoor Event" },
              { src: "/images/gallery/474072692_1522287582508917_8828848308613824450_n.jpg", span: "", alt: "Landscape" },
              { src: "/images/gallery/470239043_1497591364978539_1044147575505170246_n.jpg", span: "md:col-span-2", alt: "Nature Scene" },
              { src: "/images/gallery/471543608_1507785557292453_4527408522898178230_n.jpg", span: "", alt: "Photography" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`relative aspect-square overflow-hidden rounded-lg group cursor-pointer ${item.span}`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/gallery">
              <Button size="lg" variant="outline" className="group">
                View Full Gallery
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              What I Offer
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional photography services tailored to capture your vision
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Camera,
                title: "Fine Art Prints",
                description: "Museum-quality giclée prints on archival paper, available in various sizes"
              },
              {
                icon: Heart,
                title: "Commissioned Work",
                description: "Custom photography projects for personal collections or commercial use"
              },
              {
                icon: Sparkles,
                title: "Workshops",
                description: "Photography workshops and one-on-one mentoring sessions"
              },
              {
                icon: ArrowRight,
                title: "Licensing",
                description: "Image licensing for editorial, commercial, and artistic purposes"
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center p-6 rounded-lg hover:bg-background transition-colors"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                  <service.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-serif text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Client Testimonials
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              What people say about working with UDPhotoArt
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Rigo's photography captures emotion in a way that feels both timeless and immediate. His work has transformed our space into a gallery.",
                author: "Sarah Mitchell",
                role: "Art Collector"
              },
              {
                quote: "Working with Rigo was an incredible experience. His professionalism and artistic vision brought our project to life beyond our expectations.",
                author: "Michael Chen",
                role: "Creative Director"
              },
              {
                quote: "The attention to detail and passion in every frame is remarkable. Rigo doesn't just take photos—he creates art that tells stories.",
                author: "Elena Rodriguez",
                role: "Gallery Owner"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="bg-muted/30 p-8 rounded-lg"
              >
                <p className="text-lg italic mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Feed / Latest Work */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Follow the Journey
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              Stay updated with my latest work and behind-the-scenes moments
            </p>
            <a
              href="https://instagram.com/udphotoart"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent hover:underline font-medium"
            >
              @udPhotoArt on Instagram
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              "/images/gallery/469844086_1494683885269287_3565476610915496335_n.jpg",
              "/images/gallery/470221654_1497706284967047_7911201857432369696_n.jpg",
              "/images/gallery/470204298_1497706278300381_4054561581435501548_n.jpg",
              "/images/gallery/470136212_1497706288300380_319290045049466747_n.jpg",
              "/images/gallery/470178169_1497706281633714_4756408644267114802_n.jpg",
              "/images/gallery/470230178_1497706388300370_1306775224190442007_n.jpg",
            ].map((src, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
              >
                <img
                  src={src}
                  alt={`Instagram post ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Instagram className="w-8 h-8 text-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center space-y-8 bg-gradient-to-br from-muted/50 to-muted/30 p-12 rounded-2xl"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold">
              Let's Create Something Beautiful
            </h2>
            <p className="text-xl text-muted-foreground">
              Whether you're looking for fine art prints, commissioned work, or want to collaborate on a project,
              I'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-accent hover:bg-accent/90 px-8">
                  Get in Touch
                </Button>
              </Link>
              <Link href="/shop">
                <Button size="lg" variant="outline" className="px-8">
                  Browse Prints
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
