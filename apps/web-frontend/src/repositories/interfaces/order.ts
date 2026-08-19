import type {
  Booking,
  BookingQuery,
  Order,
  OrderQuery,
  PaginatedResult,
} from "@/domain/types";

export interface OrderRepository {
  getOrders(query?: OrderQuery): Promise<PaginatedResult<Order>>;
  getBusinessOrders(businessId: string): Promise<Order[]>;
  getOrderById(id: string): Promise<Order | null>;
  createOrder(order: Omit<Order, "id" | "createdAt" | "timeline">): Promise<Order>;
  cancelOrder(id: string): Promise<Order>;
}

export interface BookingRepository {
  getBookings(query?: BookingQuery): Promise<PaginatedResult<Booking>>;
  getBusinessBookings(businessId: string): Promise<Booking[]>;
  getBookingById(id: string): Promise<Booking | null>;
  createBooking(booking: Omit<Booking, "id" | "createdAt">): Promise<Booking>;
  cancelBooking(id: string): Promise<Booking>;
}
