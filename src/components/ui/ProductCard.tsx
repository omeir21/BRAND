// ============================================
// PRODUCT CARD COMPONENT
// ============================================

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { formatCurrency, calculateDiscount, truncateText, cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
  isWishlisted?: boolean;
}

/**
 * Product Card Component
 * Displays product in grid format
 */
const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onAddToWishlist,
  isWishlisted = false,
}) => {
  const discountPercent = product.originalPrice
    ? calculateDiscount(product.originalPrice, product.price)
    : 0;

  return (
    <Link href={ROUTES.PRODUCT_DETAIL(product.slug)}>
      <div className="group card-hover animate-fade-in overflow-hidden cursor-pointer">
        {/* Image Container */}
        <div className="relative mb-4 overflow-hidden bg-gray-100">
          <div className="image-container-portrait relative">
            <Image
              src={product.images[0] || "/images/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>

          {/* Badge */}
          <div className="absolute right-0 top-0 space-y-2 p-4">
            {discountPercent > 0 && (
              <div className="bg-red-600 px-2 py-1 text-center text-xs font-bold text-white">
                -{discountPercent}%
              </div>
            )}
            {product.is_limited_drop && (
              <div className="bg-gold-accent px-2 py-1 text-center text-xs font-bold text-white">
                LIMITED
              </div>
            )}
          </div>

          {/* Actions - Show on Hover */}
          <div className="absolute inset-0 flex items-end justify-center gap-2 bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-40">
            <div className="translate-y-full space-y-2 transition-transform duration-300 group-hover:translate-y-0">
              {onAddToCart && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onAddToCart(product);
                  }}
                  type="button"
                  className={cn(
                    "w-full rounded-md px-4 py-2 text-sm font-semibold transition-all duration-300",
                    "bg-gold-accent text-white hover:bg-gold-accent/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                  disabled={!product.inStock}
                >
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </button>
              )}
              {onAddToWishlist && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onAddToWishlist(product);
                  }}
                  type="button"
                  className={cn(
                    "flex w-full items-center justify-center gap-2 rounded-md px-4 py-2 transition-all duration-300",
                    isWishlisted
                      ? "bg-gold-accent text-white"
                      : "border border-white text-white hover:bg-white hover:text-navy-primary"
                  )}
                >
                  <svg className="h-4 w-4" fill={isWishlisted ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Wishlist
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="px-2">
          {/* Category */}
          <p className="text-small mb-2 text-gray-600">{product.category}</p>

          {/* Name */}
          <h3 className="mb-2 text-sm font-semibold leading-tight text-charcoal transition-colors group-hover:text-navy-primary">
            {truncateText(product.name, 50)}
          </h3>

          {/* Rating */}
          {product.reviews_count > 0 && (
            <div className="mb-3 flex items-center gap-1">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={cn(
                      "h-3 w-3",
                      i < Math.round(product.rating)
                        ? "fill-gold-accent text-gold-accent"
                        : "fill-gray-300 text-gray-300"
                    )}
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="ml-1 text-xs text-gray-600">({product.reviews_count})</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-navy-primary">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          {!product.inStock && (
            <p className="mt-2 text-xs text-red-600 font-semibold">OUT OF STOCK</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
