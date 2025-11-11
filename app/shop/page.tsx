"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check, X, ShoppingBag } from "lucide-react";
import { ScrollIndicator } from "@/components/scroll-indicator";
import { shopProducts } from "@/lib/shop-products";

const categories = ["All", "Prints", "Photobooks", "Digital Downloads"];
const sizes = ["Small (8x10\")", "Medium (16x20\")", "Large (24x36\")", "Extra Large (40x60\")"];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState(sizes[1]);

  const filteredProducts =
    selectedCategory === "All"
      ? shopProducts
      : shopProducts.filter((p) => p.category === selectedCategory);

  const currentProduct = shopProducts.find((p) => p.id === selectedProduct);

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://imagedelivery.net/v_WuhwGIT0Zeg5Rlb5xL8Q/images-world-lens-white-sands-national-park-new-mexico-08b3751a-dba1-440a-aeaf-e8b2c81d2afb-rw-1920.jpg/public"
            alt="Shop Fine Art"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
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
              <span>Gallery Quality</span>
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
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedProduct(product.id)}
                >
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 shadow-lg">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                    {/* Price Badge */}
                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-white text-xs font-sans uppercase tracking-[0.05em]">
                        ${product.price}
                      </span>
                    </div>

                    {/* Hover CTA */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button className="cta-button bg-accent hover:bg-[var(--color-accent-hover)] text-white px-6 py-3">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6">
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
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct !== null && currentProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-background rounded-2xl max-w-5xl w-full overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Product Image */}
                <div className="relative aspect-square md:aspect-auto">
                  <img
                    src={currentProduct.image}
                    alt={currentProduct.title}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="absolute top-4 right-4 p-2 bg-black/70 backdrop-blur-sm rounded-full text-white hover:bg-black/90 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Product Details */}
                <div className="p-8 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div>
                      <span className="inline-block px-3 py-1 bg-secondary text-xs font-medium rounded-full mb-3">
                        {currentProduct.category}
                      </span>
                      <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2 tracking-[0.01em]">
                        {currentProduct.title}
                      </h2>
                      <p className="text-sm text-accent mb-4">
                        {currentProduct.collection}
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        {currentProduct.description}
                      </p>
                    </div>

                    {currentProduct.category === "Prints" && (
                      <div className="space-y-3">
                        <p className="text-sm font-sans uppercase tracking-[0.05em]">
                          Select Size:
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {sizes.map((size) => (
                            <button
                              key={size}
                              onClick={() => setSelectedSize(size)}
                              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                                selectedSize === size
                                  ? "bg-accent text-white"
                                  : "bg-muted hover:bg-muted/80"
                              }`}
                            >
                              {selectedSize === size && (
                                <Check className="w-4 h-4 inline mr-1" />
                              )}
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-4 border-t border-border">
                      <div className="flex items-baseline gap-2 mb-6">
                        <span className="font-heading text-5xl font-bold">
                          ${currentProduct.price}
                        </span>
                        {currentProduct.category === "Prints" && (
                          <span className="text-sm text-muted-foreground">
                            + shipping
                          </span>
                        )}
                      </div>

                      <Button className="cta-button w-full bg-accent hover:bg-[var(--color-accent-hover)] py-6 text-lg text-white">
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-accent" />
                      Gallery-quality materials
                    </p>
                    <p className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-accent" />
                      Certificate of authenticity
                    </p>
                    <p className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-accent" />
                      Secure worldwide shipping
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
