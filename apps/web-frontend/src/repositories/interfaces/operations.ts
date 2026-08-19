import type { Order, Booking, Payment } from '@/domain/types';

export interface BusinessDashboardStats {
  totalOrders: number;
  totalBookings: number;
  totalRevenue: number;
  uniqueCustomers: number;
  averageRating: number;
  recentOrders: Order[];
  recentBookings: Booking[];
}

export interface OperationsRepository {
  getDashboardStats(businessId: string): Promise<BusinessDashboardStats>;
  getEarnings(businessId: string): Promise<Payment[]>;
}
