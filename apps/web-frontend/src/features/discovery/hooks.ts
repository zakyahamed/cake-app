import { useQuery } from "@tanstack/react-query";
import {
  categoryRepository,
  businessRepository,
  productRepository,
  serviceRepository,
  searchRepository,
} from "@/repositories";
import type { BusinessQuery, SearchQuery } from "@/domain/types";

export const discoveryKeys = {
  all: ["discovery"] as const,
  categories: () => [...discoveryKeys.all, "categories"] as const,
  category: (slug: string) => [...discoveryKeys.categories(), slug] as const,
  businesses: (query: BusinessQuery) => [...discoveryKeys.all, "businesses", query] as const,
  featuredBusinesses: () => [...discoveryKeys.all, "featuredBusinesses"] as const,
  business: (slug: string) => [...discoveryKeys.all, "business", slug] as const,
  businessProducts: (businessId: string) => [...discoveryKeys.all, "products", businessId] as const,
  businessServices: (businessId: string) => [...discoveryKeys.all, "services", businessId] as const,
  search: (query: SearchQuery) => [...discoveryKeys.all, "search", query] as const,
};

export function useCategories() {
  return useQuery({
    queryKey: discoveryKeys.categories(),
    queryFn: () => categoryRepository.getCategories(),
  });
}

export function useCategory(slug: string) {
  return useQuery({
    queryKey: discoveryKeys.category(slug),
    queryFn: () => categoryRepository.getCategoryBySlug(slug),
    enabled: !!slug,
  });
}

export function useBusinesses(query: BusinessQuery) {
  return useQuery({
    queryKey: discoveryKeys.businesses(query),
    queryFn: () => businessRepository.getBusinesses(query),
  });
}

export function useFeaturedBusinesses(limit = 6) {
  return useQuery({
    queryKey: discoveryKeys.featuredBusinesses(),
    queryFn: () => businessRepository.getFeaturedBusinesses(limit),
  });
}

export function useBusiness(slug: string) {
  return useQuery({
    queryKey: discoveryKeys.business(slug),
    queryFn: () => businessRepository.getBusinessBySlug(slug),
    enabled: !!slug,
  });
}

export function useBusinessProducts(businessId?: string) {
  return useQuery({
    queryKey: discoveryKeys.businessProducts(businessId!),
    queryFn: () => productRepository.getProducts({ businessId }),
    enabled: !!businessId,
  });
}

export function useBusinessServices(businessId?: string) {
  return useQuery({
    queryKey: discoveryKeys.businessServices(businessId!),
    queryFn: () => serviceRepository.getServices({ businessId }),
    enabled: !!businessId,
  });
}

export function useSearch(query: SearchQuery) {
  return useQuery({
    queryKey: discoveryKeys.search(query),
    queryFn: () => searchRepository.search(query),
    enabled: !!query.query,
  });
}
