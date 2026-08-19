import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
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
        variants: variants ? {
          create: variants,
        } : undefined,
      },
      include: { variants: true },
    });
  }

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    return this.prisma.product.findMany({
      where: { status: 'ACTIVE' },
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
