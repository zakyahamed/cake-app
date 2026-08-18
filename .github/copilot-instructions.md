# Copilot Instructions

You are building the frontend for a local business marketplace.

The current scope is:

- Customer-facing web application only
- Next.js
- TypeScript
- Mock data
- No backend implementation
- No business dashboard
- No admin dashboard
- No mobile application

The application must be structured so a real backend can be connected later without rewriting the UI.

---

## Core Rule

Never access mock data directly inside React components.

Do not do this:

```ts
import { products } from "@/mock-data/products";
```

inside pages or components.

Instead use:

```text
Component
  ↓
Feature Hook
  ↓
Repository
  ↓
Mock Repository
  ↓
Mock Data
```

Example:

```tsx
const { data, isLoading, error } = useProducts();
```

Later, only the repository implementation should need to change:

```text
Current:

ProductRepository
  ↓
MockProductRepository

Future:

ProductRepository
  ↓
ApiProductRepository
```

Do not make components aware of whether data comes from mock data or an API.

---

## Before Writing Code

Before implementing a feature:

1. Inspect the existing project structure.
2. Read the relevant files in `docs/`.
3. Reuse existing domain types.
4. Reuse existing components.
5. Reuse existing hooks.
6. Reuse existing repositories.
7. Do not create duplicate components or types.
8. Do not change architecture unless necessary.
9. Keep changes focused on the requested feature.

Never blindly overwrite existing files.

---

## Technology

Use:

* Next.js
* TypeScript
* App Router
* React
* Tailwind CSS
* Zustand
* TanStack Query
* React Hook Form
* Zod

Use TypeScript strictly.

Avoid:

```text
any
duplicated types
duplicated business logic
direct mock-data imports in UI
direct fetch calls in UI
unnecessary global state
unnecessary abstractions
```

---

## State Management

Use Zustand only for client state such as:

* Cart
* UI state
* Selected location
* User preferences
* Mock authentication session

Use TanStack Query for server-like data:

* Businesses
* Categories
* Products
* Services
* Orders
* Bookings
* Messages
* Reviews
* Notifications

Do not put all application data into Zustand.

---

## Data Access

Components must access data through hooks.

Example:

```tsx
const { data: businesses } = useBusinesses();
```

Hooks access repositories.

Example:

```text
useBusinesses()
  ↓
businessRepository.getBusinesses()
```

Repositories access mock data.

The future API client must be able to replace the mock repository without changing UI components.

---

## Components

Build reusable components.

Before creating a component, check whether an existing component can be reused.

Shared UI components may include:

```text
Button
Input
Textarea
Select
Card
Badge
Modal
Drawer
Tabs
Avatar
Image
Skeleton
EmptyState
ErrorState
LoadingState
Rating
Price
SearchInput
```

Feature-specific components should remain inside their feature folder.

Do not create a single massive `components/` folder containing the entire universe.

---

## Data States

Every data-driven screen should handle:

```text
Loading
Success
Empty
Error
Retry
```

Do not implement only the happy path.

---

## Forms

Use:

* React Hook Form
* Zod

Every form must support:

* Validation
* Clear validation errors
* Submit loading state
* Submit error state
* Success handling

---

## Styling

Use the design rules defined in:

```text
docs/DESIGN.md
```

Do not introduce random spacing, colors, fonts, or border radius values when existing design tokens or component styles can be used.

The UI must be responsive.

Test layouts at approximately:

```text
375px
768px
1024px
1440px
1920px
```

Do not simply shrink desktop layouts to fit mobile.

---

## Implementation Rules

For every feature:

1. Define or reuse domain types.
2. Define repository methods if needed.
3. Implement/update mock repository.
4. Create or update hooks.
5. Build UI components.
6. Build the page.
7. Handle loading, empty, and error states.
8. Verify responsive behavior.
9. Run lint.
10. Run typecheck.

---

## Do Not Implement

Do not implement unless specifically requested:

* Backend
* NestJS
* Database
* Real authentication
* Real payment gateway
* Real SMS/OTP
* Real notifications
* WebSockets
* Live delivery tracking
* Business dashboard
* Admin dashboard
* Mobile app

Mock implementations are sufficient.

---

## Completion Report

After completing a task, report:

```text
Implemented:
Files changed:
How the feature works:
Mock data/repository changes:
Validation:
Lint:
Typecheck:
Known limitations:
Next dependency:
```

Do not continue implementing unrelated features.
