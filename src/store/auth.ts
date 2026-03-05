// ============================================
// ATLAS_EO AUTH STORE (ZUSTAND)
// ============================================

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthUser } from "@/types";
import { STORAGE_KEYS } from "@/lib/constants";
import { safeLocalStorage } from "@/lib/utils";

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setUser: (user: AuthUser) => void;
  setToken: (token: string) => void;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<AuthUser>) => void;
  setLoading: (isLoading: boolean) => void;
  hydrate: () => void;
}

/**
 * Auth Store
 * Manages authentication state with persistence
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      setUser: (user: AuthUser) => {
        set({
          user,
          isAuthenticated: true,
        });
        safeLocalStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      },

      setToken: (token: string) => {
        set({ token });
        safeLocalStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
      },

      login: (user: AuthUser, token: string) => {
        set({
          user,
          token,
          isAuthenticated: true,
        });
        safeLocalStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
        safeLocalStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
        safeLocalStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        safeLocalStorage.removeItem(STORAGE_KEYS.USER);
        safeLocalStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      },

      updateUser: (updates: Partial<AuthUser>) => {
        set((state) => {
          if (!state.user) return {};
          const updatedUser = { ...state.user, ...updates };
          safeLocalStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
          return { user: updatedUser };
        });
      },

      setLoading: (isLoading: boolean) => {
        set({ isLoading });
      },

      hydrate: () => {
        const storedUser = safeLocalStorage.getItem(STORAGE_KEYS.USER);
        const storedToken = safeLocalStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);

        if (storedUser && storedToken) {
          try {
            const user = JSON.parse(storedUser) as AuthUser;
            set({
              user,
              token: storedToken,
              isAuthenticated: true,
            });
          } catch (error) {
            console.error("Error hydrating auth store:", error);
            safeLocalStorage.removeItem(STORAGE_KEYS.USER);
            safeLocalStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
          }
        }
      },
    }),
    {
      name: STORAGE_KEYS.AUTH_TOKEN,
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
