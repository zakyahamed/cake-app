import { mockBusinesses } from "@/mock-data";
import type { Business, BusinessQuery, PaginatedResult } from "@/domain/types";
import type { BusinessRepository } from "../interfaces/business";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function paginate<T>(items: T[], page = 1, limit = 12): PaginatedResult<T> {
  const total = items.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const data = items.slice(start, start + limit);
  return { data, meta: { page, limit, total, totalPages } };
}

export class MockBusinessRepository implements BusinessRepository {
  async getBusinesses(query?: BusinessQuery): Promise<PaginatedResult<Business>> {
    await delay(300);

    let results = [...mockBusinesses];

    if (query?.categoryId) {
      results = results.filter((b) => b.categoryIds.includes(query.categoryId!));
    }

    if (query?.search) {
      const q = query.search.toLowerCase();
      results = results.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.description.toLowerCase().includes(q) ||
          b.location.city.toLowerCase().includes(q)
      );
    }

    if (query?.city) {
      const city = query.city.toLowerCase();
      results = results.filter((b) => b.location.city.toLowerCase().includes(city));
    }

    if (query?.rating !== undefined) {
      results = results.filter((b) => b.rating >= query.rating!);
    }

    if (query?.deliveryOption) {
      results = results.filter((b) => b.deliveryOptions.includes(query.deliveryOption!));
    }

    if (query?.featured !== undefined) {
      results = results.filter((b) => b.featured === query.featured);
    }

    if (query?.sortBy) {
      results.sort((a, b) => {
        const dir = query.sortOrder === "asc" ? 1 : -1;
        if (query.sortBy === "rating") return (b.rating - a.rating) * dir;
        if (query.sortBy === "reviewCount") return (b.reviewCount - a.reviewCount) * dir;
        if (query.sortBy === "name") return a.name.localeCompare(b.name) * dir;
        if (query.sortBy === "createdAt") return a.createdAt.localeCompare(b.createdAt) * dir;
        return 0;
      });
    }

    return paginate(results, query?.page, query?.limit);
  }

  async getBusinessById(id: string): Promise<Business | null> {
    await delay(200);
    return mockBusinesses.find((b) => b.id === id) ?? null;
  }

  async getBusinessBySlug(slug: string): Promise<Business | null> {
    await delay(200);
    return mockBusinesses.find((b) => b.slug === slug) ?? null;
  }

  async getFeaturedBusinesses(limit = 6): Promise<Business[]> {
    await delay(250);
    return mockBusinesses.filter((b) => b.featured).slice(0, limit);
  }

  async searchBusinesses(query: string, limit = 10): Promise<Business[]> {
    await delay(200);
    const q = query.toLowerCase();
    return mockBusinesses
      .filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.description.toLowerCase().includes(q) ||
          b.location.city.toLowerCase().includes(q)
      )
      .slice(0, limit);
  }
}
