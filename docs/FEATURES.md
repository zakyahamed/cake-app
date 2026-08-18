# Customer Features

Implement features in the order defined in `IMPLEMENTATION.md`.

---

# 1. Authentication

Screens:

```text
Welcome
Login
Register
Forgot Password
Reset Password
Verification
```

Use mock authentication.

Development account:

```text
customer@example.com
```

Mock authentication should support:

```text
Login success
Login failure
Logout
Session persistence
```

Do not implement real authentication.

---

# 2. Home

Home should include:

```text
Location selector
Search
Categories
Featured businesses
Popular businesses
Recommended businesses
Popular products
Popular services
Promotions
```

All data must come through repositories.

---

# 3. Categories

Users can:

```text
View categories
Select category
View related businesses
Search within category
Filter
Sort
```

Potential filters:

```text
Distance
Rating
Price
Open now
Available for booking
Delivery available
Pickup available
```

Only implement filters that are supported by the mock data and current UI.

Do not create fake controls that pretend to work.

---

# 4. Search

Search across:

```text
Businesses
Products
Services
Categories
```

Support:

```text
Search input
Suggestions
Recent searches
Results
Empty state
Clear search
Filters
```

Mock search should behave realistically.

---

# 5. Business Profile

Display:

```text
Cover image
Logo
Business name
Verification
Rating
Review count
Location
Opening hours
Description
Categories
Products
Services
Contact information
Delivery options
Pickup availability
Reviews
```

Actions may include:

```text
Message
Call
View Products
View Services
```

Show only actions relevant to that business.

---

# 6. Product Details

Display:

```text
Images
Name
Description
Price
Variants
Options
Availability
Business
Reviews
Related products
```

Users can:

```text
Select variant
Select options
Change quantity
Add notes
Add to cart
```

---

# 7. Service Details

Display:

```text
Images
Name
Description
Starting price
Duration
Availability
Location
Business
Reviews
```

Users can:

```text
Select date
Select time
Add notes
Book service
```

---

# 8. Cart

Support:

```text
View items
Remove item
Increase quantity
Decrease quantity
Variant information
Notes
Subtotal
Delivery fee
Discount
Total
```

Cart state must persist during navigation.

---

# 9. Checkout

Collect:

```text
Address
Fulfilment method
Scheduled date
Scheduled time
Order notes
Payment method
Order summary
```

Fulfilment options:

```text
Pickup
Business delivery
Platform delivery
```

Only show fulfilment options supported by the selected business/order.

---

# 10. Mock Payment

Create a mock payment flow.

States:

```text
Idle
Processing
Success
Failed
Cancelled
```

The payment UI must not directly implement payment logic.

Use a payment abstraction/service.

---

# 11. Orders

Create:

```text
Order list
Order details
Status
Timeline
Items
Business
Payment
Fulfilment
Address
Scheduled date/time
```

Mock order status should update through controlled mock flows.

---

# 12. Bookings

Create:

```text
Booking list
Booking details
Service
Business
Date
Time
Duration
Status
Payment
Notes
```

---

# 13. Messaging

Create:

```text
Conversation list
Conversation detail
Message composer
```

Support:

```text
Text messages
Timestamps
Read/unread state
Order or booking context where relevant
```

Mock message sending must update the current conversation.

---

# 14. Reviews

Display:

```text
Average rating
Review count
Review list
Rating
Review text
Images
Date
Customer
```

Users can create a review only after a completed mock order or booking.

---

# 15. Notifications

Create a notification center.

Support:

```text
Unread count
Read state
Mark as read
Mark all as read
Navigation from notification to related content
```

---

# 16. Profile

Include:

```text
Personal information
Email
Phone
Addresses
Orders
Bookings
Reviews
Notifications
Settings
Logout
```

Address types:

```text
Home
Work
Other
```
