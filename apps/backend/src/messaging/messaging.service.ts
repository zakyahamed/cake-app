import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateConversationDto, SendMessageDto } from './dto/messaging.dto';

@Injectable()
export class MessagingService {
  constructor(private prisma: PrismaService) {}

  async getOrCreateConversation(userId: string, dto: CreateConversationDto) {
    // Check if conversation already exists
    const existing = await this.prisma.conversation.findFirst({
      where: {
        customerId: userId,
        businessId: dto.businessId,
        orderId: dto.orderId ?? null,
      },
    });

    if (existing) return existing;

    return this.prisma.conversation.create({
      data: {
        customerId: userId,
        businessId: dto.businessId,
        orderId: dto.orderId,
      },
    });
  }

  async getMyConversations(userId: string) {
    // User could be a customer OR a business owner
    return this.prisma.conversation.findMany({
      where: {
        OR: [
          { customerId: userId },
          { business: { ownerId: userId } },
        ],
      },
      include: {
        customer: { select: { id: true, name: true, email: true } },
        business: { select: { id: true, name: true } },
        messages: { orderBy: { createdAt: 'desc' }, take: 1 },
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async getMessages(userId: string, conversationId: string) {
    const conversation = await this.verifyAccess(userId, conversationId);

    return this.prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'asc' },
      include: {
        sender: { select: { id: true, name: true } },
      },
    });
  }

  async sendMessage(userId: string, conversationId: string, dto: SendMessageDto) {
    await this.verifyAccess(userId, conversationId);

    const message = await this.prisma.message.create({
      data: {
        conversationId,
        senderId: userId,
        content: dto.content,
      },
    });

    // Update conversation's updatedAt
    await this.prisma.conversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() },
    });

    return message;
  }

  private async verifyAccess(userId: string, conversationId: string) {
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
      include: { business: true },
    });

    if (!conversation) throw new NotFoundException('Conversation not found');

    const isCustomer = conversation.customerId === userId;
    const isBizOwner = conversation.business.ownerId === userId;

    if (!isCustomer && !isBizOwner) {
      throw new UnauthorizedException('You do not have access to this conversation');
    }

    return conversation;
  }
}
