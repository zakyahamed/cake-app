# Step 04 — Users and Profiles

## Objective

Implement customer account functionality.

## Features

Users can:

- View profile
- Update name
- Update email where allowed
- Update phone where allowed
- Manage addresses
- Set default address
- Remove addresses
- View account information

## Endpoints

GET /users/me
PATCH /users/me

GET /users/me/addresses
POST /users/me/addresses
PATCH /users/me/addresses/:id
DELETE /users/me/addresses/:id

## Authorization

Users may only access their own account and addresses.

Admins may access users through future admin endpoints.

## Definition of Done

Backend supports all frontend profile operations.
