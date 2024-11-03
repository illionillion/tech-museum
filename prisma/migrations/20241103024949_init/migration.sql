-- CreateTable
CREATE TABLE "Follow" (
    "id" SERIAL NOT NULL,
    "from_username" TEXT NOT NULL,
    "to_username" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "removed_at" TIMESTAMP(3),

    CONSTRAINT "Follow_pkey" PRIMARY KEY ("id")
);
