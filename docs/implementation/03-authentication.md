# Step 03 — Authentication

## Objective

Replace mock authentication with real backend authentication.

## Support

Customer:

- Register
- Login
- Logout
- Refresh session
- Get current user

Business owner:

- Login
- Get current user

Admin:

- Login
- Get current user

## Initial MVP

Support email/password authentication.

Design the authentication module so phone/OTP can be added later.

Do not require SMS infrastructure for MVP unless separately configured.

## Security

Passwords must be hashed securely.

Never store plaintext passwords.

Never return password hashes.

Implement:

- Access token
- Refresh token
- Token expiry
- Refresh
- Logout/revocation strategy
- Unauthorized responses

## Endpoints

POST /auth/register
POST /auth/login
POST /auth/refresh
POST /auth/logout
GET /auth/me

## Authorization

Implement role guards.

Roles:

CUSTOMER
BUSINESS_OWNER
BUSINESS_STAFF
ADMIN

## Definition of Done

- Registration works
- Login works
- Refresh works
- Logout works
- Protected endpoints work
- Role guards work
- Invalid credentials are handled correctly
- Passwords are never exposed
