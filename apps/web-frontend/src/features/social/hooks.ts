import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  bookingRepository,
  messageRepository,
  notificationRepository,
  orderRepository,
} from "@/repositories";
import { useAuthStore } from "@/stores/authStore";

export function useNotifications() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["notifications", user?.id],
    queryFn: () => notificationRepository.getNotifications(user!.id),
    enabled: !!user?.id,
  });
  const markRead = useMutation({
    mutationFn: (id: string) => notificationRepository.markAsRead(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["notifications", user?.id] }),
  });
  const markAllRead = useMutation({
    mutationFn: () => notificationRepository.markAllAsRead(user!.id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["notifications", user?.id] }),
  });
  return { ...query, markRead, markAllRead };
}

export function useConversations() {
  const { user } = useAuthStore();
  return useQuery({
    queryKey: ["conversations", user?.id],
    queryFn: () => messageRepository.getConversations(user!.id),
    enabled: !!user?.id,
  });
}

export function useCancelOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => orderRepository.cancelOrder(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["profile", "orders"] }),
  });
}

export function useCancelBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => bookingRepository.cancelBooking(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["profile", "bookings"] }),
  });
}
