import { Injectable, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto, UpdateBookingStatusDto } from './dto/bookings.dto';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateBookingDto) {
    const service = await this.prisma.service.findUnique({
      where: { id: dto.serviceId },
    });

    if (!service) throw new NotFoundException('Service not found');

    // Simple double-booking check: same service, same date, same time, not cancelled/rejected
    const existing = await this.prisma.booking.findFirst({
      where: {
        serviceId: dto.serviceId,
        scheduledDate: dto.scheduledDate,
        scheduledTime: dto.scheduledTime,
        status: { notIn: ['CANCELLED', 'REJECTED'] },
      },
    });

    if (existing) {
      throw new BadRequestException('This time slot is already booked');
    }

    return this.prisma.booking.create({
      data: {
        userId,
        businessId: service.businessId,
        serviceId: dto.serviceId,
        scheduledDate: dto.scheduledDate,
        scheduledTime: dto.scheduledTime,
        priceAtTime: service.price,
        notes: dto.notes,
        status: 'PENDING',
      },
      include: { service: true, business: true },
    });
  }

  async getMyBookings(userId: string) {
    return this.prisma.booking.findMany({
      where: { userId },
      include: { service: true, business: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getBusinessBookings(userId: string, businessId: string) {
    const business = await this.prisma.business.findUnique({ where: { id: businessId } });
    if (!business || business.ownerId !== userId) {
      throw new UnauthorizedException('You do not own this business');
    }

    return this.prisma.booking.findMany({
      where: { businessId },
      include: { service: true, user: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateStatus(userId: string, bookingId: string, dto: UpdateBookingStatusDto) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: { business: true },
    });

    if (!booking) throw new NotFoundException('Booking not found');

    // Business owner can confirm/reject/complete/cancel
    // Customer can only cancel their own pending booking
    const isBizOwner = booking.business.ownerId === userId;
    const isCustomer = booking.userId === userId;

    if (!isBizOwner && !isCustomer) {
      throw new UnauthorizedException('Access denied');
    }

    if (isCustomer && !isBizOwner) {
      if (dto.status !== 'CANCELLED' || booking.status !== 'PENDING') {
        throw new BadRequestException('You can only cancel a pending booking');
      }
    }

    return this.prisma.booking.update({
      where: { id: bookingId },
      data: { status: dto.status },
    });
  }
}
