# Step 01 — Backend Foundation

## Objective

Create the production backend foundation for the marketplace.

The frontend already exists and currently uses mock repositories.

The backend must eventually replace those mock repositories without requiring frontend UI rewrites.

## Technology

Use:

- NestJS
- TypeScript
- PostgreSQL
- Prisma ORM
- REST API
- class-validator / class-transformer
- JWT authentication foundation
- Swagger/OpenAPI
- Jest

Use a modular monolith.

Do NOT create microservices.

## Requirements

Create:

- NestJS application
- Environment configuration
- Database configuration
- Prisma setup
- Global validation
- Global API error handling
- API versioning
- Swagger
- Logging foundation
- Health endpoint
- CORS configuration
- Security headers where appropriate

## API

Use:

/api/v1

Example:

GET /api/v1/health

## Environment

Create:

.env.example

Include placeholders for:

DATABASE_URL
JWT_SECRET
JWT_REFRESH_SECRET
CORS_ORIGINS
API_URL
STORAGE configuration
PAYMENT configuration

Never commit real secrets.

## Architecture

Use:

src/
  modules/
  common/
  config/
  database/
  health/

Modules must be feature-oriented.

Do not create giant generic services.

## Definition of Done

- Application starts
- Database connection works
- Prisma works
- Health endpoint works
- Swagger works
- Validation works
- Environment variables work
- Tests run
- Lint passes
- Typecheck passes

Do not implement business functionality yet.
