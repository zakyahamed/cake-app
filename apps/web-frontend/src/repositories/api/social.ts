import type { ReviewRepository, MessageRepository, NotificationRepository } from '../interfaces/review';
import type { Conversation, Message, Notification, PaginatedResult, Review } from '@/domain/types';
import { apiClient } from './client';
import { NotificationType } from '@/domain/enums';

export class ApiReviewRepository implements ReviewRepository {
  async getReviewsByBusinessId(businessId: string, page = 1, limit = 20): Promise<PaginatedResult<Review>> {
    const reviews = await apiClient.get<any[]>(`/reviews/business/${businessId}`);
    return {
      data: reviews.map(mapReview),
      meta: { page, limit, total: reviews.length, totalPages: 1 },
    };
  }

  async createReview(review: Omit<Review, 'id' | 'createdAt'>): Promise<Review> {
    const result = await apiClient.post<any>('/reviews', {
      businessId: review.businessId,
      orderId: review.orderId,
      bookingId: review.bookingId,
      rating: review.rating,
      content: review.comment,
    });
    return mapReview(result);
  }
}

export class ApiMessageRepository implements MessageRepository {
  async getConversations(customerId: string): Promise<Conversation[]> {
    const convos = await apiClient.get<any[]>('/messaging/conversations');
    return convos.map(mapConversation);
  }

  async getConversationById(id: string): Promise<Conversation | null> {
    const convos = await this.getConversations('');
    return convos.find(c => c.id === id) ?? null;
  }

  async getMessages(conversationId: string): Promise<Message[]> {
    const messages = await apiClient.get<any[]>(`/messaging/conversations/${conversationId}/messages`);
    return messages.map(mapMessage);
  }

  async sendMessage(conversationId: string, content: string): Promise<Message> {
    const result = await apiClient.post<any>(`/messaging/conversations/${conversationId}/messages`, { content });
    return mapMessage(result);
  }

  async markConversationAsRead(_conversationId: string): Promise<void> {
    // MVP: No explicit mark-as-read endpoint for conversations yet
  }
}

export class ApiNotificationRepository implements NotificationRepository {
  async getNotifications(userId: string): Promise<Notification[]> {
    const notifs = await apiClient.get<any[]>('/notifications');
    return notifs.map(mapNotification);
  }

  async markAsRead(notificationId: string): Promise<Notification> {
    await apiClient.patch(`/notifications/${notificationId}/read`);
    // Return a stub since backend returns updateMany result
    return { id: notificationId, isRead: true } as any;
  }

  async markAllAsRead(userId: string): Promise<void> {
    await apiClient.patch('/notifications/read-all');
  }
}

function mapReview(r: any): Review {
  return {
    id: r.id, customerId: r.userId, businessId: r.businessId,
    rating: r.rating, comment: r.content || '',
    orderId: r.orderId, bookingId: r.bookingId, createdAt: r.createdAt,
  };
}

function mapConversation(c: any): Conversation {
  const lastMsg = c.messages?.[0];
  return {
    id: c.id, customerId: c.customerId, businessId: c.businessId,
    lastMessage: lastMsg ? mapMessage(lastMsg) : undefined,
    unreadCount: 0, relatedOrderId: c.orderId,
    createdAt: c.createdAt, updatedAt: c.updatedAt,
  };
}

function mapMessage(m: any): Message {
  return {
    id: m.id, conversationId: m.conversationId,
    senderId: m.senderId, senderType: 'CUSTOMER',
    content: m.content, isRead: m.isRead, createdAt: m.createdAt,
  };
}

function mapNotification(n: any): Notification {
  return {
    id: n.id, userId: n.userId,
    type: n.type as NotificationType,
    title: n.title, body: n.message,
    isRead: n.isRead, relatedId: n.relatedEntityId,
    createdAt: n.createdAt,
  };
}
