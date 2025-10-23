-- AlterTable
ALTER TABLE "WeddingSite" ADD COLUMN     "musicArtist" TEXT,
ADD COLUMN     "musicEnabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "musicTitle" TEXT,
ADD COLUMN     "musicUrl" TEXT;
