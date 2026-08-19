import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddCartItemDto, UpdateCartItemDto } from './dto/cart.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@CurrentUser() user: any) {
    return this.cartService.getCart(user.userId);
  }

  @Post('items')
  addItem(@CurrentUser() user: any, @Body() dto: AddCartItemDto) {
    return this.cartService.addItem(user.userId, dto);
  }

  @Patch('items/:id')
  updateItem(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() dto: UpdateCartItemDto,
  ) {
    return this.cartService.updateItem(user.userId, id, dto);
  }

  @Delete('items/:id')
  removeItem(@CurrentUser() user: any, @Param('id') id: string) {
    return this.cartService.removeItem(user.userId, id);
  }
}
