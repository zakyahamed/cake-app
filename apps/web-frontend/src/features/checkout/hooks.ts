import { useMutation } from "@tanstack/react-query";
import type {
  CreateBookingInput,
  CreateOrderInput,
} from "@/repositories/interfaces/order";
import {
  bookingRepository,
  orderRepository,
  paymentRepository,
} from "@/repositories";

export function useSubmitOrder() {
  return useMutation({
    mutationFn: async (orderData: CreateOrderInput) => {
      return orderRepository.createOrder(orderData);
    },
  });
}

export function useSubmitBooking() {
  return useMutation({
    mutationFn: async (bookingData: CreateBookingInput) => {
      return bookingRepository.createBooking(bookingData);
    },
  });
}

export function useCreatePaymentIntent() {
  return useMutation({
    mutationFn: paymentRepository.createIntent.bind(paymentRepository),
  });
}

export function useConfirmPayment() {
  return useMutation({
    mutationFn: (input: { paymentId: string; providerTransactionId: string }) =>
      paymentRepository.confirm(input.paymentId, input.providerTransactionId),
  });
}
