import { useQuery } from "@tanstack/react-query";
import { productRepository, serviceRepository } from "@/repositories";

export const catalogKeys = {
  all: ["catalog"] as const,
  product: (id: string) => [...catalogKeys.all, "product", id] as const,
  service: (id: string) => [...catalogKeys.all, "service", id] as const,
};

export function useProduct(id: string) {
  return useQuery({
    queryKey: catalogKeys.product(id),
    queryFn: () => productRepository.getProductById(id),
    enabled: !!id,
  });
}

export function useService(id: string) {
  return useQuery({
    queryKey: catalogKeys.service(id),
    queryFn: () => serviceRepository.getServiceById(id),
    enabled: !!id,
  });
}
