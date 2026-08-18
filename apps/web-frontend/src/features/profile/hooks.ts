import { useQuery } from "@tanstack/react-query";
import { orderRepository, bookingRepository } from "@/repositories";
import { useAuthStore } from "@/stores/authStore";

export const profileKeys = {
  all: ["profile"] as const,
  orders: (userId: string) => [...profileKeys.all, "orders", userId] as const,
  bookings: (userId: string) => [...profileKeys.all, "bookings", userId] as const,
};

export function useOrders() {
  const { user } = useAuthStore();
  
  return useQuery({
    queryKey: profileKeys.orders(user?.id || ""),
    queryFn: () => orderRepository.getOrders({ customerId: user?.id }),
    enabled: !!user?.id,
  });
}

export function useBookings() {
  const { user } = useAuthStore();
  
  return useQuery({
    queryKey: profileKeys.bookings(user?.id || ""),
    queryFn: () => bookingRepository.getBookings({ customerId: user?.id }),
    enabled: !!user?.id,
  });
}
