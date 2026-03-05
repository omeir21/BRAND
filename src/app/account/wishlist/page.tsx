// ============================================
// WISHLIST PAGE
// ============================================

"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import { ROUTES } from "@/lib/constants";

export default function WishlistPage() {
  const wishlist: unknown[] = []; // Empty for now

  if (wishlist.length === 0) {
    return (
      <div className="w-full">
        {/* Page Header */}
        <div className="section bg-navy-primary text-white">
          <div className="section-inner text-center">
            <h1 className="text-luxury-large mb-4">MY WISHLIST</h1>
          </div>
        </div>

        {/* Empty Wishlist */}
        <section className="section">
          <div className="section-inner text-center">
            <svg className="mx-auto mb-6 h-20 w-20 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h2 className="mb-4 text-2xl font-bold">Your Wishlist is Empty</h2>
            <p className="mb-6 text-gray-600">
              Start adding your favorite items to your wishlist.
            </p>
            <Button variant="primary" size="lg">
              <Link href={ROUTES.PRODUCTS}>EXPLORE COLLECTION</Link>
            </Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="section bg-navy-primary text-white">
        <div className="section-inner text-center">
          <h1 className="text-luxury-large mb-4">MY WISHLIST</h1>
        </div>
      </div>

      {/* Wishlist Grid */}
      <section className="section">
        <div className="section-inner">
          {/* Items would be displayed here */}
        </div>
      </section>
    </div>
  );
}
