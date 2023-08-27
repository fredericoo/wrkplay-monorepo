-- DropForeignKey
ALTER TABLE "JoinTag" DROP CONSTRAINT "JoinTag_pitchId_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_pitchId_fkey";

-- DropForeignKey
ALTER TABLE "MatchPlayer" DROP CONSTRAINT "MatchPlayer_matchId_fkey";

-- DropForeignKey
ALTER TABLE "MatchPlayer" DROP CONSTRAINT "MatchPlayer_userId_fkey";

-- DropForeignKey
ALTER TABLE "Pitch" DROP CONSTRAINT "Pitch_venueId_fkey";

-- DropForeignKey
ALTER TABLE "VenuePermission" DROP CONSTRAINT "VenuePermission_venueId_fkey";

-- AddForeignKey
ALTER TABLE "VenuePermission" ADD CONSTRAINT "VenuePermission_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pitch" ADD CONSTRAINT "Pitch_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_pitchId_fkey" FOREIGN KEY ("pitchId") REFERENCES "Pitch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchPlayer" ADD CONSTRAINT "MatchPlayer_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchPlayer" ADD CONSTRAINT "MatchPlayer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JoinTag" ADD CONSTRAINT "JoinTag_pitchId_fkey" FOREIGN KEY ("pitchId") REFERENCES "Pitch"("id") ON DELETE CASCADE ON UPDATE CASCADE;
