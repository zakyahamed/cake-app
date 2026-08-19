# Step 19 — Business Owner Frontend

## Objective

Build the dedicated, highly detailed UI for Business Owners to manage their marketplace presence and operations. This will be an integrated section within the existing Next.js `web-frontend` app under a `/business-dashboard` route, protected by role-based access to ensure only `BUSINESS_OWNER` users can access it.

## Role-Based Access Control
- Create a `useRequireRole` hook or a `RoleGuard` higher-order component in the frontend to wrap all `/business-dashboard` routes.
- If a `CUSTOMER` attempts to access the dashboard, they should be redirected to `/profile`.
- If an unauthenticated user attempts access, redirect them to `/login`.

## Detailed Scope of Work

### 1. Dashboard Shell & Layout
- **Sidebar Navigation**: Overview, Orders, Bookings, Products, Services, Settings.
- **Top Bar**: Business name, notification bell, user profile dropdown, and a quick "Status" toggle (e.g., Accepting Orders vs. Paused).
- **Responsive Design**: Ensure the dashboard is usable on tablets (for in-kitchen use) and desktop.

### 2. Overview Dashboard (`/business-dashboard`)
- **Key Metrics Cards**: 
  - Total Revenue (fetch from `GET /operations/dashboard/:businessId`).
  - Active Orders & Pending Bookings.
  - Unique Customers.
  - Average Rating.
- **Recent Activity Table**: A unified view of the last 5 orders and bookings requiring attention.
- **Quick Actions**: "Add Product", "View Today's Bookings".

### 3. Order Management (`/business-dashboard/orders`)
- **Kanban Board or Filtered List**: View orders grouped by status (`PENDING`, `PREPARING`, `READY_FOR_PICKUP`, `COMPLETED`).
- **Order Detail Modal**:
  - View customer details and delivery notes.
  - See exact items, variants, and subtotal.
- **Action Buttons**: One-click status progression to notify the customer of order updates.

### 4. Booking Management (`/business-dashboard/bookings`)
- **Calendar/List View**: See upcoming consultations and service bookings.
- **Action Workflow**:
  - **Confirm**: Accept a `PENDING` booking.
  - **Reject**: Decline with a reason.
  - **Complete**: Mark as `COMPLETED` once the service is rendered.

### 5. Catalog Management (Products & Services)
- **Product List (`/business-dashboard/products`)**: Table of products with thumbnail, price, and active/inactive toggle.
- **Product Form**:
  - Inputs for Name, Description, Category, Base Price.
  - Dynamic array input for Variants (Name, Price).
  - Image upload placeholder UI (or integration if file storage is ready).
- **Service List (`/business-dashboard/services`)**: Table of services showing duration and price.
- **Service Form**:
  - Inputs for Name, Description, Category, Starting Price, Duration.
  - Availability grid (select days and times).

### 6. Settings & Profile (`/business-dashboard/settings`)
- **General Info**: Update business name, description, and contact info.
- **Opening Hours**: Configure business open/close times for each day of the week.
- **Fulfillment**: Toggle delivery vs. pickup availability.

## Definition of Done
A business owner can fully operate their store—managing catalog items, fulfilling real-time orders, handling bookings, and tracking revenue—entirely from the web UI.
