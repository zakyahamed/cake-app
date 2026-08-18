# Step 09 — Cart and Checkout

## Objective

Implement real cart and checkout preparation.

## Cart

Customer can:

- Add item
- Remove item
- Change quantity
- Select variant
- Add notes
- View subtotal

## Important

Never trust prices sent by the frontend.

The backend must recalculate:

- Item price
- Quantity
- Subtotal
- Delivery fee
- Discounts
- Total

## Checkout

Support:

- Address
- Fulfilment method
- Scheduled date
- Scheduled time
- Notes

Fulfilment:

PICKUP
BUSINESS_DELIVERY
PLATFORM_DELIVERY

Platform delivery can remain unavailable until delivery is implemented.

## Definition of Done

Backend can safely create a pending order from cart/checkout data.
