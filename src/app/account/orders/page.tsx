// ============================================
// ORDERS PAGE
// ============================================

"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import { ROUTES } from "@/lib/constants";

// Mock order data with products
const MOCK_ORDERS = [
  {
    id: "ORDER-001",
    date: "2026-02-15",
    status: "Delivered",
    items: [
      {
        id: "product-1",
        name: "Premium Silk Blouse",
        slug: "premium-silk-blouse",
        price: 1250,
        image: "/images/product-1.svg",
        quantity: 1,
      },
      {
        id: "product-2",
        name: "Classic Wool Coat",
        slug: "classic-wool-coat",
        price: 2500,
        image: "/images/product-2.svg",
        quantity: 1,
      },
    ],
    total: 3750,
  },
  {
    id: "ORDER-002",
    date: "2026-03-01",
    status: "Processing",
    items: [
      {
        id: "product-3",
        name: "Leather Handbag",
        slug: "leather-handbag",
        price: 1800,
        image: "/images/product-3.svg",
        quantity: 1,
      },
    ],
    total: 1800,
  },
];

export default function OrdersPage() {
  const orders = MOCK_ORDERS;

  if (orders.length === 0) {
    return (
      <div className="w-full">
        {/* Page Header */}
        <div className="section bg-navy-primary text-white">
          <div className="section-inner text-center">
            <h1 className="text-luxury-large mb-4">MY ORDERS</h1>
          </div>
        </div>

        {/* Empty Orders */}
        <section className="section">
          <div className="section-inner text-center">
            <svg className="mx-auto mb-6 h-20 w-20 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4l1-12z" />
            </svg>
            <h2 className="mb-4 text-2xl font-bold">No Orders Yet</h2>
            <p className="mb-6 text-gray-600">
              You haven't placed any orders yet. Start shopping to see your orders here.
            </p>
            <Button variant="primary" size="lg">
              <Link href={ROUTES.PRODUCTS}>SHOP NOW</Link>
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
          <h1 className="text-luxury-large mb-4">MY ORDERS</h1>
        </div>
      </div>

      {/* Orders List */}
      <section className="section">
        <div className="section-inner">
          {orders.map((order) => (
            <div key={order.id} className="mb-12 rounded-lg border border-gray-200 p-6">
              {/* Order Header */}
              <div className="mb-6 flex flex-col justify-between gap-4 border-b border-gray-200 pb-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm text-gray-600">Order ID: {order.id}</p>
                  <p className="text-sm text-gray-600">Date: {new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`inline-block rounded-full px-4 py-1 text-sm font-medium ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "Processing"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Products Grid */}
              <div className="mb-6">
                <h3 className="mb-4 text-lg font-semibold">Items in Order</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {order.items.map((item) => (
                    <Link
                      key={item.id}
                      href={`/product/${item.slug}`}
                      className="group block overflow-hidden rounded-lg border border-gray-200 transition-all hover:shadow-lg"
                    >
                      {/* Product Image */}
                      <div className="relative h-48 w-full overflow-hidden bg-gray-100 sm:h-64">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <h4 className="mb-2 line-clamp-2 text-sm font-semibold text-navy-primary group-hover:text-gold-accent">
                          {item.name}
                        </h4>
                        <div className="flex items-baseline justify-between">
                          <span className="text-lg font-bold text-navy-primary">{item.price.toLocaleString()} EGP</span>
                          <span className="text-xs text-gray-600">Qty: {item.quantity}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Order Total */}
              <div className="flex justify-end border-t border-gray-200 pt-4">
                <div className="text-right">
                  <p className="mb-2 text-sm text-gray-600">Order Total:</p>
                  <p className="text-2xl font-bold text-navy-primary">{order.total.toLocaleString()} EGP</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
