import type { Cart, CartItem } from "@/domain/types";

export interface CartRepository {
  getCart(): Promise<Cart>;
  addItem(item: Omit<CartItem, "id">): Promise<CartItem>;
  updateItem(itemId: string, quantity: number): Promise<CartItem>;
  removeItem(itemId: string): Promise<void>;
}
