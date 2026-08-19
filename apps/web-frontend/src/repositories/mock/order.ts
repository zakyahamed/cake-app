import { mockOrders } from "@/mock-data";
import { OrderStatus } from "@/domain/enums";
import type { Order, OrderQuery, PaginatedResult } from "@/domain/types";
import type { OrderRepository } from "../interfaces/order";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// In-memory mutable store so mutations persist within a session
let orders: Order[] = [...mockOrders];

function paginate<T>(items: T[], page = 1, limit = 10): PaginatedResult<T> {
  const total = items.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const data = items.slice(start, start + limit);
  return { data, meta: { page, limit, total, totalPages } };
}

export class MockOrderRepository implements OrderRepository {
  async getOrders(query?: OrderQuery): Promise<PaginatedResult<Order>> {
    await delay(250);
    let results = [...orders];

    if (query?.customerId) {
      results = results.filter((o) => o.customerId === query.customerId);
    }
    if (query?.status) {
      results = results.filter((o) => o.status === query.status);
    }

    // Sort newest first
    results.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    return paginate(results, query?.page, query?.limit);
  }

  async getBusinessOrders(businessId: string): Promise<Order[]> {
    await delay(200);
    return orders.filter(o => o.businessId === businessId);
  }

  async getOrderById(id: string): Promise<Order | null> {
    await delay(200);
    return orders.find((o) => o.id === id) ?? null;
  }

  async createOrder(
    orderData: Omit<Order, "id" | "createdAt" | "timeline">
  ): Promise<Order> {
    await delay(400);
    const now = new Date().toISOString();
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      timeline: [{ status: orderData.status, timestamp: now }],
      createdAt: now,
    };
    orders = [newOrder, ...orders];
    return newOrder;
  }

  async cancelOrder(id: string): Promise<Order> {
    await delay(300);
    const index = orders.findIndex((o) => o.id === id);
    if (index === -1) throw new Error("Order not found");

    const cancellableStatuses: OrderStatus[] = [
      OrderStatus.PENDING_PAYMENT,
      OrderStatus.PAID,
      OrderStatus.CONFIRMED,
    ];

    if (!cancellableStatuses.includes(orders[index].status)) {
      throw new Error("This order cannot be cancelled at this stage");
    }

    const now = new Date().toISOString();
    const updated: Order = {
      ...orders[index],
      status: OrderStatus.CANCELLED,
      timeline: [
        ...orders[index].timeline,
        { status: OrderStatus.CANCELLED, timestamp: now, note: "Cancelled by customer" },
      ],
    };
    orders[index] = updated;
    return updated;
  }
}

// Reset function for testing
export const resetMockOrders = () => {
  orders = [...mockOrders];
};
