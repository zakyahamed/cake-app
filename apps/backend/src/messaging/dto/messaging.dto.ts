import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateConversationDto {
  @IsString()
  @IsNotEmpty()
  businessId!: string;

  @IsOptional()
  @IsString()
  orderId?: string;
}

export class SendMessageDto {
  @IsString()
  @IsNotEmpty()
  content!: string;
}
