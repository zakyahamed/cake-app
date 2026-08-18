# Step 18 — Connect Frontend to Backend

## Objective

Replace frontend mock repositories with real API repositories.

Do NOT rewrite frontend components.

## Process

For each repository:

MockRepository
→ ApiRepository

Implement:

- API client
- Authentication handling
- DTO mapping
- Error mapping
- Pagination mapping

## Order

Integrate in this order:

1. Authentication
2. Categories
3. Businesses
4. Products
5. Services
6. Search
7. Cart
8. Orders
9. Bookings
10. Payments
11. Messages
12. Notifications
13. Reviews
14. Profile

## Critical requirement

Existing frontend hooks should continue to work.

Do not bypass repositories.

## Definition of Done

Frontend operates against the real backend without mock data.
