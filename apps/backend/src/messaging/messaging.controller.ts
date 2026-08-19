import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { CreateConversationDto, SendMessageDto } from './dto/messaging.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('messaging')
export class MessagingController {
  constructor(private readonly messagingService: MessagingService) {}

  @Post('conversations')
  createConversation(@CurrentUser() user: any, @Body() dto: CreateConversationDto) {
    return this.messagingService.getOrCreateConversation(user.userId, dto);
  }

  @Get('conversations')
  getMyConversations(@CurrentUser() user: any) {
    return this.messagingService.getMyConversations(user.userId);
  }

  @Get('conversations/:id/messages')
  getMessages(@CurrentUser() user: any, @Param('id') id: string) {
    return this.messagingService.getMessages(user.userId, id);
  }

  @Post('conversations/:id/messages')
  sendMessage(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() dto: SendMessageDto,
  ) {
    return this.messagingService.sendMessage(user.userId, id, dto);
  }
}
