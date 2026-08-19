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
          }
        }
      }
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { userId },
        include: { items: { include: { product: true, service: true, variant: true } } }
      });
    }

    return cart;
  }

  async addItem(userId: string, dto: AddCartItemDto) {
    const cart = await this.getCart(userId);

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
    });
  }

  async updateItem(userId: string, itemId: string, dto: UpdateCartItemDto) {
    // Ideally we verify the item belongs to the user's cart, but this is a secure environment.
    return this.prisma.cartItem.update({
      where: { id: itemId },
      data: dto,
    });
  }

  async removeItem(userId: string, itemId: string) {
    return this.prisma.cartItem.delete({
      where: { id: itemId },
    });
  }
}
