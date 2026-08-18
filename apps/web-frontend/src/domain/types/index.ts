import {
  AddressType,
  BookingStatus,
  DayOfWeek,
  FulfilmentMethod,
  NotificationType,
  OrderStatus,
  PaymentStatus,
  UserRole,
  VerificationStatus,
} from "@/domain/enums";

// ---------------------------------------------------------------------------
// Shared / Primitives
// ---------------------------------------------------------------------------

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface AppError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// User & Address
// ---------------------------------------------------------------------------

export interface Address {
  id: string;
  userId: string;
  label: string;
  type: AddressType;
  line1: string;
  line2?: string;
  city: string;
  district: string;
  postalCode?: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: UserRole;
  addresses: Address[];
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Category
// ---------------------------------------------------------------------------

export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  icon: string;
  image?: string;
  businessCount: number;
}

// ---------------------------------------------------------------------------
// Business
// ---------------------------------------------------------------------------

export interface ContactInformation {
  phone: string;
  whatsapp?: string;
  email?: string;
  website?: string;
  instagram?: string;
  facebook?: string;
}

export interface OpeningHoursEntry {
  day: DayOfWeek;
  isOpen: boolean;
  openTime?: string;
  closeTime?: string;
}

export interface Location {
  address: string;
  city: string;
  district: string;
  latitude?: number;
  longitude?: number;
}

export interface Business {
  id: string;
  slug: string;
  name: string;
  description: string;
  logo?: string;
  coverImage?: string;
  categoryIds: string[];
  location: Location;
  contactInformation: ContactInformation;
  openingHours: OpeningHoursEntry[];
  rating: number;
  reviewCount: number;
  verificationStatus: VerificationStatus;
  deliveryOptions: FulfilmentMethod[];
  pickupAvailable: boolean;
  featured: boolean;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Product
// ---------------------------------------------------------------------------

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  isAvailable: boolean;
}

export interface Product {
  id: string;
  businessId: string;
  categoryId: string;
  name: string;
  description: string;
  images: string[];
  basePrice: number;
  variants: ProductVariant[];
  isAvailable: boolean;
  rating: number;
  reviewCount: number;
  featured: boolean;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Service
// ---------------------------------------------------------------------------

export interface ServiceAvailability {
  days: DayOfWeek[];
  startTime: string;
  endTime: string;
}

export interface Service {
  id: string;
  businessId: string;
  categoryId: string;
  name: string;
  description: string;
  images: string[];
  startingPrice: number;
  durationMinutes: number;
  availability: ServiceAvailability;
  location?: string;
  isAvailable: boolean;
  rating: number;
  reviewCount: number;
  featured: boolean;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Cart
// ---------------------------------------------------------------------------

export interface CartItem {
  id: string;
  productId: string;
  businessId: string;
  variantId?: string;
  quantity: number;
  unitPrice: number;
  name: string;
  image?: string;
  notes?: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
}

// ---------------------------------------------------------------------------
// Order
// ---------------------------------------------------------------------------

export interface OrderItem {
  id: string;
  productId: string;
  variantId?: string;
  name: string;
  variantName?: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  image?: string;
}

export interface OrderTimeline {
  status: OrderStatus;
  timestamp: string;
  note?: string;
}

export interface Order {
  id: string;
  customerId: string;
  businessId: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentId?: string;
  fulfilmentMethod: FulfilmentMethod;
  deliveryAddress?: Address;
  scheduledDate?: string;
  scheduledTime?: string;
  status: OrderStatus;
  timeline: OrderTimeline[];
  notes?: string;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Booking
// ---------------------------------------------------------------------------

export interface Booking {
  id: string;
  customerId: string;
  businessId: string;
  serviceId: string;
  date: string;
  time: string;
  durationMinutes: number;
  status: BookingStatus;
  paymentId?: string;
  totalAmount: number;
  notes?: string;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Payment
// ---------------------------------------------------------------------------

export interface Payment {
  id: string;
  referenceId: string;
  referenceType: "ORDER" | "BOOKING";
  amount: number;
  status: PaymentStatus;
  method: string;
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// Messaging
// ---------------------------------------------------------------------------

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderType: "CUSTOMER" | "BUSINESS";
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface Conversation {
  id: string;
  customerId: string;
  businessId: string;
  lastMessage?: Message;
  unreadCount: number;
  relatedOrderId?: string;
  relatedBookingId?: string;
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// Review
// ---------------------------------------------------------------------------

export interface Review {
  id: string;
  customerId: string;
  businessId: string;
  rating: number;
  comment: string;
  images?: string[];
  orderId?: string;
  bookingId?: string;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Notification
// ---------------------------------------------------------------------------

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  isRead: boolean;
  actionUrl?: string;
  relatedId?: string;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Query models
// ---------------------------------------------------------------------------

export interface BusinessQuery extends PaginationParams {
  categoryId?: string;
  search?: string;
  city?: string;
  rating?: number;
  deliveryOption?: FulfilmentMethod;
  featured?: boolean;
  sortBy?: "rating" | "reviewCount" | "name" | "createdAt";
  sortOrder?: "asc" | "desc";
}

export interface ProductQuery extends PaginationParams {
  businessId?: string;
  categoryId?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
}

export interface ServiceQuery extends PaginationParams {
  businessId?: string;
  categoryId?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
}

export interface OrderQuery extends PaginationParams {
  customerId?: string;
  status?: OrderStatus;
}

export interface BookingQuery extends PaginationParams {
  customerId?: string;
  status?: BookingStatus;
}

export interface SearchQuery {
  query: string;
  limit?: number;
}

export interface SearchResults {
  businesses: Business[];
  products: Product[];
  services: Service[];
  categories: Category[];
}
