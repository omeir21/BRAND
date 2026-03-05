// ============================================
// ATLAS_EO UTILITY FUNCTIONS
// ============================================

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Product, OrderStatus } from "@/types";
import { VALIDATION, COLORS } from "./constants";

/**
 * Merge class names with Tailwind CSS conflict resolution
 * Combines clsx for conditional classes with twMerge for proper Tailwind merging
 */
export const cn = (...classes: ClassValue[]) => twMerge(clsx(...classes));

/**
 * Format currency to EGP
 */
export function formatCurrency(
  amount: number,
  currency: string = "EGP",
  locale: string = "en-EG"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format date in elegant format
 */
export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return new Intl.DateTimeFormat("en-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

/**
 * Calculate countdown time remaining
 */
export function calculateTimeRemaining(
  endDate: string
): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
} {
  const now = new Date().getTime();
  const end = new Date(endDate).getTime();
  const distance = end - now;

  if (distance < 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    ),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
    isExpired: false,
  };
}

/**
 * Validate email address
 */
export function isValidEmail(email: string): boolean {
  return VALIDATION.EMAIL_REGEX.test(email);
}

/**
 * Validate phone number
 */
export function isValidPhone(phone: string): boolean {
  return VALIDATION.PHONE_REGEX.test(phone);
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
    errors.push(
      `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`
    );
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }

  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number");
  }

  if (!/[!@#$%^&*]/.test(password)) {
    errors.push("Password must contain at least one special character (!@#$%^&*)");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Slug generation from text
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * Format number with commas
 */
export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Format order status for display
 */
export function formatOrderStatus(status: OrderStatus): string {
  const statusMap: Record<OrderStatus, string> = {
    pending: "Pending",
    processing: "Processing",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled",
    refunded: "Refunded",
  };
  return statusMap[status] || status;
}

/**
 * Get status color
 */
export function getStatusColor(
  status: OrderStatus
): string {
  const colorMap: Record<OrderStatus, string> = {
    pending: COLORS.WARNING,
    processing: COLORS.INFO,
    shipped: COLORS.INFO,
    delivered: COLORS.SUCCESS,
    cancelled: COLORS.ERROR,
    refunded: COLORS.ERROR,
  };
  return colorMap[status] || COLORS.GRAY_MEDIUM;
}

/**
 * Calculate discount percentage
 */
export function calculateDiscount(
  originalPrice: number,
  currentPrice: number
): number {
  if (originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

/**
 * Get initials from name
 */
export function getInitials(firstName: string, lastName: string): string {
  return `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase();
}

/**
 * Check if product is in stock
 */
export function isProductInStock(product: Product): boolean {
  return product.inStock && product.availability > 0;
}

/**
 * Get product image or fallback
 */
export function getProductImage(product: Product, index: number = 0): string {
  return product.images[index] || "/images/placeholder-product.svg";
}

/**
 * Calculate cart subtotal
 */
export function calculateCartSubtotal(
  items: Array<{ price: number; quantity: number }>
): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

/**
 * Calculate tax amount
 */
export function calculateTax(amount: number, taxRate: number): number {
  return Math.round(amount * taxRate * 100) / 100;
}

/**
 * Safe local storage access
 */
export const safeLocalStorage = {
  getItem: (key: string) => {
    try {
      if (typeof window === "undefined") return null;
      return localStorage.getItem(key);
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return null;
    }
  },
  setItem: (key: string, value: string) => {
    try {
      if (typeof window === "undefined") return;
      localStorage.setItem(key, value);
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  },
  removeItem: (key: string) => {
    try {
      if (typeof window === "undefined") return;
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }
  },
  clear: () => {
    try {
      if (typeof window === "undefined") return;
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  },
};

/**
 * Deep clone object
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Get color contrast (for accessibility)
 */
export function getColorContrast(hexColor: string): "light" | "dark" {
  const hex = hexColor.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? "dark" : "light";
}

/**
 * Format tracking number
 */
export function formatTrackingNumber(trackingNumber: string): string {
  // Format as XXXX-XXXX-XXXX-XXXX style
  const cleaned = trackingNumber.replace(/\D/g, "");
  const match = cleaned.match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/);
  if (!match) return trackingNumber;

  return [match[1], match[2], match[3], match[4]]
    .filter(Boolean)
    .join("-");
}

/**
 * Check if user is on mobile
 */
export function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * Get error message from API response
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "object" && error !== null) {
    const err = error as Record<string, unknown>;
    if (typeof err.message === "string") return err.message;
    if (typeof err.error === "string") return err.error;
  }

  return "An unexpected error occurred";
}

/**
 * Build query string from object
 */
export function buildQueryString(
  params: Record<string, unknown>
): string {
  const filtered = Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== "");
  if (filtered.length === 0) return "";

  return (
    "?" +
    filtered
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
      )
      .join("&")
  );
}

/**
 * Parse query string to object
 */
export function parseQueryString(
  queryString: string
): Record<string, string> {
  const params: Record<string, string> = {};
  const search = queryString.startsWith("?") ? queryString.slice(1) : queryString;

  if (!search) return params;

  search.split("&").forEach((param) => {
    const [key, value] = param.split("=");
    if (key) {
      params[decodeURIComponent(key)] = decodeURIComponent(value || "");
    }
  });

  return params;
}

/**
 * Check if code is production
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

/**
 * Check if code is development
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === "development";
}
