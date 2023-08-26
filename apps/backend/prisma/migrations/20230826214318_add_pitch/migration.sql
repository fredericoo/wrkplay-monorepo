/*
  Warnings:

  - You are about to drop the column `venueId` on the `Match` table. All the data in the column will be lost.
  - Added the required column `pitchId` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_venueId_fkey";


-- AlterTable
ALTER TABLE "Match" DROP COLUMN "venueId",
ADD COLUMN     "pitchId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Pitch" (
    "id" VARCHAR(6) NOT NULL DEFAULT nanoid(6),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "minTeamSize" INTEGER NOT NULL DEFAULT 1,
    "maxTeamSize" INTEGER NOT NULL DEFAULT 1,
    "venueId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Pitch_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pitch" ADD CONSTRAINT "Pitch_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_pitchId_fkey" FOREIGN KEY ("pitchId") REFERENCES "Pitch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
