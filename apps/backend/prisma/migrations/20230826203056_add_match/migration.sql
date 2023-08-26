-- CreateEnum
CREATE TYPE "MatchStatus" AS ENUM ('NOT_STARTED', 'STARTED', 'FINISHED');

-- CreateTable
CREATE TABLE "Match" (
    "id" VARCHAR(36) NOT NULL DEFAULT uuid7(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "MatchStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "venueId" TEXT NOT NULL,
    "sideAScore" INTEGER NOT NULL DEFAULT 0,
    "sideBScore" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SideA" (
    "A" VARCHAR(36) NOT NULL,
    "B" VARCHAR(12) NOT NULL
);

-- CreateTable
CREATE TABLE "_SideB" (
    "A" VARCHAR(36) NOT NULL,
    "B" VARCHAR(12) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SideA_AB_unique" ON "_SideA"("A", "B");

-- CreateIndex
CREATE INDEX "_SideA_B_index" ON "_SideA"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SideB_AB_unique" ON "_SideB"("A", "B");

-- CreateIndex
CREATE INDEX "_SideB_B_index" ON "_SideB"("B");

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SideA" ADD CONSTRAINT "_SideA_A_fkey" FOREIGN KEY ("A") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SideA" ADD CONSTRAINT "_SideA_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SideB" ADD CONSTRAINT "_SideB_A_fkey" FOREIGN KEY ("A") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SideB" ADD CONSTRAINT "_SideB_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
