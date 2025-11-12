"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ScrollIndicator } from "@/components/scroll-indicator";
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Twitter, ContactRound } from "lucide-react";
import { PinterestIcon } from "@/components/footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://imagedelivery.net/v_WuhwGIT0Zeg5Rlb5xL8Q/images-world-lens-white-sands-national-park-new-mexico-08b3751a-dba1-440a-aeaf-e8b2c81d2afb-rw-1920.jpg/public"
            alt="Shop Fine Art"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/50" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-center gap-2 text-accent">
              <ContactRound className="w-6 h-6" />
              <span className="section-kicker text-accent">
                Contact Us
              </span>
            </div>
            <h1 className="hero-title text-white">
              Get in Touch
            </h1>
            <p className="hero-subtitle text-white/85 max-w-2xl mx-auto">
              Let's create something beautiful together
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <ScrollIndicator />
      </section> 

      {/* Contact Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <h2 className="section-heading mb-4 text-left">
                  Let's Connect
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Whether you're interested in commissioning work, purchasing
                  prints, collaborating on a project, or simply want to say
                  hello, I'd love to hear from you.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading mb-1">Email</h3>
                    <a
                      href="mailto:info@udphotoart.com"
                      className="text-muted-foreground hover:text-accent transition-colors"
                    >
                      info@udphotoart.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading mb-1">Phone</h3>
                    <a
                      href="tel:+1234567890"
                      className="text-muted-foreground hover:text-accent transition-colors"
                    >
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading mb-1">Location</h3>
                    <p className="text-muted-foreground">
                      Based in the United States
                      <br />
                      Available worldwide
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-6 border-t border-border">
                <h3 className="font-heading mb-4 text-xl tracking-[0.01em]">
                  Follow My Work
                </h3>
                <div className="flex gap-4">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-border rounded-full hover:border-accent hover:text-accent transition-all"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-border rounded-full hover:border-accent hover:text-accent transition-all"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a
                    href="https://pinterest.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-border rounded-full hover:border-accent hover:text-accent transition-all"
                  >
                    <PinterestIcon className="w-7 h-7" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-3"
            >
              <form
                onSubmit={handleSubmit}
                className="bg-muted/30 rounded-lg p-8 space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium block"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium block"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium block"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                    placeholder="What would you like to discuss?"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium block"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none"
                    placeholder="Tell me about your project or inquiry..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="cta-button w-full bg-accent hover:bg-[var(--color-accent-hover)] py-6 text-lg text-white group"
                >
                  Send Message
                  <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </motion.div>
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
            <h2 className="section-heading mb-4">
              Services Offered
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "Commissioned Work",
                description:
                  "Custom photography projects for personal or commercial use",
              },
              {
                title: "Print Sales",
                description:
                  "Gallery-quality fine art prints of existing work",
              },
              {
                title: "Licensing",
                description:
                  "Image licensing for editorial and commercial purposes",
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="p-6 bg-background rounded-lg border border-border hover:border-accent transition-colors"
              >
                <h3 className="font-heading text-xl font-bold mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
