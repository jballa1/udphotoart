"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ShoppingBag } from "lucide-react";
import { ScrollIndicator } from "@/components/scroll-indicator";
import { shopProducts } from "@/lib/shop-products";
import { useCart } from "@/components/cart-provider";
import { AddToCartButton } from "@/components/add-to-cart-button";

const categories = ["All", "Prints", "Photobooks", "Digital Downloads"];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { openCart } = useCart();

  const filteredProducts =
    selectedCategory === "All"
      ? shopProducts
      : shopProducts.filter((p) => p.category === selectedCategory);

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
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
            className="space-y-6"
          >
            <div className="flex items-center justify-center gap-2 text-accent">
              <ShoppingBag className="w-6 h-6" />
              <span className="section-kicker text-accent">
                Fine Art Collection
              </span>
            </div>
            <h1 className="hero-title text-white">
              Shop Prints & Books
            </h1>
            <p className="hero-subtitle text-white/85 max-w-2xl mx-auto">
              Transform your space with gallery-quality photography—each piece
              tells a story
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-white/70 text-sm font-sans uppercase tracking-[0.05em]">
              <span>15 Products</span>
              <span>•</span>
              <span>Gallery Quality</span>
              <span>•</span>
              <span>Worldwide Shipping</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <ScrollIndicator />
      </section>

      {/* Category Filter */}
      <section className="sticky top-20 z-20 bg-background/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-sans uppercase tracking-[0.05em] transition-all ${
                  selectedCategory === category
                    ? "bg-accent text-white shadow-lg scale-105"
                    : "bg-secondary text-foreground hover:bg-accent/10 hover:text-accent"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="group cursor-pointer"
                onClick={() => openCart(product)}
              >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 shadow-lg">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-white text-xs font-sans uppercase tracking-[0.05em]">
                      ${product.price}
                    </span>
                  </div>

                  {/* Hover CTA */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <AddToCartButton
                        title={product.title}
                        image={product.image}
                        collection={product.collection}
                        category={product.category}
                        price={product.price}
                        description={product.description}
                        label="View Details"
                      className="px-6 py-3"
                      />
                    </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                    <span className="inline-block px-3 py-1 bg-accent/90 text-white text-xs font-medium rounded-full mb-2">
                          {product.category}
                        </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-heading text-xl font-bold group-hover:text-accent transition-colors tracking-[0.01em]">
                    {product.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {product.collection}
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-24 bg-black/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center max-w-6xl mx-auto">
            {[
              {
                title: "Gallery Quality",
                description:
                  "Printed on archival-grade paper using finest giclée techniques for lasting beauty",
              },
              {
                title: "Worldwide Shipping",
                description:
                  "Secure packaging and reliable delivery to your location, anywhere in the world",
              },
              {
                title: "Authenticity Guaranteed",
                description:
                  "Each print includes a signed certificate of authenticity and edition number",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="space-y-4"
              >
                <h3 className="font-heading text-2xl font-bold tracking-[0.01em]">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
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
