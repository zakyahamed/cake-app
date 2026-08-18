# Step 07 — Products and Services

## Objective

Implement marketplace listings.

The system must support both:

PRODUCT
SERVICE

## Products

Business owners can:

- Create
- Update
- Unlist
- Restore
- Delete where appropriate
- Set price
- Set description
- Add images
- Add variants
- Set availability

## Services

Business owners can:

- Create
- Update
- Unlist
- Set price
- Set duration
- Set description
- Set availability
- Add images

## Public API

GET /products
GET /products/:id

GET /services
GET /services/:id

## Business API

POST
PATCH
DELETE

for owned listings.

## Requirements

Implement:

- Pagination
- Filtering
- Sorting
- Category filtering
- Business filtering
- Availability filtering

## Definition of Done

Frontend product/service repositories can use real API responses.
