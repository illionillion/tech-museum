-- CreateTable
CREATE TABLE "Like" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "article_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "removed_at" TIMESTAMP(3),

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);
