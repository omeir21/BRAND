// ============================================
// PRODUCT DETAIL PAGE - CLEAN & SIMPLE
// ============================================

"use client";

import { useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/store/cart";
import { useNotification } from "@/store/ui";
import Button from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import { Product } from "@/types";

// Mock product
const MOCK_PRODUCT: Product = {
  id: "product-1",
  name: "Premium Silk Blouse",
  slug: "premium-silk-blouse",
  description: "Luxurious 100% pure silk blouse with elegant draping designed for the discerning woman",
  price: 1250,
  originalPrice: 1500,
  images: [
    "/images/product-1.svg",
    "/images/product-1-alt.svg",
    "/images/product-1-detail.svg",
  ],
  category: "Apparel",
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  colors: ["Black", "White", "Navy"],
  inStock: true,
  availability: 15,
  sku: "SILK-001",
  material: "100% Silk",
  rating: 4.8,
  reviews_count: 24,
  created_at: new Date().toISOString(),
};

export default function ProductDetailPage() {
  const [selectedSize, setSelectedSize] = useState(MOCK_PRODUCT.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(MOCK_PRODUCT.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const addItem = useCartStore((state) => state.addItem);
  const notification = useNotification();

  const handleAddToCart = () => {
    addItem({
      product_id: MOCK_PRODUCT.id,
      product_name: MOCK_PRODUCT.name,
      price: MOCK_PRODUCT.price,
      quantity,
      size: selectedSize,
      color: selectedColor,
      image: MOCK_PRODUCT.images[0],
    });
    notification.success(`${MOCK_PRODUCT.name} added to cart!`);
  };

  return (
    <div className="w-full bg-bg-off-white py-12">
      <div className="container-luxury">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 p-8 md:p-12">
            
            {/* LEFT SIDE - PRODUCT IMAGE */}
            <div className="flex flex-col gap-4">
              <div className="bg-gray-100 rounded-lg overflow-hidden h-[600px] flex items-center justify-center">
                <Image
                  src={MOCK_PRODUCT.images[selectedImageIndex]}
                  alt={MOCK_PRODUCT.name}
                  width={500}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex gap-3">
                {MOCK_PRODUCT.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`h-20 w-20 rounded-lg overflow-hidden border-3 transition-all ${
                      selectedImageIndex === index
                        ? "border-navy-primary shadow-lg"
                        : "border-gray-300 hover:border-navy-primary"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`View ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE - SELECTION */}
            <div className="flex flex-col justify-center gap-6">
              
              {/* Title & Price */}
              <div>
                <h1 className="font-serif text-4xl font-bold text-navy-primary mb-2">
                  {MOCK_PRODUCT.name}
                </h1>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-navy-primary">
                    {formatCurrency(MOCK_PRODUCT.price)}
                  </span>
                  {MOCK_PRODUCT.originalPrice && (
                    <span className="text-xl text-gray-500 line-through">
                      {formatCurrency(MOCK_PRODUCT.originalPrice)}
                    </span>
                  )}
                </div>
                <p className="text-green-600 font-semibold mt-2">In Stock</p>
              </div>

              <hr className="border-gray-300" />

              {/* SIZE SELECTION */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase">
                  Select Size
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {MOCK_PRODUCT.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 px-2 rounded-lg font-bold text-sm transition-all border-2 ${
                        selectedSize === size
                          ? "border-navy-primary bg-navy-primary text-white shadow-lg"
                          : "border-gray-300 bg-gray-50 text-navy-primary hover:border-navy-primary"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* COLOR SELECTION */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase">
                  Select Color
                </label>
                <div className="flex gap-3">
                  {MOCK_PRODUCT.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`py-3 px-6 rounded-lg font-bold text-sm transition-all border-2 ${
                        selectedColor === color
                          ? "border-navy-primary bg-navy-primary text-white shadow-lg"
                          : "border-gray-300 bg-gray-50 text-navy-primary hover:border-navy-primary"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* QUANTITY SELECTION */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 rounded-lg bg-gray-200 hover:bg-gray-300 font-bold text-lg transition-all"
                  >
                    −
                  </button>
                  <span className="text-2xl font-bold text-navy-primary w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 rounded-lg bg-gray-200 hover:bg-gray-300 font-bold text-lg transition-all"
                  >
                    +
                  </button>
                </div>
              </div>

              <hr className="border-gray-300" />

              {/* SELECTED OPTIONS DISPLAY */}
              <div className="bg-bg-off-white p-4 rounded-lg border-2 border-gold-accent">
                <p className="text-xs font-bold text-gray-600 mb-3 uppercase">Your Selection</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Size:</span>
                    <span className="text-xl font-bold text-navy-primary">{selectedSize}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Color:</span>
                    <span className="text-xl font-bold text-gold-accent">{selectedColor}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Quantity:</span>
                    <span className="text-xl font-bold text-navy-primary">×{quantity}</span>
                  </div>
                </div>
              </div>

              {/* ADD TO CART */}
              <Button
                variant="gold"
                size="lg"
                fullWidth
                onClick={handleAddToCart}
                disabled={!MOCK_PRODUCT.inStock}
                className="py-4 text-lg font-bold"
              >
                🛒 ADD TO CART
              </Button>

              {/* ADD TO WISHLIST */}
              <Button
                variant="outline"
                size="lg"
                fullWidth
                className="py-4 text-lg font-bold"
              >
                ♡ ADD TO WISHLIST
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

