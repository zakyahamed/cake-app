import glob
import os

files = [
    "src/app/orders/page.tsx",
    "src/app/orders/[id]/page.tsx",
    "src/app/bookings/page.tsx",
    "src/app/bookings/[id]/page.tsx",
    "src/app/messages/page.tsx",
    "src/app/messages/[id]/page.tsx",
    "src/app/notifications/page.tsx",
    "src/app/profile/addresses/page.tsx",
    "src/app/profile/reviews/page.tsx"
]

for file in files:
    with open(file, "r") as f:
        content = f.read()
    
    if "import { ProtectedRoute }" not in content:
        content = 'import { ProtectedRoute } from "@/components/layout/ProtectedRoute";\n' + content
        with open(file, "w") as f:
            f.write(content)
