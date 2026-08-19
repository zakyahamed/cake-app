import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OperationsService {
  constructor(private prisma: PrismaService) {}

  async getDashboard(userId: string, businessId: string) {
    const business = await this.prisma.business.findUnique({
      where: { id: businessId },
    });

    if (!business || business.ownerId !== userId) {
      throw new UnauthorizedException('You do not own this business');
    }

    // Aggregate metrics in parallel
    const [
      totalOrders,
      totalBookings,
      revenueResult,
      totalCustomers,
      recentOrders,
      recentBookings,
    ] = await Promise.all([
      // Total orders count
      this.prisma.order.count({ where: { businessId } }),

      // Total bookings count
      this.prisma.booking.count({ where: { businessId } }),

      // Total revenue from succeeded payments on orders
      this.prisma.payment.aggregate({
        where: {
          order: { businessId },
          status: 'SUCCEEDED',
        },
        _sum: { amount: true },
      }),

      // Unique customers
      this.prisma.order.findMany({
        where: { businessId },
        select: { userId: true },
        distinct: ['userId'],
      }),

      // 5 most recent orders
      this.prisma.order.findMany({
        where: { businessId },
        include: {
          user: { select: { id: true, name: true, email: true } },
          items: true,
        },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),

      // 5 most recent bookings
      this.prisma.booking.findMany({
        where: { businessId },
        include: {
          user: { select: { id: true, name: true, email: true } },
          service: { select: { id: true, name: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
    ]);

    return {
      business: {
        id: business.id,
        name: business.name,
        rating: business.rating,
        reviewCount: business.reviewCount,
        status: business.status,
      },
      metrics: {
        totalOrders,
        totalBookings,
        totalRevenue: revenueResult._sum.amount ?? 0,
        totalCustomers: totalCustomers.length,
      },
      recentOrders,
      recentBookings,
    };
  }

  async getEarnings(userId: string, businessId: string) {
    const business = await this.prisma.business.findUnique({
      where: { id: businessId },
    });

    if (!business || business.ownerId !== userId) {
      throw new UnauthorizedException('You do not own this business');
    }

    return this.prisma.payment.findMany({
      where: {
        order: { businessId },
        status: 'SUCCEEDED',
      },
      include: { order: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}
