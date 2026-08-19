import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CheckoutDto, UpdateOrderStatusDto } from './dto/orders.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('checkout')
  checkout(@CurrentUser() user: any, @Body() dto: CheckoutDto) {
    return this.ordersService.checkout(user.userId, dto);
  }

  @Get('me')
  getMyOrders(@CurrentUser() user: any) {
    return this.ordersService.getMyOrders(user.userId);
  }

  @Get('business/:businessId')
  getBusinessOrders(
    @CurrentUser() user: any,
    @Param('businessId') businessId: string,
  ) {
    return this.ordersService.getBusinessOrders(user.userId, businessId);
  }

  @Patch(':id/status')
  updateOrderStatus(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() dto: UpdateOrderStatusDto,
  ) {
    return this.ordersService.updateOrderStatus(user.userId, id, dto);
  }
}
