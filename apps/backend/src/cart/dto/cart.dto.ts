import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class AddCartItemDto {
  @IsOptional()
  @IsString()
  productId?: string;

  @IsOptional()
  @IsString()
  serviceId?: string;

  @IsOptional()
  @IsString()
  variantId?: string;

  @IsInt()
  @Min(1)
  quantity!: number;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateCartItemDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  quantity?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
