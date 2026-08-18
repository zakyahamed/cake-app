import { NotificationType } from "@/domain/enums";
import type { Notification } from "@/domain/types";

export const mockNotifications: Notification[] = [
  // user-01 notifications
  { id: "notif-01", userId: "user-01", type: NotificationType.ORDER, title: "Order Confirmed", body: "Your chocolate drip cake order has been confirmed by Divini Cakes. Scheduled delivery on 16 Jan at 2:00 PM.", isRead: true, actionUrl: "/orders/ord-01", relatedId: "ord-01", createdAt: "2024-01-15T11:00:00Z" },
  { id: "notif-02", userId: "user-01", type: NotificationType.ORDER, title: "Order Out for Delivery", body: "Your cake from Divini Cakes is on its way! Driver will arrive between 1:30–2:30 PM.", isRead: true, actionUrl: "/orders/ord-01", relatedId: "ord-01", createdAt: "2024-01-16T13:30:00Z" },
  { id: "notif-03", userId: "user-01", type: NotificationType.ORDER, title: "Order Delivered ✓", body: "Your order from Divini Cakes has been delivered. Enjoy! Leave a review to share your experience.", isRead: true, actionUrl: "/orders/ord-01", relatedId: "ord-01", createdAt: "2024-01-16T14:20:00Z" },
  { id: "notif-04", userId: "user-01", type: NotificationType.BOOKING, title: "Booking Confirmed", body: "Your portrait photography session with Lens by Lahiru is confirmed for 15 Jan at 10:00 AM.", isRead: true, actionUrl: "/bookings/book-01", relatedId: "book-01", createdAt: "2024-01-10T11:30:00Z" },
  { id: "notif-05", userId: "user-01", type: NotificationType.MESSAGE, title: "New message from Divini Cakes", body: "Good morning! Your cake is ready. Here's a preview — hope you love it! 🎂", isRead: true, actionUrl: "/messages/conv-01", relatedId: "conv-01", createdAt: "2024-01-16T09:00:00Z" },
  { id: "notif-06", userId: "user-01", type: NotificationType.REVIEW, title: "How was your order?", body: "You recently received your order from Amma's Kitchen. Share your experience with a review!", isRead: true, actionUrl: "/orders/ord-02", relatedId: "ord-02", createdAt: "2024-01-18T15:00:00Z" },
  { id: "notif-07", userId: "user-01", type: NotificationType.ORDER, title: "Wedding Cake Order Confirmed", body: "Your wedding cake order with Divini Cakes is confirmed. Scheduled for 15 Mar 2024 delivery.", isRead: true, actionUrl: "/orders/ord-03", relatedId: "ord-03", createdAt: "2024-01-20T10:00:00Z" },
  { id: "notif-08", userId: "user-01", type: NotificationType.BOOKING, title: "Reminder: Training Session Tomorrow", body: "Your personal training session at FitLife is tomorrow at 6:30 AM. Come prepared! 💪", isRead: false, actionUrl: "/bookings/book-02", relatedId: "book-02", createdAt: "2024-01-23T18:00:00Z" },
  { id: "notif-09", userId: "user-01", type: NotificationType.ORDER, title: "Order Confirmed — Anniversary Cake", body: "Your anniversary cake order has been confirmed by SugarCraft. Scheduled delivery: 20 Mar at 11:00 AM.", isRead: false, actionUrl: "/orders/ord-07", relatedId: "ord-07", createdAt: "2024-02-05T10:00:00Z" },
  { id: "notif-10", userId: "user-01", type: NotificationType.MESSAGE, title: "New message from FitLife", body: "Good morning! This is a reminder that your training session is tomorrow at 6:30am.", isRead: false, actionUrl: "/messages/conv-02", relatedId: "conv-02", createdAt: "2024-01-23T18:00:00Z" },
  { id: "notif-11", userId: "user-01", type: NotificationType.BOOKING, title: "Legal Consultation Confirmed", body: "Your consultation with Silva & Associates is confirmed for 5 Mar at 10:00 AM.", isRead: true, actionUrl: "/bookings/book-05", relatedId: "book-05", createdAt: "2024-02-08T09:05:00Z" },
  { id: "notif-12", userId: "user-01", type: NotificationType.PROMOTION, title: "Exclusive Offer — 10% off Dessert Boxes", body: "Divini Cakes is offering 10% off all dessert boxes this weekend only. Order now!", isRead: false, actionUrl: "/business/divini-cakes-colombo", createdAt: "2024-02-16T09:00:00Z" },

  // user-02 notifications
  { id: "notif-13", userId: "user-02", type: NotificationType.ORDER, title: "Order Delivered ✓", body: "Your dessert boxes from Divini Cakes have been delivered. Enjoy your event!", isRead: true, actionUrl: "/orders/ord-04", relatedId: "ord-04", createdAt: "2024-01-23T11:35:00Z" },
  { id: "notif-14", userId: "user-02", type: NotificationType.BOOKING, title: "Fitness Programme Confirmed", body: "Your monthly programme with FitLife starts on 1 Mar. Get ready to transform! 💪", isRead: true, actionUrl: "/bookings/book-06", relatedId: "book-06", createdAt: "2024-02-12T10:05:00Z" },
  { id: "notif-15", userId: "user-02", type: NotificationType.MESSAGE, title: "New message from FitLife", body: "Just sent your personalised meal plan to your email. Please review before our first session.", isRead: false, actionUrl: "/messages/conv-06", relatedId: "conv-06", createdAt: "2024-02-12T10:10:00Z" },
  { id: "notif-16", userId: "user-02", type: NotificationType.REVIEW, title: "Review your photography session", body: "How was your event photography with Lens by Lahiru? Share your thoughts!", isRead: true, actionUrl: "/bookings/book-15", relatedId: "book-15", createdAt: "2024-02-10T10:00:00Z" },

  // user-03 notifications
  { id: "notif-17", userId: "user-03", type: NotificationType.ORDER, title: "Order Delivered ✓", body: "Your Vitamin C serum from Glow Cosmetics has been delivered!", isRead: true, actionUrl: "/orders/ord-05", relatedId: "ord-05", createdAt: "2024-01-26T15:00:00Z" },
  { id: "notif-18", userId: "user-03", type: NotificationType.BOOKING, title: "Bridal Mehendi Confirmed", body: "Your bridal mehendi session with Nuha Henna Art is confirmed for 28 Jan at 10:00 AM.", isRead: true, actionUrl: "/bookings/book-03", relatedId: "book-03", createdAt: "2024-01-25T09:30:00Z" },
  { id: "notif-19", userId: "user-03", type: NotificationType.BOOKING, title: "Tuition Booking Confirmed", body: "O/L Mathematics tuition at BrightMinds Academy confirmed for 2 Mar at 3:00 PM.", isRead: true, actionUrl: "/bookings/book-11", relatedId: "book-11", createdAt: "2024-02-22T14:30:00Z" },

  // user-05 notifications
  { id: "notif-20", userId: "user-05", type: NotificationType.ORDER, title: "Gift Box Delivered ✓", body: "The premium gift box for your mum has been delivered to Jaffna. Hope she loves it! 🎁", isRead: true, actionUrl: "/orders/ord-08", relatedId: "ord-08", createdAt: "2024-02-12T12:00:00Z" },
  { id: "notif-21", userId: "user-05", type: NotificationType.BOOKING, title: "Henna Booking Pending Confirmation", body: "Your simple henna booking with Nuha Henna Art for 10 Mar is awaiting confirmation.", isRead: false, actionUrl: "/bookings/book-07", relatedId: "book-07", createdAt: "2024-02-18T12:05:00Z" },

  // user-07 notifications
  { id: "notif-22", userId: "user-07", type: NotificationType.ORDER, title: "Payment Received", body: "Payment for your hair oil order from Lanka Herbal Wellness is being processed.", isRead: true, actionUrl: "/orders/ord-10", relatedId: "ord-10", createdAt: "2024-02-15T14:01:00Z" },
  { id: "notif-23", userId: "user-07", type: NotificationType.BOOKING, title: "Family Session Gallery Ready", body: "Thilini has delivered your family portrait gallery! 35 beautiful images await you.", isRead: true, actionUrl: "/bookings/book-08", relatedId: "book-08", createdAt: "2024-01-20T08:10:00Z" },
  { id: "notif-24", userId: "user-07", type: NotificationType.SYSTEM, title: "Welcome to the Marketplace!", body: "Discover amazing local businesses near you. Browse categories, explore featured businesses, and find something special today.", isRead: true, actionUrl: "/", createdAt: "2023-02-14T08:00:00Z" },

  // user-09 notifications
  { id: "notif-25", userId: "user-09", type: NotificationType.BOOKING, title: "Maternity Session Confirmed", body: "Your maternity photography session with Visions by Thilini is confirmed for 8 Mar at 8:00 AM.", isRead: true, actionUrl: "/bookings/book-10", relatedId: "book-10", createdAt: "2024-02-20T10:10:00Z" },
  { id: "notif-26", userId: "user-09", type: NotificationType.MESSAGE, title: "New message from Visions by Thilini", body: "Golden hour in Kandy is magical — I suggest 6am for sunrise or 5pm for sunset...", isRead: false, actionUrl: "/messages/conv-11", relatedId: "conv-11", createdAt: "2024-02-20T10:05:00Z" },
];
