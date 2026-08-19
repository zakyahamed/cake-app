import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto, ConfirmPaymentDto } from './dto/payments.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a payment intent (mock provider).
   * In production, this would call Stripe/PayPal to create a real payment session.
   */
  async createPaymentIntent(userId: string, dto: CreatePaymentDto) {
    if (!dto.orderId && !dto.bookingId) {
      throw new BadRequestException('Either orderId or bookingId is required');
    }

    // Verify the order/booking exists and belongs to the user
    if (dto.orderId) {
      const order = await this.prisma.order.findUnique({ where: { id: dto.orderId } });
      if (!order || order.userId !== userId) throw new NotFoundException('Order not found');
    }

    if (dto.bookingId) {
      const booking = await this.prisma.booking.findUnique({ where: { id: dto.bookingId } });
      if (!booking || booking.userId !== userId) throw new NotFoundException('Booking not found');
    }

    const payment = await this.prisma.payment.create({
      data: {
        userId,
        orderId: dto.orderId,
        bookingId: dto.bookingId,
        amount: dto.amount,
        provider: 'MOCK',
        status: 'PENDING',
      },
    });

    // Mock: return a fake client secret like Stripe would
    return {
      paymentId: payment.id,
      clientSecret: `mock_secret_${randomUUID()}`,
      amount: payment.amount,
      status: payment.status,
    };
  }

  /**
   * Confirm a payment (mock webhook simulation).
   * In production, this would be called by a Stripe webhook handler.
   */
  async confirmPayment(dto: ConfirmPaymentDto) {
    const payment = await this.prisma.payment.findUnique({
      where: { id: dto.paymentId },
    });

    if (!payment) throw new NotFoundException('Payment not found');
    if (payment.status !== 'PENDING') {
      throw new BadRequestException('Payment is not in a confirmable state');
    }

    // Update payment to SUCCEEDED
    const updatedPayment = await this.prisma.payment.update({
      where: { id: dto.paymentId },
      data: {
        status: 'SUCCEEDED',
        providerTransactionId: dto.providerTransactionId,
      },
    });

    // Mark the related order/booking as paid
    if (updatedPayment.orderId) {
      await this.prisma.order.update({
        where: { id: updatedPayment.orderId },
        data: { status: 'PAID' },
      });
    }

    if (updatedPayment.bookingId) {
      await this.prisma.booking.update({
        where: { id: updatedPayment.bookingId },
        data: { status: 'CONFIRMED' },
      });
    }

    return updatedPayment;
  }

  async getMyPayments(userId: string) {
    return this.prisma.payment.findMany({
      where: { userId },
      include: { order: true, booking: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}
