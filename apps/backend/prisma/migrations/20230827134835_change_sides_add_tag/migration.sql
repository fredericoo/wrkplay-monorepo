/*
  Warnings:

  - You are about to drop the `_SideA` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SideB` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "MatchSide" AS ENUM ('SIDE_A', 'SIDE_B');

-- CreateEnum
CREATE TYPE "MatchPlayerState" AS ENUM ('NOT_READY', 'READY', 'VOTE_DONE', 'VOTE_FORFEIT', 'VOTE_CANCEL');

-- DropForeignKey
ALTER TABLE "_SideA" DROP CONSTRAINT "_SideA_A_fkey";

-- DropForeignKey
ALTER TABLE "_SideA" DROP CONSTRAINT "_SideA_B_fkey";

-- DropForeignKey
ALTER TABLE "_SideB" DROP CONSTRAINT "_SideB_A_fkey";

-- DropForeignKey
ALTER TABLE "_SideB" DROP CONSTRAINT "_SideB_B_fkey";

-- DropTable
DROP TABLE "_SideA";

-- DropTable
DROP TABLE "_SideB";

-- CreateTable
CREATE TABLE "MatchPlayer" (
    "id" VARCHAR(36) NOT NULL DEFAULT uuid7(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "matchId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "side" "MatchSide" NOT NULL,
    "state" "MatchPlayerState" NOT NULL DEFAULT 'NOT_READY',

    CONSTRAINT "MatchPlayer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JoinTag" (
    "id" VARCHAR(6) NOT NULL DEFAULT nanoid(6),
    "pitchId" TEXT NOT NULL,
    "side" "MatchSide" NOT NULL,

    CONSTRAINT "JoinTag_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MatchPlayer" ADD CONSTRAINT "MatchPlayer_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchPlayer" ADD CONSTRAINT "MatchPlayer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JoinTag" ADD CONSTRAINT "JoinTag_pitchId_fkey" FOREIGN KEY ("pitchId") REFERENCES "Pitch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
