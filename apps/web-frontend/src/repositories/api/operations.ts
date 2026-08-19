import type { OperationsRepository, BusinessDashboardStats } from '../interfaces/operations';
import type { Payment } from '@/domain/types';
import { apiClient } from './client';
import { mapOrder, mapBooking } from './order';
import { PaymentStatus } from '@/domain/enums';

export class ApiOperationsRepository implements OperationsRepository {
  async getDashboardStats(businessId: string): Promise<BusinessDashboardStats> {
    const data = await apiClient.get<any>(`/operations/dashboard/${businessId}`);
    return {
      totalOrders: data.totalOrders,
      totalBookings: data.totalBookings,
      totalRevenue: data.totalRevenue,
      uniqueCustomers: data.uniqueCustomers,
      averageRating: data.averageRating,
      recentOrders: (data.recentOrders || []).map(mapOrder),
      recentBookings: (data.recentBookings || []).map(mapBooking),
    };
  }

  async getEarnings(businessId: string): Promise<Payment[]> {
    const payments = await apiClient.get<any[]>(`/operations/earnings/${businessId}`);
    return payments.map(p => ({
      id: p.id,
      referenceId: p.orderId ? p.orderId : p.bookingId,
      referenceType: p.orderId ? 'ORDER' : 'BOOKING',
      amount: p.amount,
      status: p.status as PaymentStatus,
      method: p.provider,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    }));
  }
}
