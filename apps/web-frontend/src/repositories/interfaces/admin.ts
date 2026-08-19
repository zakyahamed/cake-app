import type { User, Business, Order, Booking, Payment, Review, PaginatedResult } from '@/domain/types';

export interface AdminStats {
  totalUsers: number;
  totalBusinesses: number;
  totalOrders: number;
  totalBookings: number;
  totalRevenue: number;
}

export interface AdminRepository {
  getStats(): Promise<AdminStats>;
  getUsers(search?: string, page?: number, limit?: number): Promise<PaginatedResult<User>>;
  updateUserStatus(id: string, status: 'ACTIVE' | 'SUSPENDED'): Promise<User>;
  getBusinesses(page?: number, limit?: number): Promise<PaginatedResult<Business>>;
  getPendingBusinesses(): Promise<Business[]>;
  updateBusinessStatus(id: string, status: 'ACTIVE' | 'REJECTED' | 'SUSPENDED'): Promise<void>;
  getOrders(page?: number, limit?: number): Promise<PaginatedResult<Order>>;
  getBookings(page?: number, limit?: number): Promise<PaginatedResult<Booking>>;
  getPayments(page?: number, limit?: number): Promise<PaginatedResult<Payment>>;
  getReviews(page?: number, limit?: number): Promise<PaginatedResult<Review>>;
  deleteReview(id: string): Promise<void>;
}
