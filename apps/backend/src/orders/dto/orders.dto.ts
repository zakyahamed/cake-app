import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CheckoutDto {
  @IsString()
  @IsNotEmpty()
  fulfilmentMethod!: string; // PICKUP, BUSINESS_DELIVERY, PLATFORM_DELIVERY

  @IsOptional()
  @IsString()
  addressId?: string;

  @IsOptional()
  @IsString()
  scheduledDate?: string;

  @IsOptional()
  @IsString()
  scheduledTime?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateOrderStatusDto {
  @IsString()
  @IsNotEmpty()
  status!: string;
}
