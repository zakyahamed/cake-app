# Refinement 01: Business Dashboard Completion

## Objective
Convert the placeholder pages within the Business Dashboard (`/business-dashboard/*`) into fully functional, interactive UIs connected to the backend API.

## Tasks

### 1. Order Management (`/orders`)
- **Current State**: Static placeholder.
- **Target State**: 
  - Fetch orders using `ApiOrderRepository`.
  - Build a Kanban board layout with 4 columns: `PENDING`, `PREPARING`, `READY_FOR_PICKUP`, `COMPLETED`.
  - Implement drag-and-drop or simple action buttons to move orders between states.
  - Implement real-time or polled auto-refresh so new orders appear automatically.
  - Add an order detail modal showing exact variants, customer notes, and delivery address.

### 2. Booking Management (`/bookings`)
- **Current State**: Static placeholder.
- **Target State**:
  - Fetch bookings using `ApiBookingRepository`.
  - Build a calendar view (e.g., using `react-big-calendar` or a custom lightweight week/month grid).
  - Implement a list view for "Pending Requests" requiring manual confirmation.
  - Provide Action buttons: `Confirm` (moves to accepted), `Reject` (with reason prompt), `Complete` (after appointment).

### 3. Product Catalog Management (`/products`)
- **Current State**: Static placeholder.
- **Target State**:
  - Build a data table listing all products (Thumbnail, Name, Base Price, Status).
  - Add a "Create Product" wizard/form.
  - Form must handle dynamic variant arrays (e.g., multiple sizes and prices).
  - Support image upload (requires File Storage phase completion) or URL input.

### 4. Service Catalog Management (`/services`)
- **Current State**: Static placeholder.
- **Target State**:
  - Build a data table listing all bookable services (Duration, Price, Active status).
  - Add a "Create Service" form.
  - Must include complex availability logic selection (e.g., ticking days of the week and standard time windows).

### 5. Settings (`/settings`)
- **Current State**: Static placeholder.
- **Target State**:
  - Form to update business metadata: Description, Phone, Email, Location.
  - Toggle switches for `isPickupAvailable`.
  - UI to define granular opening hours per day.
