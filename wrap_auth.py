import glob

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
    
    if "ProtectedRoute" not in content:
        content = content.replace('export default function', 'import { ProtectedRoute } from "@/components/layout/ProtectedRoute";\n\nexport default function')
        content = content.replace('export default async function', 'import { ProtectedRoute } from "@/components/layout/ProtectedRoute";\n\nexport default async function')
        content = content.replace('return <div', 'return <ProtectedRoute><div')
        content = content.replace('</div>;', '</div></ProtectedRoute>;')
        
        with open(file, "w") as f:
            f.write(content)
