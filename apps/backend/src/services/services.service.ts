import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateServiceDto, UpdateServiceDto } from './dto/services.dto';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateServiceDto) {
    const business = await this.prisma.business.findUnique({
      where: { id: dto.businessId },
    });

    if (!business || business.ownerId !== userId) {
      throw new UnauthorizedException('You do not own this business');
    }

    return this.prisma.service.create({
      data: dto,
    });
  }

  async findAll(
    page = 1,
    limit = 20,
    filters: {
      businessId?: string;
      categoryId?: string;
      search?: string;
      minPrice?: number;
      maxPrice?: number;
    } = {},
  ) {
    const skip = (page - 1) * limit;
    const where: Prisma.ServiceWhereInput = { status: 'ACTIVE' };
    if (filters.businessId) where.businessId = filters.businessId;
    if (filters.categoryId) where.categoryId = filters.categoryId;
    if (filters.search)
      where.OR = [
        { name: { contains: filters.search } },
        { description: { contains: filters.search } },
      ];
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined)
      where.price = { gte: filters.minPrice, lte: filters.maxPrice };
    return this.prisma.service.findMany({
      where,
      skip,
      take: limit,
    });
  }

  async findOne(id: string) {
    const service = await this.prisma.service.findUnique({
      where: { id },
    });

    if (!service) throw new NotFoundException('Service not found');
    return service;
  }

  async update(userId: string, id: string, dto: UpdateServiceDto) {
    const service = await this.findOne(id);
    const business = await this.prisma.business.findUnique({
      where: { id: service.businessId },
    });

    if (!business || business.ownerId !== userId) {
      throw new UnauthorizedException('You do not own this service');
    }

    return this.prisma.service.update({
      where: { id },
      data: dto,
    });
  }

  async remove(userId: string, id: string) {
    const service = await this.findOne(id);
    const business = await this.prisma.business.findUnique({
      where: { id: service.businessId },
    });

    if (!business || business.ownerId !== userId) {
      throw new UnauthorizedException('You do not own this service');
    }

    return this.prisma.service.update({
      where: { id },
      data: { status: 'UNLISTED' },
    });
  }
}
