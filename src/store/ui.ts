// ============================================
// ATLAS_EO UI STORE (ZUSTAND)
// ============================================

import { create } from "zustand";
import { ProductFilters } from "@/types";
import { DEFAULT_FILTERS } from "@/lib/constants";

export interface UIState {
  // Modal states
  isSearchModalOpen: boolean;
  isFilterModalOpen: boolean;
  isCartModalOpen: boolean;
  isMobileMenuOpen: boolean;

  // Filter state
  activeFilters: ProductFilters;
  searchQuery: string;

  // Notification state
  notifications: Array<{
    id: string;
    type: "success" | "error" | "warning" | "info";
    message: string;
  }>;

  // Preferences
  viewMode: "grid" | "list";
  sortBy: "price_asc" | "price_desc" | "newest" | "rating";

  // Actions
  openSearchModal: () => void;
  closeSearchModal: () => void;
  openFilterModal: () => void;
  closeFilterModal: () => void;
  openCartModal: () => void;
  closeCartModal: () => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;

  setFilters: (filters: Partial<ProductFilters>) => void;
  resetFilters: () => void;
  setSearchQuery: (query: string) => void;

  setViewMode: (mode: "grid" | "list") => void;
  setSortBy: (sort: "price_asc" | "price_desc" | "newest" | "rating") => void;

  addNotification: (type: "success" | "error" | "warning" | "info", message: string) => void;
  removeNotification: (id: string) => void;
}

/**
 * UI Store
 * Manages UI state like modals, filters, notifications
 */
export const useUIStore = create<UIState>((set, get) => ({
  isSearchModalOpen: false,
  isFilterModalOpen: false,
  isCartModalOpen: false,
  isMobileMenuOpen: false,

  activeFilters: DEFAULT_FILTERS,
  searchQuery: "",

  notifications: [],

  viewMode: "grid",
  sortBy: "newest",

  // Modal actions
  openSearchModal: () => set({ isSearchModalOpen: true }),
  closeSearchModal: () => set({ isSearchModalOpen: false }),

  openFilterModal: () => set({ isFilterModalOpen: true }),
  closeFilterModal: () => set({ isFilterModalOpen: false }),

  openCartModal: () => set({ isCartModalOpen: true }),
  closeCartModal: () => set({ isCartModalOpen: false }),

  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),

  // Filter actions
  setFilters: (filters: Partial<ProductFilters>) =>
    set((state) => ({
      activeFilters: {
        ...state.activeFilters,
        ...filters,
      },
    })),

  resetFilters: () =>
    set({
      activeFilters: DEFAULT_FILTERS,
      searchQuery: "",
    }),

  setSearchQuery: (query: string) => set({ searchQuery: query }),

  // Preference actions
  setViewMode: (mode: "grid" | "list") => set({ viewMode: mode }),

  setSortBy: (sort: "price_asc" | "price_desc" | "newest" | "rating") =>
    set((state) => ({
      activeFilters: {
        ...state.activeFilters,
        sortBy: sort,
      },
      sortBy: sort,
    })),

  // Notification actions
  addNotification: (type, message) => {
    const id = `${Date.now()}`;
    set((state) => ({
      notifications: [
        ...state.notifications,
        { id, type, message },
      ],
    }));

    // Auto-remove after 5 seconds
    setTimeout(() => {
      get().removeNotification(id);
    }, 5000);
  },

  removeNotification: (id: string) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}));

// Convenience hooks
export const useNotification = () => {
  const { addNotification } = useUIStore();
  return {
    success: (message: string) => addNotification("success", message),
    error: (message: string) => addNotification("error", message),
    warning: (message: string) => addNotification("warning", message),
    info: (message: string) => addNotification("info", message),
  };
};
