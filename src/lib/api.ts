// ============================================
// ATLAS_EO API CLIENT
// ============================================

import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";
import { ApiResponse } from "@/types";
import { API_CONFIG } from "./constants";
import { getErrorMessage, safeLocalStorage } from "./utils";

// API Client Instance
let apiClient: AxiosInstance | null = null;

/**
 * Initialize and return API client
 */
export function getApiClient(): AxiosInstance {
  if (apiClient) return apiClient;

  const baseURL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

  apiClient = axios.create({
    baseURL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Request interceptor - Add auth token if exists
  apiClient.interceptors.request.use(
    (config) => {
      const token = safeLocalStorage.getItem("atlas_auth_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor - Handle common errors
  apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      // Handle 401 Unauthorized
      if (error.response?.status === 401) {
        safeLocalStorage.removeItem("atlas_auth_token");
        safeLocalStorage.removeItem("atlas_user");
        // Redirect to login if in browser
        if (typeof window !== "undefined") {
          window.location.href = "/auth/login";
        }
      }

      // Handle 403 Forbidden
      if (error.response?.status === 403) {
        console.error("Access forbidden:", error.response.data);
      }

      // Handle 500 Server Error
      if (error.response?.status === 500) {
        console.error("Server error:", error.response.data);
      }

      return Promise.reject(error);
    }
  );

  return apiClient;
}

/**
 * Generic GET request
 */
export async function apiGet<T = unknown>(
  url: string,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  try {
    const client = getApiClient();
    const response = await client.get<ApiResponse<T>>(url, config);
    return response.data;
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}

/**
 * Generic POST request
 */
export async function apiPost<T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  try {
    const client = getApiClient();
    const response = await client.post<ApiResponse<T>>(url, data, config);
    return response.data;
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}

/**
 * Generic PUT request
 */
export async function apiPut<T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  try {
    const client = getApiClient();
    const response = await client.put<ApiResponse<T>>(url, data, config);
    return response.data;
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}

/**
 * Generic PATCH request
 */
export async function apiPatch<T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  try {
    const client = getApiClient();
    const response = await client.patch<ApiResponse<T>>(url, data, config);
    return response.data;
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}

/**
 * Generic DELETE request
 */
export async function apiDelete<T = unknown>(
  url: string,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  try {
    const client = getApiClient();
    const response = await client.delete<ApiResponse<T>>(url, config);
    return response.data;
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}

/**
 * Retry with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxAttempts: number = API_CONFIG.RETRY_ATTEMPTS,
  baseDelay: number = API_CONFIG.RETRY_DELAY
): Promise<T> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxAttempts) {
        throw error;
      }

      const delay = baseDelay * Math.pow(2, attempt - 1);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw new Error("Max retry attempts exceeded");
}

/**
 * Upload file/image
 */
export async function uploadFile(
  file: File,
  endpoint: string = "/upload"
): Promise<ApiResponse<{ url: string }>> {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const client = getApiClient();
    const response = await client.post<ApiResponse<{ url: string }>>(
      endpoint,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}

/**
 * Authentication API calls
 */
export const authApi = {
  register: async (email: string, password: string, firstName: string, lastName: string) =>
    apiPost("/auth/register", { email, password, firstName, lastName }),

  login: async (email: string, password: string) =>
    apiPost("/auth/login", { email, password }),

  logout: async () => apiPost("/auth/logout"),

  resetPassword: async (email: string) =>
    apiPost("/auth/request-reset", { email }),

  confirmReset: async (token: string, newPassword: string) =>
    apiPost("/auth/reset-password", { token, newPassword }),

  refreshToken: async (refreshToken: string) =>
    apiPost("/auth/refresh", { refresh_token: refreshToken }),

  verifyEmail: async (token: string) =>
    apiPost("/auth/verify-email", { token }),
};

/**
 * Products API calls
 */
export const productsApi = {
  getAll: async (filters?: Record<string, unknown>, page: number = 1, limit: number = 12) =>
    apiGet(`/products?page=${page}&limit=${limit}`, { params: filters }),

  getById: async (id: string) =>
    apiGet(`/products/${id}`),

  getBySlug: async (slug: string) =>
    apiGet(`/products/slug/${slug}`),

  search: async (query: string, limit: number = 10) =>
    apiGet(`/products/search?q=${query}&limit=${limit}`),

  getRelated: async (productId: string, limit: number = 4) =>
    apiGet(`/products/${productId}/related?limit=${limit}`),
};

/**
 * Collections API calls
 */
export const collectionsApi = {
  getAll: async () =>
    apiGet("/collections"),

  getBySlug: async (slug: string) =>
    apiGet(`/collections/${slug}`),

  getProducts: async (slug: string, page: number = 1, limit: number = 12) =>
    apiGet(`/collections/${slug}/products?page=${page}&limit=${limit}`),
};

/**
 * Limited Drops API calls
 */
export const dropsApi = {
  getAll: async () =>
    apiGet("/drops"),

  getActive: async () =>
    apiGet("/drops/active"),

  getBySlug: async (slug: string) =>
    apiGet(`/drops/${slug}`),

  getProducts: async (dropId: string) =>
    apiGet(`/drops/${dropId}/products`),
};

/**
 * Reviews API calls
 */
export const reviewsApi = {
  getByProduct: async (productId: string, page: number = 1, limit: number = 5) =>
    apiGet(`/reviews/product/${productId}?page=${page}&limit=${limit}`),

  create: async (productId: string, data: unknown) =>
    apiPost(`/reviews/product/${productId}`, data),

  update: async (reviewId: string, data: unknown) =>
    apiPut(`/reviews/${reviewId}`, data),

  delete: async (reviewId: string) =>
    apiDelete(`/reviews/${reviewId}`),

  markHelpful: async (reviewId: string) =>
    apiPost(`/reviews/${reviewId}/helpful`),
};

/**
 * Cart API calls (client-side)
 * Note: Cart can be managed purely client-side or synced with server
 */
export const cartApi = {
  sync: async (items: unknown) =>
    apiPost("/cart/sync", { items }),

  validate: async (items: unknown) =>
    apiPost("/cart/validate", { items }),

  getShippingCost: async (items: unknown, postalCode: string) =>
    apiPost("/cart/shipping", { items, postal_code: postalCode }),
};

/**
 * Orders API calls
 */
export const ordersApi = {
  getAll: async (page: number = 1, limit: number = 10) =>
    apiGet(`/orders?page=${page}&limit=${limit}`),

  getById: async (orderId: string) =>
    apiGet(`/orders/${orderId}`),

  create: async (data: unknown) =>
    apiPost("/orders", data),

  cancel: async (orderId: string) =>
    apiPost(`/orders/${orderId}/cancel`),

  getTracking: async (orderId: string) =>
    apiGet(`/orders/${orderId}/tracking`),
};

/**
 * Users API calls
 */
export const usersApi = {
  getProfile: async () =>
    apiGet("/users/profile"),

  updateProfile: async (data: unknown) =>
    apiPut("/users/profile", data),

  getAddresses: async () =>
    apiGet("/users/addresses"),

  createAddress: async (data: unknown) =>
    apiPost("/users/addresses", data),

  updateAddress: async (addressId: string, data: unknown) =>
    apiPut(`/users/addresses/${addressId}`, data),

  deleteAddress: async (addressId: string) =>
    apiDelete(`/users/addresses/${addressId}`),

  getWishlist: async () =>
    apiGet("/users/wishlist"),

  addToWishlist: async (productId: string) =>
    apiPost("/users/wishlist", { product_id: productId }),

  removeFromWishlist: async (productId: string) =>
    apiDelete(`/users/wishlist/${productId}`),

  changePassword: async (currentPassword: string, newPassword: string) =>
    apiPost("/users/change-password", { current_password: currentPassword, new_password: newPassword }),
};

/**
 * Payments API calls
 */
export const paymentsApi = {
  initiate: async (orderId: string) =>
    apiPost(`/payments/initiate/${orderId}`),

  confirm: async (orderId: string, paymentData: unknown) =>
    apiPost(`/payments/confirm/${orderId}`, paymentData),

  getStatus: async (orderId: string) =>
    apiGet(`/payments/status/${orderId}`),

  refund: async (orderId: string, reason: string) =>
    apiPost(`/payments/refund/${orderId}`, { reason }),
};

/**
 * Analytics API calls
 */
export const analyticsApi = {
  trackPageView: async (page: string, referrer?: string) =>
    apiPost("/analytics/page-view", { page, referrer }),

  trackEvent: async (event: string, data?: unknown) =>
    apiPost("/analytics/event", { event, data }),

  trackProductView: async (productId: string) =>
    apiPost("/analytics/product-view", { product_id: productId }),

  trackAddToCart: async (productId: string, quantity: number) =>
    apiPost("/analytics/add-to-cart", { product_id: productId, quantity }),
};
