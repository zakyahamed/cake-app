import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsOptional()
  @IsString()
  orderId?: string;

  @IsOptional()
  @IsString()
  bookingId?: string;

  @IsNumber()
  @IsNotEmpty()
  amount!: number;
}

export class ConfirmPaymentDto {
  @IsString()
  @IsNotEmpty()
  paymentId!: string;

  @IsString()
  @IsNotEmpty()
  providerTransactionId!: string;
}
