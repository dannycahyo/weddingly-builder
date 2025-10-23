# Wedding Builder - Admin Setup Guide

## Prerequisites

- Node.js (v18+)
- PostgreSQL database
- npm or yarn

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup

#### Option A: Local PostgreSQL

1. Install PostgreSQL if not already installed
2. Create a new database:

```bash
createdb weddingly
```

#### Option B: Use a Cloud Database (Recommended for Development)

- Supabase (free tier): https://supabase.com
- Neon (free tier): https://neon.tech
- Railway (free tier): https://railway.app

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/weddingly?schema=public"
SESSION_SECRET="your-random-secret-key-here"
```

Replace with your actual database credentials.

### 4. Generate Prisma Client and Run Migrations

```bash
# Generate Prisma Client
npx prisma generate

# Create and run migrations
npx prisma migrate dev --name init
```

### 5. Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:4321`

## Features Implemented

### Admin Page

The admin interface includes two main views:

#### Builder View (Content & Customization)

- ✅ **Global Style Editor**: Customize colors (primary, secondary, accent) and fonts (heading, body)
- ✅ **Hero Section**: Add couple names, wedding date, and hero image
- ✅ **Event Details**: Add multiple events (ceremony, reception, etc.) with dates, times, and Google Maps integration
- ✅ **Our Story**: Share your love story with text and images
- ✅ **Photo Gallery**: Upload up to 10 photos for a gallery
- ✅ **Gift Registry**: Add registry links or bank transfer details
- ✅ **Section Toggles**: Enable/disable any section
- ✅ **Publishing**: Generate unique URL slug and optional password protection

#### RSVP List View (Guest Management)

- ✅ **RSVP Dashboard**: View all guest responses in a table
- ✅ **Analytics**: Quick summary of attending/declined guests
- ✅ **CSV Export**: Download RSVP list as CSV file

### Authentication

- ✅ Login and registration system
- ✅ Session-based authentication
- ✅ Protected admin routes

### API Endpoints

- `/api/auth/login` - User login
- `/api/auth/register` - User registration
- `/api/auth/logout` - User logout
- `/api/wedding/site` - Get/Update wedding site data
- `/api/rsvp/list` - Get all RSVPs
- `/api/rsvp/export` - Export RSVPs to CSV

## Database Schema

### Models

- **User**: Stores couple credentials
- **WeddingSite**: Stores all wedding website data and settings
- **Event**: Stores event details (ceremony, reception, etc.)
- **RSVP**: Stores guest responses

## Usage

### First Time Setup

1. Navigate to `http://localhost:4321`
2. You'll be redirected to `/login`
3. Click "Sign up" to create an account
4. Fill in the builder form with your wedding details
5. Click "Publish Website" to make it live

### Managing Your Site

- Access the admin dashboard at `/admin`
- Switch between "Builder" and "RSVP List" tabs
- Make changes and click "Save Draft" or "Publish Website"

## Development Tools

### Prisma Studio

View and edit your database directly:

```bash
npx prisma studio
```

### Reset Database

If you need to reset your database:

```bash
npx prisma migrate reset
```

## Tech Stack

- **Frontend**: Astro + React + TailwindCSS + shadcn/ui
- **Backend**: Astro API routes
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: Session-based (cookies)

## Next Steps (Post-MVP)

- [ ] Implement guest home page
- [ ] Add image upload functionality (currently using URLs)
- [ ] Email notifications for RSVPs
- [ ] Custom domain support
- [ ] Multiple wedding templates
- [ ] Enhanced analytics

## Troubleshooting

### Database Connection Issues

- Verify DATABASE_URL in `.env` is correct
- Ensure PostgreSQL is running
- Check database credentials

### Prisma Client Errors

```bash
npx prisma generate
npx prisma migrate dev
```

### Build Errors

```bash
rm -rf node_modules package-lock.json
npm install
```

## Support

For issues or questions, please refer to the PRD document in `/docs/PRD.md`
