#!/bin/bash

echo "🎉 Wedding Builder - Quick Setup Script"
echo "========================================"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << 'EOF'
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/weddingly?schema=public"

# Session Secret
SESSION_SECRET="change-this-to-a-random-secret-key-$(openssl rand -hex 32)"
EOF
    echo "✅ .env file created!"
    echo ""
    echo "⚠️  IMPORTANT: Please update the DATABASE_URL in .env with your actual database credentials"
    echo ""
    echo "Options:"
    echo "  1. Local PostgreSQL: postgresql://username:password@localhost:5432/weddingly"
    echo "  2. Supabase: Get from https://supabase.com (Database > Connection string > URI)"
    echo "  3. Neon: Get from https://neon.tech"
    echo ""
    read -p "Press Enter after you've updated the DATABASE_URL in .env..."
fi

echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "🔨 Generating Prisma Client..."
npx prisma generate

echo ""
echo "🗄️  Running database migrations..."
npx prisma migrate dev --name init

echo ""
echo "✅ Setup complete!"
echo ""
echo "🚀 To start the development server, run:"
echo "   npm run dev"
echo ""
echo "📖 For more information, see ADMIN_SETUP.md"
