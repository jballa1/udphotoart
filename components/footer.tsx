"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Twitter, Mail, Phone, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Logo/Icon */}
          <div className="lg:col-span-2 flex justify-center lg:justify-start">
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#D97D3E] to-[#B86A32] p-1">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center p-4">
                  <Image
                    src="/images/logo-icon-round.png"
                    alt="UDPhotoArt Logo"
                    width={120}
                    height={120}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Center: Brand & Contact Info */}
          <div className="lg:col-span-6 text-center lg:text-left space-y-6">
            {/* Name & Title */}
            <div className="border-b border-[#D97D3E] pb-4">
              <h2 className="font-bold text-3xl md:text-4xl mb-2">
                Rigo Gonzalez-Nossa
              </h2>
              <p className="text-lg text-gray-300">Founder & CEO</p>
            </div>

            {/* Logo */}
            <div className="flex items-center justify-center lg:justify-start gap-3 py-2">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/logo-icon-round.png"
                  alt="Camera Icon"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-2xl tracking-tight" style={{ fontFamily: 'Arial, sans-serif' }}>
                  PHOTO<span className="text-[#D97D3E]">ART</span>
                </h3>
                <p className="text-xs tracking-[0.2em] text-gray-400 uppercase">
                  Seizing the Moment
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 text-sm md:text-base">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <Phone className="w-5 h-5 text-[#D97D3E]" />
                <a href="tel:+18323731092" className="hover:text-[#D97D3E] transition-colors">
                  (832) 373-1092
                </a>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <Mail className="w-5 h-5 text-[#D97D3E]" />
                <a href="mailto:udPhotoArt.com@ubiquityd.com" className="hover:text-[#D97D3E] transition-colors">
                  udPhotoArt.com@ubiquityd.com
                </a>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <Globe className="w-5 h-5 text-[#D97D3E]" />
                <a href="https://www.udphotoart.com" className="hover:text-[#D97D3E] transition-colors">
                  www.udphotoart.com
                </a>
              </div>
            </div>
          </div>

          {/* Right: QR Code & Social */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-end gap-6">
            {/* QR Code Placeholder */}
            <div className="bg-white p-4 rounded-lg">
              <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs text-center">
                QR Code
                <br />
                (Add your vCard)
              </div>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/udphotoart"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#D97D3E] flex items-center justify-center hover:bg-[#E89555] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://facebook.com/udphotoart"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#D97D3E] flex items-center justify-center hover:bg-[#E89555] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://twitter.com/udphotoart"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#D97D3E] flex items-center justify-center hover:bg-[#E89555] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-white" />
              </a>
              <span className="text-sm ml-2">/udPhotoArt</span>
            </div>
          </div>
        </div>

        {/* Bottom Wave Section */}
        <div className="mt-16 pt-8 border-t border-[#D97D3E]/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            {/* Left: Phone & Social Handle */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D97D3E]" />
                <a href="tel:+18323731092" className="hover:text-[#D97D3E] transition-colors">
                  (832) 373-1092
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-[#D97D3E]" />
                <Facebook className="w-4 h-4 text-[#D97D3E]" />
                <Twitter className="w-4 h-4 text-[#D97D3E]" />
                <span>/udPhotoArt</span>
              </div>
            </div>

            {/* Right: Copyright */}
            <div className="text-gray-400">
              <p>&copy; {new Date().getFullYear()} UDPhotoArt. All rights reserved.</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-xs text-gray-400">
            <Link href="/gallery" className="hover:text-[#D97D3E] transition-colors">
              Gallery
            </Link>
            <Link href="/revelations" className="hover:text-[#D97D3E] transition-colors">
              Recent Work
            </Link>
            <Link href="/blog" className="hover:text-[#D97D3E] transition-colors">
              Blog
            </Link>
            <Link href="/shop" className="hover:text-[#D97D3E] transition-colors">
              Shop
            </Link>
            <Link href="/contact" className="hover:text-[#D97D3E] transition-colors">
              Contact
            </Link>
            <Link href="/privacy" className="hover:text-[#D97D3E] transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-[#D97D3E] transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
