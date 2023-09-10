-- AlterTable
ALTER TABLE "Pitch" ADD COLUMN     "description" TEXT,
ADD COLUMN     "image_url" TEXT;

-- AlterTable
ALTER TABLE "Venue" ADD COLUMN     "cover_url" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "logo_url" TEXT,
ADD COLUMN     "website" TEXT;
