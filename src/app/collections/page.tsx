// ============================================
// COLLECTIONS PAGE
// ============================================

"use client";

import Link from "next/link";
import Image from "next/image";
import { ROUTES } from "@/lib/constants";
import Button from "@/components/ui/Button";

export default function CollectionsPage() {

  const collections = [
    {
      id: "women",
      name: "WOMEN'S COLLECTION",
      description: "Elevated elegance for the modern woman",
      image: "/images/collection-women.svg",
      items: 124,
    },
    {
      id: "men",
      name: "MEN'S COLLECTION",
      description: "Refined sophistication for the discerning gentleman",
      image: "/images/collection-men.svg",
      items: 89,
    },
    {
      id: "accessories",
      name: "ACCESSORIES",
      description: "The perfect finishing touch",
      image: "/images/collection-accessories.svg",
      items: 156,
    },
    {
      id: "footwear",
      name: "FOOTWEAR",
      description: "Step into luxury",
      image: "/images/collection-footwear.svg",
      items: 67,
    },
    {
      id: "bags",
      name: "BAGS",
      description: "Timeless pieces for the collection",
      image: "/images/collection-bags.svg",
      items: 43,
    },
    {
      id: "jewelry",
      name: "JEWELRY",
      description: "Precious moments captured",
      image: "/images/collection-jewelry.svg",
      items: 52,
    },
  ];

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="section bg-navy-primary text-white">
        <div className="section-inner text-center">
          <h1 className="text-luxury-large mb-4">COLLECTIONS</h1>
          <p className="text-lg text-white/80">
            Explore our curated selections of luxury fashion
          </p>
        </div>
      </div>

      {/* Collections Grid */}
      <section className="section">
        <div className="section-inner">
          <div className="grid-collections">
            {collections.map((collection) => (
              <div
                key={collection.id}
                className="group cursor-pointer"
              >
                <Link href={ROUTES.COLLECTION_DETAIL(collection.id)}>
                  <div className="relative overflow-hidden bg-gray-100">
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      width={400}
                      height={500}
                      className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40">
                      <Button
                        variant="gold"
                        size="md"
                        className="translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                      >
                        EXPLORE
                      </Button>
                    </div>
                  </div>

                  {/* Collection Info */}
                  <div className="mt-6 text-center">
                    <h3 className="mb-2 font-serif text-xl font-bold tracking-luxury uppercase">
                      {collection.name}
                    </h3>
                    <p className="mb-4 text-sm text-gray-600">
                      {collection.description}
                    </p>
                    <p className="text-xs tracking-widest text-gray-500">
                      {collection.items} ITEMS
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Banner */}
      <section className="section bg-gray-50">
        <div className="section-inner">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {[
              {
                title: "NEW ARRIVALS",
                description: "Discover the latest pieces in our collection",
                cta: "SHOP NEW",
              },
              {
                title: "BESTSELLERS",
                description: "Explore the most loved items by our customers",
                cta: "VIEW TOP PICKS",
              },
            ].map((banner, index) => (
              <div key={index} className="overflow-hidden rounded-lg bg-white p-8">
                <h3 className="mb-2 font-serif text-2xl font-bold">
                  {banner.title}
                </h3>
                <p className="mb-6 text-gray-600">{banner.description}</p>
                <Button variant="primary">
                  {banner.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
