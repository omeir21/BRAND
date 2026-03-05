// ============================================
// DROP DETAIL PAGE
// ============================================

"use client";
import Image from "next/image";
import { useCartStore } from "@/store/cart";
import { useNotification } from "@/store/ui";
import ProductCard from "@/components/ui/ProductCard";
import { calculateTimeRemaining } from "@/lib/utils";
import { Product } from "@/types";

// Mock drop products
const MOCK_DROP_PRODUCTS: Product[] = [
  {
    id: "drop-product-1",
    name: "Exclusive Spring Jacket",
    slug: "exclusive-spring-jacket",
    description: "Limited edition spring jacket",
    price: 2500,
    originalPrice: 3000,
    images: ["/images/drop-product-1.svg"],
    category: "Apparel",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Navy", "Beige"],
    inStock: true,
    availability: 8,
    sku: "DROP-JACKET-001",
    is_limited_drop: true,
    drop_id: "drop-1",
    rating: 5,
    reviews_count: 12,
    created_at: new Date().toISOString(),
  },
];

export default function DropDetailPage() {
  const dropData = {
    id: "drop-1",
    name: "SPRING COLLECTION 2024",
    description: "An exclusive collection celebrating the essence of spring elegance",
    launch_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    end_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    image: "/images/drop-hero.svg",
    long_description:
      "This spring collection represents our vision of modern luxury. Each piece has been carefully crafted by our master artisans using the finest materials sourced from around the world. Limited quantities ensure exclusivity and rarity.",
    features: [
      "Premium materials from Europe",
      "Limited to 500 pieces worldwide",
      "Hand-finished details",
      "Sustainable production practices",
      "Certificate of authenticity",
    ],
  };

  const timeRemaining = calculateTimeRemaining(dropData.end_date);
  const notification = useNotification();
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (product: Product) => {
    addItem({
      product_id: product.id,
      product_name: product.name,
      price: product.price,
      quantity: 1,
      size: product.sizes[0],
      image: product.images[0],
    });
    notification.success("Limited item added to cart!");
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        <Image
          src={dropData.image}
          alt={dropData.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="section-inner relative z-10 flex min-h-screen items-center">
          <div className="max-w-2xl text-white">
            <p className="text-small mb-4 text-gold-accent">LIMITED DROP</p>
            <h1 className="mb-6 font-serif text-6xl font-bold tracking-luxury uppercase leading-tight">
              {dropData.name}
            </h1>
            <p className="mb-8 text-xl font-light">{dropData.description}</p>

            {/* Launch Countdown */}
            {!timeRemaining.isExpired && (
              <div className="rounded-lg bg-white/10 backdrop-blur p-8">
                <p className="mb-6 text-sm font-semibold uppercase">
                  Available for:
                </p>
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { label: "DAYS", value: timeRemaining.days },
                    { label: "HOURS", value: timeRemaining.hours },
                    { label: "MINS", value: timeRemaining.minutes },
                    { label: "SECS", value: timeRemaining.seconds },
                  ].map((item) => (
                    <div key={item.label} className="text-center">
                      <div className="mb-2 font-serif text-4xl font-bold">
                        {String(item.value).padStart(2, "0")}
                      </div>
                      <div className="text-xs uppercase tracking-wider opacity-80">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Drop Details */}
      <section className="section">
        <div className="section-inner">
          <div className="max-w-3xl">
            <h2 className="text-luxury mb-6">ABOUT THIS DROP</h2>
            <p className="mb-8 leading-relaxed text-gray-700">
              {dropData.long_description}
            </p>

            <h3 className="mb-4 font-serif text-2xl font-bold">FEATURES</h3>
            <ul className="mb-8 space-y-3">
              {dropData.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg className="mt-1 h-5 w-5 flex-shrink-0 text-gold-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section bg-gray-50">
        <div className="section-inner">
          <h2 className="text-luxury mb-8">COLLECTION PIECES</h2>
          <div className="grid-products">
            {MOCK_DROP_PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="section">
        <div className="section-inner">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: "💎",
                title: "AUTHENTIC",
                description: "Every piece comes with a certificate of authenticity",
              },
              {
                icon: "🌍",
                title: "SUSTAINABLE",
                description: "Ethically sourced materials from sustainable suppliers",
              },
              {
                icon: "🎁",
                title: "LUXURY PACKAGING",
                description: "Presented in our signature luxury packaging",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <p className="mb-3 text-4xl">{item.icon}</p>
                <h3 className="mb-2 font-serif text-lg font-bold uppercase">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
