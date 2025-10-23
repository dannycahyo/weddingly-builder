# The Evermore - Wedding Website Builder

A beautiful, simple, and efficient wedding website builder that allows couples to create stunning single-page wedding sites with RSVP management. Built with Astro, React, Tailwind CSS, and Prisma.

## ✨ Features

### For Couples (Admin Dashboard)

- 🎨 **Visual Builder** - Single-page builder with intuitive section-based editing
- 🎭 **Customization** - Global color palette and font selection
- 📸 **Media Management** - Image and audio upload via Cloudinary
- 🎵 **Background Music** - Upload custom music for guest pages
- 🎫 **RSVP Management** - View, track, and export guest responses
- 🔒 **Password Protection** - Optional password for guest access
- 🌐 **Unique URLs** - Each wedding gets a custom shareable link

### For Guests (Wedding Website)

- 📱 **Mobile-First Design** - Optimized for all devices
- 💌 **Envelope Animation** - Beautiful entrance with envelope opening
- 🎵 **Background Music** - Automatic music playback on interaction
- 📅 **Event Details** - Clear display of ceremony and reception info
- 📍 **Google Maps Integration** - Easy location navigation
- 💝 **RSVP Form** - Simple form with dietary restrictions
- 🖼️ **Photo Gallery** - Carousel display of couple's photos
- ❤️ **Love Story** - Share your journey with guests
- 🎁 **Gift Registry** - Links to registries or bank details

## 🚀 Tech Stack

- **Framework**: [Astro 5.14](https://astro.build) - Ultra-fast static site generator
- **UI Library**: [React 19](https://react.dev) - For interactive components
- **Styling**: [Tailwind CSS 4.1](https://tailwindcss.com) - Utility-first CSS
- **Database**: [Prisma 6.18](https://prisma.io) with PostgreSQL
- **Animations**: [Framer Motion](https://www.framer.com/motion/) - Smooth animations
- **Form Management**: [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev)
- **Media Upload**: [Cloudinary](https://cloudinary.com) - Image and audio storage
- **UI Components**: [Radix UI](https://radix-ui.com) - Accessible component primitives
- **Icons**: [Lucide React](https://lucide.dev) - Beautiful icon set

## 📋 Prerequisites

- Node.js 18+ or Bun
- PostgreSQL database
- Cloudinary account (for image/audio uploads)

## 🛠️ Installation

1. **Clone the repository**

```sh
git clone https://github.com/dannycahyo/weddingly-builder.git
cd weddingly-builder
```

2. **Install dependencies**

```sh
npm install
# or
bun install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/weddingly"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

4. **Set up the database**

```sh
npx prisma migrate dev
# or
bunx prisma migrate dev
```

5. **Seed the database (optional)**

```sh
npx prisma db seed
# or
bunx prisma db seed
```

## 🏃 Development

Start the development server:

```sh
npm run dev
# or
bun run dev
```

The app will be available at `http://localhost:4321`

## 📦 Build

Build for production:

```sh
npm run build
# or
bun run build
```

Preview the production build:

```sh
npm run preview
# or
bun run preview
```

## 🗄️ Database Management

### Run migrations

```sh
npx prisma migrate dev
```

### Open Prisma Studio (Database GUI)

```sh
npx prisma studio
```

### Generate Prisma Client

```sh
npx prisma generate
```

## 📁 Project Structure

```
weddingly-builder/
├── src/
│   ├── components/
│   │   ├── guest/              # Guest-facing components
│   │   │   ├── EnvelopeInvitation.tsx
│   │   │   ├── GuestPage.tsx
│   │   │   ├── MusicPlayer.tsx
│   │   │   └── ...
│   │   ├── sections/           # Admin builder sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── MusicSection.tsx
│   │   │   └── ...
│   │   ├── ui/                 # Reusable UI components
│   │   ├── AudioUpload.tsx     # Audio file uploader
│   │   ├── BuilderForm.tsx     # Main admin form
│   │   └── ...
│   ├── layouts/
│   │   └── main.astro          # Main layout
│   ├── lib/
│   │   ├── prisma.ts           # Prisma client
│   │   ├── utils.ts            # Utility functions
│   │   └── validations.ts      # Zod schemas
│   ├── pages/
│   │   ├── api/                # API endpoints
│   │   │   ├── upload.ts       # Cloudinary upload
│   │   │   ├── wedding/        # Wedding CRUD
│   │   │   └── rsvp.ts         # RSVP submission
│   │   ├── builder.astro       # Admin builder page
│   │   ├── [slug].astro        # Dynamic wedding pages
│   │   └── index.astro         # Landing page
│   └── styles/
│       └── global.css          # Global styles
├── prisma/
│   └── schema.prisma           # Database schema
├── public/                     # Static assets
├── docs/
│   └── PRD.md                  # Product Requirements
├── astro.config.mjs            # Astro configuration
├── tailwind.config.js          # Tailwind configuration
└── package.json
```

## 🎨 Key Features Implementation

### Background Music

- Upload audio files (MP3, WAV, M4A, OGG) via Cloudinary
- Automatic playback on user interaction (envelope opening)
- Floating music player with play/pause and mute controls
- Displays song title and artist

### Envelope Animation

- Beautiful entrance animation for guest pages
- Personalized greeting with guest name
- Smooth transition to main content
- Framer Motion powered animations

### RSVP Management

- Guest form with name, attendance, and dietary restrictions
- Admin dashboard to view all responses
- Quick stats (attending, declined)
- CSV export functionality

### Customization

- Choose from 10 color palettes
- Select heading and body fonts
- Toggle sections on/off
- Upload unlimited photos to gallery

## 🔐 Security

- Password-protected wedding sites (optional)
- Server-side validation with Zod
- Secure file uploads via Cloudinary
- PostgreSQL with Prisma for data safety

## 🌐 Deployment

This project can be deployed to any Node.js hosting platform:

- **Vercel** (Recommended)
- **Netlify**
- **Railway**
- **Render**

Make sure to:

1. Set up environment variables
2. Configure PostgreSQL database
3. Run migrations before deployment

## 📖 Documentation

For detailed product requirements, see [PRD.md](./docs/PRD.md)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

MIT License - feel free to use this project for your own wedding or commercial purposes.

## 💖 Created with Love

Built with ❤️ for couples around the world.

---

**The Evermore** - Because every love story deserves a beautiful beginning.
