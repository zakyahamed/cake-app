import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
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

  async findAll() {
    return this.prisma.business.findMany({
      where: { status: 'ACTIVE' },
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
      }
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
