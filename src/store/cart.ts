// ============================================
// ATLAS_EO CART STORE (ZUSTAND)
// ============================================

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "@/types";
import { STORAGE_KEYS } from "@/lib/constants";
import { calculateCartSubtotal } from "@/lib/utils";

export interface CartState {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;

  // Actions
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  setShipping: (cost: number) => void;
  calculateTotals: () => void;
}

/**
 * Cart Store
 * Manages shopping cart state with persistence
 */
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      subtotal: 0,
      shipping: 0,
      tax: 0,
      total: 0,

      addItem: (item: CartItem) => {
        set((state) => {
          // Check if item already exists
          const existingItem = state.items.find(
            (i) => i.product_id === item.product_id && i.size === item.size
          );

          let newItems: CartItem[];
          if (existingItem) {
            // Update quantity
            newItems = state.items.map((i) =>
              i.product_id === item.product_id && i.size === item.size
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            );
          } else {
            // Add new item
            newItems = [...state.items, item];
          }

          const newState = { items: newItems };
          // Recalculate totals
          setTimeout(() => get().calculateTotals(), 0);
          return newState;
        });
      },

      removeItem: (productId: string, size: string) => {
        set((state) => {
          const newItems = state.items.filter(
            (item) => !(item.product_id === productId && item.size === size)
          );
          setTimeout(() => get().calculateTotals(), 0);
          return { items: newItems };
        });
      },

      updateQuantity: (productId: string, size: string, quantity: number) => {
        set((state) => {
          if (quantity <= 0) {
            const newItems = state.items.filter(
              (item) => !(item.product_id === productId && item.size === size)
            );
            setTimeout(() => get().calculateTotals(), 0);
            return { items: newItems };
          }

          const newItems = state.items.map((item) =>
            item.product_id === productId && item.size === size
              ? { ...item, quantity }
              : item
          );

          setTimeout(() => get().calculateTotals(), 0);
          return { items: newItems };
        });
      },

      clearCart: () => {
        set({
          items: [],
          subtotal: 0,
          shipping: 0,
          tax: 0,
          total: 0,
        });
      },

      setShipping: (cost: number) => {
        set((_state) => {
          const newState = { shipping: cost };
          setTimeout(() => get().calculateTotals(), 0);
          return newState;
        });
      },

      calculateTotals: () => {
        set((state) => {
          const subtotal = calculateCartSubtotal(state.items);
          const tax = Math.round(subtotal * 0.14 * 100) / 100; // 14% VAT
          const total = subtotal + state.shipping + tax;

          return {
            subtotal,
            tax,
            total,
          };
        });
      },
    }),
    {
      name: STORAGE_KEYS.CART,
      partialize: (state) => ({
        items: state.items,
        shipping: state.shipping,
      }),
    }
  )
);
