import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async searchBusinesses(q?: string, categoryId?: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const whereClause: any = { status: 'ACTIVE' };

    if (q) {
      whereClause.OR = [
        { name: { contains: q } },
        { description: { contains: q } },
      ];
    }

    if (categoryId) {
      whereClause.businessCategories = {
        some: { categoryId },
      };
    }

    return this.prisma.business.findMany({
      where: whereClause,
      skip,
      take: limit,
    });
  }

  async searchProducts(q?: string, categoryId?: string, minPrice?: number, maxPrice?: number, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const whereClause: any = { status: 'ACTIVE' };

    if (q) {
      whereClause.OR = [
        { name: { contains: q } },
        { description: { contains: q } },
      ];
    }

    if (categoryId) {
      whereClause.categoryId = categoryId;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      whereClause.price = {};
      if (minPrice !== undefined) whereClause.price.gte = minPrice;
      if (maxPrice !== undefined) whereClause.price.lte = maxPrice;
    }

    return this.prisma.product.findMany({
      where: whereClause,
      include: { variants: true },
      skip,
      take: limit,
    });
  }

  async searchServices(q?: string, categoryId?: string, minPrice?: number, maxPrice?: number, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const whereClause: any = { status: 'ACTIVE' };

    if (q) {
      whereClause.OR = [
        { name: { contains: q } },
        { description: { contains: q } },
      ];
    }

    if (categoryId) {
      whereClause.categoryId = categoryId;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      whereClause.price = {};
      if (minPrice !== undefined) whereClause.price.gte = minPrice;
      if (maxPrice !== undefined) whereClause.price.lte = maxPrice;
    }

    return this.prisma.service.findMany({
      where: whereClause,
      skip,
      take: limit,
    });
  }
}
