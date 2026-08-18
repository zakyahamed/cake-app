// ---------------------------------------------------------------------------
// Composition root — swap mock implementations for API implementations here
// ---------------------------------------------------------------------------

import { MockCategoryRepository } from "./mock/category";
import { MockBusinessRepository } from "./mock/business";
import { MockProductRepository, MockServiceRepository, MockSearchRepository } from "./mock/product";
import { MockOrderRepository } from "./mock/order";
import { MockBookingRepository } from "./mock/booking";
import { MockReviewRepository, MockMessageRepository, MockNotificationRepository } from "./mock/social";
import { MockAuthRepository } from "./mock/auth";

export const categoryRepository = new MockCategoryRepository();
export const businessRepository = new MockBusinessRepository();
export const productRepository = new MockProductRepository();
export const serviceRepository = new MockServiceRepository();
export const searchRepository = new MockSearchRepository();
export const orderRepository = new MockOrderRepository();
export const bookingRepository = new MockBookingRepository();
export const reviewRepository = new MockReviewRepository();
export const messageRepository = new MockMessageRepository();
export const notificationRepository = new MockNotificationRepository();
export const authRepository = new MockAuthRepository();

// Re-export interfaces so features can import them from one place
export type { CategoryRepository, BusinessRepository } from "./interfaces/business";
export type { ProductRepository, ServiceRepository, SearchRepository } from "./interfaces/product";
export type { OrderRepository, BookingRepository } from "./interfaces/order";
export type { ReviewRepository, MessageRepository, NotificationRepository } from "./interfaces/review";
export type { AuthRepository } from "./interfaces/auth";
