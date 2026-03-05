// ============================================
// HEADER/NAVBAR COMPONENT
// ============================================

"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/auth";
import { useCartStore } from "@/store/cart";
import { useUIStore } from "@/store/ui";
import { ROUTES, BRAND } from "@/lib/constants";
import Button from "@/components/ui/Button";

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const cartItems = useCartStore((state) => state.items);
  const openSearchModal = useUIStore((state) => state.openSearchModal);

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-off-white">
      <div className="container-luxury">
        <div className="flex items-center justify-between py-4 md:py-6">
          {/* Logo */}
          <Link href={ROUTES.HOME} className="flex items-center gap-2">
            <div className="text-2xl font-bold tracking-luxury text-navy-primary">
              {BRAND.name}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden gap-8 md:flex">
            <Link href={ROUTES.COLLECTIONS} className="link-nav text-charcoal">
              COLLECTIONS
            </Link>
            <Link href={ROUTES.DROPS} className="link-nav text-charcoal">
              LIMITED DROPS
            </Link>
            <Link href={ROUTES.PRODUCTS} className="link-nav text-charcoal">
              SHOP
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Search */}
            <button
              onClick={openSearchModal}
              className="group transition-colors hover:text-navy-primary"
              aria-label="Search products"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Account */}
            <div className="relative group hidden md:block">
              <button className="transition-colors hover:text-navy-primary">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 hidden w-48 bg-white shadow-lg group-hover:block animate-slide-down">
                {isAuthenticated ? (
                  <>
                    <div className="border-b px-4 py-3">
                      <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
                      <p className="text-xs text-gray-600">{user?.email}</p>
                    </div>
                    <Link href={ROUTES.ACCOUNT} className="block px-4 py-2 text-sm hover:bg-gray-100">
                      My Account
                    </Link>
                    <Link href={ROUTES.ORDERS} className="block px-4 py-2 text-sm hover:bg-gray-100">
                      Orders
                    </Link>
                    <Link href={ROUTES.WISHLIST} className="block px-4 py-2 text-sm hover:bg-gray-100">
                      Wishlist
                    </Link>
                    <button className="w-full border-t px-4 py-2 text-left text-sm hover:bg-gray-100">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link href={ROUTES.LOGIN} className="block px-4 py-2 text-sm hover:bg-gray-100">
                      Login
                    </Link>
                    <Link href={ROUTES.REGISTER} className="block px-4 py-2 border-t text-sm hover:bg-gray-100">
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Wishlist */}
            <Link href={ROUTES.WISHLIST} className="hidden transition-colors hover:text-navy-primary md:block">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </Link>

            {/* Cart */}
            <Link href={ROUTES.CART} className="relative transition-colors hover:text-navy-primary">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4l1-12z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-gold-accent text-xs font-bold text-white">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden transition-colors hover:text-navy-primary"
              aria-label="Toggle menu"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="border-t border-gray-200 py-4 md:hidden animate-slide-down">
            <div className="space-y-4">
              <Link href={ROUTES.COLLECTIONS} className="block text-charcoal">
                Collections
              </Link>
              <Link href={ROUTES.DROPS} className="block text-charcoal">
                Limited Drops
              </Link>
              <Link href={ROUTES.PRODUCTS} className="block text-charcoal">
                Shop
              </Link>
              {!isAuthenticated && (
                <>
                  <Button variant="primary" size="sm" className="w-full">
                    <Link href={ROUTES.LOGIN}>Login</Link>
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    <Link href={ROUTES.REGISTER}>Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
