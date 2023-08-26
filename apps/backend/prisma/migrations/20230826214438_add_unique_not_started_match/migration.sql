-- CreateIndex
CREATE UNIQUE INDEX "match_pitchId_not_started_unique" ON "Match"("pitchId") WHERE status = 'NOT_STARTED';