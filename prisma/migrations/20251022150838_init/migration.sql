-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeddingSite" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT,
    "primaryColor" TEXT NOT NULL DEFAULT '#e4b6c6',
    "secondaryColor" TEXT NOT NULL DEFAULT '#d4a5a5',
    "accentColor" TEXT NOT NULL DEFAULT '#9b7e7e',
    "headingFont" TEXT NOT NULL DEFAULT 'Playfair Display',
    "bodyFont" TEXT NOT NULL DEFAULT 'Lato',
    "heroEnabled" BOOLEAN NOT NULL DEFAULT true,
    "brideName" TEXT,
    "groomName" TEXT,
    "weddingDate" TIMESTAMP(3),
    "heroImageUrl" TEXT,
    "storyEnabled" BOOLEAN NOT NULL DEFAULT true,
    "storyTitle" TEXT NOT NULL DEFAULT 'Our Story',
    "storyText" TEXT,
    "storyImage1Url" TEXT,
    "storyImage2Url" TEXT,
    "galleryEnabled" BOOLEAN NOT NULL DEFAULT false,
    "galleryTitle" TEXT NOT NULL DEFAULT 'Our Gallery',
    "galleryImages" TEXT[],
    "registryEnabled" BOOLEAN NOT NULL DEFAULT true,
    "registryTitle" TEXT NOT NULL DEFAULT 'Gift Registry',
    "registryText" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WeddingSite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RSVP" (
    "id" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT,
    "attending" BOOLEAN NOT NULL,
    "dietaryRestrictions" TEXT,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RSVP_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "WeddingSite_userId_key" ON "WeddingSite"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "WeddingSite_slug_key" ON "WeddingSite"("slug");

-- CreateIndex
CREATE INDEX "Event_siteId_idx" ON "Event"("siteId");

-- CreateIndex
CREATE INDEX "RSVP_siteId_idx" ON "RSVP"("siteId");

-- AddForeignKey
ALTER TABLE "WeddingSite" ADD CONSTRAINT "WeddingSite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "WeddingSite"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RSVP" ADD CONSTRAINT "RSVP_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "WeddingSite"("id") ON DELETE CASCADE ON UPDATE CASCADE;
