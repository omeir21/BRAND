// ============================================
// COLLECTION DETAIL PAGE
// ============================================

"use client";

import { useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/store/cart";
import { useNotification } from "@/store/ui";
import ProductCard from "@/components/ui/ProductCard";
import Button from "@/components/ui/Button";
import { CATEGORIES, SIZES } from "@/lib/constants";
import { Product } from "@/types";

// Mock products
const MOCK_PRODUCTS: Product[] = [
  {
    id: "product-1",
    name: "Premium Silk Blouse",
    slug: "premium-silk-blouse",
    description: "Luxurious silk blouse",
    price: 1250,
    originalPrice: 1500,
    images: ["/images/product-1.svg"],
    category: "Apparel",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "White"],
    inStock: true,
    availability: 15,
    sku: "SILK-001",
    rating: 4.8,
    reviews_count: 24,
    created_at: new Date().toISOString(),
  },
];

export default function CollectionDetailPage() {
  const [filteredProducts] = useState(MOCK_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

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
    notification.success("Product added to cart!");
  };

  return (
    <div className="w-full">
      {/* Collection Header */}
      <section className="relative min-h-96 overflow-hidden">
        <Image
          src="/images/collection-hero.svg"
          alt="Collection"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="section-inner relative z-10 flex min-h-96 items-center justify-center text-center text-white">
          <div>
            <h1 className="text-luxury-large mb-4">WOMEN'S COLLECTION</h1>
            <p className="text-lg">87 Items</p>
          </div>
        </div>
      </section>

      {/* Collection Content */}
      <section className="section">
        <div className="section-inner">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Filters */}
            <div className="md:col-span-1">
              <div className="space-y-6">
                <div>
                  <h3 className="mb-4 font-semibold uppercase tracking-wider">
                    Category
                  </h3>
                  <div className="space-y-2">
                    {Object.values(CATEGORIES).map((category) => (
                      <label key={category} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedCategory === category}
                          onChange={() =>
                            setSelectedCategory(
                              selectedCategory === category ? "" : category
                            )
                          }
                        />
                        <span className="text-sm capitalize">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 font-semibold uppercase tracking-wider">
                    Size
                  </h3>
                  <div className="space-y-2">
                    {SIZES.APPAREL.map((size) => (
                      <label key={size} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedSize === size}
                          onChange={() =>
                            setSelectedSize(selectedSize === size ? "" : size)
                          }
                        />
                        <span className="text-sm">{size}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSelectedCategory("");
                    setSelectedSize("");
                  }}
                >
                  RESET FILTERS
                </Button>
              </div>
            </div>

            {/* Products */}
            <div className="md:col-span-3">
              <p className="mb-6 text-sm text-gray-600">
                Showing {filteredProducts.length} products
              </p>
              <div className="grid-products">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
