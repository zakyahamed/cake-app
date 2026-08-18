import { z } from "zod";

// ---------------------------------------------------------------------------
// Auth schemas
// ---------------------------------------------------------------------------

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z
      .string()
      .regex(/^(\+94|0)[0-9]{9}$/, "Please enter a valid Sri Lankan phone number"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// ---------------------------------------------------------------------------
// Address schema
// ---------------------------------------------------------------------------

export const addressSchema = z.object({
  label: z.string().min(1, "Label is required"),
  type: z.enum(["HOME", "WORK", "OTHER"]),
  line1: z.string().min(5, "Address line 1 must be at least 5 characters"),
  line2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  district: z.string().min(1, "District is required"),
  postalCode: z.string().optional(),
  isDefault: z.boolean().default(false),
});

// ---------------------------------------------------------------------------
// Checkout schema
// ---------------------------------------------------------------------------

export const checkoutSchema = z.object({
  addressId: z.string().min(1, "Please select a delivery address"),
  fulfilmentMethod: z.enum(["PICKUP", "BUSINESS_DELIVERY", "PLATFORM_DELIVERY"]),
  scheduledDate: z.string().optional(),
  scheduledTime: z.string().optional(),
  notes: z.string().max(500, "Notes must be under 500 characters").optional(),
  paymentMethod: z.enum(["CARD", "CASH_ON_DELIVERY", "BANK_TRANSFER"]),
});

// ---------------------------------------------------------------------------
// Booking schema
// ---------------------------------------------------------------------------

export const bookingSchema = z.object({
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  notes: z.string().max(500, "Notes must be under 500 characters").optional(),
  paymentMethod: z.enum(["CARD", "CASH_ON_DELIVERY", "BANK_TRANSFER"]),
});

// ---------------------------------------------------------------------------
// Review schema
// ---------------------------------------------------------------------------

export const reviewSchema = z.object({
  rating: z.number().min(1, "Rating is required").max(5),
  comment: z
    .string()
    .min(10, "Review must be at least 10 characters")
    .max(1000, "Review must be under 1000 characters"),
});

// ---------------------------------------------------------------------------
// Message schema
// ---------------------------------------------------------------------------

export const messageSchema = z.object({
  content: z
    .string()
    .min(1, "Message cannot be empty")
    .max(2000, "Message must be under 2000 characters"),
});

// ---------------------------------------------------------------------------
// Profile schema
// ---------------------------------------------------------------------------

export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .regex(/^(\+94|0)[0-9]{9}$/, "Please enter a valid Sri Lankan phone number"),
});

// ---------------------------------------------------------------------------
// Inferred types
// ---------------------------------------------------------------------------

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type AddressInput = z.infer<typeof addressSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type BookingInput = z.infer<typeof bookingSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
export type MessageInput = z.infer<typeof messageSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
