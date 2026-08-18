# Implementation Plan

Do not build the entire application at once.

Complete one phase at a time.

Each phase must be stable before moving forward.

---

# Phase 1: Foundation ✅

Implement:

```text
Next.js project structure
TypeScript
Tailwind
TanStack Query
Zustand
React Hook Form
Zod

Domain types
Enums
Mock data structure
Repository interfaces
Mock repository implementations

Shared UI foundations
Application layout
Responsive navigation
Basic routing
Loading/empty/error components
```

Verify:

```text
Application builds
Typecheck passes
Lint passes
```

Stop after Phase 1.

---

# Phase 2: Authentication

Implement:

```text
Login
Register
Forgot password
Reset password
Mock session
Logout
Route protection where required
```

Verify:

```text
Login flow
Invalid login state
Logout
Session persistence
```

---

# Phase 3: Discovery

Implement:

```text
Home
Categories
Category page
Business list
Business cards
Search
Filters
Business profile
```

Verify:

```text
Business discovery flow
Category filtering
Search
Empty state
Error state
Responsive layouts
```

---

# Phase 4: Products and Services

Implement:

```text
Product listing
Product details
Variants
Service listing
Service details
Date/time selection
```

Verify:

```text
Product selection
Variant selection
Service selection
Booking preparation
```

---

# Phase 5: Cart and Checkout

Implement:

```text
Cart
Quantity changes
Remove item
Checkout
Address selection
Fulfilment selection
Date/time selection
Mock payment
Order confirmation
```

Verify complete flow:

```text
Business
 ↓
Product
 ↓
Cart
 ↓
Checkout
 ↓
Payment
 ↓
Order
```

---

# Phase 6: Orders and Bookings

Implement:

```text
Orders list
Order details
Order timeline

Bookings list
Booking details
Booking status
```

Verify created orders and bookings appear correctly.

---

# Phase 7: Messaging, Reviews, Notifications

Implement:

```text
Messaging
Reviews
Notification center
```

Verify:

```text
Message sending
Review eligibility
Review creation
Notification read state
```

---

# Phase 8: Profile and Polish

Implement:

```text
Profile
Addresses
Settings
Responsive fixes
Accessibility
Loading states
Empty states
Error states
```

---

# Rules for Every Phase

Before implementing:

```text
Inspect existing code
Read relevant docs
Reuse types
Reuse repositories
Reuse hooks
Reuse components
```

After implementing:

```text
Run lint
Run typecheck
Fix avoidable errors
Test primary flow
```

Report:

```text
Implemented
Files changed
How to test
Lint result
Typecheck result
Known limitations
Remaining work
```

Do not automatically start the next phase.

---

# Backend Connection Readiness

The frontend is ready for backend integration when:

```text
No UI directly imports mock data
No UI directly calls APIs
All data access goes through hooks
Repositories have stable contracts
Mock repositories implement those contracts
Mock data is relational
Pagination/query models exist where needed
API-ready error handling exists
Authentication is abstracted
Mock payment is abstracted
```

Future backend integration should primarily require:

```text
Create API client
Implement API repositories
Map API responses to domain models
Replace mock repository composition
Implement real authentication
Implement real payment integration
```

The UI should not require a rewrite.
