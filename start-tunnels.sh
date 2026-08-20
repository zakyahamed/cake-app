#!/bin/bash
# Kill any existing tunnels or servers to free up ports
pkill -f "ssh.*localhost.run" 2>/dev/null
pkill -f "npm run dev:all" 2>/dev/null
pkill -f "next dev" 2>/dev/null

echo "Starting backend tunnel via localtunnel..."
npx -y localtunnel --port 3001 --subdomain cakeapp-api-back > backend_tunnel.log 2>&1 &
BACKEND_PID=$!

echo "Starting frontend tunnel via localtunnel..."
npx -y localtunnel --port 3000 --subdomain cakeapp-web-front > frontend_tunnel.log 2>&1 &
FRONTEND_PID=$!

echo "Waiting for tunnels to assign URLs (this can take up to 30 seconds)..."

MAX_RETRIES=30
count=0
BACKEND_URL=""
FRONTEND_URL=""

while [ $count -lt $MAX_RETRIES ]; do
  BACKEND_URL=$(grep -o 'https://[a-zA-Z0-9.-]*\.loca\.lt' backend_tunnel.log | head -n 1)
  FRONTEND_URL=$(grep -o 'https://[a-zA-Z0-9.-]*\.loca\.lt' frontend_tunnel.log | head -n 1)
  
  if [ -n "$BACKEND_URL" ] && [ -n "$FRONTEND_URL" ]; then
    break
  fi
  sleep 1
  count=$((count+1))
done

if [ -z "$BACKEND_URL" ] || [ -z "$FRONTEND_URL" ]; then
  echo "Failed to get tunnel URLs from localtunnel. Ensure you have internet connection."
  echo "Backend Log:"
  cat backend_tunnel.log
  echo "Frontend Log:"
  cat frontend_tunnel.log
  kill $BACKEND_PID 2>/dev/null
  kill $FRONTEND_PID 2>/dev/null
  exit 1
fi

echo "======================================"
echo "✅ Backend API URL: $BACKEND_URL"
echo "✅ Frontend App URL: $FRONTEND_URL"
echo "======================================"

# Strip https:// for next.config.ts
FRONTEND_HOST=$(echo $FRONTEND_URL | sed 's/https:\/\///')

# Update env files dynamically (Using Mac compatible sed syntax)
echo "Updating configuration files with new URLs..."
sed -i '' "s|NEXT_PUBLIC_API_URL=.*|NEXT_PUBLIC_API_URL=$BACKEND_URL/api/v1|" apps/web-frontend/.env.local
sed -i '' "s|allowedDevOrigins: \[.*\]|allowedDevOrigins: ['$FRONTEND_HOST']|" apps/web-frontend/next.config.ts
sed -i '' "s|CORS_ORIGINS=.*|CORS_ORIGINS=\"http://localhost:3000,$FRONTEND_URL\"|" apps/backend/.env
sed -i '' "s|CORS_ORIGINS=.*|CORS_ORIGINS=\"http://localhost:3000,$FRONTEND_URL\"|" .env

echo "Configurations updated! Starting dev servers..."
echo "Press Ctrl+C to stop servers and tunnels."

# Start dev server
npm run dev:all

# Cleanup when user stops the server
kill $BACKEND_PID 2>/dev/null
kill $FRONTEND_PID 2>/dev/null
rm backend_tunnel.log frontend_tunnel.log
