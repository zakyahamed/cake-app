"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/domain/types";
import { cartRepository } from "@/repositories";

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const id = `cart-${Date.now()}-${Math.random()}`;
        const existingIndex = get().items.findIndex(
          (i) =>
            i.productId === item.productId &&
            i.variantId === item.variantId &&
            i.businessId === item.businessId,
        );

        if (existingIndex !== -1) {
          // Increase quantity of existing item
          set((state) => ({
            items: state.items.map((i, idx) =>
              idx === existingIndex
                ? { ...i, quantity: i.quantity + item.quantity }
                : i,
            ),
          }));
          const existingItem = get().items[existingIndex];
          if (existingItem) {
            void cartRepository
              .updateItem(existingItem.id, existingItem.quantity)
              .catch(() => undefined);
          }
        } else {
          const optimisticItem = { ...item, id };
          set((state) => ({ items: [...state.items, optimisticItem] }));
          void cartRepository
            .addItem(item)
            .then((savedItem) => {
              set((state) => ({
                items: state.items.map((current) =>
                  current.id === id ? savedItem : current,
                ),
              }));
            })
            .catch(() => {
              set((state) => ({
                items: state.items.filter((current) => current.id !== id),
              }));
            });
        }
      },

      removeItem: (itemId) => {
        set((state) => ({ items: state.items.filter((i) => i.id !== itemId) }));
        if (!itemId.startsWith("cart-"))
          void cartRepository.removeItem(itemId).catch(() => undefined);
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity < 1) {
          get().removeItem(itemId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.id === itemId ? { ...i, quantity } : i,
          ),
        }));
        if (!itemId.startsWith("cart-"))
          void cartRepository
            .updateItem(itemId, quantity)
            .catch(() => undefined);
      },

      clearCart: () => set({ items: [] }),

      getSubtotal: () =>
        get().items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0),

      getTotalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    {
      name: "marketplace-cart",
    },
  ),
);
