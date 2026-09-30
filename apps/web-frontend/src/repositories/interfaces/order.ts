import type {
  Booking,
  BookingQuery,
  Order,
  OrderQuery,
  PaginatedResult,
} from "@/domain/types";

export type CreateOrderInput = {
  fulfilmentMethod: Order["fulfilmentMethod"];
  addressId?: string;
  addressId?: string;
  scheduledDate?: string;
  scheduledTime?: string;
  notes?: string;
};

export type CreateBookingInput = {
  serviceId: string;
  date: string;
  time: string;
  notes?: string;
};

export interface OrderRepository {
  getOrders(query?: OrderQuery): Promise<PaginatedResult<Order>>;
  getBusinessOrders(businessId: string): Promise<Order[]>;
  getOrderById(id: string): Promise<Order | null>;
  createOrder(order: CreateOrderInput): Promise<Order>;
  cancelOrder(id: string): Promise<Order>;
}

export interface BookingRepository {
  getBookings(query?: BookingQuery): Promise<PaginatedResult<Booking>>;
  getBusinessBookings(businessId: string): Promise<Booking[]>;
  getBookingById(id: string): Promise<Booking | null>;
  createBooking(booking: CreateBookingInput): Promise<Booking>;
  cancelBooking(id: string): Promise<Booking>;
}
