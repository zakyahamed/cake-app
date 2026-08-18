import { useMutation } from "@tanstack/react-query";
import type { Order, Booking } from "@/domain/types";
// In a real app, this would be an API call
// For this mock, we just resolve successfully after a delay

export function useSubmitOrder() {
  return useMutation({
    mutationFn: async (orderData: Partial<Order>) => {
      return new Promise<Order>((resolve) => {
        setTimeout(() => {
          resolve({
            id: `ORD-${Math.floor(Math.random() * 1000000)}`,
            ...orderData,
            status: "PENDING_PAYMENT",
            createdAt: new Date().toISOString(),
          } as Order);
        }, 1500);
      });
    },
  });
}

export function useSubmitBooking() {
  return useMutation({
    mutationFn: async (bookingData: Partial<Booking>) => {
      return new Promise<Booking>((resolve) => {
        setTimeout(() => {
          resolve({
            id: `BKG-${Math.floor(Math.random() * 1000000)}`,
            ...bookingData,
            status: "PENDING",
            createdAt: new Date().toISOString(),
          } as Booking);
        }, 1500);
      });
    },
  });
}
