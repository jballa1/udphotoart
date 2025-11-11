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
          

          {/* Center: Brand & Contact Info */}
          <div className="lg:col-span-8 text-center lg:text-left space-y-6">
            {/* Logo */}
            <div className="flex items-center justify-center lg:justify-start gap-3 py-1">
              <div className="relative w-full h-full">
                <Image
                  src="/images/logo-white.png"
                  alt="Camera Icon"
                  width={500}
                  height={75}
                  className="h-20 w-auto justify-self-center md:justify-self-start"
                  priority
                />
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
            <div className="bg-white p-1 rounded-lg">
              
              <div className="relative w-full h-full">
                <Image
                  src="/images/qr-code.png"
                  alt="qr Code"
                  width={150}
                  height={150}
                  className="h-32 w-auto justify-self-center rounded-md md:justify-self-start"
                  priority
                />
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
              <span className="text-sm ml-2">/udPhotoArt</span>
            </div>
          </div>
        </div>

        {/* Bottom Wave Section */}
        <div className="mt-8 pt-4 border-t border-[#D97D3E]/30">

            <div className="text-gray-400 text-center">
              <p>&copy; {new Date().getFullYear()} UDPhotoArt. All rights reserved.</p>
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
