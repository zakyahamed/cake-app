import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateProductDto, UpdateProductDto } from './dto/products.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateProductDto) {
    const business = await this.prisma.business.findUnique({
      where: { id: dto.businessId },
    });

    if (!business || business.ownerId !== userId) {
      throw new UnauthorizedException('You do not own this business');
    }

    const { variants, ...productData } = dto;

    return this.prisma.product.create({
      data: {
        ...productData,
        variants: variants
          ? {
              create: variants,
            }
          : undefined,
      },
      include: { variants: true },
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
    const where: Prisma.ProductWhereInput = { status: 'ACTIVE' };
    if (filters.businessId) where.businessId = filters.businessId;
    if (filters.categoryId) where.categoryId = filters.categoryId;
    if (filters.search)
      where.OR = [
        { name: { contains: filters.search } },
        { description: { contains: filters.search } },
      ];
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined)
      where.price = { gte: filters.minPrice, lte: filters.maxPrice };
    return this.prisma.product.findMany({
      where,
      include: { variants: true },
      skip,
      take: limit,
    });
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { variants: true },
    });

    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(userId: string, id: string, dto: UpdateProductDto) {
    const product = await this.findOne(id);
    const business = await this.prisma.business.findUnique({
      where: { id: product.businessId },
    });

    if (!business || business.ownerId !== userId) {
      throw new UnauthorizedException('You do not own this product');
    }

    const { variants, ...updateData } = dto;

    // MVP: If variants are provided on update, we replace them entirely
    if (variants) {
      await this.prisma.productVariant.deleteMany({
        where: { productId: id },
      });
      return this.prisma.product.update({
        where: { id },
        data: {
          ...updateData,
          variants: {
            create: variants,
          },
        },
        include: { variants: true },
      });
    }

    return this.prisma.product.update({
      where: { id },
      data: updateData,
      include: { variants: true },
    });
  }

  async remove(userId: string, id: string) {
    const product = await this.findOne(id);
    const business = await this.prisma.business.findUnique({
      where: { id: product.businessId },
    });

    if (!business || business.ownerId !== userId) {
      throw new UnauthorizedException('You do not own this product');
    }

    // Usually we do a soft delete, changing status to 'UNLISTED'
    return this.prisma.product.update({
      where: { id },
      data: { status: 'UNLISTED' },
    });
  }
}
