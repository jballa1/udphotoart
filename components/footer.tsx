"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Mail, Phone, Globe } from "lucide-react";

export function PinterestIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M12.04 2C7.58 2 4 5.58 4 10.04c0 3.35 1.99 6.23 4.83 7.45-.07-.63-.13-1.61.03-2.3.14-.6.9-3.84.9-3.84s-.23-.47-.23-1.16c0-1.08.63-1.89 1.42-1.89.67 0 1 .5 1 1.1 0 .67-.42 1.67-.63 2.6-.18.77.4 1.4 1.17 1.4 1.4 0 2.48-1.48 2.48-3.6 0-1.88-1.35-3.19-3.28-3.19-2.24 0-3.55 1.68-3.55 3.42 0 .68.27 1.4.61 1.8.07.08.08.15.06.23-.06.25-.19.78-.22.89-.04.17-.14.21-.33.13-1.23-.56-2-2.33-2-3.75 0-3.05 2.22-5.86 6.41-5.86 3.36 0 5.97 2.39 5.97 5.59 0 3.34-2.11 6.03-5.05 6.03-1 0-1.94-.52-2.27-1.14l-.62 2.36c-.23.89-.86 2-1.28 2.68.96.3 1.98.47 3.04.47 4.46 0 8.04-3.58 8.04-8.04C20.08 5.58 16.5 2 12.04 2z" />
    </svg>
  );
}

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
                  +1 (832) 373-1092
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
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://facebook.com/udphotoart"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center hover:bg-[var(--color-accent-hover)] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://pinterest.com/udphotoart"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center hover:bg-[var(--color-accent-hover)] transition-colors"
                aria-label="Pinterest"
              >
                <PinterestIcon className="w-7 h-7" />
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
