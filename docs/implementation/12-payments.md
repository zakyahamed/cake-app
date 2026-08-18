# Step 12 — Payments

## Objective

Replace mock payment with a real payment provider.

## Requirements

Choose the payment provider based on the launch country and business requirements.

Do not store raw card details.

The backend must create/verify payment transactions through the provider.

## Payment states

PENDING
PROCESSING
SUCCEEDED
FAILED
CANCELLED
REFUNDED

## Important

Payment success must never be determined solely by frontend input.

Use provider verification/webhooks where supported.

## Flow

Checkout
→ create payment intent/session
→ frontend payment UI
→ provider
→ backend verification/webhook
→ order marked paid

## Definition of Done

A successful test payment creates a correctly paid order.

Failed payments do not create falsely paid orders.
