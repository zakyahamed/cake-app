import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserStatusDto {
  @IsString()
  @IsNotEmpty()
  status!: string; // ACTIVE, SUSPENDED
}

export class UpdateBusinessStatusDto {
  @IsString()
  @IsNotEmpty()
  status!: string; // ACTIVE, REJECTED, SUSPENDED
}
