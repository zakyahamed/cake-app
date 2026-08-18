# Step 02 — Database and Domain Model

## Objective

Create the initial PostgreSQL schema for the marketplace.

The model must support:

- Products
- Services
- Businesses
- Customers
- Orders
- Bookings
- Payments
- Reviews
- Messages
- Notifications

The system must NOT be cake-specific.

## Core entities

Create appropriate Prisma models for:

User
Role
Business
BusinessCategory
Category
Product
ProductVariant
Service
Address
Cart
CartItem
Order
OrderItem
Booking
Payment
Conversation
Message
Review
Notification

## Requirements

Use UUIDs or another consistent non-sequential ID strategy.

Use timestamps:

createdAt
updatedAt

Use soft deletion only where useful.

Use database indexes for common lookups.

Ensure foreign keys and uniqueness constraints are correct.

## Important

Do not duplicate business/customer information inside unrelated tables unless there is a clear historical requirement.

Orders must preserve the information necessary to represent the transaction at the time it was placed.

## Status enums

Define backend enums for:

OrderStatus
BookingStatus
PaymentStatus
BusinessStatus
ProductStatus
UserStatus

Do not use arbitrary strings throughout business logic.

## Migration

Create the initial Prisma migration.

Seed development data.

The seed data must correspond to the frontend's mock scenarios where practical.

## Definition of Done

- Prisma schema valid
- Migration succeeds
- Database can be recreated
- Seed succeeds
- Relations work
- Constraints exist
- Tests pass
