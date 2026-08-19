import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
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

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    return this.prisma.service.findMany({
      where: { status: 'ACTIVE' },
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
