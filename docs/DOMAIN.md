# Domain Model

## Core Types

Create shared TypeScript domain types for the frontend.

At minimum:

```text
User
Address

Business
Category
BusinessCategory

Product
ProductVariant
Service

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

Delivery
```

Do not duplicate these types across features.

---

# User Roles

Current roles:

```text
CUSTOMER
```

Future roles may exist, but do not build their frontend now:

```text
BUSINESS_OWNER
BUSINESS_STAFF
ADMIN
DELIVERY_PARTNER
```

---

# Business

A business should support:

```text
id
slug
name
description
logo
coverImage
categories
location
contactInformation
openingHours
rating
reviewCount
verificationStatus
deliveryOptions
pickupAvailable
products
services
```

A business may have:

* Products only
* Services only
* Both

---

# Product

A product should support:

```text
id
businessId
name
description
images
basePrice
variants
availability
categoryId
rating
reviewCount
```

Products may have variants.

Example:

```text
Chocolate Cake

1 kg
1.5 kg
2 kg
```

Each variant may have a different price.

---

# Service

A service should support:

```text
id
businessId
name
description
images
startingPrice
duration
availability
location
rating
reviewCount
```

Services are not products.

Do not force services into the product model merely because it is convenient today and horrifying tomorrow.

---

# Order

Order states:

```text
PENDING_PAYMENT
PAID
CONFIRMED
PREPARING
READY
OUT_FOR_DELIVERY
COMPLETED
CANCELLED
REJECTED
REFUNDED
```

An order should contain:

```text
id
customerId
businessId
items
subtotal
deliveryFee
discount
total
payment
fulfilmentMethod
scheduledDate
scheduledTime
status
notes
createdAt
```

---

# Booking

Booking states:

```text
PENDING
CONFIRMED
COMPLETED
CANCELLED
REJECTED
```

A booking should contain:

```text
id
customerId
businessId
serviceId
date
time
duration
status
payment
notes
```

---

# Fulfilment Methods

Support:

```text
PICKUP
BUSINESS_DELIVERY
PLATFORM_DELIVERY
```

Do not assume every business supports every method.

---

# Payment

Current frontend implementation uses mock payment.

Payment states:

```text
IDLE
PROCESSING
SUCCESS
FAILED
CANCELLED
```

Future backend/payment provider integration must replace only the payment implementation, not the checkout UI.

---

# Review

Reviews should contain:

```text
id
customerId
businessId
rating
comment
images
createdAt
orderId?
bookingId?
```

A review should only be creatable in the mock flow for a completed order or booking.

---

# Notification Types

```text
ORDER
PAYMENT
BOOKING
MESSAGE
PROMOTION
REVIEW
SYSTEM
```
