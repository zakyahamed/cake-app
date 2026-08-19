// ---------------------------------------------------------------------------
// Composition root — API implementations connected to the real backend
// ---------------------------------------------------------------------------

import { ApiCategoryRepository, ApiBusinessRepository } from "./api/business";
import { ApiProductRepository, ApiServiceRepository, ApiSearchRepository } from "./api/product";
import { ApiOrderRepository, ApiBookingRepository } from "./api/order";
import { ApiReviewRepository, ApiMessageRepository, ApiNotificationRepository } from "./api/social";
import { ApiAuthRepository } from "./api/auth";

export const categoryRepository = new ApiCategoryRepository();
export const businessRepository = new ApiBusinessRepository();
export const productRepository = new ApiProductRepository();
export const serviceRepository = new ApiServiceRepository();
export const searchRepository = new ApiSearchRepository();
export const orderRepository = new ApiOrderRepository();
export const bookingRepository = new ApiBookingRepository();
export const reviewRepository = new ApiReviewRepository();
export const messageRepository = new ApiMessageRepository();
export const notificationRepository = new ApiNotificationRepository();
export const authRepository = new ApiAuthRepository();

// Re-export interfaces so features can import them from one place
export type { CategoryRepository, BusinessRepository } from "./interfaces/business";
export type { ProductRepository, ServiceRepository, SearchRepository } from "./interfaces/product";
export type { OrderRepository, BookingRepository } from "./interfaces/order";
export type { ReviewRepository, MessageRepository, NotificationRepository } from "./interfaces/review";
export type { AuthRepository } from "./interfaces/auth";
