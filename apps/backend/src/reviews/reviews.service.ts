import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/reviews.dto';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateReviewDto) {
    if (!dto.orderId && !dto.bookingId) {
      throw new BadRequestException('Either orderId or bookingId is required');
    }

    // Verify the order/booking is completed and belongs to the user
    if (dto.orderId) {
      const order = await this.prisma.order.findUnique({ where: { id: dto.orderId } });
      if (!order || order.userId !== userId) throw new NotFoundException('Order not found');
      if (order.status !== 'COMPLETED') {
        throw new BadRequestException('Can only review completed orders');
      }
    }

    if (dto.bookingId) {
      const booking = await this.prisma.booking.findUnique({ where: { id: dto.bookingId } });
      if (!booking || booking.userId !== userId) throw new NotFoundException('Booking not found');
      if (booking.status !== 'COMPLETED') {
        throw new BadRequestException('Can only review completed bookings');
      }
    }

    // Prisma unique constraints @@unique([userId, orderId]) and @@unique([userId, bookingId])
    // will prevent duplicate reviews automatically
    try {
      const review = await this.prisma.review.create({
        data: {
          userId,
          businessId: dto.businessId,
          orderId: dto.orderId,
          bookingId: dto.bookingId,
          rating: dto.rating,
          content: dto.content,
        },
      });

      // Update business average rating
      await this.updateBusinessRating(dto.businessId);

      return review;
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new BadRequestException('You have already reviewed this transaction');
      }
      throw error;
    }
  }

  async getBusinessReviews(businessId: string) {
    return this.prisma.review.findMany({
      where: { businessId },
      include: {
        user: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  private async updateBusinessRating(businessId: string) {
    const result = await this.prisma.review.aggregate({
      where: { businessId },
      _avg: { rating: true },
      _count: { rating: true },
    });

    await this.prisma.business.update({
      where: { id: businessId },
      data: {
        rating: result._avg.rating ?? 0,
        reviewCount: result._count.rating,
      },
    });
  }
}
