# Step 05 — Businesses

## Objective

Implement business registration and public business profiles.

## Business lifecycle

PENDING
ACTIVE
REJECTED
SUSPENDED

## Business owner can

- Register business
- Edit profile
- Upload logo reference
- Upload cover reference
- Set description
- Set location
- Set contact information
- Set opening hours
- Configure fulfilment options

## Public users can

- View active businesses
- View business profile
- View business categories
- View products
- View services
- View rating

## Endpoints

POST /businesses
GET /businesses
GET /businesses/:id
PATCH /businesses/:id

Business ownership must be enforced.

A business owner cannot edit another business.

## Definition of Done

Business profile screens can be connected to the real API.
