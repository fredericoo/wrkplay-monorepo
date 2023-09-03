-- CreateTable
CREATE TABLE "Session" (
    "id" VARCHAR(36) NOT NULL DEFAULT uuid7(),
    "user_id" TEXT NOT NULL,
    "active_expires" INTEGER NOT NULL,
    "idle_expires" INTEGER NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
