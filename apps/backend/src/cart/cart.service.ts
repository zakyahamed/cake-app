import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddCartItemDto, UpdateCartItemDto } from './dto/cart.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getCart(userId: string) {
    let cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
            service: true,
            variant: true,
          },
        },
      },
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { userId },
        include: {
          items: { include: { product: true, service: true, variant: true } },
        },
      });
    }

    return cart;
  }

  async addItem(userId: string, dto: AddCartItemDto) {
    const cart = await this.getCart(userId);

    if (!dto.productId && !dto.serviceId) {
      throw new NotFoundException('A product or service is required');
    }

    const existing = await this.prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        ...(dto.productId
          ? { productId: dto.productId }
          : { serviceId: dto.serviceId }),
        ...(dto.variantId ? { variantId: dto.variantId } : {}),
      },
    });

    if (existing) {
      return this.prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + dto.quantity, notes: dto.notes },
        include: { product: true, service: true, variant: true },
      });
    }

    // Basic MVP cart logic
    return this.prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: dto.productId,
        serviceId: dto.serviceId,
        variantId: dto.variantId,
        quantity: dto.quantity,
        notes: dto.notes,
      },
      include: { product: true, service: true, variant: true },
    });
  }

  async updateItem(userId: string, itemId: string, dto: UpdateCartItemDto) {
    const item = await this.prisma.cartItem.findFirst({
      where: { id: itemId, cart: { userId } },
    });
    if (!item) throw new NotFoundException('Cart item not found');

    return this.prisma.cartItem.update({
      where: { id: itemId },
      data: dto,
    });
  }

  async removeItem(userId: string, itemId: string) {
    const item = await this.prisma.cartItem.findFirst({
      where: { id: itemId, cart: { userId } },
    });
    if (!item) throw new NotFoundException('Cart item not found');

    return this.prisma.cartItem.delete({
      where: { id: itemId },
    });
  }
}
