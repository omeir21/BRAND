// ============================================
// ATLAS_EO CONSTANTS & CONFIGURATION
// ============================================

// Brand Information
export const BRAND = {
  name: "ATLAS_EO",
  displayName: "ATLAS EO",
  tagline: "Global Top-Tier Luxury Fashion",
  description: "Royal. Elegant. Modern. Clean. Bold. Minimal. Powerful.",
} as const;

// Colors - Strict Luxury Palette
export const COLORS = {
  PRIMARY: "#0B1F3A", // Dark Navy
  ACCENT: "#C6A85B", // Muted Gold
  BACKGROUND: "#F4F1EA", // Off-White
  TEXT: "#111111", // Deep Charcoal
  WHITE: "#FFFFFF",
  BLACK: "#000000",
  GRAY_LIGHT: "#F5F5F5",
  GRAY_MEDIUM: "#CCCCCC",
  GRAY_DARK: "#666666",
  ERROR: "#D32F2F",
  SUCCESS: "#388E3C",
  WARNING: "#F57C00",
  INFO: "#0288D1",
} as const;

// Shipping Configuration
export const SHIPPING_CONFIG = {
  DEFAULT_REGION: "Egypt",
  CURRENCY: "EGP",
  FREE_SHIPPING_THRESHOLD: 2000, // 2000 EGP
  REGIONS: {
    EGYPT: {
      name: "Egypt",
      code: "EG",
      currency: "EGP",
      options: [
        {
          id: "standard",
          name: "Standard Shipping",
          cost: 100,
          estimated_days: 3,
        },
        {
          id: "express",
          name: "Express Shipping",
          cost: 250,
          estimated_days: 1,
        },
      ],
    },
    // Future regions can be added here
    // UNITED_STATES: { ... },
    // UNITED_KINGDOM: { ... },
  },
} as const;

// Collections
export const COLLECTIONS = {
  MENS: "men",
  WOMENS: "women",
  ACCESSORIES: "accessories",
  SEASONAL: "seasonal",
  CAPSULE: "capsule",
} as const;

// Product Categories
export const CATEGORIES = {
  APPAREL: "apparel",
  FOOTWEAR: "footwear",
  ACCESSORIES: "accessories",
  BAGS: "bags",
  JEWELRY: "jewelry",
} as const;

// Sizes
export const SIZES = {
  APPAREL: ["XS", "S", "M", "L", "XL", "XXL"],
  FOOTWEAR: ["35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45"],
} as const;

// Payment Methods
export const PAYMENT_METHODS = {
  ONLINE: "online",
  CASH_ON_DELIVERY: "cash",
} as const;

// Order Status
export const ORDER_STATUSES = {
  PENDING: "pending",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
  REFUNDED: "refunded",
} as const;

// Payment Status
export const PAYMENT_STATUSES = {
  PENDING: "pending",
  COMPLETED: "completed",
  FAILED: "failed",
  REFUNDED: "refunded",
} as const;

// Routes
export const ROUTES = {
  HOME: "/",
  COLLECTIONS: "/collections",
  COLLECTION_DETAIL: (slug: string) => `/collections/${slug}`,
  PRODUCTS: "/products",
  PRODUCT_DETAIL: (slug: string) => `/product/${slug}`,
  DROPS: "/drops",
  DROP_DETAIL: (slug: string) => `/drops/${slug}`,
  CART: "/cart",
  CHECKOUT: "/checkout",
  CHECKOUT_STEP: (step: string) => `/checkout?step=${step}`,
  ACCOUNT: "/account",
  ORDERS: "/account/orders",
  WISHLIST: "/account/wishlist",
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  SEARCH: (query: string) => `/search?q=${query}`,
} as const;

// Search Configuration
export const SEARCH_CONFIG = {
  MIN_QUERY_LENGTH: 2,
  MAX_SUGGESTIONS: 10,
  DEBOUNCE_MS: 300,
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_LIMIT: 12,
  PRODUCT_LIMIT: 12,
  ORDER_LIMIT: 10,
  REVIEW_LIMIT: 5,
} as const;

