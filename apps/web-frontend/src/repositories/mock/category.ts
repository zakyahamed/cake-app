import { mockCategories } from "@/mock-data";
import type { Category } from "@/domain/types";
import type { CategoryRepository } from "../interfaces/business";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class MockCategoryRepository implements CategoryRepository {
  async getCategories(): Promise<Category[]> {
    await delay(200);
    return [...mockCategories];
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    await delay(150);
    return mockCategories.find((c) => c.slug === slug) ?? null;
  }
}
