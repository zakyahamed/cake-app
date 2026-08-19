import type { CategoryRepository, BusinessRepository } from '../interfaces/business';
import type { Business, BusinessQuery, Category, PaginatedResult } from '@/domain/types';
import { apiClient } from './client';

export class ApiCategoryRepository implements CategoryRepository {
  async getCategories(): Promise<Category[]> {
    const cats = await apiClient.get<any[]>('/categories');
    return cats.map(c => ({
      id: c.id, slug: c.slug, name: c.name, icon: c.icon,
      description: '', businessCount: 0,
    }));
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    const cats = await this.getCategories();
    return cats.find(c => c.slug === slug) ?? null;
  }
}

export class ApiBusinessRepository implements BusinessRepository {
  async getBusinesses(query?: BusinessQuery): Promise<PaginatedResult<Business>> {
    const params = new URLSearchParams();
    if (query?.page) params.set('page', String(query.page));
    if (query?.limit) params.set('limit', String(query.limit));
    const businesses = await apiClient.get<any[]>(`/businesses?${params}`);
    return {
      data: businesses.map(mapBusiness),
      meta: { page: query?.page || 1, limit: query?.limit || 20, total: businesses.length, totalPages: 1 },
    };
  }

  async getBusinessById(id: string): Promise<Business | null> {
    try {
      const b = await apiClient.get<any>(`/businesses/${id}`);
      return mapBusiness(b);
    } catch { return null; }
  }

  async getBusinessBySlug(slug: string): Promise<Business | null> {
    return this.getBusinessById(slug);
  }

  async getFeaturedBusinesses(limit = 6): Promise<Business[]> {
    const result = await this.getBusinesses({ limit });
    return result.data.slice(0, limit);
  }

  async searchBusinesses(query: string, limit = 10): Promise<Business[]> {
    const businesses = await apiClient.get<any[]>(`/search/businesses?q=${encodeURIComponent(query)}&limit=${limit}`);
    return businesses.map(mapBusiness);
  }
}

function mapBusiness(b: any): Business {
  return {
    id: b.id, slug: b.slug, name: b.name, description: b.description || '',
    logo: b.logoUrl, coverImage: b.coverUrl,
    categoryIds: (b.businessCategories || []).map((bc: any) => bc.categoryId),
    location: { address: b.location || '', city: '', district: '' },
    contactInformation: { phone: b.phone || '', email: b.email },
    openingHours: [],
    rating: b.rating || 0, reviewCount: b.reviewCount || 0,
    verificationStatus: b.status === 'ACTIVE' ? 'VERIFIED' : 'PENDING' as any,
    deliveryOptions: [], pickupAvailable: b.isPickupAvailable ?? true,
    featured: false, createdAt: b.createdAt,
  };
}
