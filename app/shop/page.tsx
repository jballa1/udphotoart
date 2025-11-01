"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Filter, Check } from "lucide-react";

const categories = ["All", "Prints", "Photobooks", "Digital Downloads"];
const sizes = ["Small (8x10\")", "Medium (16x20\")", "Large (24x36\")", "Extra Large (40x60\")"];

const products = [
  {
    id: 1,
    title: "Golden Horizon",
    category: "Prints",
    image:
      "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2940",
    price: 149,
    description: "Museum-quality giclée print on archival paper",
  },
  {
    id: 2,
    title: "Urban Dreams",
    category: "Prints",
    image:
      "https://images.unsplash.com/photo-1682687221038-404cb8830901?q=80&w=2940",
    price: 149,
    description: "Fine art print capturing city architecture",
  },
  {
    id: 3,
    title: "Silent Waters",
    category: "Prints",
    image:
      "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=2940",
    price: 149,
    description: "Tranquil landscape in premium quality",
  },
  {
    id: 4,
    title: "Wanderlust Collection",
    category: "Photobooks",
    image:
      "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?q=80&w=2940",
    price: 89,
    description: "120 pages of curated travel photography",
  },
  {
    id: 5,
    title: "Monochrome Moments",
    category: "Photobooks",
    image:
      "https://images.unsplash.com/photo-1682687221080-5cb261c645cb?q=80&w=2940",
    price: 79,
    description: "Black and white photography collection",
  },
  {
    id: 6,
    title: "Nature's Symphony",
    category: "Digital Downloads",
    image:
      "https://images.unsplash.com/photo-1682695798256-28a674122872?q=80&w=2940",
    price: 29,
    description: "High-resolution digital file for personal use",
  },
  {
    id: 7,
    title: "Alpine Majesty",
    category: "Prints",
    image:
      "https://images.unsplash.com/photo-1682695796497-31a44224d6d6?q=80&w=2940",
    price: 159,
    description: "Premium mountain landscape print",
  },
  {
    id: 8,
    title: "Seizing the Moment: Vol. 1",
    category: "Photobooks",
    image:
      "https://images.unsplash.com/photo-1682695794947-17061dc284dd?q=80&w=2940",
    price: 99,
    description: "First edition of signature collection",
  },
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState(sizes[1]);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const currentProduct = products.find((p) => p.id === selectedProduct);

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2940"
            alt="Shop"
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
              Shop Fine Art
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Transform your space with museum-quality photography prints
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 border-b border-border sticky top-20 bg-background/95 backdrop-blur-sm z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? "bg-accent text-white"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              {filteredProducts.length} products
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedProduct(product.id)}
                >
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-4">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 px-3 py-1 bg-background/90 backdrop-blur-sm rounded-full text-sm font-medium">
                      ${product.price}
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button className="bg-white text-black hover:bg-white/90">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">
                      {product.category}
                    </p>
                    <h3 className="font-serif text-lg font-bold group-hover:text-accent transition-colors">
                      {product.title}
                    </h3>
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
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-background rounded-lg max-w-4xl w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative aspect-square md:aspect-auto">
                  <Image
                    src={currentProduct.image}
                    alt={currentProduct.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-8 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {currentProduct.category}
                      </p>
                      <h2 className="font-serif text-3xl font-bold mb-4">
                        {currentProduct.title}
                      </h2>
                      <p className="text-lg text-muted-foreground">
                        {currentProduct.description}
                      </p>
                    </div>

                    {currentProduct.category === "Prints" && (
                      <div className="space-y-3">
                        <p className="text-sm font-medium">Select Size:</p>
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
                        <span className="font-serif text-4xl font-bold">
                          ${currentProduct.price}
                        </span>
                        {currentProduct.category === "Prints" && (
                          <span className="text-sm text-muted-foreground">
                            + shipping
                          </span>
                        )}
                      </div>

                      <Button className="w-full bg-accent hover:bg-accent/90 py-6 text-lg">
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2 text-sm text-muted-foreground">
                    <p>✓ Museum-quality materials</p>
                    <p>✓ Certificate of authenticity included</p>
                    <p>✓ Secure worldwide shipping</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              {
                title: "Museum Quality",
                description:
                  "Printed on archival-grade paper using finest giclée techniques",
              },
              {
                title: "Worldwide Shipping",
                description:
                  "Secure packaging and reliable delivery to your location",
              },
              {
                title: "Certificate Included",
                description:
                  "Each print comes with a signed certificate of authenticity",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="space-y-3"
              >
                <h3 className="font-serif text-xl font-bold">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
