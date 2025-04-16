-- AlterTable
ALTER TABLE "users" ADD COLUMN     "skin" TEXT,
ADD COLUMN     "skinType" BOOLEAN NOT NULL DEFAULT true;
