// ============================================
// ATLAS_EO TYPE DEFINITIONS
// ============================================

// Product Types
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
  availability: number;
  sku: string;
  care_instructions?: string[];
  material?: string;
  rating: number;
  reviews_count: number;
  created_at: string;
  is_limited_drop?: boolean;
  drop_id?: string;
}

export interface ProductReview {
  id: string;
  product_id: string;
  user_id: string;
  author_name: string;
  rating: number;
  title: string;
  content: string;
  verified_purchase: boolean;
  created_at: string;
  helpful_count: number;
}

// Collection Types
export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  product_count: number;
}

// Limited Drop Types
export interface LimitedDrop {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  launch_date: string;
  end_date: string;
  products: string[];
  exclusive_message?: string;
}

// Cart Types
export interface CartItem {
  product_id: string;
  product_name: string;
  price: number;
  quantity: number;
  size: string;
  color?: string;
  image: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax?: number;
  total: number;
  last_updated: string;
}

// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  profile_image?: string;
  wishlist: string[];
  created_at: string;
}

export interface AuthUser extends User {
  verified: boolean;
}

// Address Types
export interface Address {
  id: string;
  user_id: string;
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
  type: "billing" | "shipping";
}

// Order Types
export interface OrderItem {
  product_id: string;
  product_name: string;
  price: number;
  quantity: number;
  size: string;
  color?: string;
  image: string;
}

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";

export interface Order {
  id: string;
  order_number: string;
  user_id: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax?: number;
  total: number;
  payment_method: "online" | "cash";
  payment_status: "pending" | "completed" | "failed" | "refunded";
  status: OrderStatus;
  shipping_address: Address;
  billing_address: Address;
  tracking_number?: string;
  created_at: string;
  updated_at: string;
  estimated_delivery?: string;
}

// Checkout Types
export type CheckoutStep = "customer" | "shipping" | "payment" | "confirmation";

export interface CheckoutData {
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  shipping: Address;
  billing: Address;
  payment: {
    method: "online" | "cash";
    transaction_id?: string;
  };
}

// Filter Types
export interface ProductFilters {
  category?: string;
  size?: string[];
  priceRange?: [number, number];
  availability?: boolean;
  sortBy?: "price_asc" | "price_desc" | "newest" | "rating";
  search?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Shipping Types
export interface ShippingOption {
  id: string;
  name: string;
  cost: number;
  estimated_days: number;
  region: string;
}

export interface ShippingConfig {
  region: string;
  options: ShippingOption[];
  free_shipping_threshold?: number;
  currency: string;
}

// Wishlist Types
export interface WishlistItem {
  product_id: string;
  added_at: string;
}
