import { mockProducts, mockServices, mockCategories, mockBusinesses } from "@/mock-data";
import type {
  PaginatedResult,
  Product,
  ProductQuery,
  Service,
  ServiceQuery,
  SearchQuery,
  SearchResults,
} from "@/domain/types";
import type {
  ProductRepository,
  ServiceRepository,
  SearchRepository,
} from "../interfaces/product";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function paginate<T>(items: T[], page = 1, limit = 12): PaginatedResult<T> {
  const total = items.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const data = items.slice(start, start + limit);
  return { data, meta: { page, limit, total, totalPages } };
}

export class MockProductRepository implements ProductRepository {
  async getProducts(query?: ProductQuery): Promise<PaginatedResult<Product>> {
    await delay(250);
    let results = [...mockProducts];

    if (query?.businessId) {
      results = results.filter((p) => p.businessId === query.businessId);
    }
    if (query?.categoryId) {
      results = results.filter((p) => p.categoryId === query.categoryId);
    }
    if (query?.search) {
      const q = query.search.toLowerCase();
      results = results.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }
    if (query?.minPrice !== undefined) {
      results = results.filter((p) => p.basePrice >= query.minPrice!);
    }
    if (query?.maxPrice !== undefined) {
      results = results.filter((p) => p.basePrice <= query.maxPrice!);
    }
    if (query?.featured !== undefined) {
      results = results.filter((p) => p.featured === query.featured);
    }

    return paginate(results, query?.page, query?.limit);
  }

  async getProductById(id: string): Promise<Product | null> {
    await delay(200);
    return mockProducts.find((p) => p.id === id) ?? null;
  }

  async getFeaturedProducts(limit = 8): Promise<Product[]> {
    await delay(200);
    return mockProducts.filter((p) => p.featured).slice(0, limit);
  }
}

export class MockServiceRepository implements ServiceRepository {
  async getServices(query?: ServiceQuery): Promise<PaginatedResult<Service>> {
    await delay(250);
    let results = [...mockServices];

    if (query?.businessId) {
      results = results.filter((s) => s.businessId === query.businessId);
    }
    if (query?.categoryId) {
      results = results.filter((s) => s.categoryId === query.categoryId);
    }
    if (query?.search) {
      const q = query.search.toLowerCase();
      results = results.filter(
        (s) => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
      );
    }
    if (query?.minPrice !== undefined) {
      results = results.filter((s) => s.startingPrice >= query.minPrice!);
    }
    if (query?.maxPrice !== undefined) {
      results = results.filter((s) => s.startingPrice <= query.maxPrice!);
    }
    if (query?.featured !== undefined) {
      results = results.filter((s) => s.featured === query.featured);
    }

    return paginate(results, query?.page, query?.limit);
  }

  async getServiceById(id: string): Promise<Service | null> {
    await delay(200);
    return mockServices.find((s) => s.id === id) ?? null;
  }

  async getFeaturedServices(limit = 6): Promise<Service[]> {
    await delay(200);
    return mockServices.filter((s) => s.featured).slice(0, limit);
  }
}

export class MockSearchRepository implements SearchRepository {
  async search(query: SearchQuery): Promise<SearchResults> {
    await delay(300);
    const q = (query.query ?? "").toLowerCase();
    const limit = query.limit ?? 5;

    if (!q) {
      return { businesses: [], products: [], services: [], categories: [] };
    }

    const businesses = mockBusinesses
      .filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.description.toLowerCase().includes(q) ||
          b.location.city.toLowerCase().includes(q)
      )
      .slice(0, limit);

    const products = mockProducts
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      )
      .slice(0, limit);

    const services = mockServices
      .filter(
        (s) =>
          s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
      )
      .slice(0, limit);

    const categories = mockCategories
      .filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          (c.description ?? "").toLowerCase().includes(q)
      )
      .slice(0, limit);

    return { businesses, products, services, categories };
  }
}
