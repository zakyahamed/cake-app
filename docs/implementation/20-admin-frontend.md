# Step 20 — Admin Frontend

## Objective

Build the dedicated UI for Platform Administrators to oversee, manage, and moderate the entire marketplace. This will be built as an integrated section within the existing Next.js `web-frontend` app under an `/admin` route, strictly protected by the `ADMIN` role.

## Role-Based Access Control
- Leverage the same `RoleGuard` as the business dashboard, but configured to require `ADMIN`.
- Any unauthorized access attempt must trigger a redirect and an error toast.

## Detailed Scope of Work

### 1. Admin Shell & Layout
- **Sidebar Navigation**: Dashboard, Businesses, Users, Content Moderation, Settings.
- **Top Bar**: Admin name, global search bar (search for any user or business ID).

### 2. Platform Dashboard (`/admin`)
- **System-Wide Metrics**:
  - Total Registered Users.
  - Total Active Businesses vs. Pending Businesses.
  - Gross Merchandise Value (GMV) / Total Platform Revenue.
- **Action Items**: Alert panel showing pending businesses waiting for approval or flagged reviews.

### 3. Business Approval Workflow (`/admin/businesses/pending`)
- **Review Queue**: A list of businesses that have registered but are in `PENDING` status.
- **Detail View**: 
  - Inspect business name, owner details, contact info, and proposed categories.
- **Approval Actions**:
  - **Approve**: Changes status to `ACTIVE`, making the business visible on the marketplace.
  - **Reject**: Changes status to `REJECTED`, optionally sending a notification to the owner.

### 4. User & Business Directory (`/admin/users`, `/admin/businesses`)
- **User Management**:
  - Data grid of all users with search and pagination.
  - Ability to suspend or activate a user account (`PATCH /admin/users/:id/status`).
- **Business Management**:
  - Data grid of all approved businesses.
  - Ability to suspend a business if they violate platform rules.

### 5. Content Moderation (`/admin/reviews`)
- **Review Feed**: View all reviews posted on the platform, sorted by most recent or lowest rating.
- **Delete Action**: Admin override to delete inappropriate or abusive reviews (`DELETE /admin/reviews/:id`).

## Definition of Done
An administrator can log in, view the health of the entire platform, securely approve new marketplace vendors, and moderate all users and content through a comprehensive internal tool UI.
