import type { PaymentRepository, PaymentIntent } from "../interfaces/payment";
import { apiClient } from "./client";

export class ApiPaymentRepository implements PaymentRepository {
  createIntent(input: {
    orderId?: string;
    bookingId?: string;
    amount: number;
  }) {
    return apiClient.post<PaymentIntent>("/payments/create-intent", input);
  }

  confirm(paymentId: string, providerTransactionId: string) {
    return apiClient.post("/payments/confirm", {
      paymentId,
      providerTransactionId,
    });
  }
}
