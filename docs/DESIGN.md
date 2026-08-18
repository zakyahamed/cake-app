# Design Requirements

## Visual Direction

The application should feel like a modern local business marketplace.

It should not look like a food-delivery clone.

Priorities:

```text
Clean
Modern
Trustworthy
Simple
Image-focused
Easy to browse
Easy to search
Clear pricing
Clear actions
```

---

# Color Palette

| Token | Value | Usage |
|---|---|---|
| `--color-brand` | `#0D6E6E` | Primary actions, links, active states |
| `--color-brand-light` | `#1A9696` | Hover states, highlights |
| `--color-brand-dark` | `#094D4D` | Pressed states, dark accents |
| `--color-amber` | `#F5A623` | Secondary accent, badges, ratings |
| `--color-amber-light` | `#FBBF52` | Hover on amber elements |
| `--color-surface` | `#FFFFFF` | Card backgrounds, panels |
| `--color-surface-alt` | `#F7F8FA` | Page backgrounds, secondary panels |
| `--color-border` | `#E5E7EB` | Borders, dividers |
| `--color-text-primary` | `#111827` | Headings, primary content |
| `--color-text-secondary` | `#6B7280` | Subtext, captions, labels |
| `--color-text-muted` | `#9CA3AF` | Placeholders, disabled |
| `--color-error` | `#DC2626` | Error states |
| `--color-success` | `#16A34A` | Success states |
| `--color-warning` | `#D97706` | Warning states |

---

# Typography

Font: Inter (Google Fonts)

| Scale | Size | Weight | Usage |
|---|---|---|---|
| Display | 48px | 700 | Hero headings |
| H1 | 36px | 700 | Page titles |
| H2 | 28px | 600 | Section headings |
| H3 | 22px | 600 | Card headings |
| H4 | 18px | 600 | Sub-sections |
| Body | 16px | 400 | Main content |
| Small | 14px | 400 | Secondary content |
| Caption | 12px | 400 | Labels, captions |

---

# Spacing

Use Tailwind's default spacing scale. Do not introduce arbitrary values.

Common spacings in use:

```text
4px   — xs (tight gutters, icon padding)
8px   — sm (component padding)
12px  — md (card internal padding)
16px  — base (standard spacing unit)
24px  — lg (section gaps)
32px  — xl (layout gaps)
48px  — 2xl (section separators)
64px  — 3xl (hero padding)
```

---

# Border Radius

| Token | Value | Usage |
|---|---|---|
| `rounded-sm` | 4px | Badges, chips |
| `rounded-md` | 8px | Inputs, buttons |
| `rounded-lg` | 12px | Cards |
| `rounded-xl` | 16px | Modals, drawers, large cards |
| `rounded-full` | 9999px | Avatars, pills |

---

# Shadows

| Token | Usage |
|---|---|
| `shadow-sm` | Subtle card lift |
| `shadow-md` | Hover state on cards |
| `shadow-lg` | Modals, dropdowns |
| `shadow-xl` | Floating elements |

---

# Responsive Design

The web application must work on:

```text
Mobile
Tablet
Desktop
Large Desktop
```

Test approximately:

```text
375px
768px
1024px
1440px
1920px
```

Do not simply compress desktop layouts onto mobile screens.

Adapt:

* Navigation
* Grid columns
* Spacing
* Card layouts
* Filters
* Sidebars
* Actions

---

# Shared UI Components

Build reusable components where appropriate:

```text
Button
IconButton
Input
Textarea
Select
Checkbox
Radio
Card
Badge
Modal
Drawer
Tabs
Dropdown
Avatar
Image
Rating
Price
SearchInput
Skeleton
EmptyState
ErrorState
LoadingState
Pagination
```

Do not create one-off versions of the same component repeatedly.

---

# Screen States

Every major screen should consider:

```text
Loading
Empty
Error
Success
```

Example:

```text
Loading businesses

No businesses found

Unable to load businesses
[Retry]

Business list
```

---

# Animations and Interactions

Use subtle, purposeful animations:

- Hover: `transition-all duration-200`
- Cards: slight lift on hover (`hover:-translate-y-1`)
- Buttons: scale on press (`active:scale-95`)
- Modals/drawers: slide-in with `transition` and opacity
- Loading states: pulse skeleton shimmer
- Page transitions: fade-in

Do not use animations purely for decoration. Every animation should aid interaction clarity.

---

# Accessibility

Support:

* Semantic HTML
* Keyboard navigation
* Visible focus states
* Accessible labels
* Reasonable touch targets (min 44px)
* Readable text (min 4.5:1 contrast ratio for normal text)
* Image alt text
* Buttons with meaningful labels

---

# Images

Use centralized mock image references.

Do not scatter image URLs throughout components.

Create reusable image-related components where useful:

```text
MarketplaceImage
BusinessLogo
Avatar
ProductImage
ImageGallery
```
