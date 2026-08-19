import type { ProductRepository, ServiceRepository, SearchRepository } from '../interfaces/product';
import type { PaginatedResult, Product, ProductQuery, Service, ServiceQuery, SearchQuery, SearchResults } from '@/domain/types';
import { apiClient } from './client';

export class ApiProductRepository implements ProductRepository {
  async getProducts(query?: ProductQuery): Promise<PaginatedResult<Product>> {
    const params = new URLSearchParams();
    if (query?.page) params.set('page', String(query.page));
    if (query?.limit) params.set('limit', String(query.limit));
    const products = await apiClient.get<any[]>(`/products?${params}`);
    return {
      data: products.map(mapProduct),
      meta: { page: query?.page || 1, limit: query?.limit || 20, total: products.length, totalPages: 1 },
    };
  }

  async getProductById(id: string): Promise<Product | null> {
    try {
      const p = await apiClient.get<any>(`/products/${id}`);
      return mapProduct(p);
    } catch { return null; }
  }

  async getFeaturedProducts(limit = 8): Promise<Product[]> {
    const result = await this.getProducts({ limit });
    return result.data.slice(0, limit);
  }
}

export class ApiServiceRepository implements ServiceRepository {
  async getServices(query?: ServiceQuery): Promise<PaginatedResult<Service>> {
    const params = new URLSearchParams();
    if (query?.page) params.set('page', String(query.page));
    if (query?.limit) params.set('limit', String(query.limit));
    const services = await apiClient.get<any[]>(`/services?${params}`);
    return {
      data: services.map(mapService),
      meta: { page: query?.page || 1, limit: query?.limit || 20, total: services.length, totalPages: 1 },
    };
  }

  async getServiceById(id: string): Promise<Service | null> {
    try {
      const s = await apiClient.get<any>(`/services/${id}`);
      return mapService(s);
    } catch { return null; }
  }

  async getFeaturedServices(limit = 8): Promise<Service[]> {
    const result = await this.getServices({ limit });
    return result.data.slice(0, limit);
  }
}

export class ApiSearchRepository implements SearchRepository {
  async search(query: SearchQuery): Promise<SearchResults> {
    const q = encodeURIComponent(query.query);
    const limit = query.limit || 10;
    const [businesses, products, services] = await Promise.all([
      apiClient.get<any[]>(`/search/businesses?q=${q}&limit=${limit}`),
      apiClient.get<any[]>(`/search/products?q=${q}&limit=${limit}`),
      apiClient.get<any[]>(`/search/services?q=${q}&limit=${limit}`),
    ]);
    return {
      businesses: businesses.map(mapBusinessFromSearch),
      products: products.map(mapProduct),
      services: services.map(mapService),
      categories: [],
    };
  }
}

function mapProduct(p: any): Product {
  return {
    id: p.id, businessId: p.businessId, categoryId: p.categoryId,
    name: p.name, description: p.description,
    images: p.imageUrl ? [p.imageUrl] : [],
    basePrice: p.price,
    variants: (p.variants || []).map((v: any) => ({ id: v.id, name: v.name, price: v.price, isAvailable: true })),
    isAvailable: p.status === 'ACTIVE', rating: 0, reviewCount: 0,
    featured: false, createdAt: p.createdAt,
  };
}

function mapService(s: any): Service {
  return {
    id: s.id, businessId: s.businessId, categoryId: s.categoryId,
    name: s.name, description: s.description,
    images: s.imageUrl ? [s.imageUrl] : [],
    startingPrice: s.price, durationMinutes: s.duration || 60,
    availability: { days: [], startTime: '09:00', endTime: '17:00' },
    isAvailable: s.status === 'ACTIVE', rating: 0, reviewCount: 0,
    featured: false, createdAt: s.createdAt,
  };
}

function mapBusinessFromSearch(b: any): any {
  return {
    id: b.id, slug: b.slug, name: b.name, description: b.description || '',
    logo: b.logoUrl, coverImage: b.coverUrl, categoryIds: [],
    location: { address: b.location || '', city: '', district: '' },
    contactInformation: { phone: b.phone || '', email: b.email },
    openingHours: [], rating: b.rating || 0, reviewCount: b.reviewCount || 0,
    verificationStatus: 'VERIFIED' as any, deliveryOptions: [],
    pickupAvailable: true, featured: false, createdAt: b.createdAt,
  };
}
