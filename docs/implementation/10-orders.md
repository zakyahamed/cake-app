# Step 10 — Orders

## Objective

Implement the core marketplace order lifecycle.

## Order states

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

## Customer

Customer can:

- Create order
- View orders
- View order
- Cancel where permitted

## Business

Business can:

- View orders
- Confirm
- Reject
- Mark preparing
- Mark ready
- Mark completed

## Rules

Validate every status transition server-side.

Do not trust frontend status values.

## Definition of Done

Full order lifecycle works through API.
