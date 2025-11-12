"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useFavorites } from "@/components/favorites-provider";

const navItems = [
  { href: "/", label: "Home" },
  {
    href: "/galleries",
    label: "Galleries",
    submenu: [
      { href: "/galleries/recent-revelations", label: "Recent Revelations" },
      { href: "/galleries/world-through-my-lens", label: "World Through My Lens" },
      { href: "/galleries/captured-perspectives", label: "Captured Perspectives" },
      { href: "/galleries/unspoken", label: "Unspoken" },
    ]
  },
  { href: "/blog", label: "Blog" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { favorites } = useFavorites();
  const favoritesCount = favorites.length;
  const favoritesLabel =
    favoritesCount === 0
      ? "Favorites"
      : `${favoritesCount} favorite${favoritesCount === 1 ? "" : "s"}`;
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const isActive = (href: string, submenu?: { href: string; label: string }[]) => {
    if (submenu) {
      return submenu.some(item => item.href === pathname) || href === pathname;
    }
    return href === pathname;
  };



  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-background backdrop-blur-md shadow-lg"
            : "bg-gradient-to-b from-black/60 to-transparent backdrop-blur-sm"
        )}
      >
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className={cn(
                "relative w-full h-full transition-all duration-300",
                !isScrolled && "drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              )}>
                <Image
                  src={isScrolled ? '/images/logo.png':"/images/logo-white.png"}
                  alt="UD PhotoArt"
                  width={300}
                  height={75}
                  className="h-10 md:h-14 w-auto"
                  priority
                />
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
                  className="relative group"
                >
                  {item.submenu ? (
                    <>
                    <Link
                      href={item.href}>
                      <span
                        className={cn(
                          "text-sm font-medium tracking-wide hover:text-accent transition-colors cursor-pointer relative",
                          isScrolled ? "text-gray-800" : "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]",
                          isActive(item.href, item.submenu) && "text-accent/90"
                        )}
                      >
                        {item.label}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
                      </span></Link>
                      {/* Dropdown */}
                      <div className="absolute top-full left-0 mt-2 w-56 bg-white shadow-xl rounded-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="block px-4 py-3 text-sm text-gray-800 hover:bg-accent hover:text-white transition-colors"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "text-sm font-medium tracking-wide hover:text-accent transition-colors relative",
                        isScrolled ? "text-gray-800" : "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]",
                        isActive(item.href, item.submenu) && "text-accent/90"
                      )}
                    >
                      {item.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
                    </Link>
                  )}
                </motion.div>
              ))}
              <Link
                href="/favorites"
                className={cn(
                  "inline-flex items-center gap-1 px-3 py-1 text-sm font-semibold uppercase tracking-[0.15em] text-white hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                  isScrolled && "border-black/10 bg-white text-gray-900"
                )}
                aria-label={favoritesLabel}
              >
                <Heart
                  className={cn(
                    "h-5 w-5",
                    favoritesCount > 0 ? "fill-current text-accent" : ""
                  )}
                />
                <span className={cn("text-sm", favoritesCount > 0 ? "text-accent" : "text-white/80")}>
                  {favoritesCount}
                </span>
              </Link>
            </div>

            {/* Mobile Favorites + Menu */}
            <div className="flex items-center gap-3 lg:hidden">
              <Link
                href="/favorites"
                className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label={favoritesLabel}
              >
                <Heart
                  className={cn(
                    "h-5 w-5",
                    favoritesCount > 0 ? "fill-current text-accent" : ""
                  )}
                />
                <span className={cn("text-sm", favoritesCount > 0 ? "text-accent" : "text-white/80")}>
                  {favoritesCount}
                </span>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  "p-2 hover:bg-accent/10 rounded-md transition-colors",
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
            <div className="flex flex-col h-full pt-20 px-6 pb-6 overflow-y-auto">
              <div className="flex-1 space-y-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="space-y-2"
                  >
                    {item.submenu ? (
                      <>
                        <div className="text-lg font-semibold tracking-[0.08em] text-accent py-2 font-sans uppercase">
                          {item.label}
                        </div>
                        <div className="pl-4 space-y-2">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block text-base font-medium tracking-wide hover:text-accent transition-colors py-2"
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-lg font-medium tracking-wide hover:text-accent transition-colors py-2"
                      >
                        {item.label}
                      </Link>
                    )}
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
