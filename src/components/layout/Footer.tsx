// ============================================
// FOOTER COMPONENT
// ============================================

import React from "react";
import Link from "next/link";
import { BRAND, ROUTES } from "@/lib/constants";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-navy-primary text-bg-off-white">
      <div className="container-luxury py-16 md:py-24">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Info */}
          <div>
            <h3 className="mb-4 text-lg font-bold tracking-luxury">
              {BRAND.name}
            </h3>
            <p className="text-sm leading-relaxed text-bg-off-white/80">
              {BRAND.description}
            </p>
            <p className="mt-4 text-xs text-bg-off-white/60">
              Global Top-Tier Luxury Fashion
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="mb-4 text-sm font-bold tracking-wide uppercase">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={ROUTES.COLLECTIONS} className="transition-colors hover:text-gold-accent">
                  Collections
                </Link>
              </li>
              <li>
                <Link href={ROUTES.PRODUCTS} className="transition-colors hover:text-gold-accent">
                  All Products
                </Link>
              </li>
              <li>
                <Link href={ROUTES.DROPS} className="transition-colors hover:text-gold-accent">
                  Limited Drops
                </Link>
              </li>
              <li>
                <a href="#new-arrivals" className="transition-colors hover:text-gold-accent">
                  New Arrivals
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="mb-4 text-sm font-bold tracking-wide uppercase">Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#contact" className="transition-colors hover:text-gold-accent">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#shipping" className="transition-colors hover:text-gold-accent">
                  Shipping & Delivery
                </a>
              </li>
              <li>
                <a href="#returns" className="transition-colors hover:text-gold-accent">
                  Returns
                </a>
              </li>
              <li>
                <a href="#faq" className="transition-colors hover:text-gold-accent">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-4 text-sm font-bold tracking-wide uppercase">Updates</h4>
            <p className="mb-4 text-sm">
              Subscribe to receive exclusive offers and updates.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-md bg-white/10 px-3 py-2 text-sm text-bg-off-white placeholder:text-bg-off-white/50 focus:outline-none focus:ring-1 focus:ring-gold-accent"
              />
              <button
                type="submit"
                className="rounded-md bg-gold-accent px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-gold-dark"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-white/10" />

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Copyright */}
          <p className="text-xs text-bg-off-white/60">
            © {currentYear} {BRAND.name}. All rights reserved.
          </p>

          {/* Links */}
          <div className="flex gap-6 text-xs text-bg-off-white/60">
            <a href="#privacy" className="transition-colors hover:text-gold-accent">
              Privacy Policy
            </a>
            <a href="#terms" className="transition-colors hover:text-gold-accent">
              Terms of Service
            </a>
            <a href="#accessibility" className="transition-colors hover:text-gold-accent">
              Accessibility
            </a>
          </div>

          {/* Social */}
          <div className="flex gap-4">
            {[
              { name: "Instagram", href: "#instagram" },
              { name: "Twitter", href: "#twitter" },
              { name: "Facebook", href: "#facebook" },
            ].map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="transition-colors hover:text-gold-accent"
                aria-label={social.name}
              >
                <span className="text-xs uppercase">{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
