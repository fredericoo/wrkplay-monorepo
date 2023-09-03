-- CreateTable
CREATE TABLE "Key" (
    "id" VARCHAR(36) NOT NULL DEFAULT uuid7(),
    "user_id" TEXT NOT NULL,
    "hashed_password" TEXT,

    CONSTRAINT "Key_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Key" ADD CONSTRAINT "Key_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
