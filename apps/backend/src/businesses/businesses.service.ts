import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateBusinessDto, UpdateBusinessDto } from './dto/businesses.dto';
import { UserRole } from '@cake-app/common';

@Injectable()
export class BusinessesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateBusinessDto) {
    const business = await this.prisma.business.create({
      data: {
        ...dto,
        owner: { connect: { id: userId } },
      },
    });

    // Automatically upgrade the user to BUSINESS_OWNER
    await this.prisma.user.update({
      where: { id: userId },
      data: { role: UserRole.BUSINESS_OWNER },
    });

    return business;
  }

  async findAll(
    filters: {
      categoryId?: string;
      search?: string;
      city?: string;
      rating?: number;
      deliveryOption?: string;
    } = {},
  ) {
    const where: Prisma.BusinessWhereInput = { status: 'ACTIVE' };
    if (filters.categoryId)
      where.businessCategories = { some: { categoryId: filters.categoryId } };
    if (filters.search)
      where.OR = [
        { name: { contains: filters.search } },
        { description: { contains: filters.search } },
      ];
    if (filters.city) where.location = { contains: filters.city };
    if (filters.rating !== undefined) where.rating = { gte: filters.rating };
    if (filters.deliveryOption === 'PICKUP') where.isPickupAvailable = true;
    if (
      filters.deliveryOption === 'BUSINESS_DELIVERY' ||
      filters.deliveryOption === 'PLATFORM_DELIVERY'
    )
      where.isDeliveryAvailable = true;
    return this.prisma.business.findMany({
      where,
    });
  }

  async findOne(idOrSlug: string) {
    const business = await this.prisma.business.findFirst({
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      },
      include: {
        businessCategories: true,
        products: true,
        services: true,
      },
    });

    if (!business) {
      throw new NotFoundException('Business not found');
    }
    return business;
  }

  async update(id: string, dto: UpdateBusinessDto) {
    return this.prisma.business.update({
      where: { id },
      data: dto,
    });
  }
}
