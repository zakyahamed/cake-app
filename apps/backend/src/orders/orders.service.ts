import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CartService } from '../cart/cart.service';
import { CheckoutDto, UpdateOrderStatusDto } from './dto/orders.dto';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private cartService: CartService,
  ) {}

  async checkout(userId: string, dto: CheckoutDto) {
    const cart = await this.cartService.getCart(userId);
    if (!cart.items || cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    // Determine the business this order belongs to based on the first item
    const firstItem = cart.items[0];
    let businessId: string;
    if (firstItem.product) businessId = firstItem.product.businessId;
    else if (firstItem.service) businessId = firstItem.service.businessId;
    else throw new BadRequestException('Invalid cart item');

    // Basic calculation MVP
    let subtotal = 0;
    for (const item of cart.items) {
      if (item.product) subtotal += item.product.price * item.quantity;
      if (item.service) subtotal += item.service.price * item.quantity;
    }

    const deliveryFee = 0;
    const total = subtotal + deliveryFee;

    // Create Order
    const order = await this.prisma.order.create({
      data: {
        userId,
        businessId,
        subtotal,
        deliveryFee,
        total,
        fulfilmentMethod: dto.fulfilmentMethod,
        addressId: dto.addressId,
        scheduledDate: dto.scheduledDate,
        scheduledTime: dto.scheduledTime,
        notes: dto.notes,
        status: 'PENDING_PAYMENT',
        items: {
          create: cart.items.map(item => ({
            productId: item.productId!,
            variantId: item.variantId,
            quantity: item.quantity,
            priceAtTime: item.product ? item.product.price : (item.service ? item.service.price : 0),
            notes: item.notes,
          }))
        }
      }
    });

    // Empty cart
    await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

    return order;
  }

  async getMyOrders(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: { items: true, business: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getBusinessOrders(userId: string, businessId: string) {
    const business = await this.prisma.business.findUnique({ where: { id: businessId } });
    if (!business || business.ownerId !== userId) {
      throw new UnauthorizedException('You do not own this business');
    }
    return this.prisma.order.findMany({
      where: { businessId },
      include: { items: true, user: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  async updateOrderStatus(userId: string, orderId: string, dto: UpdateOrderStatusDto) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { business: true },
    });
    if (!order) throw new NotFoundException('Order not found');

    if (order.business.ownerId !== userId) {
      throw new UnauthorizedException('You do not own this business');
    }

    return this.prisma.order.update({
      where: { id: orderId },
      data: { status: dto.status },
    });
  }
}
