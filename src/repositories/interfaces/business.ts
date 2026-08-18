import type {
  Business,
  BusinessQuery,
  Category,
  PaginatedResult,
} from "@/domain/types";

export interface CategoryRepository {
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | null>;
}

export interface BusinessRepository {
  getBusinesses(query?: BusinessQuery): Promise<PaginatedResult<Business>>;
  getBusinessById(id: string): Promise<Business | null>;
  getBusinessBySlug(slug: string): Promise<Business | null>;
  getFeaturedBusinesses(limit?: number): Promise<Business[]>;
  searchBusinesses(query: string, limit?: number): Promise<Business[]>;
}
