import {
  mockReviews,
  mockConversations,
  mockMessages,
  mockNotifications,
} from "@/mock-data";
import type {
  Conversation,
  Message,
  Notification,
  PaginatedResult,
  Review,
} from "@/domain/types";
import type {
  ReviewRepository,
  MessageRepository,
  NotificationRepository,
} from "../interfaces/review";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function paginate<T>(items: T[], page = 1, limit = 10): PaginatedResult<T> {
  const total = items.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const data = items.slice(start, start + limit);
  return { data, meta: { page, limit, total, totalPages } };
}

// --------------------------------------------------------------------------
// Reviews
// --------------------------------------------------------------------------

let reviews: Review[] = [...mockReviews];

export class MockReviewRepository implements ReviewRepository {
  async getReviewsByBusinessId(
    businessId: string,
    page = 1,
    limit = 10
  ): Promise<PaginatedResult<Review>> {
    await delay(250);
    const results = reviews
      .filter((r) => r.businessId === businessId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return paginate(results, page, limit);
  }

  async createReview(reviewData: Omit<Review, "id" | "createdAt">): Promise<Review> {
    await delay(300);
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    reviews = [newReview, ...reviews];
    return newReview;
  }
}

// --------------------------------------------------------------------------
// Messages
// --------------------------------------------------------------------------

let conversations: Conversation[] = [...mockConversations];
let messages: Message[] = [...mockMessages];

export class MockMessageRepository implements MessageRepository {
  async getConversations(customerId: string): Promise<Conversation[]> {
    await delay(250);
    return conversations
      .filter((c) => c.customerId === customerId)
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }

  async getConversationById(id: string): Promise<Conversation | null> {
    await delay(150);
    return conversations.find((c) => c.id === id) ?? null;
  }

  async getMessages(conversationId: string): Promise<Message[]> {
    await delay(200);
    return messages
      .filter((m) => m.conversationId === conversationId)
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  }

  async sendMessage(conversationId: string, content: string): Promise<Message> {
    await delay(300);
    const now = new Date().toISOString();
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId: "user-01", // current user in mock session
      senderType: "CUSTOMER",
      content,
      isRead: false,
      createdAt: now,
    };
    messages = [...messages, newMessage];

    // Update conversation's updatedAt and unreadCount
    conversations = conversations.map((c) =>
      c.id === conversationId
        ? { ...c, lastMessage: newMessage, updatedAt: now }
        : c
    );

    return newMessage;
  }

  async markConversationAsRead(conversationId: string): Promise<void> {
    await delay(150);
    messages = messages.map((m) =>
      m.conversationId === conversationId ? { ...m, isRead: true } : m
    );
    conversations = conversations.map((c) =>
      c.id === conversationId ? { ...c, unreadCount: 0 } : c
    );
  }
}

// --------------------------------------------------------------------------
// Notifications
// --------------------------------------------------------------------------

let notifications: Notification[] = [...mockNotifications];

export class MockNotificationRepository implements NotificationRepository {
  async getNotifications(userId: string): Promise<Notification[]> {
    await delay(200);
    return notifications
      .filter((n) => n.userId === userId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  async markAsRead(notificationId: string): Promise<Notification> {
    await delay(150);
    const index = notifications.findIndex((n) => n.id === notificationId);
    if (index === -1) throw new Error("Notification not found");
    const updated = { ...notifications[index], isRead: true };
    notifications[index] = updated;
    return updated;
  }

  async markAllAsRead(userId: string): Promise<void> {
    await delay(200);
    notifications = notifications.map((n) =>
      n.userId === userId ? { ...n, isRead: true } : n
    );
  }
}
