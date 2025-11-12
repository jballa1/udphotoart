"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import { X, ShoppingCart, Check } from "lucide-react";
import Image from "next/image";

type CartItem = {
  title: string;
  image: string;
  collection?: string;
  category?: string;
  price?: number;
  description?: string;
};

type CartContextValue = {
  openCart: (item: CartItem) => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const SIZE_OPTIONS = [
  'Small (8"x10")',
  'Medium (16"x20")',
  'Large (24"x36")',
  'Collector (40"x60")',
];

const HIGHLIGHTS = [
  "Museum-quality materials",
  "Certificate of authenticity",
  "Secure worldwide shipping",
];

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState<CartItem | null>(null);
  const [size, setSize] = useState(SIZE_OPTIONS[1]);
  const [justAdded, setJustAdded] = useState(false);

  const openCart = useCallback((newItem: CartItem) => {
    setItem(newItem);
    setIsOpen(true);
    setJustAdded(false);
    setSize(SIZE_OPTIONS[1]);
  }, []);

  const closeCart = useCallback(() => {
    setIsOpen(false);
    setItem(null);
  }, []);

  const handleAddToCart = () => {
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      closeCart();
    }, 1400);
  };

  const displayPrice = useMemo(() => {
    if (!item || typeof item.price !== "number") {
      return "Request Quote";
    }
    return `$${item.price.toLocaleString("en-US")}`;
  }, [item]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeCart();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeCart]);

  return (
    <CartContext.Provider value={{ openCart, closeCart }}>
      {children}

      {isOpen && item && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm">
          <div className="relative grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-3xl bg-background shadow-2xl md:h-[520px] md:grid-cols-2">
            <button
              aria-label="Close purchase modal"
              className="absolute right-4 top-4 z-10 rounded-full bg-black/40 p-2 text-white hover:bg-black/60 transition"
              onClick={closeCart}
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative hidden h-full md:block">
              <Image
                src={item.image}
                alt={item.title}
                width={300}
                height={500}
                className="h-[525px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-black/10" />
              <div className="absolute bottom-6 left-6 text-white space-y-1">
                  {item.collection && (
                  <p className="text-xs uppercase tracking-[0.08em] text-white/80">
                      {item.collection}
                    </p>
                  )}
                  <h3 className="text-2xl font-semibold  tracking-[0.02em] bg-accent/60 rounded-full px-2 py-0.5 inline-block">
                    {item.title}
                  </h3>
              </div>
            </div>

            <div className="flex h-full flex-col gap-6 overflow-y-hidden p-6 md:p-10">
              <div className="space-y-3">
                <p className="section-kicker text-accent">Prints</p>
                <h2 className="text-2xl font-semibold tracking-[0.02em]">
                  {item.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description ??
                    "Select your preferred size to add this artwork to the cart."}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Select Size
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {SIZE_OPTIONS.map((option) => (
                    <button
                      key={option}
                      onClick={() => setSize(option)}
                      className={`rounded-xl border px-4 py-3 text-sm transition ${
                        size === option
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-border hover:border-accent/50"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-4 space-y-3">
                <div className="flex items-baseline justify-between">
                  <div className="inline-flex items-end gap-2">
                    <p className="text-3xl font-semibold tracking-[0.02em]">
                      {displayPrice}
                    </p>
                    <span className="text-sm mb-1 text-muted-foreground">
                      + shipping
                    </span>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="cta-button flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-white hover:bg-[var(--color-accent-hover)] transition"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {justAdded ? "Added!" : "Add to Cart"}
                  </button>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  {HIGHLIGHTS.map((highlight) => (
                    <p key={highlight} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-accent" />
                      {highlight}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
