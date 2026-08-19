import type { AdminRepository, AdminStats } from '../interfaces/admin';
import type { User, Business, Order, Booking, Payment, Review, PaginatedResult } from '@/domain/types';
import { apiClient } from './client';
import { mapOrder, mapBooking } from './order';
import { UserRole } from '@/domain/enums';

export class ApiAdminRepository implements AdminRepository {
  async getStats(): Promise<AdminStats> {
    return apiClient.get<AdminStats>('/admin/stats');
  }

  async getUsers(search?: string, page = 1, limit = 20): Promise<PaginatedResult<User>> {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (search) params.set('search', search);
    
    const result = await apiClient.get<any>(`/admin/users?${params.toString()}`);
    return {
      data: result.data.map((u: any) => ({
        id: u.id, name: u.name, email: u.email, phone: u.phone,
        role: u.role as UserRole, status: u.status, createdAt: u.createdAt, addresses: []
      })),
      meta: result.meta,
    };
  }

  async updateUserStatus(id: string, status: 'ACTIVE' | 'SUSPENDED'): Promise<User> {
    const result = await apiClient.patch<any>(`/admin/users/${id}/status`, { status });
    return {
      id: result.id, name: result.name, email: result.email, phone: result.phone || '',
      role: result.role as UserRole, status: result.status, createdAt: result.createdAt, addresses: []
    };
  }

  async getBusinesses(page = 1, limit = 20): Promise<PaginatedResult<Business>> {
    const result = await apiClient.get<any>(`/admin/businesses?page=${page}&limit=${limit}`);
    return {
      data: result.data.map(mapAdminBusiness),
      meta: result.meta,
    };
  }

  async getPendingBusinesses(): Promise<Business[]> {
    const result = await apiClient.get<any[]>('/admin/businesses/pending');
    return result.map(mapAdminBusiness);
  }

  async updateBusinessStatus(id: string, status: 'ACTIVE' | 'REJECTED' | 'SUSPENDED'): Promise<void> {
    await apiClient.patch(`/admin/businesses/${id}/status`, { status });
  }

  async getOrders(page = 1, limit = 20): Promise<PaginatedResult<Order>> {
    const result = await apiClient.get<any>(`/admin/orders?page=${page}&limit=${limit}`);
    return {
      data: result.data.map(mapOrder),
      meta: result.meta,
    };
  }

  async getBookings(page = 1, limit = 20): Promise<PaginatedResult<Booking>> {
    const result = await apiClient.get<any>(`/admin/bookings?page=${page}&limit=${limit}`);
    return {
      data: result.data.map(mapBooking),
      meta: result.meta,
    };
  }

  async getPayments(page = 1, limit = 20): Promise<PaginatedResult<Payment>> {
    const result = await apiClient.get<any>(`/admin/payments?page=${page}&limit=${limit}`);
    return {
      data: result.data.map((p: any) => ({
        id: p.id,
        referenceId: p.orderId ? p.orderId : p.bookingId,
        referenceType: p.orderId ? 'ORDER' : 'BOOKING',
        amount: p.amount,
        status: p.status,
        method: p.provider,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
      })),
      meta: result.meta,
    };
  }

  async getReviews(page = 1, limit = 20): Promise<PaginatedResult<Review>> {
    const result = await apiClient.get<any>(`/admin/reviews?page=${page}&limit=${limit}`);
    return {
      data: result.data.map((r: any) => ({
        id: r.id, customerId: r.userId, businessId: r.businessId,
        rating: r.rating, comment: r.content,
        orderId: r.orderId, bookingId: r.bookingId, createdAt: r.createdAt,
      })),
      meta: result.meta,
    };
  }

  async deleteReview(id: string): Promise<void> {
    await apiClient.delete(`/admin/reviews/${id}`);
  }
}

function mapAdminBusiness(b: any): Business {
  return {
    id: b.id, slug: b.slug, name: b.name, description: b.description || '',
    logo: b.logoUrl, coverImage: b.coverUrl, categoryIds: [],
    location: { address: b.location || '', city: '', district: '' },
    contactInformation: { phone: b.phone || '', email: b.email },
    openingHours: [], rating: b.rating || 0, reviewCount: b.reviewCount || 0,
    verificationStatus: b.status as any, deliveryOptions: [], pickupAvailable: b.isPickupAvailable ?? true,
    featured: false, createdAt: b.createdAt,
  };
}
