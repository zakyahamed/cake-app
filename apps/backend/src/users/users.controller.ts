import { Controller, Get, Patch, Post, Delete, Body, Param, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { UpdateProfileDto, CreateAddressDto, UpdateAddressDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getProfile(@CurrentUser() user: any) {
    const profile = await this.usersService.findById(user.userId);
    if (!profile) throw new NotFoundException('User not found');
    const { passwordHash, hashedRefreshToken, ...safeUser } = profile;
    return safeUser;
  }

  @Patch('me')
  async updateProfile(@CurrentUser() user: any, @Body() dto: UpdateProfileDto) {
    const updated = await this.usersService.updateUser(user.userId, dto);
    const { passwordHash, hashedRefreshToken, ...safeUser } = updated;
    return safeUser;
  }

  @Get('me/addresses')
  getAddresses(@CurrentUser() user: any) {
    return this.usersService.getAddresses(user.userId);
  }

  @Post('me/addresses')
  createAddress(@CurrentUser() user: any, @Body() dto: CreateAddressDto) {
    return this.usersService.createAddress(user.userId, dto);
  }

  @Patch('me/addresses/:id')
  async updateAddress(
    @CurrentUser() user: any,
    @Param('id') addressId: string,
    @Body() dto: UpdateAddressDto,
  ) {
    await this.verifyAddressOwnership(user.userId, addressId);
    return this.usersService.updateAddress(addressId, dto);
  }

  @Delete('me/addresses/:id')
  async deleteAddress(@CurrentUser() user: any, @Param('id') addressId: string) {
    await this.verifyAddressOwnership(user.userId, addressId);
    return this.usersService.deleteAddress(addressId);
  }

  private async verifyAddressOwnership(userId: string, addressId: string) {
    const address = await this.usersService.getAddressById(addressId);
    if (!address) throw new NotFoundException('Address not found');
    if (address.userId !== userId) throw new UnauthorizedException('You do not own this address');
  }
}
