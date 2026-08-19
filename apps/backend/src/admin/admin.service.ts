import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserStatusDto, UpdateBusinessStatusDto } from './dto/admin.dto';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  // ---- Users ----
  async getUsers(search?: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const whereClause: any = {};

    if (search) {
      whereClause.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
      ];
    }

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where: whereClause,
        select: {
          id: true, email: true, name: true, phone: true,
          role: true, status: true, createdAt: true,
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where: whereClause }),
    ]);

    return { data: users, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async updateUserStatus(userId: string, dto: UpdateUserStatusDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { status: dto.status },
      select: { id: true, email: true, name: true, role: true, status: true },
    });
  }

  // ---- Businesses ----
  async getPendingBusinesses() {
    return this.prisma.business.findMany({
      where: { status: 'PENDING' },
      include: { owner: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: 'asc' },
    });
  }

  async getAllBusinesses(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [businesses, total] = await Promise.all([
      this.prisma.business.findMany({
        include: { owner: { select: { id: true, name: true, email: true } } },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.business.count(),
    ]);

    return { data: businesses, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async updateBusinessStatus(businessId: string, dto: UpdateBusinessStatusDto) {
    return this.prisma.business.update({
      where: { id: businessId },
      data: { status: dto.status },
    });
  }

  // ---- Orders ----
  async getAllOrders(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        include: { user: { select: { id: true, name: true } }, business: { select: { id: true, name: true } } },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.order.count(),
    ]);
    return { data: orders, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  // ---- Bookings ----
  async getAllBookings(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [bookings, total] = await Promise.all([
      this.prisma.booking.findMany({
        include: { user: { select: { id: true, name: true } }, business: { select: { id: true, name: true } }, service: { select: { id: true, name: true } } },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.booking.count(),
    ]);
    return { data: bookings, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  // ---- Payments ----
  async getAllPayments(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [payments, total] = await Promise.all([
      this.prisma.payment.findMany({
        include: { user: { select: { id: true, name: true } }, order: true, booking: true },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.payment.count(),
    ]);
    return { data: payments, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  // ---- Reviews ----
  async getAllReviews(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [reviews, total] = await Promise.all([
      this.prisma.review.findMany({
        include: { user: { select: { id: true, name: true } }, business: { select: { id: true, name: true } } },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.review.count(),
    ]);
    return { data: reviews, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async deleteReview(reviewId: string) {
    return this.prisma.review.delete({ where: { id: reviewId } });
  }

  // ---- Platform Stats ----
  async getPlatformStats() {
    const [users, businesses, orders, bookings, revenue] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.business.count(),
      this.prisma.order.count(),
      this.prisma.booking.count(),
      this.prisma.payment.aggregate({
        where: { status: 'SUCCEEDED' },
        _sum: { amount: true },
      }),
    ]);

    return {
      totalUsers: users,
      totalBusinesses: businesses,
      totalOrders: orders,
      totalBookings: bookings,
      totalRevenue: revenue._sum.amount ?? 0,
    };
  }
}
