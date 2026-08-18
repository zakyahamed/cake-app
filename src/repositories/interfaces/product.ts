import type {
  PaginatedResult,
  Product,
  ProductQuery,
  Service,
  ServiceQuery,
  SearchQuery,
  SearchResults,
} from "@/domain/types";

export interface ProductRepository {
  getProducts(query?: ProductQuery): Promise<PaginatedResult<Product>>;
  getProductById(id: string): Promise<Product | null>;
  getFeaturedProducts(limit?: number): Promise<Product[]>;
}

export interface ServiceRepository {
  getServices(query?: ServiceQuery): Promise<PaginatedResult<Service>>;
  getServiceById(id: string): Promise<Service | null>;
  getFeaturedServices(limit?: number): Promise<Service[]>;
}

export interface SearchRepository {
  search(query: SearchQuery): Promise<SearchResults>;
}
