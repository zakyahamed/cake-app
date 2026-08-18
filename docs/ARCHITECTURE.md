# Frontend Architecture

## Goal

The frontend currently uses mock data.

A real backend must be connectable later with minimal changes.

The UI must not know whether its data comes from mock data or a future API.

---

# Required Data Flow

```text
Page / Component
       ↓
Feature Hook
       ↓
Repository Interface
       ↓
Repository Implementation
       ↓
Data Source
```

Current:

```text
UI
 ↓
Hook
 ↓
Repository
 ↓
Mock Repository
 ↓
Mock Data
```

Future:

```text
UI
 ↓
Hook
 ↓
Repository
 ↓
API Repository
 ↓
REST API
```

---

# Project Structure

Use a feature-oriented structure.

```text
src/
├── app/
│
├── components/
│   ├── ui/
│   └── layout/
│
├── features/
│   ├── auth/
│   ├── businesses/
│   ├── categories/
│   ├── products/
│   ├── services/
│   ├── search/
│   ├── cart/
│   ├── checkout/
│   ├── orders/
│   ├── bookings/
│   ├── messages/
│   ├── reviews/
│   ├── notifications/
│   └── profile/
│
├── domain/
│   ├── types/
│   ├── enums/
│   └── schemas/
│
├── repositories/
│   ├── interfaces/
│   ├── mock/
│   └── index.ts
│
├── mock-data/
│
├── lib/
│   ├── utils/
│   └── config/
│
└── stores/
```

---

# Feature Structure

A feature may follow this structure:

```text
features/products/
├── components/
├── hooks/
├── repository.ts
├── queries.ts
└── utils.ts
```

Do not create files that have no clear responsibility.

Small features do not need every folder.

---

# Repository Rule

Define stable repository contracts.

Example:

```ts
export interface ProductRepository {
  getProducts(query?: ProductQuery): Promise<PaginatedResult<Product>>;

  getProductById(id: string): Promise<Product | null>;
}
```

Current implementation:

```text
MockProductRepository
```

Future implementation:

```text
ApiProductRepository
```

Both must satisfy the same repository contract.

---

# UI Rule

Pages and components must never directly:

* Import mock data
* Call `fetch`
* Call Axios
* Know API URLs

Bad:

```tsx
import { mockProducts } from "@/mock-data/products";
```

Bad:

```tsx
const response = await fetch("/products");
```

Good:

```tsx
const { data, isLoading } = useProducts();
```

---

# Mock Mutation Rule

When mock data changes during the application session, related data must remain consistent.

Example:

```text
Create order
 ↓
Order appears in Orders
 ↓
Related product inventory/status updates if applicable
 ↓
Business conversation can reference the order
```

Mock repositories should own mutation behavior.

Components should not manually modify multiple unrelated mock arrays.

---

# Future Backend Compatibility

Repositories should support API-ready concepts:

* Query parameters
* Pagination
* Filtering
* Sorting
* Application errors

Example:

```ts
interface PaginationParams {
  page?: number;
  limit?: number;
}
```

```ts
interface PaginatedResult<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

The mock implementation should return the same general structure expected from a future API.

---

# Dependency Direction

Allowed:

```text
UI → Features → Domain
Features → Repositories → Domain
Repositories → Mock Data → Domain
```

Avoid:

```text
Mock Data → React Components
React Components → API
Domain → Feature-specific UI
```

Keep domain types independent from React components.
