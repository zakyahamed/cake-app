# Mock Data Requirements

## Purpose

Mock data must simulate a real application.

Do not place random hardcoded data directly inside components.

All mock data must live in the mock data layer and be accessed through repositories.

---

# Minimum Data

Create approximately:

```text
15 categories
20 businesses
50 products
20 services
10+ customer records
30+ orders
15+ bookings
30+ reviews
15+ conversations
75+ messages
25+ notifications
```

The exact number may increase when required for realistic screens.

---

# Data Style

Use realistic:

* Sri Lankan business names
* Locations
* Prices
* Phone number formats
* Product names
* Service names
* Customer names

Do not use lorem ipsum.

Do not create obviously meaningless random data.

---

# Relationships

Mock data must be relational.

Example:

```text
Business
 ├── Products
 ├── Services
 └── Reviews

Customer
 ├── Orders
 ├── Bookings
 └── Reviews

Order
 ├── Customer
 ├── Business
 ├── Products
 └── Payment
```

Every referenced ID should refer to a real mock entity.

---

# Categories

Initial categories:

```text
Academy & Education
Bakery, Cakes & Desserts
Clothing & Accessories
Cosmetics & Beauty
Crafts, Gifts & Decor
Food & Beverage
General Contact
Health & Fitness
Henna & Mehendi Art
Herbal & Wellness
Home Decor & Furnishing
Photography & Media
Professional Services
Restaurant & Cafe
Retail & Grocery
```

Categories must come from repository data.

Do not hardcode category lists inside UI components.

---

# Mock Repository Requirements

Repositories should simulate:

```text
Loading
Success
Empty results
Errors
Mutations
Pagination
Search
Filtering
Sorting
```

Artificial delays may be used during development where useful.

Example:

```text
getBusinesses()
getBusinessBySlug()
searchBusinesses()
getProducts()
getProductById()
getServices()
getServiceById()
```

Repository APIs should use Promises.

Example:

```ts
async getProductById(id: string): Promise<Product | null>
```

This ensures hooks behave similarly when connected to a real API later.

---

# Mock Mutations

The following must work locally:

```text
Add to cart
Remove from cart
Update quantity

Create order
Cancel eligible order

Create booking
Cancel eligible booking

Send message

Create review

Update notification read state
```

Mock mutations must update the visible application state.
