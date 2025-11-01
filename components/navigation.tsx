"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/revelations", label: "Recent Revelations" },
  { href: "/gallery", label: "The World Through My Lense" },
  { href: "/unspoken", label: "Unspoken" },
  { href: "/perspectives", label: "Captured Perspectives" },
  { href: "/blog", label: "Blog" },
  { href: "/shop", label: "Shop Here" },
  { href: "/contact", label: "Get in Touch" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/98 backdrop-blur-md shadow-lg"
            : "bg-gradient-to-b from-black/60 to-transparent backdrop-blur-sm"
        )}
      >
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className={cn(
                "relative w-10 h-10 md:w-12 md:h-12 transition-all duration-300",
                !isScrolled && "drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              )}>
                <Image
                  src="/images/logo-icon-round.png"
                  alt="UD PhotoArt"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className={cn(
                  "font-bold text-lg md:text-xl tracking-tight transition-colors duration-300",
                  isScrolled ? "text-black" : "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                )} style={{ fontFamily: 'Arial, sans-serif' }}>
                  PHOTO<span style={{ color: '#D97D3E' }}>ART</span>
                </span>
                <span className={cn(
                  "text-[10px] md:text-xs tracking-[0.2em] uppercase transition-colors duration-300",
                  isScrolled ? "text-gray-600" : "text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                )}>
                  SEIZING THE MOMENT
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm font-medium tracking-wide hover:text-accent transition-colors relative group",
                      isScrolled ? "text-gray-800" : "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                    )}
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "lg:hidden p-2 hover:bg-accent/10 rounded-md transition-colors",
                isScrolled ? "text-gray-800" : "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              )}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-y-0 right-0 z-40 w-full max-w-sm bg-background shadow-2xl lg:hidden"
          >
            <div className="flex flex-col h-full pt-20 px-6 pb-6">
              <div className="flex-1 space-y-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-lg font-medium tracking-wide hover:text-accent transition-colors py-2"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
