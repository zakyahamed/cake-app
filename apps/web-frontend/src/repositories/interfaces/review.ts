import type {
  Conversation,
  Message,
  Notification,
  PaginatedResult,
  Review,
} from "@/domain/types";

export interface ReviewRepository {
  getReviewsByBusinessId(businessId: string, page?: number, limit?: number): Promise<PaginatedResult<Review>>;
  createReview(review: Omit<Review, "id" | "createdAt">): Promise<Review>;
}

export interface MessageRepository {
  getConversations(customerId: string): Promise<Conversation[]>;
  getConversationById(id: string): Promise<Conversation | null>;
  getMessages(conversationId: string): Promise<Message[]>;
  sendMessage(conversationId: string, content: string): Promise<Message>;
  markConversationAsRead(conversationId: string): Promise<void>;
}

export interface NotificationRepository {
  getNotifications(userId: string): Promise<Notification[]>;
  markAsRead(notificationId: string): Promise<Notification>;
  markAllAsRead(userId: string): Promise<void>;
}
