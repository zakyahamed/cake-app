import type { Cart, CartItem } from "@/domain/types";
import type { CartRepository } from "../interfaces/cart";
import { apiClient } from "./client";

type ApiCartItem = {
  id: string;
  productId?: string | null;
  serviceId?: string | null;
  variantId?: string | null;
  quantity: number;
  notes?: string | null;
  product?: {
    name?: string;
    businessId?: string;
    price?: number;
    imageUrl?: string | null;
  } | null;
  service?: {
    name?: string;
    businessId?: string;
    price?: number;
    imageUrl?: string | null;
  } | null;
  variant?: { name?: string; price?: number } | null;
};

type ApiCart = { items?: ApiCartItem[] };

function mapItem(item: ApiCartItem): CartItem {
  const catalogItem = item.product ?? item.service;
  const unitPrice =
    item.variant?.price ?? item.product?.price ?? item.service?.price ?? 0;
  const name = catalogItem?.name ?? "Item";

  return {
    id: item.id,
    productId: item.productId ?? item.serviceId ?? "",
    businessId: catalogItem?.businessId ?? "",
    variantId: item.variantId ?? undefined,
    quantity: item.quantity,
    unitPrice,
    name: item.variant?.name ? `${name} - ${item.variant.name}` : name,
    image: catalogItem?.imageUrl ?? undefined,
    notes: item.notes ?? undefined,
  };
}

function mapCart(cart: ApiCart): Cart {
  const items = (cart.items ?? []).map(mapItem);
  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  );
  return { items, subtotal, deliveryFee: 0, discount: 0, total: subtotal };
}

export class ApiCartRepository implements CartRepository {
  async getCart(): Promise<Cart> {
    return mapCart(await apiClient.get<ApiCart>("/cart"));
  }

  async addItem(item: Omit<CartItem, "id">): Promise<CartItem> {
    const result = await apiClient.post<ApiCartItem>("/cart/items", {
      productId: item.productId || undefined,
      variantId: item.variantId,
      quantity: item.quantity,
      notes: item.notes,
    });
    return mapItem(result);
  }

  async updateItem(itemId: string, quantity: number): Promise<CartItem> {
    return mapItem(
      await apiClient.patch<ApiCartItem>(`/cart/items/${itemId}`, { quantity }),
    );
  }

  async removeItem(itemId: string): Promise<void> {
    await apiClient.delete(`/cart/items/${itemId}`);
  }
}
