"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIStore {
  // Location
  selectedCity: string;
  setSelectedCity: (city: string) => void;

  // Sidebar / mobile menu
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;

  // Search overlay
  isSearchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      selectedCity: "Colombo",
      setSelectedCity: (city) => set({ selectedCity: city }),

      isMobileMenuOpen: false,
      setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
      toggleMobileMenu: () =>
        set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

      isSearchOpen: false,
      setSearchOpen: (open) => set({ isSearchOpen: open }),
    }),
    {
      name: "marketplace-ui",
      partialize: (state) => ({ selectedCity: state.selectedCity }),
    }
  )
);
