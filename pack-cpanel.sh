#!/usr/bin/env bash
# Builds and packs AquaNexa into a cPanel-ready zip file
set -e

echo "🔨 Building production bundle..."
npm run build

echo "📦 Preparing standalone package..."
DIST=deploy-aquanexa
rm -rf $DIST aquanexa-cpanel.zip
mkdir -p $DIST

# Next standalone server
cp -r .next/standalone/* $DIST/

# Static assets (Next ko chahiye)
mkdir -p $DIST/.next
cp -r .next/static $DIST/.next/
cp .next/BUILD_ID $DIST/.next/ 2>/dev/null || true

# Public files, prisma schema
cp -r public $DIST/
cp -r prisma $DIST/

# Config files
cp package.json package-lock.json next.config.mjs server.js $DIST/
[ -f .env ] && cp .env $DIST/.env || echo "⚠️  .env file nahi mila (sample se rename kar lena)"

# Install production dependencies inside package so node_modules bhi ho jaye
echo "📁 Installing production deps (Prisma etc.)..."
cd $DIST
npm install --production --legacy-peer-deps --no-audit --no-fund
# Prisma client generate
npx prisma generate
cd ..

echo "🗜️ Creating aquanexa-cpanel.zip..."
cd $DIST
zip -r ../aquanexa-cpanel.zip . -q
cd ..

echo ""
echo "✅ Done! Upload aquanexa-cpanel.zip to cPanel."
echo "📁 Location: $(pwd)/aquanexa-cpanel.zip"
echo ""
echo "Next steps:"
echo "1. cPanel File Manager mein ~/aquanexa/ folder banake yeh zip upload + extract karo"
echo "2. Setup Node.js App create karo (root: aquanexa, startup: server.js, Node 20)"
echo "3. Environment variables add karo (DATABASE_URL, NEXTAUTH_SECRET, etc.)"
echo "4. SSH/Terminal se: npx prisma migrate deploy && npx tsx prisma/seed.ts && npx tsx prisma/create-admin.ts"
echo "5. App Restart karo → rokadoctor.in khulega!"
