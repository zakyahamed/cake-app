import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async updateRefreshToken(userId: string, hashedRefreshToken: string | null): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { hashedRefreshToken },
    });
  }

  async updateUser(userId: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data,
    });
  }

  async getAddresses(userId: string) {
    return this.prisma.address.findMany({
      where: { userId },
    });
  }

  async getAddressById(addressId: string) {
    return this.prisma.address.findUnique({
      where: { id: addressId },
    });
  }

  async createAddress(userId: string, data: any) {
    return this.prisma.address.create({
      data: {
        ...data,
        line1: data.line1 || '',
        city: data.city || '',
        state: data.state || '',
        postalCode: data.postalCode || '',
        country: data.country || '',
        user: { connect: { id: userId } },
      },
    });
  }

  async updateAddress(addressId: string, data: Prisma.AddressUpdateInput) {
    return this.prisma.address.update({
      where: { id: addressId },
      data,
    });
  }

  async deleteAddress(addressId: string) {
    return this.prisma.address.delete({
      where: { id: addressId },
    });
  }
}
