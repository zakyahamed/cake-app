import { Controller, Get, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UpdateUserStatusDto, UpdateBusinessStatusDto } from './dto/admin.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '@cake-app/common';

@Roles(UserRole.ADMIN)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // ---- Platform Stats ----
  @Get('stats')
  getStats() {
    return this.adminService.getPlatformStats();
  }

  // ---- Users ----
  @Get('users')
  getUsers(
    @Query('search') search?: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
  ) {
    return this.adminService.getUsers(search, +page, +limit);
  }

  @Patch('users/:id/status')
  updateUserStatus(@Param('id') id: string, @Body() dto: UpdateUserStatusDto) {
    return this.adminService.updateUserStatus(id, dto);
  }

  // ---- Businesses ----
  @Get('businesses')
  getAllBusinesses(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
  ) {
    return this.adminService.getAllBusinesses(+page, +limit);
  }

  @Get('businesses/pending')
  getPendingBusinesses() {
    return this.adminService.getPendingBusinesses();
  }

  @Patch('businesses/:id/status')
  updateBusinessStatus(@Param('id') id: string, @Body() dto: UpdateBusinessStatusDto) {
    return this.adminService.updateBusinessStatus(id, dto);
  }

  // ---- Orders ----
  @Get('orders')
  getAllOrders(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
  ) {
    return this.adminService.getAllOrders(+page, +limit);
  }

  // ---- Bookings ----
  @Get('bookings')
  getAllBookings(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
  ) {
    return this.adminService.getAllBookings(+page, +limit);
  }

  // ---- Payments ----
  @Get('payments')
  getAllPayments(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
  ) {
    return this.adminService.getAllPayments(+page, +limit);
  }

  // ---- Reviews ----
  @Get('reviews')
  getAllReviews(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
  ) {
    return this.adminService.getAllReviews(+page, +limit);
  }

  @Delete('reviews/:id')
  deleteReview(@Param('id') id: string) {
    return this.adminService.deleteReview(id);
  }
}
