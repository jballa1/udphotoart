"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Mail, Phone, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0b0b0b] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Brand & Statement */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            <Image
              src="/images/logo-white.png"
              alt="UDPhotoArt"
              width={360}
              height={80}
              className="mx-auto lg:mx-0 h-16 w-auto object-contain"
              priority
            />
            <p className="text-base text-white/70 leading-relaxed max-w-md mx-auto lg:mx-0">
              Fine art photography crafted with intention. Cormorant Garamond
              headlines meet Inter body copy, all grounded in a refined taupe
              palette inspired by timeless galleries.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 text-sm">
              <span className="section-kicker text-accent">
                Where Light Meets Legacy
              </span>
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4 space-y-4">
            <p className="section-kicker text-accent">Connect</p>
            <div className="space-y-3 text-sm text-white/70">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent" />
                <a
                  href="tel:+18323731092"
                  className="hover:text-accent transition-colors"
                >
                  (832) 373-1092
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent" />
                <a
                  href="mailto:udPhotoArt.com@ubiquityd.com"
                  className="hover:text-accent transition-colors"
                >
                  udPhotoArt.com@ubiquityd.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-accent" />
                <a
                  href="https://www.udphotoart.com"
                  className="hover:text-accent transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  udphotoart.com
                </a>
              </div>
            </div>
          </div>

          {/* QR + Social */}
          <div className="lg:col-span-3 space-y-6 text-center lg:text-right">
            <div className="inline-flex items-center justify-center rounded-xl border border-white/10 p-3">
              <Image
                src="/images/qr-code.png"
                alt="UDPhotoArt QR code"
                width={150}
                height={150}
                className="h-32 w-32 object-contain"
              />
            </div>
            <div className="flex items-center justify-center lg:justify-end gap-3">
              <a
                href="https://instagram.com/udphotoart"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center hover:bg-[var(--color-accent-hover)] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/udphotoart"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center hover:bg-[var(--color-accent-hover)] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 space-y-6 text-center text-sm text-white/60">
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="/galleries"
              className="hover:text-accent transition-colors"
            >
              Galleries
            </Link>
            <Link
              href="/galleries/recent-revelations"
              className="hover:text-accent transition-colors"
            >
              Recent Revelations
            </Link>
            <Link href="/blog" className="hover:text-accent transition-colors">
              Blog
            </Link>
            <Link href="/shop" className="hover:text-accent transition-colors">
              Shop
            </Link>
            <Link href="/contact" className="hover:text-accent transition-colors">
              Contact
            </Link>
          </div>
          <p>&copy; {new Date().getFullYear()} UDPhotoArt. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