// Validation Rules
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  CART: "atlas_cart",
  AUTH_TOKEN: "atlas_auth_token",
  REFRESH_TOKEN: "atlas_refresh_token",
  USER: "atlas_user",
  WISHLIST: "atlas_wishlist",
  PREFERENCES: "atlas_preferences",
} as const;

// API Timeouts
export const API_CONFIG = {
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
} as const;

// Review Rating Options
export const REVIEW_RATINGS = [
  { value: 5, label: "Excellent" },
  { value: 4, label: "Good" },
  { value: 3, label: "Average" },
  { value: 2, label: "Poor" },
  { value: 1, label: "Terrible" },
] as const;

// Tax Configuration (Can be expanded per region)
export const TAX_CONFIG = {
  EGYPT: {
    rate: 0.14, // 14% VAT
    apply_to_shipping: true,
  },
} as const;

// Email Templates
export const EMAIL_TEMPLATES = {
  WELCOME: "welcome",
  ORDER_CONFIRMATION: "order_confirmation",
  SHIPPING_CONFIRMATION: "shipping_confirmation",
  DELIVERY_CONFIRMATION: "delivery_confirmation",
  PASSWORD_RESET: "password_reset",
} as const;

// Time Constants
export const TIME_CONSTANTS = {
  SESSION_DURATION: 24 * 60 * 60 * 1000, // 24 hours
  PASSWORD_RESET_EXPIRY: 60 * 60 * 1000, // 1 hour
  OTP_EXPIRY: 15 * 60 * 1000, // 15 minutes
} as const;

// Notification Types
export const NOTIFICATION_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
} as const;

// Image Sizes
export const IMAGE_SIZES = {
  THUMBNAIL: { width: 150, height: 150 },
  CARD: { width: 300, height: 400 },
  DETAIL: { width: 600, height: 800 },
  HERO: { width: 1920, height: 1080 },
  COLLECTION: { width: 800, height: 600 },
} as const;

// Feature Flags
export const FEATURES = {
  ENABLE_REVIEWS: true,
  ENABLE_WISHLIST: true,
  ENABLE_REFERRALS: false,
  ENABLE_VIP_PROGRAM: false,
  ENABLE_GIFT_CARDS: false,
} as const;

// Default Product Filter
export const DEFAULT_FILTERS = {
  category: undefined,
  size: [],
  priceRange: [0, 100000] as [number, number],
  availability: true,
  sortBy: "newest" as const,
  search: "",
};

// Checkout Steps
export const CHECKOUT_STEPS = {
  CUSTOMER: {
    id: "customer",
    label: "Customer",
    number: 1,
  },
  SHIPPING: {
    id: "shipping",
    label: "Shipping",
    number: 2,
  },
  PAYMENT: {
    id: "payment",
    label: "Payment",
    number: 3,
  },
  CONFIRMATION: {
    id: "confirmation",
    label: "Confirmation",
    number: 4,
  },
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please try again.",
  INVALID_EMAIL: "Please enter a valid email address.",
  PASSWORD_TOO_SHORT: `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters.`,
  PASSWORDS_DO_NOT_MATCH: "Passwords do not match.",
  PRODUCT_NOT_FOUND: "Product not found.",
  CART_EMPTY: "Your cart is empty.",
  INSUFFICIENT_STOCK: "This item is out of stock.",
  INVALID_ORDER: "Invalid order information.",
  PAYMENT_FAILED: "Payment processing failed. Please try again.",
  SERVER_ERROR: "Server error. Please try again later.",
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  PRODUCT_ADDED: "Product added to cart.",
  CART_UPDATED: "Cart updated successfully.",
  PRODUCT_ADDED_TO_WISHLIST: "Product added to wishlist.",
  PRODUCT_REMOVED_FROM_WISHLIST: "Product removed from wishlist.",
  ORDER_PLACED: "Order placed successfully.",
  LOGIN_SUCCESSFUL: "Welcome back!",
  LOGOUT_SUCCESSFUL: "You have been logged out.",
  PROFILE_UPDATED: "Profile updated successfully.",
} as const;
