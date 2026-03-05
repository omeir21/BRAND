// ============================================
// HOME PAGE
// ============================================

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BRAND, ROUTES, COLORS } from "@/lib/constants";
import Button from "@/components/ui/Button";

/**
 * Home Page
 * Hero section, featured collections, limited drops, editorial storytelling
 */
export default function HomePage() {
  const [selectedDrop] = useState({
    id: "exclusive-collection-2024",
    name: "EXCLUSIVE COLLECTION 2024",
    subtitle: "A Masterpiece of Elegance",
    date: "2024-12-15",
    image: "/images/placeholder-hero.svg",
  });

  return (
    <div className="w-full">
      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section className="hero relative min-h-[90vh] overflow-hidden flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/placeholder-hero.svg"
            alt={BRAND.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Hero Content */}
        <div className="hero-content max-w-4xl px-4 text-center text-white">
          <h1 className="mb-6 font-serif text-5xl sm:text-6xl md:text-7xl font-bold tracking-luxury uppercase leading-tight animate-fade-in">
            {BRAND.name}
          </h1>
          <p className="mb-8 text-xl sm:text-2xl font-light tracking-wide animate-slide-up">
            {BRAND.description}
          </p>
          <p className="mb-12 text-base sm:text-lg text-white/80 animate-slide-up">
            Global Top-Tier Luxury Fashion
          </p>
          <div className="flex flex-col gap-4 sm:flex-row justify-center animate-slide-up">
            <Button variant="gold" size="lg">
              <Link href={ROUTES.COLLECTIONS}>EXPLORE COLLECTIONS</Link>
            </Button>
            <Button variant="outline" size="lg">
              <Link href={ROUTES.PRODUCTS}>SHOP NOW</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ============================================
          FEATURED COLLECTIONS
          ============================================ */}
      <section className="section">
        <div className="section-inner">
          <div className="mb-12 text-center">
            <h2 className="text-luxury-large mb-4">FEATURED COLLECTIONS</h2>
            <div className="mx-auto h-px w-12 bg-gold-accent" />
          </div>

          <div className="grid-collections gap-8">
            {[
              {
                id: "women-collection",
                name: "WOMEN'S COLLECTION",
                image: "/images/collection-women.svg",
                count: 124,
              },
              {
                id: "men-collection",
                name: "MEN'S COLLECTION",
                image: "/images/collection-men.svg",
                count: 89,
              },
              {
                id: "accessories",
                name: "ACCESSORIES",
                image: "/images/collection-accessories.svg",
                count: 156,
              },
            ].map((collection) => (
              <Link key={collection.id} href={ROUTES.COLLECTION_DETAIL(collection.id)}>
                <div className="group cursor-pointer overflow-hidden">
                  <div className="image-container-landscape relative overflow-hidden bg-gray-100">
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="mb-2 font-serif text-xl font-bold tracking-luxury uppercase">
                      {collection.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {collection.count} ITEMS
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          LIMITED DROPS SECTION
          ============================================ */}
      <section
        className="relative py-20 md:py-32 overflow-hidden"
        style={{ backgroundImage: `url(/images/pattern-dark.png)`, backgroundColor: COLORS.PRIMARY }}
      >
        <div className="absolute inset-0 bg-navy-primary/95" />
        <div className="section-inner relative z-10">
          <div className="mb-12 text-center text-white">
            <h2 className="text-luxury-large mb-4">LIMITED DROP</h2>
            <div className="mx-auto h-px w-12 bg-gold-accent" />
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {/* Drop Image */}
            <div className="overflow-hidden">
              <Image
                src={selectedDrop.image}
                alt={selectedDrop.name}
                width={500}
                height={600}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>

            {/* Drop Info */}
            <div className="flex flex-col justify-center text-white">
              <p className="text-small mb-4 text-gold-accent">EXCLUSIVE RELEASE</p>
              <h3 className="mb-4 font-serif text-4xl font-bold tracking-luxury uppercase">
                {selectedDrop.name}
              </h3>
              <p className="mb-6 text-lg font-light text-white/90">
                {selectedDrop.subtitle}
              </p>

              {/* Countdown Timer */}
              <div className="mb-8 grid grid-cols-4 gap-4">
                {[
                  { label: "DAYS", value: 3 },
                  { label: "HOURS", value: 15 },
                  { label: "MINS", value: 42 },
                  { label: "SECS", value: 17 },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="mb-2 font-serif text-3xl font-bold">
                      {String(item.value).padStart(2, "0")}
                    </div>
                    <div className="text-xs tracking-widest text-white/70">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>

              <p className="mb-8 text-sm text-white/80">
                This exclusive collection launches on {selectedDrop.date}. Limited quantities available.
              </p>

              <div className="flex gap-4">
                <Button variant="gold" size="lg">
                  <Link href={ROUTES.DROP_DETAIL(selectedDrop.id)}>VIEW COLLECTION</Link>
                </Button>
                <Button variant="outline" size="lg">
                  NOTIFY ME
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          EDITORIAL STORYTELLING
          ============================================ */}
      <section className="section">
        <div className="section-inner">
          <div className="mb-12 text-center">
            <h2 className="text-luxury-large mb-4">THE ATLAS STORY</h2>
            <div className="mx-auto h-px w-12 bg-gold-accent" />
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
            {/* Story Text */}
            <div className="space-y-6">
              <h3 className="text-3xl font-serif font-bold">
                CRAFTSMANSHIP MEETS MODERN ELEGANCE
              </h3>
              <p className="text-base leading-relaxed text-gray-700">
                At ATLAS_EO, we believe that true luxury lies in the details. Every piece in our collection
                is meticulously crafted by master artisans who understand that elegance is not about excess,
                but about perfect simplicity.
              </p>
              <p className="text-base leading-relaxed text-gray-700">
                Our philosophy combines royal heritage with contemporary design, creating pieces that transcend
                trends and become timeless investments in style and quality.
              </p>
              <ul className="space-y-3 text-base">
                {[
                  "Premium Materials from Around the World",
                  "Ethical and Sustainable Production",
                  "Expert Craftsmanship and Attention to Detail",
                  "Timeless Design Philosophy",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <svg className="h-5 w-5 flex-shrink-0 text-gold-accent mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <Button variant="primary" size="lg">
                <Link href={ROUTES.PRODUCTS}>DISCOVER MORE</Link>
              </Button>
            </div>

            {/* Story Image */}
            <div className="overflow-hidden">
              <Image
                src="/images/story.svg"
                alt="Atlas Story"
                width={500}
                height={600}
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          NEWSLETTER SECTION
          ============================================ */}
      <section className="section bg-gray-50">
        <div className="section-inner max-w-2xl text-center">
          <h2 className="text-luxury mb-4">STAY UPDATED</h2>
          <p className="mb-8 text-lg text-gray-700">
            Subscribe to receive exclusive offers, new collections, and luxury insights delivered to your inbox.
          </p>
          <form className="flex flex-col gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 rounded-md border border-gray-300 px-4 py-3 text-base focus:border-navy-primary focus:outline-none focus:ring-1 focus:ring-navy-primary"
              required
            />
            <Button variant="gold" size="lg">
              SUBSCRIBE
            </Button>
          </form>
          <p className="mt-4 text-xs text-gray-600">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  );
}
