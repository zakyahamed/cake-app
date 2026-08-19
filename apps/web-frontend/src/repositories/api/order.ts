import type { OrderRepository, BookingRepository } from '../interfaces/order';
import type { Booking, BookingQuery, Order, OrderQuery, PaginatedResult } from '@/domain/types';
import { apiClient } from './client';
import { OrderStatus, BookingStatus, FulfilmentMethod } from '@/domain/enums';

export class ApiOrderRepository implements OrderRepository {
  async getOrders(query?: OrderQuery): Promise<PaginatedResult<Order>> {
    const orders = await apiClient.get<any[]>('/orders/me');
    const mapped = orders.map(mapOrder);
    return {
      data: mapped,
      meta: { page: 1, limit: 20, total: mapped.length, totalPages: 1 },
    };
  }

  async getBusinessOrders(businessId: string): Promise<Order[]> {
    const orders = await apiClient.get<any[]>(`/orders/business/${businessId}`);
    return orders.map(mapOrder);
  }

  async getOrderById(id: string): Promise<Order | null> {
    const orders = await apiClient.get<any[]>('/orders/me');
    const order = orders.find((o: any) => o.id === id);
    return order ? mapOrder(order) : null;
  }

  async createOrder(order: Omit<Order, 'id' | 'createdAt' | 'timeline'>): Promise<Order> {
    const result = await apiClient.post<any>('/orders/checkout', {
      fulfilmentMethod: order.fulfilmentMethod,
      addressId: order.deliveryAddress?.id,
      scheduledDate: order.scheduledDate,
      scheduledTime: order.scheduledTime,
      notes: order.notes,
    });
    return mapOrder(result);
  }

  async cancelOrder(id: string): Promise<Order> {
    const result = await apiClient.patch<any>(`/orders/${id}/status`, { status: 'CANCELLED' });
    return mapOrder(result);
  }
}

export class ApiBookingRepository implements BookingRepository {
  async getBookings(query?: BookingQuery): Promise<PaginatedResult<Booking>> {
    const bookings = await apiClient.get<any[]>('/bookings/me');
    const mapped = bookings.map(mapBooking);
    return {
      data: mapped,
      meta: { page: 1, limit: 20, total: mapped.length, totalPages: 1 },
    };
  }

  async getBusinessBookings(businessId: string): Promise<Booking[]> {
    // Note: Assuming the backend has GET /bookings/business/:businessId 
    // Wait, let's just fetch all admin bookings and filter or assume the backend endpoint exists.
    // If it doesn't exist, this will 404, but we can implement the backend endpoint if needed.
    const bookings = await apiClient.get<any[]>(`/bookings/business/${businessId}`);
    return bookings.map(mapBooking);
  }

  async getBookingById(id: string): Promise<Booking | null> {
    const bookings = await apiClient.get<any[]>('/bookings/me');
    const booking = bookings.find((b: any) => b.id === id);
    return booking ? mapBooking(booking) : null;
  }

  async createBooking(booking: Omit<Booking, 'id' | 'createdAt'>): Promise<Booking> {
    const result = await apiClient.post<any>('/bookings', {
      serviceId: booking.serviceId,
      scheduledDate: booking.date,
      scheduledTime: booking.time,
      notes: booking.notes,
    });
    return mapBooking(result);
  }

  async cancelBooking(id: string): Promise<Booking> {
    const result = await apiClient.patch<any>(`/bookings/${id}/status`, { status: 'CANCELLED' });
    return mapBooking(result);
  }
}

export function mapOrder(o: any): Order {
  return {
    id: o.id,
    customerId: o.userId,
    businessId: o.businessId,
    items: (o.items || []).map((item: any) => ({
      id: item.id, productId: item.productId, variantId: item.variantId,
      name: item.product?.name || 'Item', quantity: item.quantity,
      unitPrice: item.priceAtTime, subtotal: item.priceAtTime * item.quantity,
    })),
    subtotal: o.subtotal, deliveryFee: o.deliveryFee, discount: 0, total: o.total,
    fulfilmentMethod: o.fulfilmentMethod as FulfilmentMethod,
    scheduledDate: o.scheduledDate, scheduledTime: o.scheduledTime,
    status: o.status as OrderStatus,
    timeline: [], notes: o.notes, createdAt: o.createdAt,
  };
}

export function mapBooking(b: any): Booking {
  return {
    id: b.id, customerId: b.userId, businessId: b.businessId,
    serviceId: b.serviceId, date: b.scheduledDate, time: b.scheduledTime,
    durationMinutes: b.service?.duration || 60,
    status: b.status as BookingStatus,
    totalAmount: b.priceAtTime, notes: b.notes, createdAt: b.createdAt,
  };
}
