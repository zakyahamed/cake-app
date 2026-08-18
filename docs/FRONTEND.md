# Frontend Product Scope

## Product

Build the customer-facing web frontend for a local business marketplace.

Customers should be able to discover local businesses, browse products and services, communicate with businesses, place scheduled orders or bookings, make mock payments, track orders, and leave reviews.

The platform is not designed specifically for cakes.

Cakes are one initial category.

The frontend must support businesses selling:

1. Physical products
2. Services

Examples:

### Products

- Cakes
- Desserts
- Gifts
- Flowers
- Clothing
- Cosmetics
- Home decor

### Services

- Photography
- Bridal services
- Henna
- Education
- Fitness
- Professional services

---

# Current Scope

Build only the customer-facing web application.

Include:

- Public marketplace
- Customer authentication screens
- Discovery
- Search
- Business profiles
- Products
- Services
- Cart
- Checkout
- Mock payment
- Orders
- Bookings
- Messaging
- Reviews
- Notifications
- Customer profile

Do not build:

- Business dashboard
- Admin dashboard
- Backend
- Mobile application

---

# Main Customer Flow

## Product Order

```text
Home
 ↓
Search or Category
 ↓
Business
 ↓
Product
 ↓
Select Variant/Options
 ↓
Add to Cart
 ↓
Cart
 ↓
Checkout
 ↓
Mock Payment
 ↓
Order Confirmation
 ↓
Orders
 ↓
Completed Order
 ↓
Review
```

---

## Service Booking

```text
Home
 ↓
Search or Category
 ↓
Business
 ↓
Service
 ↓
Select Date
 ↓
Select Time
 ↓
Booking Details
 ↓
Mock Payment
 ↓
Booking Confirmation
 ↓
Bookings
```

---

## Discovery Flow

```text
Home
 ↓
Category
 ↓
Business List
 ↓
Filter/Search
 ↓
Business Profile
 ↓
Product or Service
```

---

# Navigation

## Desktop

Primary navigation:

```text
Logo
Search
Categories
Explore
Orders
Messages
Cart
Profile
```

## Mobile Web

Use a responsive navigation suitable for small screens.

Important actions such as search and cart should remain easily accessible.

---

# Main Routes

```text
/
 /search
 /categories
 /categories/[slug]
 /business/[slug]
 /product/[id]
 /service/[id]
 /cart
 /checkout
 /orders
 /orders/[id]
 /bookings
 /bookings/[id]
 /messages
 /messages/[id]
 /notifications
 /profile
 /profile/addresses
 /profile/reviews
 /login
 /register
 /forgot-password
 /reset-password
```

Routes may be refined when implementation requires it.

---

# Product Principle

The UI must not assume:

* Every business sells products
* Every business provides services
* Every transaction requires delivery
* Every order is immediate
* Every business has the same workflow

The domain should support:

```text
Business
  ↓
Products and/or Services
  ↓
Order and/or Booking
  ↓
Payment
  ↓
Fulfilment
```
