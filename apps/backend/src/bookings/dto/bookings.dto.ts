import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  serviceId!: string;

  @IsString()
  @IsNotEmpty()
  scheduledDate!: string;

  @IsString()
  @IsNotEmpty()
  scheduledTime!: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateBookingStatusDto {
  @IsString()
  @IsNotEmpty()
  status!: string; // CONFIRMED, REJECTED, COMPLETED, CANCELLED
}
