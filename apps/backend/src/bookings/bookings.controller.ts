import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto, UpdateBookingStatusDto } from './dto/bookings.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  create(@CurrentUser() user: any, @Body() dto: CreateBookingDto) {
    return this.bookingsService.create(user.userId, dto);
  }

  @Get('me')
  getMyBookings(@CurrentUser() user: any) {
    return this.bookingsService.getMyBookings(user.userId);
  }

  @Get('business/:businessId')
  getBusinessBookings(
    @CurrentUser() user: any,
    @Param('businessId') businessId: string,
  ) {
    return this.bookingsService.getBusinessBookings(user.userId, businessId);
  }

  @Patch(':id/status')
  updateStatus(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() dto: UpdateBookingStatusDto,
  ) {
    return this.bookingsService.updateStatus(user.userId, id, dto);
  }
}
