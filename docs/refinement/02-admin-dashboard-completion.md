# Refinement 02: Admin Dashboard Completion

## Objective
Convert the placeholder pages within the Admin Dashboard (`/admin/*`) into fully functional moderation and management tools.

## Tasks

### 1. Pending Businesses Approval Queue (`/businesses/pending`)
- **Current State**: Static placeholder.
- **Target State**:
  - Fetch from `ApiAdminRepository.getPendingBusinesses()`.
  - Render as a structured review queue. 
  - Each item displays: Business Name, Owner Contact, Proposed Categories, Description.
  - Buttons for `Approve` and `Reject`. 
  - On approval, trigger a success toast and remove from the list.

### 2. User Directory (`/users`)
- **Current State**: Static placeholder.
- **Target State**:
  - Fetch from `ApiAdminRepository.getUsers(search, page, limit)`.
  - Implement a full data table with server-side pagination.
  - Add a search bar that debounces input and fetches matching users.
  - Add a "Status" column with a toggle switch to instantly Suspend/Activate a user.
  - Suspending a user must immediately reflect visually.

### 3. Content Moderation (`/reviews`)
- **Current State**: Static placeholder.
- **Target State**:
  - Fetch from `ApiAdminRepository.getReviews()`.
  - Display reviews in a feed format (Card containing the reviewer, business, star rating, text, and date).
  - Add a "Delete" button (trash can icon) to remove abusive reviews.
  - Add sorting toggles (e.g., "Sort by Lowest Rating" to prioritize reviewing negative feedback).

### 4. Global Search (Top Bar)
- **Current State**: Non-existent in the layout.
- **Target State**:
  - Implement a command palette or global search bar in the admin header.
  - Typing an ID or name should search across both Users and Businesses to quickly jump to a specific record for troubleshooting.
