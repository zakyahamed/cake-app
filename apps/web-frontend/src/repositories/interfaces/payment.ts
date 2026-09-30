export interface PaymentIntent {
  paymentId: string;
  clientSecret: string;
  amount: number;
  status: string;
}

export interface PaymentRepository {
  createIntent(input: {
    orderId?: string;
    bookingId?: string;
    amount: number;
  }): Promise<PaymentIntent>;
  confirm(paymentId: string, providerTransactionId: string): Promise<unknown>;
}
