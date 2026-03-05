// ============================================
// SHOPPING CART PAGE
// ============================================

"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cart";
import { useNotification } from "@/store/ui";
import Button from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import { ROUTES, SHIPPING_CONFIG } from "@/lib/constants";

export default function CartPage() {
  const {
    items,
    subtotal,
    shipping,
    tax,
    total,
    removeItem,
    updateQuantity,
    setShipping,
    calculateTotals,
  } = useCartStore();

  const notification = useNotification();

  // Recalculate totals when items change
  useEffect(() => {
    calculateTotals();
  }, [items, calculateTotals]);

  // Calculate shipping based on subtotal
  useEffect(() => {
    if (subtotal >= SHIPPING_CONFIG.FREE_SHIPPING_THRESHOLD) {
      setShipping(0);
    } else {
      setShipping(100); // Default shipping cost
    }
  }, [subtotal, setShipping]);

  if (items.length === 0) {
    return (
      <div className="w-full">
        {/* Page Header */}
        <div className="section bg-navy-primary text-white">
          <div className="section-inner text-center">
            <h1 className="text-luxury-large mb-4">SHOPPING CART</h1>
          </div>
        </div>

        {/* Empty Cart */}
        <section className="section">
          <div className="section-inner text-center">
            <svg className="mx-auto mb-6 h-20 w-20 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4l1-12z" />
            </svg>
            <h2 className="mb-4 text-2xl font-bold">Your Cart is Empty</h2>
            <p className="mb-6 text-gray-600">
              Discover our exquisite collection of luxury items.
            </p>
            <Button variant="primary" size="lg">
              <Link href={ROUTES.PRODUCTS}>CONTINUE SHOPPING</Link>
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
          <h1 className="text-luxury-large mb-4">SHOPPING CART</h1>
          <p className="text-lg text-white/80">
            {items.length} item{items.length !== 1 ? "s" : ""} in your cart
          </p>
        </div>
      </div>

      {/* Cart Content */}
      <section className="section">
        <div className="section-inner">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={`${item.product_id}-${item.size}`} className="border-b border-gray-200 pb-6">
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                        <Image
                          src={item.image}
                          alt={item.product_name}
                          width={96}
                          height={96}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <Link href={ROUTES.PRODUCTS}>
                          <h3 className="mb-1 font-semibold text-charcoal hover:text-navy-primary">
                            {item.product_name}
                          </h3>
                        </Link>
                        <p className="mb-3 text-sm text-gray-600">
                          Size: <span className="font-medium">{item.size}</span>
                        </p>

                        {/* Quantity Controls */}
                        <div className="mb-4 flex items-center gap-4">
                          <div className="flex items-center gap-2 border border-gray-300 rounded-md">
                            <button
                              onClick={() => updateQuantity(item.product_id, item.size, item.quantity - 1)}
                              className="px-3 py-1 hover:bg-gray-100"
                            >
                              −
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product_id, item.size, item.quantity + 1)}
                              className="px-3 py-1 hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => {
                              removeItem(item.product_id, item.size);
                              notification.info("Item removed from cart");
                            }}
                            className="text-sm text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </div>

                        {/* Price */}
                        <p className="font-semibold text-navy-primary">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>

                      {/* Individual Price */}
                      <div className="text-right">
                        <p className="text-sm text-gray-600 mb-2">
                          {formatCurrency(item.price)} each
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <div className="mt-8">
                <Button variant="outline">
                  <Link href={ROUTES.PRODUCTS}>CONTINUE SHOPPING</Link>
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="h-fit rounded-lg border border-gray-200 bg-gray-50 p-6">
              <h2 className="mb-6 font-bold uppercase tracking-wider">ORDER SUMMARY</h2>

              <div className="space-y-4 border-b border-gray-200 pb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      formatCurrency(shipping)
                    )}
                  </span>
                </div>

                {tax > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">{formatCurrency(tax)}</span>
                  </div>
                )}

                {subtotal < SHIPPING_CONFIG.FREE_SHIPPING_THRESHOLD && (
                  <p className="text-xs text-green-600">
                    Free shipping for orders over {formatCurrency(SHIPPING_CONFIG.FREE_SHIPPING_THRESHOLD)}
                  </p>
                )}
              </div>

              <div className="my-6 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-gold-accent">{formatCurrency(total)}</span>
              </div>

              <Button variant="gold" size="lg" fullWidth>
                <Link href={ROUTES.CHECKOUT}>PROCEED TO CHECKOUT</Link>
              </Button>

              {/* Security Badge */}
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-600">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>Secure checkout</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
